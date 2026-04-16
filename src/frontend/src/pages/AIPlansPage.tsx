import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  Clock,
  Dumbbell,
  RefreshCw,
  Sparkles,
  UserCircle2,
  UtensilsCrossed,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { AIPlan as BackendAIPlan } from "../backend.d.ts";
import { useBackend } from "../hooks/useBackend";

// ─── Types ───────────────────────────────────────────────────────────────────
type Tab = "diet" | "workout";

interface DayMeal {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
}

interface DietDay {
  day: string;
  meals: DayMeal;
}

interface WorkoutExercise {
  text: string;
}

interface WorkoutDay {
  day: string;
  isRest: boolean;
  exercises: WorkoutExercise[];
}

// ─── Parsers ─────────────────────────────────────────────────────────────────
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function parseDietPlan(raw: string): DietDay[] | null {
  try {
    const days: DietDay[] = [];
    // Try splitting by day headers like "**Monday**" or "Day 1" or "Monday:"
    const dayRegex =
      /(?:^|\n)\s*(?:\*\*)?(?:Day\s*\d+\s*[-:]?\s*)?(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)(?:\*\*)?\s*[-:]?/gi;
    const parts = raw.split(dayRegex);

    // parts[0] is preamble, then alternates: dayName, content, dayName, content...
    const matched: Array<{ day: string; content: string }> = [];
    for (let i = 1; i < parts.length; i += 2) {
      const dayName = parts[i]?.trim();
      const content = parts[i + 1]?.trim() ?? "";
      if (
        dayName &&
        DAYS.some((d) => d.toLowerCase() === dayName.toLowerCase())
      ) {
        matched.push({ day: dayName, content });
      }
    }

    if (matched.length < 3) {
      // Fallback: try numbered days
      const numberedRegex =
        /(?:^|\n)\s*(?:\*\*)?Day\s*(\d+)(?:\*\*)?\s*[-:]?/gi;
      const numParts = raw.split(numberedRegex);
      for (let i = 1; i < numParts.length; i += 2) {
        const idx = Number.parseInt(numParts[i]) - 1;
        const content = numParts[i + 1]?.trim() ?? "";
        if (!Number.isNaN(idx) && idx < 7) {
          matched[idx] = { day: DAYS[idx], content };
        }
      }
    }

    for (const { day, content } of matched) {
      const extract = (label: string): string => {
        const re = new RegExp(
          `(?:${label})[:\\s*-]+([^\\n]+(?:\\n(?!(?:Breakfast|Lunch|Dinner|Snack))[^\\n]+)*)`,
          "i",
        );
        const m = content.match(re);
        return m
          ? m[1].replace(/\*+/g, "").trim().split("\n")[0].trim()
          : "See plan below";
      };
      days.push({
        day,
        meals: {
          breakfast: extract("Breakfast"),
          lunch: extract("Lunch"),
          dinner: extract("Dinner"),
          snacks: extract("Snacks?"),
        },
      });
    }

    return days.length >= 3 ? days : null;
  } catch {
    return null;
  }
}

function parseWorkoutPlan(raw: string): WorkoutDay[] | null {
  try {
    const days: WorkoutDay[] = [];
    const dayRegex =
      /(?:^|\n)\s*(?:\*\*)?(?:Day\s*\d+\s*[-:]?\s*)?(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)(?:\*\*)?\s*[-:]?/gi;
    const parts = raw.split(dayRegex);

    const matched: Array<{ day: string; content: string }> = [];
    for (let i = 1; i < parts.length; i += 2) {
      const dayName = parts[i]?.trim();
      const content = parts[i + 1]?.trim() ?? "";
      if (
        dayName &&
        DAYS.some((d) => d.toLowerCase() === dayName.toLowerCase())
      ) {
        matched.push({ day: dayName, content });
      }
    }

    if (matched.length < 3) {
      const numberedRegex =
        /(?:^|\n)\s*(?:\*\*)?Day\s*(\d+)(?:\*\*)?\s*[-:]?/gi;
      const numParts = raw.split(numberedRegex);
      for (let i = 1; i < numParts.length; i += 2) {
        const idx = Number.parseInt(numParts[i]) - 1;
        const content = numParts[i + 1]?.trim() ?? "";
        if (!Number.isNaN(idx) && idx < 7) {
          matched[idx] = { day: DAYS[idx], content };
        }
      }
    }

    for (const { day, content } of matched) {
      const isRest = /rest|recovery|off\s*day/i.test(content.substring(0, 80));
      const exerciseLines = content
        .split("\n")
        .map((l) =>
          l
            .replace(/^[\s\-\*•]+/, "")
            .replace(/\*+/g, "")
            .trim(),
        )
        .filter(
          (l) =>
            l.length > 3 &&
            !/^(day|monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i.test(
              l,
            ),
        );
      days.push({
        day,
        isRest,
        exercises: exerciseLines.slice(0, 8).map((t) => ({ text: t })),
      });
    }

    return days.length >= 3 ? days : null;
  } catch {
    return null;
  }
}

function formatTimestamp(nanos: bigint): string {
  try {
    const ms = Number(nanos / BigInt(1_000_000));
    return new Date(ms).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Recently";
  }
}

// ─── Sub-components ───────────────────────────────────────────────────────────
const MEAL_META = {
  breakfast: { icon: "☀️", label: "Breakfast", color: "text-amber-400" },
  lunch: { icon: "🌞", label: "Lunch", color: "text-yellow-400" },
  dinner: { icon: "🌙", label: "Dinner", color: "text-indigo-400" },
  snacks: { icon: "🍎", label: "Snacks", color: "text-accent" },
} as const;

function DietDayCard({ item, index }: { item: DietDay; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="card-glass p-4 min-w-[260px] snap-start flex-shrink-0 md:min-w-0"
      data-ocid={`ai_plans.diet_day.${index + 1}`}
    >
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
        <span className="text-xs font-mono font-bold text-accent uppercase tracking-widest">
          {item.day.slice(0, 3)}
        </span>
        <span className="text-xs text-muted-foreground">{item.day}</span>
      </div>
      <div className="space-y-2.5">
        {(Object.keys(MEAL_META) as Array<keyof typeof MEAL_META>).map(
          (key) => {
            const meta = MEAL_META[key];
            return (
              <div key={key} className="flex gap-2 items-start">
                <span className="text-base leading-tight mt-0.5">
                  {meta.icon}
                </span>
                <div className="min-w-0">
                  <p
                    className={`text-[10px] font-semibold uppercase tracking-wider ${meta.color}`}
                  >
                    {meta.label}
                  </p>
                  <p className="text-xs text-foreground leading-snug break-words line-clamp-2">
                    {item.meals[key]}
                  </p>
                </div>
              </div>
            );
          },
        )}
      </div>
    </motion.div>
  );
}

function WorkoutDayCard({ item, index }: { item: WorkoutDay; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`card-glass p-4 min-w-[240px] snap-start flex-shrink-0 md:min-w-0 ${
        item.isRest ? "opacity-60" : ""
      }`}
      data-ocid={`ai_plans.workout_day.${index + 1}`}
    >
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-white/10">
        <span className="text-xs font-mono font-bold text-secondary uppercase tracking-widest">
          {item.day.slice(0, 3)}
        </span>
        {item.isRest ? (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium">
            REST DAY
          </span>
        ) : (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary/20 text-secondary font-medium">
            TRAIN
          </span>
        )}
      </div>
      {item.isRest ? (
        <p className="text-xs text-muted-foreground text-center py-4">
          Recovery & rest — let your muscles grow 💪
        </p>
      ) : (
        <ul className="space-y-1.5">
          {item.exercises.map((ex, i) => (
            <li
              key={ex.text.slice(0, 30) + String(i)}
              className="flex gap-2 items-start text-xs text-foreground"
            >
              <span className="text-secondary mt-0.5 shrink-0">•</span>
              <span className="break-words line-clamp-2">{ex.text}</span>
            </li>
          ))}
          {item.exercises.length === 0 && (
            <li className="text-xs text-muted-foreground">
              See full plan above
            </li>
          )}
        </ul>
      )}
    </motion.div>
  );
}

function LoadingDots({ label }: { label: string }) {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-accent"
            animate={{ y: [0, -10, 0] }}
            transition={{
              duration: 0.7,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 0.15,
            }}
          />
        ))}
      </div>
      <p className="text-sm text-muted-foreground animate-pulse">{label}</p>
    </div>
  );
}

function RawPlanFallback({ content }: { content: string }) {
  return (
    <div className="card-glass p-4 max-h-[60vh] overflow-y-auto">
      <pre className="text-xs text-foreground/80 whitespace-pre-wrap font-mono leading-relaxed">
        {content}
      </pre>
    </div>
  );
}

function NoProfileCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="card-glass p-8 text-center mx-auto max-w-sm"
      data-ocid="ai_plans.no_profile_state"
    >
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
        <UserCircle2 size={32} className="text-accent" />
      </div>
      <h3 className="font-display font-bold text-foreground text-lg mb-2">
        Complete Your Profile First
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        We need your fitness details to generate a personalized plan for you.
      </p>
      <button
        type="button"
        data-ocid="ai_plans.go_to_profile_button"
        onClick={() => {
          const event = new CustomEvent("navigate", { detail: "profile" });
          window.dispatchEvent(event);
        }}
        className="w-full py-3 rounded-xl bg-accent text-black font-semibold text-sm hover:bg-accent/90 transition-smooth"
      >
        Set Up Profile
      </button>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AIPlansPage() {
  const [activeTab, setActiveTab] = useState<Tab>("diet");
  const { backend, isFetching } = useBackend();
  const queryClient = useQueryClient();

  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!backend) return null;
      return backend.getProfile();
    },
    enabled: !!backend && !isFetching,
    staleTime: 0, // always refetch when invalidated
  });

  const { data: dietPlan, isLoading: loadingDiet } = useQuery({
    queryKey: ["ai-plan", "diet"],
    queryFn: async () => {
      if (!backend) return null;
      return backend.getAIPlan("diet");
    },
    enabled: !!backend && !isFetching,
  });

  const { data: workoutPlan, isLoading: loadingWorkout } = useQuery({
    queryKey: ["ai-plan", "workout"],
    queryFn: async () => {
      if (!backend) return null;
      return backend.getAIPlan("workout");
    },
    enabled: !!backend && !isFetching,
  });

  const [dietError, setDietError] = useState<string | null>(null);
  const [workoutError, setWorkoutError] = useState<string | null>(null);

  const generateDiet = useMutation({
    mutationFn: async () => {
      if (!backend) throw new Error("Not connected");
      setDietError(null);
      const result = await backend.generateDietPlan();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["ai-plan", "diet"] });
    },
    onError: (e: Error) => {
      setDietError(
        e.message.includes("Gemini") || e.message.includes("API")
          ? "AI generation failed. Please check your Gemini API key."
          : e.message || "Generation failed. Please try again.",
      );
    },
  });

  const generateWorkout = useMutation({
    mutationFn: async () => {
      if (!backend) throw new Error("Not connected");
      setWorkoutError(null);
      const result = await backend.generateWorkoutPlan();
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["ai-plan", "workout"] });
    },
    onError: (e: Error) => {
      setWorkoutError(
        e.message.includes("Gemini") || e.message.includes("API")
          ? "AI generation failed. Please check your Gemini API key."
          : e.message || "Generation failed. Please try again.",
      );
    },
  });

  const parsedDiet = dietPlan?.content ? parseDietPlan(dietPlan.content) : null;
  const parsedWorkout = workoutPlan?.content
    ? parseWorkoutPlan(workoutPlan.content)
    : null;

  // Only show "no profile" state when the query has completed and returned null/undefined.
  // Use == null (loose) to catch both null (backend explicit) and undefined (query not yet resolved).
  const noProfile = !isFetching && !profileLoading && profile == null;

  return (
    <div className="px-4 py-6 space-y-6 pb-24" data-ocid="ai_plans.page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-center gap-2">
          <Sparkles size={22} className="text-accent" />
          <h1 className="text-2xl font-display font-bold">
            <span className="gradient-text">AI Plans</span>
          </h1>
        </div>
        <p className="text-sm text-muted-foreground mt-1 ml-8">
          Personalized for you — powered by Google Gemini
        </p>
      </motion.div>

      {/* No profile guard */}
      {noProfile ? (
        <NoProfileCard />
      ) : (
        <>
          {/* Tab Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="relative flex gap-1 p-1 glass rounded-xl"
            data-ocid="ai_plans.tab_switcher"
          >
            {(["diet", "workout"] as Tab[]).map((tab) => (
              <button
                key={tab}
                type="button"
                data-ocid={`ai_plans.${tab}_tab`}
                onClick={() => setActiveTab(tab)}
                className={`relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-smooth z-10 ${
                  activeTab === tab
                    ? "text-black"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-bg"
                    className={`absolute inset-0 rounded-lg ${tab === "diet" ? "bg-accent" : "bg-secondary"}`}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-1.5">
                  {tab === "diet" ? (
                    <UtensilsCrossed size={15} />
                  ) : (
                    <Dumbbell size={15} />
                  )}
                  {tab === "diet" ? "Diet Plan" : "Workout Plan"}
                </span>
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === "diet" ? (
              <motion.div
                key="diet"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 16 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
                data-ocid="ai_plans.diet_panel"
              >
                {/* Generate Button */}
                <div className="flex items-center justify-between">
                  <div>
                    {dietPlan && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock size={12} />
                        <span>
                          Generated {formatTimestamp(dietPlan.generatedAt)}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    data-ocid={
                      dietPlan
                        ? "ai_plans.regenerate_diet_button"
                        : "ai_plans.generate_diet_button"
                    }
                    disabled={generateDiet.isPending || loadingDiet}
                    onClick={() => generateDiet.mutate()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-black text-sm font-bold hover:shadow-lg hover:shadow-accent/25 transition-smooth disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {dietPlan ? (
                      <RefreshCw
                        size={14}
                        className={generateDiet.isPending ? "animate-spin" : ""}
                      />
                    ) : (
                      <Sparkles size={14} />
                    )}
                    {dietPlan ? "Regenerate" : "Generate My Diet Plan ✨"}
                  </button>
                </div>

                {/* Error */}
                {dietError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 p-3 rounded-xl bg-destructive/15 border border-destructive/30"
                    data-ocid="ai_plans.diet_error_state"
                  >
                    <AlertCircle
                      size={16}
                      className="text-destructive shrink-0 mt-0.5"
                    />
                    <p className="text-xs text-destructive">{dietError}</p>
                  </motion.div>
                )}

                {/* Loading */}
                {generateDiet.isPending && (
                  <LoadingDots label="Generating your personalized Indian diet plan..." />
                )}

                {/* Plan Display */}
                {!generateDiet.isPending && dietPlan && parsedDiet && (
                  <div
                    className="flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-4 lg:grid-cols-7 md:overflow-visible"
                    data-ocid="ai_plans.diet_list"
                  >
                    {parsedDiet.map((day, i) => (
                      <DietDayCard key={day.day} item={day} index={i} />
                    ))}
                  </div>
                )}
                {!generateDiet.isPending && dietPlan && !parsedDiet && (
                  <RawPlanFallback content={dietPlan.content} />
                )}

                {/* Empty state */}
                {!generateDiet.isPending && !dietPlan && !loadingDiet && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="card-glass p-10 text-center"
                    data-ocid="ai_plans.diet_empty_state"
                  >
                    <UtensilsCrossed
                      size={40}
                      className="mx-auto mb-3 text-accent/30"
                    />
                    <p className="font-display font-semibold text-foreground mb-1">
                      No Diet Plan Yet
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Click "Generate My Diet Plan ✨" to get your personalized
                      weekly Indian diet plan.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="workout"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
                data-ocid="ai_plans.workout_panel"
              >
                {/* Generate Button */}
                <div className="flex items-center justify-between">
                  <div>
                    {workoutPlan && (
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Clock size={12} />
                        <span>
                          Generated {formatTimestamp(workoutPlan.generatedAt)}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    type="button"
                    data-ocid={
                      workoutPlan
                        ? "ai_plans.regenerate_workout_button"
                        : "ai_plans.generate_workout_button"
                    }
                    disabled={generateWorkout.isPending || loadingWorkout}
                    onClick={() => generateWorkout.mutate()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-secondary to-secondary/80 text-black text-sm font-bold hover:shadow-lg hover:shadow-secondary/25 transition-smooth disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {workoutPlan ? (
                      <RefreshCw
                        size={14}
                        className={
                          generateWorkout.isPending ? "animate-spin" : ""
                        }
                      />
                    ) : (
                      <Dumbbell size={14} />
                    )}
                    {workoutPlan ? "Regenerate" : "Generate My Workout Plan 💪"}
                  </button>
                </div>

                {/* Error */}
                {workoutError && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2 p-3 rounded-xl bg-destructive/15 border border-destructive/30"
                    data-ocid="ai_plans.workout_error_state"
                  >
                    <AlertCircle
                      size={16}
                      className="text-destructive shrink-0 mt-0.5"
                    />
                    <p className="text-xs text-destructive">{workoutError}</p>
                  </motion.div>
                )}

                {/* Loading */}
                {generateWorkout.isPending && (
                  <LoadingDots label="Creating your personalized workout plan..." />
                )}

                {/* Plan Display */}
                {!generateWorkout.isPending && workoutPlan && parsedWorkout && (
                  <div
                    className="flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-4 lg:grid-cols-7 md:overflow-visible"
                    data-ocid="ai_plans.workout_list"
                  >
                    {parsedWorkout.map((day, i) => (
                      <WorkoutDayCard key={day.day} item={day} index={i} />
                    ))}
                  </div>
                )}
                {!generateWorkout.isPending &&
                  workoutPlan &&
                  !parsedWorkout && (
                    <RawPlanFallback content={workoutPlan.content} />
                  )}

                {/* Empty state */}
                {!generateWorkout.isPending &&
                  !workoutPlan &&
                  !loadingWorkout && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="card-glass p-10 text-center"
                      data-ocid="ai_plans.workout_empty_state"
                    >
                      <Dumbbell
                        size={40}
                        className="mx-auto mb-3 text-secondary/30"
                      />
                      <p className="font-display font-semibold text-foreground mb-1">
                        No Workout Plan Yet
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Click "Generate My Workout Plan 💪" to get your
                        personalized weekly training schedule.
                      </p>
                    </motion.div>
                  )}
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
