import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Scale, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { DailyCheckIn } from "../backend.d";
import { useBackend } from "../hooks/useBackend";
import { formatDate, formatDateShort, today } from "../lib/utils";

// ─── Helper functions ────────────────────────────────────────────────────────

function getWeekDays(): { date: string; label: string; short: string }[] {
  const now = new Date();
  const day = now.getDay(); // 0=Sun
  // Monday-based week
  const monday = new Date(now);
  monday.setDate(now.getDate() - ((day + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const dateStr = formatDate(d);
    return {
      date: dateStr,
      label: d.toLocaleDateString("en-US", { weekday: "short" }),
      short: String(d.getDate()),
    };
  });
}

function getDayStatus(
  checkIn: DailyCheckIn | undefined,
): "full" | "partial" | "missed" | "future" {
  if (!checkIn) return "missed";
  if (checkIn.workoutDone && checkIn.dietFollowed) return "full";
  if (checkIn.workoutDone || checkIn.dietFollowed) return "partial";
  return "missed";
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function StreakBanner({ streak }: { streak: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl p-5"
      style={{
        background:
          "linear-gradient(135deg, rgba(34,197,94,0.22) 0%, rgba(56,189,248,0.10) 60%, rgba(15,23,42,0.0) 100%)",
        border: "1px solid rgba(34,197,94,0.25)",
        boxShadow: "0 4px 32px rgba(34,197,94,0.12)",
      }}
      data-ocid="tracking.streak_banner"
    >
      {/* Decorative glow */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,197,94,0.18) 0%, transparent 70%)",
        }}
      />
      <div className="flex items-center gap-4">
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
            ease: "easeInOut",
          }}
          className="text-5xl leading-none select-none"
          aria-hidden="true"
        >
          🔥
        </motion.div>
        <div className="flex-1 min-w-0">
          {streak > 0 ? (
            <>
              <motion.div
                key={streak}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="font-display font-bold text-2xl text-foreground"
              >
                <CountUp target={streak} /> day streak!
              </motion.div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {streak >= 7
                  ? "You're on fire! Keep crushing it 💪"
                  : streak >= 3
                    ? "Great consistency! Don't break the chain 🔗"
                    : "Off to a great start! Keep going 🚀"}
              </p>
            </>
          ) : (
            <>
              <div className="font-display font-bold text-xl text-foreground">
                Start your streak today!
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                Complete today's check-in and light the fire ✨
              </p>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function CountUp({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let frame: number;
    const start = performance.now();
    const duration = 600;
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCount(Math.round(progress * target));
      if (progress < 1) frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target]);
  return <span>{count}</span>;
}

interface ToggleRowProps {
  id: string;
  emoji: string;
  label: string;
  checked: boolean;
  onChange: () => void;
  ocid: string;
}
function ToggleRow({
  id,
  emoji,
  label,
  checked,
  onChange,
  ocid,
}: ToggleRowProps) {
  return (
    <motion.button
      type="button"
      id={id}
      data-ocid={ocid}
      onClick={onChange}
      whileTap={{ scale: 0.97 }}
      className={[
        "w-full flex items-center justify-between p-4 rounded-xl transition-smooth cursor-pointer",
        checked ? "border border-accent/40" : "border border-white/08",
      ].join(" ")}
      style={{
        background: checked ? "rgba(34,197,94,0.12)" : "rgba(255,255,255,0.03)",
      }}
      aria-pressed={checked}
    >
      <span className="flex items-center gap-3 text-sm font-medium text-foreground">
        <span className="text-xl">{emoji}</span>
        {label}
      </span>
      <motion.div
        initial={false}
        animate={
          checked ? { scale: 1, opacity: 1 } : { scale: 0.6, opacity: 0.3 }
        }
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={[
          "w-7 h-7 rounded-full flex items-center justify-center text-base",
          checked
            ? "bg-accent text-black"
            : "bg-white/10 text-muted-foreground",
        ].join(" ")}
      >
        {checked ? "✓" : "○"}
      </motion.div>
    </motion.button>
  );
}

function WaterTracker({
  glasses,
  setGlasses,
}: { glasses: number; setGlasses: (v: number) => void }) {
  const GOAL = 8;
  return (
    <div className="card-glass p-4" data-ocid="tracking.water_card">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-xl">💧</span>
          <span className="font-display font-semibold text-sm text-foreground">
            Water Intake
          </span>
        </div>
        <span className="text-xs text-muted-foreground font-mono">
          {glasses}/{GOAL} glasses
        </span>
      </div>
      {/* Glass icons row */}
      <div className="flex gap-1.5 flex-wrap mb-3">
        {(["1", "2", "3", "4", "5", "6", "7", "8"] as const).map(
          (glassId, i) => (
            <motion.button
              key={glassId}
              type="button"
              data-ocid={`tracking.water_glass.${glassId}`}
              onClick={() => setGlasses(i < glasses ? i : i + 1)}
              whileTap={{ scale: 0.85 }}
              title={`${i + 1} glass${i + 1 > 1 ? "es" : ""}`}
              className="text-xl leading-none transition-smooth select-none"
              style={{
                filter: i < glasses ? "none" : "grayscale(1) opacity(0.3)",
              }}
            >
              🥛
            </motion.button>
          ),
        )}
      </div>
      {/* Overflow indicator */}
      {glasses > GOAL && (
        <p className="text-xs text-secondary mb-3">
          +{glasses - GOAL} extra glasses — great hydration!
        </p>
      )}
      <div className="flex gap-2">
        <button
          type="button"
          data-ocid="tracking.water_minus_button"
          onClick={() => setGlasses(Math.max(0, glasses - 1))}
          className="flex-1 py-2 rounded-lg text-sm font-semibold transition-smooth"
          style={{
            background: "rgba(255,255,255,0.06)",
            color: "var(--color-muted-foreground)",
          }}
        >
          − Glass
        </button>
        <button
          type="button"
          data-ocid="tracking.water_add_button"
          onClick={() => setGlasses(Math.min(12, glasses + 1))}
          className="flex-1 py-2 rounded-lg text-sm font-semibold transition-smooth"
          style={{ background: "rgba(56,189,248,0.15)", color: "#38bdf8" }}
        >
          + Glass
        </button>
      </div>
    </div>
  );
}

function WeeklyMiniCalendar({
  checkIns,
}: {
  checkIns: DailyCheckIn[];
}) {
  const weekDays = getWeekDays();
  const todayStr = today();
  const checkInMap = new Map(checkIns.map((c) => [c.date, c]));
  const [popup, setPopup] = useState<{
    date: string;
    checkIn: DailyCheckIn | undefined;
  } | null>(null);

  const statusColors: Record<string, string> = {
    full: "rgba(34,197,94,0.85)",
    partial: "rgba(251,191,36,0.85)",
    missed: "rgba(100,116,139,0.4)",
    future: "rgba(100,116,139,0.15)",
  };

  return (
    <div className="card-glass p-4" data-ocid="tracking.weekly_calendar">
      <h3 className="font-display font-semibold text-sm text-foreground mb-3">
        This Week
      </h3>
      <div className="grid grid-cols-7 gap-1.5">
        {weekDays.map(({ date, label, short }) => {
          const isFuture = date > todayStr;
          const status = isFuture
            ? "future"
            : getDayStatus(checkInMap.get(date));
          const isToday = date === todayStr;

          return (
            <button
              key={date}
              type="button"
              data-ocid={`tracking.week_day.${label.toLowerCase()}`}
              onClick={() => {
                if (!isFuture)
                  setPopup({ date, checkIn: checkInMap.get(date) });
              }}
              disabled={isFuture}
              className="flex flex-col items-center gap-1 disabled:cursor-default"
            >
              <span className="text-[10px] text-muted-foreground font-medium">
                {label}
              </span>
              <motion.div
                whileHover={!isFuture ? { scale: 1.15 } : {}}
                whileTap={!isFuture ? { scale: 0.9 } : {}}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold relative"
                style={{ background: statusColors[status] }}
              >
                {short}
                {isToday && (
                  <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent" />
                )}
              </motion.div>
            </button>
          );
        })}
      </div>
      {/* Legend */}
      <div className="flex gap-3 mt-3 text-[10px] text-muted-foreground">
        {[
          { color: "rgba(34,197,94,0.85)", label: "Full" },
          { color: "rgba(251,191,36,0.85)", label: "Partial" },
          { color: "rgba(100,116,139,0.4)", label: "Missed" },
        ].map(({ color, label }) => (
          <span key={label} className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: color }}
            />
            {label}
          </span>
        ))}
      </div>

      {/* Day detail popup */}
      <AnimatePresence>
        {popup && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              style={{ background: "rgba(0,0,0,0.4)" }}
              onClick={() => setPopup(null)}
            />
            <motion.div
              key="popup"
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              className="fixed z-50 left-4 right-4 bottom-24 rounded-2xl p-5"
              style={{
                background: "rgba(20,28,50,0.95)",
                border: "1px solid rgba(255,255,255,0.12)",
                boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
              }}
              data-ocid="tracking.day_popup"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-display font-semibold text-foreground">
                  {formatDateShort(popup.date)}
                </h4>
                <button
                  type="button"
                  data-ocid="tracking.day_popup_close_button"
                  onClick={() => setPopup(null)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground transition-smooth"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <X size={14} />
                </button>
              </div>
              {popup.checkIn ? (
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <StatBadge
                    icon={popup.checkIn.workoutDone ? "✅" : "❌"}
                    label="Workout"
                    value={popup.checkIn.workoutDone ? "Done" : "Missed"}
                    color={popup.checkIn.workoutDone ? "green" : "red"}
                  />
                  <StatBadge
                    icon={popup.checkIn.dietFollowed ? "✅" : "❌"}
                    label="Diet"
                    value={popup.checkIn.dietFollowed ? "Followed" : "Missed"}
                    color={popup.checkIn.dietFollowed ? "green" : "red"}
                  />
                  <StatBadge
                    icon="💧"
                    label="Water"
                    value={`${Number(popup.checkIn.waterGlasses)} glasses`}
                    color="blue"
                  />
                  <StatBadge
                    icon="👟"
                    label="Steps"
                    value={Number(popup.checkIn.steps).toLocaleString()}
                    color="purple"
                  />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-2">
                  No check-in recorded for this day.
                </p>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

function StatBadge({
  icon,
  label,
  value,
  color,
}: { icon: string; label: string; value: string; color: string }) {
  const colorMap: Record<string, string> = {
    green: "rgba(34,197,94,0.12)",
    red: "rgba(239,68,68,0.12)",
    blue: "rgba(56,189,248,0.12)",
    purple: "rgba(168,85,247,0.12)",
  };
  return (
    <div
      className="rounded-xl p-3"
      style={{ background: colorMap[color] ?? "rgba(255,255,255,0.05)" }}
    >
      <div className="text-lg">{icon}</div>
      <div className="text-xs text-muted-foreground mt-0.5">{label}</div>
      <div className="font-semibold text-foreground text-sm mt-0.5">
        {value}
      </div>
    </div>
  );
}

function HistoryRow({
  checkIn,
  index,
}: { checkIn: DailyCheckIn; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35 }}
      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      data-ocid={`tracking.history_item.${index + 1}`}
    >
      <div className="min-w-0 flex-1">
        <div className="font-medium text-foreground text-xs">
          {formatDateShort(checkIn.date)}
        </div>
      </div>
      <span title={checkIn.workoutDone ? "Workout done" : "No workout"}>
        {checkIn.workoutDone ? "✅" : "❌"}
      </span>
      <span title={checkIn.dietFollowed ? "Diet followed" : "No diet"}>
        {checkIn.dietFollowed ? "✅" : "❌"}
      </span>
      <span className="text-xs text-muted-foreground flex items-center gap-0.5">
        💧<span>{Number(checkIn.waterGlasses)}</span>
      </span>
      <span className="text-xs text-muted-foreground flex items-center gap-0.5">
        👟<span>{Number(checkIn.steps).toLocaleString()}</span>
      </span>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TrackingPage() {
  const { backend, isFetching } = useBackend();
  const queryClient = useQueryClient();

  // ── State for today's form ──
  const [workoutDone, setWorkoutDone] = useState(false);
  const [dietFollowed, setDietFollowed] = useState(false);
  const [waterGlasses, setWaterGlasses] = useState(0);
  const [steps, setSteps] = useState<string>("");
  const [weightInput, setWeightInput] = useState<string>("");
  const [saved, setSaved] = useState(false);

  const todayStr = today();
  const displayDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  // ── Queries ──
  const { data: streakBigInt = BigInt(0) } = useQuery({
    queryKey: ["streak"],
    queryFn: async () => {
      if (!backend) return BigInt(0);
      return backend.getStreak();
    },
    enabled: !!backend && !isFetching,
  });
  const streak = Number(streakBigInt);

  const { data: checkIns = [] } = useQuery<DailyCheckIn[]>({
    queryKey: ["checkIns", 14],
    queryFn: async () => {
      if (!backend) return [];
      return backend.getCheckIns(BigInt(14));
    },
    enabled: !!backend && !isFetching,
  });

  // Pre-fill form with today's check-in if found
  useEffect(() => {
    const todayCheckIn = checkIns.find((c) => c.date === todayStr);
    if (todayCheckIn) {
      setWorkoutDone(todayCheckIn.workoutDone);
      setDietFollowed(todayCheckIn.dietFollowed);
      setWaterGlasses(Number(todayCheckIn.waterGlasses));
      setSteps(String(Number(todayCheckIn.steps)));
      setSaved(true);
    }
  }, [checkIns, todayStr]);

  // ── Mutations ──
  const saveCheckInMut = useMutation({
    mutationFn: async () => {
      if (!backend) throw new Error("Backend not ready");
      const result = await backend.saveCheckIn(
        todayStr,
        workoutDone,
        dietFollowed,
        BigInt(waterGlasses),
        BigInt(Number(steps) || 0),
      );
      if ("err" in result) throw new Error(result.err);
      return result;
    },
  });

  const logWeightMut = useMutation({
    mutationFn: async (kg: number) => {
      if (!backend) throw new Error("Backend not ready");
      const result = await backend.logWeight(todayStr, kg);
      if ("err" in result) throw new Error(result.err);
      return result;
    },
  });

  const handleSave = async () => {
    try {
      await saveCheckInMut.mutateAsync();
      if (weightInput.trim()) {
        const kg = Number.parseFloat(weightInput);
        if (!Number.isNaN(kg) && kg > 0) {
          await logWeightMut.mutateAsync(kg);
        }
      }
      await queryClient.invalidateQueries({ queryKey: ["checkIns"] });
      await queryClient.invalidateQueries({ queryKey: ["streak"] });
      await queryClient.invalidateQueries({ queryKey: ["weightHistory"] });
      setSaved(true);
      toast.success("Today's progress saved! 🎉", {
        description: "Keep up the great work!",
      });
    } catch (err) {
      toast.error("Could not save check-in", {
        description: err instanceof Error ? err.message : "Please try again.",
      });
    }
  };

  const isSaving = saveCheckInMut.isPending || logWeightMut.isPending;
  const recentHistory = checkIns.filter((c) => c.date !== todayStr).slice(0, 7);

  return (
    <div
      className="px-4 py-6 pb-28 space-y-5 max-w-lg mx-auto"
      data-ocid="tracking.page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-display font-bold">
          <span className="gradient-text">Daily Tracking</span>
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">{displayDate}</p>
      </motion.div>

      {/* 1 ─ Streak Banner */}
      <StreakBanner streak={streak} />

      {/* 2 ─ Today's Check-in */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        className="card-glass p-5 space-y-3"
        data-ocid="tracking.checkin_card"
      >
        <div className="flex items-center justify-between mb-1">
          <h2 className="font-display font-semibold text-foreground">
            Today's Check-In
          </h2>
          {saved && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-xs font-medium px-2 py-0.5 rounded-full"
              style={{ background: "rgba(34,197,94,0.2)", color: "#22c55e" }}
            >
              ✓ Saved
            </motion.span>
          )}
        </div>

        <ToggleRow
          id="workout-toggle"
          emoji="💪"
          label="Workout Completed"
          checked={workoutDone}
          onChange={() => setWorkoutDone((v) => !v)}
          ocid="tracking.workout_toggle"
        />
        <ToggleRow
          id="diet-toggle"
          emoji="🥗"
          label="Diet Followed"
          checked={dietFollowed}
          onChange={() => setDietFollowed((v) => !v)}
          ocid="tracking.diet_toggle"
        />

        {/* Steps input */}
        <div
          className="flex items-center gap-3 p-4 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <span className="text-xl">👟</span>
          <div className="flex-1 min-w-0">
            <label
              htmlFor="steps-input"
              className="text-sm font-medium text-foreground block mb-1"
            >
              Steps Today
            </label>
            <input
              id="steps-input"
              type="number"
              data-ocid="tracking.steps_input"
              placeholder="e.g. 8000"
              min={0}
              value={steps}
              onChange={(e) => setSteps(e.target.value)}
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none"
            />
          </div>
          {steps && Number(steps) > 0 && (
            <span className="text-xs font-mono text-accent">
              {Number(steps).toLocaleString()}
            </span>
          )}
        </div>

        {/* Weight log */}
        <div
          className="flex items-center gap-3 p-4 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
          data-ocid="tracking.weight_log_card"
        >
          <Scale size={20} className="text-accent flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <label
              htmlFor="weight-input"
              className="text-sm font-medium text-foreground block mb-1"
            >
              Log Weight (kg)
            </label>
            <input
              id="weight-input"
              type="number"
              data-ocid="tracking.weight_input"
              placeholder="e.g. 72.5"
              min={0}
              step={0.1}
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              className="w-full bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none"
            />
          </div>
        </div>
      </motion.div>

      {/* 2b ─ Water Tracker */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18 }}
      >
        <WaterTracker glasses={waterGlasses} setGlasses={setWaterGlasses} />
      </motion.div>

      {/* Save Button */}
      <motion.button
        type="button"
        data-ocid="tracking.save_button"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        whileHover={{ scale: 1.015 }}
        whileTap={{ scale: 0.97 }}
        onClick={handleSave}
        disabled={isSaving}
        className="w-full py-4 rounded-2xl font-display font-bold text-base transition-smooth disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #22c55e 0%, #38bdf8 100%)",
          color: "#0f172a",
          boxShadow: "0 4px 24px rgba(34,197,94,0.30)",
        }}
      >
        {isSaving ? (
          <span className="flex items-center justify-center gap-2">
            <motion.span
              animate={{ rotate: 360 }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 0.8,
                ease: "linear",
              }}
              className="inline-block w-4 h-4 rounded-full border-2 border-current border-t-transparent"
            />
            Saving...
          </span>
        ) : (
          "Save Today's Progress 🎯"
        )}
      </motion.button>

      {/* 3 ─ Weekly Mini Calendar */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
      >
        <WeeklyMiniCalendar checkIns={checkIns} />
      </motion.div>

      {/* 4 ─ Check-in History */}
      {recentHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.34 }}
          className="card-glass p-4"
          data-ocid="tracking.history_list"
        >
          <h3 className="font-display font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
            <span>📅</span> Recent History
          </h3>
          {/* Column headers */}
          <div className="flex items-center gap-3 px-4 py-1 text-[10px] text-muted-foreground mb-1">
            <span className="flex-1">Date</span>
            <span title="Workout">💪</span>
            <span title="Diet">🥗</span>
            <span title="Water">💧</span>
            <span title="Steps">👟</span>
          </div>
          <div className="space-y-2">
            {recentHistory.map((checkIn, i) => (
              <HistoryRow key={checkIn.date} checkIn={checkIn} index={i} />
            ))}
          </div>
        </motion.div>
      )}

      {recentHistory.length === 0 && checkIns.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="card-glass p-6 text-center"
          data-ocid="tracking.history_empty_state"
        >
          <div className="text-4xl mb-2">📊</div>
          <p className="font-display font-semibold text-foreground text-sm">
            No history yet
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Your check-ins will appear here after you save today's progress.
          </p>
        </motion.div>
      )}
    </div>
  );
}
