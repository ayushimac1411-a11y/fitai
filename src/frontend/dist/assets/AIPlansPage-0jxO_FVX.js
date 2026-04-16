import { c as createLucideIcon, r as reactExports, e as useQueryClient, j as jsxRuntimeExports, m as motion, S as Sparkles, D as Dumbbell, f as AnimatePresence } from "./index-gvkJDNXI.js";
import { u as useBackend, a as useQuery } from "./useBackend-DWQBpq60.js";
import { u as useMutation } from "./useMutation-Bt3tAYcw.js";
import { C as CircleAlert } from "./circle-alert-NtPVmQFH.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M18 20a6 6 0 0 0-12 0", key: "1qehca" }],
  ["circle", { cx: "12", cy: "10", r: "4", key: "1h16sb" }],
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]
];
const CircleUserRound = createLucideIcon("circle-user-round", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
];
const RefreshCw = createLucideIcon("refresh-cw", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8", key: "n7qcjb" }],
  [
    "path",
    { d: "M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7", key: "d0u48b" }
  ],
  ["path", { d: "m2.1 21.8 6.4-6.3", key: "yn04lh" }],
  ["path", { d: "m19 5-7 7", key: "194lzd" }]
];
const UtensilsCrossed = createLucideIcon("utensils-crossed", __iconNode);
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday"
];
function parseDietPlan(raw) {
  var _a, _b, _c;
  try {
    const days = [];
    const dayRegex = /(?:^|\n)\s*(?:\*\*)?(?:Day\s*\d+\s*[-:]?\s*)?(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)(?:\*\*)?\s*[-:]?/gi;
    const parts = raw.split(dayRegex);
    const matched = [];
    for (let i = 1; i < parts.length; i += 2) {
      const dayName = (_a = parts[i]) == null ? void 0 : _a.trim();
      const content = ((_b = parts[i + 1]) == null ? void 0 : _b.trim()) ?? "";
      if (dayName && DAYS.some((d) => d.toLowerCase() === dayName.toLowerCase())) {
        matched.push({ day: dayName, content });
      }
    }
    if (matched.length < 3) {
      const numberedRegex = /(?:^|\n)\s*(?:\*\*)?Day\s*(\d+)(?:\*\*)?\s*[-:]?/gi;
      const numParts = raw.split(numberedRegex);
      for (let i = 1; i < numParts.length; i += 2) {
        const idx = Number.parseInt(numParts[i]) - 1;
        const content = ((_c = numParts[i + 1]) == null ? void 0 : _c.trim()) ?? "";
        if (!Number.isNaN(idx) && idx < 7) {
          matched[idx] = { day: DAYS[idx], content };
        }
      }
    }
    for (const { day, content } of matched) {
      const extract = (label) => {
        const re = new RegExp(
          `(?:${label})[:\\s*-]+([^\\n]+(?:\\n(?!(?:Breakfast|Lunch|Dinner|Snack))[^\\n]+)*)`,
          "i"
        );
        const m = content.match(re);
        return m ? m[1].replace(/\*+/g, "").trim().split("\n")[0].trim() : "See plan below";
      };
      days.push({
        day,
        meals: {
          breakfast: extract("Breakfast"),
          lunch: extract("Lunch"),
          dinner: extract("Dinner"),
          snacks: extract("Snacks?")
        }
      });
    }
    return days.length >= 3 ? days : null;
  } catch {
    return null;
  }
}
function parseWorkoutPlan(raw) {
  var _a, _b, _c;
  try {
    const days = [];
    const dayRegex = /(?:^|\n)\s*(?:\*\*)?(?:Day\s*\d+\s*[-:]?\s*)?(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)(?:\*\*)?\s*[-:]?/gi;
    const parts = raw.split(dayRegex);
    const matched = [];
    for (let i = 1; i < parts.length; i += 2) {
      const dayName = (_a = parts[i]) == null ? void 0 : _a.trim();
      const content = ((_b = parts[i + 1]) == null ? void 0 : _b.trim()) ?? "";
      if (dayName && DAYS.some((d) => d.toLowerCase() === dayName.toLowerCase())) {
        matched.push({ day: dayName, content });
      }
    }
    if (matched.length < 3) {
      const numberedRegex = /(?:^|\n)\s*(?:\*\*)?Day\s*(\d+)(?:\*\*)?\s*[-:]?/gi;
      const numParts = raw.split(numberedRegex);
      for (let i = 1; i < numParts.length; i += 2) {
        const idx = Number.parseInt(numParts[i]) - 1;
        const content = ((_c = numParts[i + 1]) == null ? void 0 : _c.trim()) ?? "";
        if (!Number.isNaN(idx) && idx < 7) {
          matched[idx] = { day: DAYS[idx], content };
        }
      }
    }
    for (const { day, content } of matched) {
      const isRest = /rest|recovery|off\s*day/i.test(content.substring(0, 80));
      const exerciseLines = content.split("\n").map(
        (l) => l.replace(/^[\s\-\*•]+/, "").replace(/\*+/g, "").trim()
      ).filter(
        (l) => l.length > 3 && !/^(day|monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i.test(
          l
        )
      );
      days.push({
        day,
        isRest,
        exercises: exerciseLines.slice(0, 8).map((t) => ({ text: t }))
      });
    }
    return days.length >= 3 ? days : null;
  } catch {
    return null;
  }
}
function formatTimestamp(nanos) {
  try {
    const ms = Number(nanos / BigInt(1e6));
    return new Date(ms).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  } catch {
    return "Recently";
  }
}
const MEAL_META = {
  breakfast: { icon: "☀️", label: "Breakfast", color: "text-amber-400" },
  lunch: { icon: "🌞", label: "Lunch", color: "text-yellow-400" },
  dinner: { icon: "🌙", label: "Dinner", color: "text-indigo-400" },
  snacks: { icon: "🍎", label: "Snacks", color: "text-accent" }
};
function DietDayCard({ item, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05 },
      className: "card-glass p-4 min-w-[260px] snap-start flex-shrink-0 md:min-w-0",
      "data-ocid": `ai_plans.diet_day.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3 pb-2 border-b border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-bold text-accent uppercase tracking-widest", children: item.day.slice(0, 3) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: item.day })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: Object.keys(MEAL_META).map(
          (key) => {
            const meta = MEAL_META[key];
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-start", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base leading-tight mt-0.5", children: meta.icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `text-[10px] font-semibold uppercase tracking-wider ${meta.color}`,
                    children: meta.label
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground leading-snug break-words line-clamp-2", children: item.meals[key] })
              ] })
            ] }, key);
          }
        ) })
      ]
    }
  );
}
function WorkoutDayCard({ item, index }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05 },
      className: `card-glass p-4 min-w-[240px] snap-start flex-shrink-0 md:min-w-0 ${item.isRest ? "opacity-60" : ""}`,
      "data-ocid": `ai_plans.workout_day.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3 pb-2 border-b border-white/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono font-bold text-secondary uppercase tracking-widest", children: item.day.slice(0, 3) }),
          item.isRest ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-medium", children: "REST DAY" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-secondary/20 text-secondary font-medium", children: "TRAIN" })
        ] }),
        item.isRest ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center py-4", children: "Recovery & rest — let your muscles grow 💪" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1.5", children: [
          item.exercises.map((ex, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex gap-2 items-start text-xs text-foreground",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary mt-0.5 shrink-0", children: "•" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "break-words line-clamp-2", children: ex.text })
              ]
            },
            ex.text.slice(0, 30) + String(i)
          )),
          item.exercises.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "text-xs text-muted-foreground", children: "See full plan above" })
        ] })
      ]
    }
  );
}
function LoadingDots({ label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 py-12", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: "w-2.5 h-2.5 rounded-full bg-accent",
        animate: { y: [0, -10, 0] },
        transition: {
          duration: 0.7,
          repeat: Number.POSITIVE_INFINITY,
          delay: i * 0.15
        }
      },
      i
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground animate-pulse", children: label })
  ] });
}
function RawPlanFallback({ content }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "card-glass p-4 max-h-[60vh] overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { className: "text-xs text-foreground/80 whitespace-pre-wrap font-mono leading-relaxed", children: content }) });
}
function NoProfileCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.96 },
      animate: { opacity: 1, scale: 1 },
      className: "card-glass p-8 text-center mx-auto max-w-sm",
      "data-ocid": "ai_plans.no_profile_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleUserRound, { size: 32, className: "text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground text-lg mb-2", children: "Complete Your Profile First" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mb-6", children: "We need your fitness details to generate a personalized plan for you." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            "data-ocid": "ai_plans.go_to_profile_button",
            onClick: () => {
              const event = new CustomEvent("navigate", { detail: "profile" });
              window.dispatchEvent(event);
            },
            className: "w-full py-3 rounded-xl bg-accent text-black font-semibold text-sm hover:bg-accent/90 transition-smooth",
            children: "Set Up Profile"
          }
        )
      ]
    }
  );
}
function AIPlansPage() {
  const [activeTab, setActiveTab] = reactExports.useState("diet");
  const { backend, isFetching } = useBackend();
  const queryClient = useQueryClient();
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!backend) return null;
      return backend.getProfile();
    },
    enabled: !!backend && !isFetching,
    staleTime: 0
    // always refetch when invalidated
  });
  const { data: dietPlan, isLoading: loadingDiet } = useQuery({
    queryKey: ["ai-plan", "diet"],
    queryFn: async () => {
      if (!backend) return null;
      return backend.getAIPlan("diet");
    },
    enabled: !!backend && !isFetching
  });
  const { data: workoutPlan, isLoading: loadingWorkout } = useQuery({
    queryKey: ["ai-plan", "workout"],
    queryFn: async () => {
      if (!backend) return null;
      return backend.getAIPlan("workout");
    },
    enabled: !!backend && !isFetching
  });
  const [dietError, setDietError] = reactExports.useState(null);
  const [workoutError, setWorkoutError] = reactExports.useState(null);
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
    onError: (e) => {
      setDietError(
        e.message.includes("Gemini") || e.message.includes("API") ? "AI generation failed. Please check your Gemini API key." : e.message || "Generation failed. Please try again."
      );
    }
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
    onError: (e) => {
      setWorkoutError(
        e.message.includes("Gemini") || e.message.includes("API") ? "AI generation failed. Please check your Gemini API key." : e.message || "Generation failed. Please try again."
      );
    }
  });
  const parsedDiet = (dietPlan == null ? void 0 : dietPlan.content) ? parseDietPlan(dietPlan.content) : null;
  const parsedWorkout = (workoutPlan == null ? void 0 : workoutPlan.content) ? parseWorkoutPlan(workoutPlan.content) : null;
  const noProfile = !isFetching && !profileLoading && profile == null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-6 space-y-6 pb-24", "data-ocid": "ai_plans.page", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 22, className: "text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "AI Plans" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 ml-8", children: "Personalized for you — powered by Google Gemini" })
        ]
      }
    ),
    noProfile ? /* @__PURE__ */ jsxRuntimeExports.jsx(NoProfileCard, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.1 },
          className: "relative flex gap-1 p-1 glass rounded-xl",
          "data-ocid": "ai_plans.tab_switcher",
          children: ["diet", "workout"].map((tab) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `ai_plans.${tab}_tab`,
              onClick: () => setActiveTab(tab),
              className: `relative flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-smooth z-10 ${activeTab === tab ? "text-black" : "text-muted-foreground hover:text-foreground"}`,
              children: [
                activeTab === tab && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    layoutId: "tab-bg",
                    className: `absolute inset-0 rounded-lg ${tab === "diet" ? "bg-accent" : "bg-secondary"}`,
                    transition: { type: "spring", stiffness: 400, damping: 30 }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "relative z-10 flex items-center gap-1.5", children: [
                  tab === "diet" ? /* @__PURE__ */ jsxRuntimeExports.jsx(UtensilsCrossed, { size: 15 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { size: 15 }),
                  tab === "diet" ? "Diet Plan" : "Workout Plan"
                ] })
              ]
            },
            tab
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: activeTab === "diet" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -16 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 16 },
          transition: { duration: 0.25 },
          className: "space-y-4",
          "data-ocid": "ai_plans.diet_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: dietPlan && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Generated ",
                  formatTimestamp(dietPlan.generatedAt)
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": dietPlan ? "ai_plans.regenerate_diet_button" : "ai_plans.generate_diet_button",
                  disabled: generateDiet.isPending || loadingDiet,
                  onClick: () => generateDiet.mutate(),
                  className: "flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent to-accent/80 text-black text-sm font-bold hover:shadow-lg hover:shadow-accent/25 transition-smooth disabled:opacity-60 disabled:cursor-not-allowed",
                  children: [
                    dietPlan ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      RefreshCw,
                      {
                        size: 14,
                        className: generateDiet.isPending ? "animate-spin" : ""
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { size: 14 }),
                    dietPlan ? "Regenerate" : "Generate My Diet Plan ✨"
                  ]
                }
              )
            ] }),
            dietError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: -8 },
                animate: { opacity: 1, y: 0 },
                className: "flex items-start gap-2 p-3 rounded-xl bg-destructive/15 border border-destructive/30",
                "data-ocid": "ai_plans.diet_error_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleAlert,
                    {
                      size: 16,
                      className: "text-destructive shrink-0 mt-0.5"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: dietError })
                ]
              }
            ),
            generateDiet.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingDots, { label: "Generating your personalized Indian diet plan..." }),
            !generateDiet.isPending && dietPlan && parsedDiet && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-4 lg:grid-cols-7 md:overflow-visible",
                "data-ocid": "ai_plans.diet_list",
                children: parsedDiet.map((day, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(DietDayCard, { item: day, index: i }, day.day))
              }
            ),
            !generateDiet.isPending && dietPlan && !parsedDiet && /* @__PURE__ */ jsxRuntimeExports.jsx(RawPlanFallback, { content: dietPlan.content }),
            !generateDiet.isPending && !dietPlan && !loadingDiet && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                className: "card-glass p-10 text-center",
                "data-ocid": "ai_plans.diet_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    UtensilsCrossed,
                    {
                      size: 40,
                      className: "mx-auto mb-3 text-accent/30"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "No Diet Plan Yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: 'Click "Generate My Diet Plan ✨" to get your personalized weekly Indian diet plan.' })
                ]
              }
            )
          ]
        },
        "diet"
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 16 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: -16 },
          transition: { duration: 0.25 },
          className: "space-y-4",
          "data-ocid": "ai_plans.workout_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: workoutPlan && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { size: 12 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Generated ",
                  formatTimestamp(workoutPlan.generatedAt)
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  "data-ocid": workoutPlan ? "ai_plans.regenerate_workout_button" : "ai_plans.generate_workout_button",
                  disabled: generateWorkout.isPending || loadingWorkout,
                  onClick: () => generateWorkout.mutate(),
                  className: "flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-secondary to-secondary/80 text-black text-sm font-bold hover:shadow-lg hover:shadow-secondary/25 transition-smooth disabled:opacity-60 disabled:cursor-not-allowed",
                  children: [
                    workoutPlan ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      RefreshCw,
                      {
                        size: 14,
                        className: generateWorkout.isPending ? "animate-spin" : ""
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { size: 14 }),
                    workoutPlan ? "Regenerate" : "Generate My Workout Plan 💪"
                  ]
                }
              )
            ] }),
            workoutError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0, y: -8 },
                animate: { opacity: 1, y: 0 },
                className: "flex items-start gap-2 p-3 rounded-xl bg-destructive/15 border border-destructive/30",
                "data-ocid": "ai_plans.workout_error_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    CircleAlert,
                    {
                      size: 16,
                      className: "text-destructive shrink-0 mt-0.5"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: workoutError })
                ]
              }
            ),
            generateWorkout.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingDots, { label: "Creating your personalized workout plan..." }),
            !generateWorkout.isPending && workoutPlan && parsedWorkout && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory md:grid md:grid-cols-4 lg:grid-cols-7 md:overflow-visible",
                "data-ocid": "ai_plans.workout_list",
                children: parsedWorkout.map((day, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(WorkoutDayCard, { item: day, index: i }, day.day))
              }
            ),
            !generateWorkout.isPending && workoutPlan && !parsedWorkout && /* @__PURE__ */ jsxRuntimeExports.jsx(RawPlanFallback, { content: workoutPlan.content }),
            !generateWorkout.isPending && !workoutPlan && !loadingWorkout && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                className: "card-glass p-10 text-center",
                "data-ocid": "ai_plans.workout_empty_state",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Dumbbell,
                    {
                      size: 40,
                      className: "mx-auto mb-3 text-secondary/30"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground mb-1", children: "No Workout Plan Yet" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: 'Click "Generate My Workout Plan 💪" to get your personalized weekly training schedule.' })
                ]
              }
            )
          ]
        },
        "workout"
      ) })
    ] })
  ] });
}
export {
  AIPlansPage as default
};
