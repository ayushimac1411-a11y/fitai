import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import {
  Activity,
  BarChart3,
  ChevronRight,
  Droplets,
  Dumbbell,
  Flame,
  Scale,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipProps } from "recharts";
import type { DailyCheckIn, WeightEntry } from "../backend.d";
import { useBackend } from "../hooks/useBackend";
import { calculateBMI, getBMIColor } from "../lib/bmi";
import { useStore } from "../store/useStore";

// ─── helpers ────────────────────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
  });
}

// days Mon–Sun for weekly bar chart
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
function buildWeekChart(checkIns: DailyCheckIn[]) {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  return WEEKDAYS.map((d, i) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + i);
    const iso = date.toISOString().split("T")[0];
    const found = checkIns.find((c) => c.date === iso);
    return { day: d, done: found?.workoutDone ? 1 : 0, future: date > today };
  });
}

// ─── custom tooltip ──────────────────────────────────────────────────────────
function DarkTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "rgba(15,23,42,0.92)",
        border: "1px solid rgba(255,255,255,0.12)",
      }}
      className="rounded-lg px-3 py-2 text-xs shadow-lg"
    >
      <p className="text-muted-foreground mb-0.5">{label}</p>
      {payload.map((p) => (
        <p
          key={p.name}
          style={{ color: p.color ?? "#22C55E" }}
          className="font-semibold"
        >
          {p.value} {p.name === "weight" ? "kg" : ""}
        </p>
      ))}
    </div>
  );
}

// ─── stat card ────────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  sub?: string;
  delay: number;
  ocid: string;
  glow?: string;
}
function StatCard({
  icon,
  label,
  value,
  sub,
  delay,
  ocid,
  glow,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      data-ocid={ocid}
      className="card-glass p-4 flex flex-col gap-2"
      style={glow ? { boxShadow: `0 0 20px ${glow}` } : undefined}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          {label}
        </span>
        {icon}
      </div>
      <div className="text-2xl font-display font-bold text-foreground leading-none">
        {value}
      </div>
      {sub && <div className="text-xs text-muted-foreground">{sub}</div>}
    </motion.div>
  );
}

// ─── section wrapper ─────────────────────────────────────────────────────────
function Section({
  title,
  icon,
  children,
  delay,
  ocid,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  delay: number;
  ocid: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      data-ocid={ocid}
      className="card-glass p-5"
    >
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="font-display font-semibold text-sm text-foreground">
          {title}
        </h2>
      </div>
      {children}
    </motion.div>
  );
}

// ─── skeleton card ────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="card-glass p-4 space-y-3">
      <Skeleton className="h-3 w-24 bg-white/5" />
      <Skeleton className="h-7 w-16 bg-white/5" />
      <Skeleton className="h-2 w-20 bg-white/5" />
    </div>
  );
}

// ─── empty state ─────────────────────────────────────────────────────────────
function EmptyState({
  message,
  cta,
  onCta,
}: { message: string; cta: string; onCta: () => void }) {
  return (
    <div className="text-center py-8 space-y-3">
      <Activity
        size={32}
        className="mx-auto text-muted-foreground opacity-40"
      />
      <p className="text-sm text-muted-foreground">{message}</p>
      <Button
        variant="outline"
        size="sm"
        onClick={onCta}
        className="border-accent/30 text-accent hover:bg-accent/10"
      >
        {cta}
      </Button>
    </div>
  );
}

// ─── BMI scale bar ────────────────────────────────────────────────────────────
function BMIScaleBar({ bmi }: { bmi: number }) {
  const zones = [
    { label: "Under", range: [10, 18.5], color: "#38BDF8" },
    { label: "Normal", range: [18.5, 25], color: "#22C55E" },
    { label: "Over", range: [25, 30], color: "#FBBF24" },
    { label: "Obese", range: [30, 40], color: "#EF4444" },
  ];
  const pct = Math.max(0, Math.min(100, ((bmi - 10) / 30) * 100));
  return (
    <div className="mt-4 space-y-1.5">
      <div className="relative h-3 rounded-full overflow-hidden flex">
        {zones.map((z) => {
          const w = ((z.range[1] - z.range[0]) / 30) * 100;
          return (
            <div
              key={z.label}
              style={{ width: `${w}%`, background: z.color }}
              className="opacity-60"
            />
          );
        })}
        <div
          className="absolute top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-lg border-2 border-foreground/20"
          style={{ left: `calc(${pct}% - 7px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground px-0.5">
        {zones.map((z) => (
          <span key={z.label} style={{ color: z.color }}>
            {z.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── macro pie colors ─────────────────────────────────────────────────────────
const MACRO_COLORS = ["#22C55E", "#38BDF8", "#A78BFA"];
const MACRO_DATA = [
  { name: "Carbs", value: 40 },
  { name: "Protein", value: 30 },
  { name: "Fat", value: 30 },
];

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { backend, isFetching } = useBackend();
  const { userProfile, setActiveTab } = useStore();

  const enabled = !!backend && !isFetching;

  const profileQuery = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!backend) return null;
      return backend.getProfile();
    },
    enabled,
  });

  const weightQuery = useQuery({
    queryKey: ["weightHistory", 14],
    queryFn: async () => {
      if (!backend) return [] as WeightEntry[];
      return backend.getWeightHistory(BigInt(14));
    },
    enabled,
  });

  const checkInsQuery = useQuery({
    queryKey: ["checkIns", 7],
    queryFn: async () => {
      if (!backend) return [] as DailyCheckIn[];
      return backend.getCheckIns(BigInt(7));
    },
    enabled,
  });

  const streakQuery = useQuery({
    queryKey: ["streak"],
    queryFn: async () => {
      if (!backend) return BigInt(0);
      return backend.getStreak();
    },
    enabled,
  });

  // derive data
  const profile = profileQuery.data ?? null;
  const displayName = profile?.name ?? userProfile?.fullName ?? "Athlete";
  const firstName = displayName.split(" ")[0];

  const weightEntries = (weightQuery.data ?? []) as WeightEntry[];
  const checkIns = (checkInsQuery.data ?? []) as DailyCheckIn[];
  const streak = Number(streakQuery.data ?? 0);

  const latestWeight = weightEntries[0]?.weightKg ?? profile?.weightKg ?? null;
  const heightCm = profile?.heightCm ?? userProfile?.heightCm ?? 0;
  const bmi =
    latestWeight && heightCm ? calculateBMI(latestWeight, heightCm) : null;

  const workoutsThisWeek = checkIns.filter((c) => c.workoutDone).length;

  const weightChartData = [...weightEntries]
    .reverse()
    .map((e) => ({ date: fmtDate(e.date), weight: e.weightKg }));

  const weekChartData = buildWeekChart(checkIns);

  const isLoading = isFetching || profileQuery.isLoading;
  const hasNoData = !isLoading && !profile && weightEntries.length === 0;

  // ── quick actions ──
  const quickActions = [
    {
      label: "Log Today",
      icon: <Target size={15} />,
      tab: "tracking" as const,
      ocid: "dashboard.log_today_button",
    },
    {
      label: "AI Plan",
      icon: <Zap size={15} />,
      tab: "ai-plans" as const,
      ocid: "dashboard.ai_plan_button",
    },
    {
      label: "Exercises",
      icon: <Dumbbell size={15} />,
      tab: "exercises" as const,
      ocid: "dashboard.exercises_button",
    },
  ];

  return (
    <div className="px-4 py-6 space-y-5 pb-28" data-ocid="dashboard.page">
      {/* ── Welcome ─────────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        data-ocid="dashboard.welcome"
      >
        <h1 className="text-2xl font-display font-bold text-foreground leading-tight">
          {getGreeting()}, <span className="gradient-text">{firstName}</span>!
        </h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </motion.div>

      {/* ── Stat cards 2×2 / 4×1 ────────────────────────────────────────── */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : (
        <div
          className="grid grid-cols-2 gap-3"
          data-ocid="dashboard.stat_cards"
        >
          <StatCard
            icon={<Scale size={16} className="text-secondary" />}
            label="Weight"
            value={latestWeight ? `${latestWeight} kg` : "—"}
            sub={latestWeight ? "Latest entry" : "No data yet"}
            delay={0.08}
            ocid="dashboard.weight_card"
            glow="rgba(56,189,248,0.12)"
          />
          <StatCard
            icon={
              <Activity
                size={16}
                className={
                  bmi ? getBMIColor(bmi.category) : "text-muted-foreground"
                }
              />
            }
            label="BMI"
            value={
              bmi ? (
                <span className={getBMIColor(bmi.category)}>{bmi.value}</span>
              ) : (
                "—"
              )
            }
            sub={bmi?.category ?? "Set profile first"}
            delay={0.14}
            ocid="dashboard.bmi_stat_card"
          />
          <StatCard
            icon={<Dumbbell size={16} className="text-accent" />}
            label="Workouts"
            value={workoutsThisWeek}
            sub="This week"
            delay={0.2}
            ocid="dashboard.workouts_card"
            glow="rgba(34,197,94,0.1)"
          />
          <StatCard
            icon={<Flame size={16} className="text-orange-400" />}
            label="Streak"
            value={streak > 0 ? `${streak} 🔥` : streak}
            sub={streak > 0 ? "Keep it going!" : "Start today"}
            delay={0.26}
            ocid="dashboard.streak_card"
            glow={streak > 0 ? "rgba(251,146,60,0.12)" : undefined}
          />
        </div>
      )}

      {/* ── Quick actions ─────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        className="flex gap-2"
        data-ocid="dashboard.quick_actions"
      >
        {quickActions.map(({ label, icon, tab, ocid }) => (
          <button
            type="button"
            key={tab}
            data-ocid={ocid}
            onClick={() => setActiveTab(tab)}
            className="flex-1 card-glass py-2.5 px-2 flex flex-col items-center gap-1.5 transition-smooth hover:bg-white/5 active:scale-95"
          >
            <span className="text-accent">{icon}</span>
            <span className="text-[11px] font-medium text-muted-foreground">
              {label}
            </span>
          </button>
        ))}
      </motion.div>

      {/* ── BMI Card ──────────────────────────────────────────────────────── */}
      {!isLoading && (
        <Section
          title="BMI Overview"
          icon={<Scale size={16} className="text-accent" />}
          delay={0.34}
          ocid="dashboard.bmi_card"
        >
          {bmi ? (
            <div>
              <div className="flex items-end gap-3 mb-1">
                <span
                  className={`text-5xl font-display font-black leading-none ${getBMIColor(bmi.category)}`}
                >
                  {bmi.value}
                </span>
                <div className="pb-1 space-y-0.5">
                  <Badge
                    variant="secondary"
                    className={`text-xs font-semibold ${getBMIColor(bmi.category)} bg-white/5 border-white/10`}
                  >
                    {bmi.category}
                  </Badge>
                  <p className="text-[11px] text-muted-foreground">
                    {heightCm} cm · {latestWeight} kg
                  </p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {bmi.message}
              </p>
              <BMIScaleBar bmi={bmi.value} />
            </div>
          ) : (
            <EmptyState
              message="Complete your profile to see your BMI"
              cta="Set Up Profile"
              onCta={() => setActiveTab("tracking")}
            />
          )}
        </Section>
      )}
      {isLoading && (
        <div
          className="card-glass p-5 space-y-3"
          data-ocid="dashboard.bmi_card.loading_state"
        >
          <Skeleton className="h-3 w-28 bg-white/5" />
          <Skeleton className="h-12 w-24 bg-white/5" />
          <Skeleton className="h-3 w-full bg-white/5" />
          <Skeleton className="h-3 w-3/4 bg-white/5" />
          <Skeleton className="h-4 w-full rounded-full bg-white/5" />
        </div>
      )}

      {/* ── Weight Trend (Line Chart) ─────────────────────────────────────── */}
      <Section
        title="Weight Trend"
        icon={<TrendingUp size={16} className="text-secondary" />}
        delay={0.4}
        ocid="dashboard.weight_chart"
      >
        {weightChartData.length > 1 ? (
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart
              data={weightChartData}
              margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="weightGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="rgba(255,255,255,0.06)"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tick={{ fontSize: 10, fill: "rgba(255,255,255,0.4)" }}
                tickLine={false}
                axisLine={false}
                domain={["dataMin - 2", "dataMax + 2"]}
              />
              <Tooltip content={<DarkTooltip />} />
              <Area
                type="monotone"
                dataKey="weight"
                stroke="#22C55E"
                strokeWidth={2.5}
                fill="url(#weightGrad)"
                dot={{ fill: "#22C55E", r: 3, strokeWidth: 0 }}
                activeDot={{
                  r: 5,
                  fill: "#22C55E",
                  stroke: "rgba(34,197,94,0.4)",
                  strokeWidth: 4,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        ) : (
          <EmptyState
            message="Log at least 2 weight entries to see your trend"
            cta="Log Weight"
            onCta={() => setActiveTab("tracking")}
          />
        )}
      </Section>

      {/* ── Weekly Workout (Bar Chart) ────────────────────────────────────── */}
      <Section
        title="This Week's Workouts"
        icon={<BarChart3 size={16} className="text-accent" />}
        delay={0.46}
        ocid="dashboard.workout_chart"
      >
        <ResponsiveContainer width="100%" height={140}>
          <BarChart
            data={weekChartData}
            margin={{ top: 4, right: 4, left: -24, bottom: 0 }}
            barSize={20}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />
            <XAxis
              dataKey="day"
              tick={{ fontSize: 11, fill: "rgba(255,255,255,0.45)" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis hide domain={[0, 1]} />
            <Tooltip content={<DarkTooltip />} />
            <Bar dataKey="done" radius={[6, 6, 0, 0]}>
              {weekChartData.map((entry) => (
                <Cell
                  key={`cell-${entry.day}`}
                  fill={entry.done ? "#22C55E" : "rgba(255,255,255,0.06)"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <div className="w-2.5 h-2.5 rounded-sm bg-accent" />
          <span>Completed</span>
          <div className="w-2.5 h-2.5 rounded-sm bg-white/10 ml-3" />
          <span>Missed / Upcoming</span>
        </div>
      </Section>

      {/* ── Macro Split (Pie Chart) ───────────────────────────────────────── */}
      <Section
        title="Macro Split"
        icon={<Droplets size={16} className="text-purple-400" />}
        delay={0.52}
        ocid="dashboard.macro_chart"
      >
        <div className="flex items-center gap-4">
          <ResponsiveContainer width={130} height={130}>
            <PieChart>
              <Pie
                data={MACRO_DATA}
                cx="50%"
                cy="50%"
                innerRadius={36}
                outerRadius={56}
                paddingAngle={3}
                dataKey="value"
              >
                {MACRO_DATA.map((m) => (
                  <Cell
                    key={`macro-${m.name}`}
                    fill={MACRO_COLORS[MACRO_DATA.indexOf(m)]}
                  />
                ))}
              </Pie>
              <Tooltip content={<DarkTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex-1 space-y-2">
            {MACRO_DATA.map((m, i) => (
              <div key={m.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ background: MACRO_COLORS[i] }}
                  />
                  <span className="text-xs text-muted-foreground">
                    {m.name}
                  </span>
                </div>
                <span className="text-xs font-semibold text-foreground">
                  {m.value}%
                </span>
              </div>
            ))}
            <p className="text-[10px] text-muted-foreground pt-1 leading-relaxed">
              Based on your fitness goal. Adjust in your AI plan.
            </p>
          </div>
        </div>
      </Section>

      {/* ── Daily checklist ──────────────────────────────────────────────── */}
      <Section
        title="Today's Focus"
        icon={<Target size={16} className="text-accent" />}
        delay={0.56}
        ocid="dashboard.focus_card"
      >
        <div className="space-y-2.5">
          {[
            {
              label: "Complete your workout session",
              icon: <Dumbbell size={13} />,
            },
            { label: "Follow your meal plan", icon: <Activity size={13} /> },
            { label: "Drink 8 glasses of water", icon: <Droplets size={13} /> },
            { label: "Log your progress", icon: <TrendingUp size={13} /> },
          ].map((item, i) => (
            <div
              key={item.label}
              className="flex items-center gap-3 text-sm text-muted-foreground"
              data-ocid={`dashboard.focus_item.${i + 1}`}
            >
              <div className="w-6 h-6 rounded-full border border-accent/30 flex items-center justify-center flex-shrink-0 text-accent">
                {item.icon}
              </div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <button
          type="button"
          data-ocid="dashboard.log_today_primary_button"
          onClick={() => setActiveTab("tracking")}
          className="mt-4 w-full card-glass py-2.5 flex items-center justify-center gap-2 text-sm font-semibold text-accent border border-accent/25 hover:bg-accent/10 transition-smooth rounded-xl active:scale-[0.98]"
        >
          Log Today's Check-In
          <ChevronRight size={15} />
        </button>
      </Section>

      {/* ── Empty state (no profile at all) ──────────────────────────────── */}
      {hasNoData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="card-glass p-6 text-center space-y-3"
          data-ocid="dashboard.empty_state"
        >
          <div className="text-4xl">💪</div>
          <h3 className="font-display font-semibold text-foreground">
            Ready to start?
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs mx-auto">
            Set up your profile to unlock your personalised BMI, AI plans, and
            progress tracking.
          </p>
          <Button
            data-ocid="dashboard.setup_profile_button"
            onClick={() => setActiveTab("tracking")}
            className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold"
          >
            Complete Your Profile
          </Button>
        </motion.div>
      )}
    </div>
  );
}
