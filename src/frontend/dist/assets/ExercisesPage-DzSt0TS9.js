import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, D as Dumbbell, f as AnimatePresence } from "./index-gvkJDNXI.js";
import { u as useBackend } from "./useBackend-DWQBpq60.js";
import { X } from "./x-D1GWcjpE.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["path", { d: "M16 9a5 5 0 0 1 0 6", key: "1q6k2b" }],
  ["path", { d: "M19.364 18.364a9 9 0 0 0 0-12.728", key: "ijwkga" }]
];
const Volume2 = createLucideIcon("volume-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",
      key: "uqj9uw"
    }
  ],
  ["line", { x1: "22", x2: "16", y1: "9", y2: "15", key: "1ewh16" }],
  ["line", { x1: "16", x2: "22", y1: "9", y2: "15", key: "5ykzw1" }]
];
const VolumeX = createLucideIcon("volume-x", __iconNode);
const FALLBACK_EXERCISES = [
  {
    id: "f1",
    name: "Barbell Back Squat",
    muscleGroup: "Legs",
    difficulty: "Intermediate",
    description: "A compound lower-body movement that targets quads, hamstrings, and glutes. Drive through the heels and keep the chest tall throughout the lift.",
    correctFormTip: "Keep chest up, knees tracking over toes, depth at parallel or below.",
    wrongFormWarning: "Do not let knees cave inward — risk of knee injury.",
    durationSeconds: 60,
    sets: 4,
    reps: 8
  },
  {
    id: "f2",
    name: "Push-up",
    muscleGroup: "Chest",
    difficulty: "Beginner",
    description: "Classic bodyweight chest exercise for building upper body pushing strength. Engages chest, anterior deltoids, and triceps simultaneously.",
    correctFormTip: "Maintain a straight plank line from head to heels.",
    wrongFormWarning: "Avoid sagging hips — it stresses the lower back.",
    durationSeconds: 45,
    sets: 3,
    reps: 15
  },
  {
    id: "f3",
    name: "Deadlift",
    muscleGroup: "Back",
    difficulty: "Advanced",
    description: "Full-body compound lift targeting the posterior chain — back, glutes, hamstrings. One of the most effective strength-builders.",
    correctFormTip: "Neutral spine, bar close to shins, drive hips forward at lockout.",
    wrongFormWarning: "Never round your lower back — serious spinal injury risk.",
    durationSeconds: 90,
    sets: 4,
    reps: 5
  },
  {
    id: "f4",
    name: "Pull-up",
    muscleGroup: "Back",
    difficulty: "Intermediate",
    description: "Vertical pull exercise targeting lats, rhomboids, and biceps. Builds a wide, strong back with excellent upper body control.",
    correctFormTip: "Full hang at bottom, chin above bar at top, controlled descent.",
    wrongFormWarning: "Avoid kipping unless trained — shoulder impingement risk.",
    durationSeconds: 60,
    sets: 3,
    reps: 8
  },
  {
    id: "f5",
    name: "Plank",
    muscleGroup: "Core",
    difficulty: "Beginner",
    description: "Isometric core stabilization exercise for building endurance and posture. Engages deep stabilizers that protect the spine during all movements.",
    correctFormTip: "Elbows under shoulders, straight body line, breathe steadily.",
    wrongFormWarning: "Don't let hips rise or sag — engages wrong muscles.",
    durationSeconds: 60,
    sets: 3
  },
  {
    id: "f6",
    name: "Dumbbell Shoulder Press",
    muscleGroup: "Shoulders",
    difficulty: "Beginner",
    description: "Overhead press for building deltoid strength and shoulder stability. Dumbbells allow natural wrist rotation compared to barbell variants.",
    correctFormTip: "Elbows at 90°, press fully overhead, controlled return.",
    wrongFormWarning: "Avoid excessive lumbar arch — protect the spine.",
    durationSeconds: 60,
    sets: 3,
    reps: 12
  },
  {
    id: "f7",
    name: "Bicep Curl",
    muscleGroup: "Arms",
    difficulty: "Beginner",
    description: "Isolation movement for the biceps brachii. Use a controlled tempo to maximise tension throughout the range of motion.",
    correctFormTip: "Elbows pinned to sides, full extension at bottom, squeeze at top.",
    wrongFormWarning: "No swinging momentum — takes load off the target muscle.",
    durationSeconds: 45,
    sets: 3,
    reps: 12
  },
  {
    id: "f8",
    name: "Tricep Dip",
    muscleGroup: "Arms",
    difficulty: "Intermediate",
    description: "Compound pressing movement that heavily loads the triceps and lower chest. Can be weighted for progressive overload.",
    correctFormTip: "Lean slightly forward for chest focus, keep elbows close.",
    wrongFormWarning: "Don't flare elbows — shoulder joint stress increases sharply.",
    durationSeconds: 50,
    sets: 3,
    reps: 12
  },
  {
    id: "f9",
    name: "Lunges",
    muscleGroup: "Legs",
    difficulty: "Beginner",
    description: "Unilateral lower body exercise that improves balance, coordination, and quad/glute strength equally on each side.",
    correctFormTip: "Front knee stays behind toes, torso upright, step wide enough.",
    wrongFormWarning: "Knee tracking inward causes IT band and knee pain.",
    durationSeconds: 60,
    sets: 3,
    reps: 12
  },
  {
    id: "f10",
    name: "Cable Row",
    muscleGroup: "Back",
    difficulty: "Beginner",
    description: "Horizontal pull targeting the mid-back, rhomboids, and rear deltoids. Excellent for posture correction and back thickness.",
    correctFormTip: "Retract scapulae first, then pull elbows to waist.",
    wrongFormWarning: "Don't jerk with the lower back to move the weight.",
    durationSeconds: 55,
    sets: 3,
    reps: 12
  },
  {
    id: "f11",
    name: "Russian Twist",
    muscleGroup: "Core",
    difficulty: "Intermediate",
    description: "Rotational core exercise targeting the obliques and transverse abdominis. Add a weight plate for progressive resistance.",
    correctFormTip: "Feet elevated, rotate from the torso, not just the arms.",
    wrongFormWarning: "Don't round the lower back — keep a neutral spine.",
    durationSeconds: 45,
    sets: 3,
    reps: 20
  },
  {
    id: "f12",
    name: "Jumping Jacks",
    muscleGroup: "Cardio",
    difficulty: "Beginner",
    description: "Full-body cardiovascular exercise that elevates heart rate, warms up the joints, and can be used as active recovery between sets.",
    correctFormTip: "Land softly with slight knee bend, arms fully overhead.",
    wrongFormWarning: "Hard landings on flat feet cause shin splints over time.",
    durationSeconds: 60,
    sets: 3,
    reps: 30
  },
  {
    id: "f13",
    name: "Bench Press",
    muscleGroup: "Chest",
    difficulty: "Intermediate",
    description: "Horizontal press targeting pectorals, anterior deltoids, and triceps. The foundational upper-body strength lift.",
    correctFormTip: "Arch lower back slightly, retract scapulae, lower bar to mid-chest.",
    wrongFormWarning: "Never bounce bar off chest — damages the sternum and ribs.",
    durationSeconds: 75,
    sets: 4,
    reps: 8
  },
  {
    id: "f14",
    name: "Lateral Raise",
    muscleGroup: "Shoulders",
    difficulty: "Beginner",
    description: "Isolation exercise for the medial deltoids that creates shoulder width. Keep the weight light and control the movement.",
    correctFormTip: "Slight elbow bend, raise to shoulder height, thumbs slightly down.",
    wrongFormWarning: "Raising past shoulder height impinges the rotator cuff.",
    durationSeconds: 45,
    sets: 3,
    reps: 15
  },
  {
    id: "f15",
    name: "Burpees",
    muscleGroup: "Cardio",
    difficulty: "Advanced",
    description: "High-intensity full-body movement combining a squat, plank, push-up, and jump. Maximises calorie burn and conditions the cardiovascular system.",
    correctFormTip: "Maintain plank position in the down phase, explosive jump at top.",
    wrongFormWarning: "Sagging hips during the plank phase stresses the spine.",
    durationSeconds: 45,
    sets: 4,
    reps: 15
  }
];
const MUSCLE_GROUPS = [
  "All",
  "Chest",
  "Back",
  "Legs",
  "Shoulders",
  "Arms",
  "Core",
  "Cardio"
];
const DIFFICULTIES = ["All", "Beginner", "Intermediate", "Advanced"];
const MUSCLE_COLORS = {
  Chest: {
    bg: "rgba(34,197,94,0.15)",
    text: "text-accent",
    border: "border-accent/30",
    glow: "#22C55E"
  },
  Back: {
    bg: "rgba(56,189,248,0.15)",
    text: "text-secondary",
    border: "border-secondary/30",
    glow: "#38BDF8"
  },
  Legs: {
    bg: "rgba(167,139,250,0.15)",
    text: "text-purple-400",
    border: "border-purple-400/30",
    glow: "#A78BFA"
  },
  Shoulders: {
    bg: "rgba(251,191,36,0.15)",
    text: "text-yellow-400",
    border: "border-yellow-400/30",
    glow: "#FBBF24"
  },
  Arms: {
    bg: "rgba(249,115,22,0.15)",
    text: "text-orange-400",
    border: "border-orange-400/30",
    glow: "#F97316"
  },
  Core: {
    bg: "rgba(236,72,153,0.15)",
    text: "text-pink-400",
    border: "border-pink-400/30",
    glow: "#EC4899"
  },
  Cardio: {
    bg: "rgba(239,68,68,0.15)",
    text: "text-red-400",
    border: "border-red-400/30",
    glow: "#EF4444"
  }
};
const DIFFICULTY_DOTS = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3
};
function BodySilhouette({ muscleGroup }) {
  const colors = MUSCLE_COLORS[muscleGroup];
  const glow = (colors == null ? void 0 : colors.glow) ?? "#22C55E";
  const isActive = (group) => muscleGroup === group;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 120 240",
      xmlns: "http://www.w3.org/2000/svg",
      className: "w-full h-full",
      role: "img",
      "aria-label": `Body silhouette highlighting ${muscleGroup}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "glow-filter", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "3", result: "coloredBlur" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "coloredBlur" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "g",
          {
            fill: "rgba(255,255,255,0.06)",
            stroke: "rgba(255,255,255,0.15)",
            strokeWidth: "0.8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "60", cy: "18", rx: "13", ry: "16" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "54", y: "30", width: "12", height: "10", rx: "2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "36", y: "40", width: "48", height: "60", rx: "4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "16", y: "42", width: "18", height: "38", rx: "6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "86", y: "42", width: "18", height: "38", rx: "6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "16", y: "82", width: "16", height: "36", rx: "6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "88", y: "82", width: "16", height: "36", rx: "6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "34", y: "100", width: "52", height: "28", rx: "4" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "34", y: "126", width: "22", height: "52", rx: "6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "64", y: "126", width: "22", height: "52", rx: "6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "35", y: "180", width: "20", height: "46", rx: "6" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "65", y: "180", width: "20", height: "46", rx: "6" })
            ]
          }
        ),
        isActive("Chest") && /* @__PURE__ */ jsxRuntimeExports.jsx("g", { filter: "url(#glow-filter)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "40",
            y: "42",
            width: "40",
            height: "26",
            rx: "3",
            fill: glow,
            opacity: "0.55"
          }
        ) }),
        isActive("Back") && /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { filter: "url(#glow-filter)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "40",
              y: "44",
              width: "40",
              height: "28",
              rx: "3",
              fill: glow,
              opacity: "0.45"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "44",
              y: "68",
              width: "32",
              height: "20",
              rx: "3",
              fill: glow,
              opacity: "0.35"
            }
          )
        ] }),
        isActive("Shoulders") && /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { filter: "url(#glow-filter)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "27", cy: "46", rx: "11", ry: "9", fill: glow, opacity: "0.6" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "93", cy: "46", rx: "11", ry: "9", fill: glow, opacity: "0.6" })
        ] }),
        isActive("Arms") && /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { filter: "url(#glow-filter)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "16",
              y: "42",
              width: "18",
              height: "38",
              rx: "6",
              fill: glow,
              opacity: "0.55"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "86",
              y: "42",
              width: "18",
              height: "38",
              rx: "6",
              fill: glow,
              opacity: "0.55"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "16",
              y: "82",
              width: "16",
              height: "34",
              rx: "6",
              fill: glow,
              opacity: "0.4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "88",
              y: "82",
              width: "16",
              height: "34",
              rx: "6",
              fill: glow,
              opacity: "0.4"
            }
          )
        ] }),
        isActive("Core") && /* @__PURE__ */ jsxRuntimeExports.jsx("g", { filter: "url(#glow-filter)", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "40",
            y: "68",
            width: "40",
            height: "32",
            rx: "3",
            fill: glow,
            opacity: "0.6"
          }
        ) }),
        isActive("Legs") && /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { filter: "url(#glow-filter)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "34",
              y: "100",
              width: "52",
              height: "28",
              rx: "4",
              fill: glow,
              opacity: "0.4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "34",
              y: "126",
              width: "22",
              height: "52",
              rx: "6",
              fill: glow,
              opacity: "0.55"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "64",
              y: "126",
              width: "22",
              height: "52",
              rx: "6",
              fill: glow,
              opacity: "0.55"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "35",
              y: "180",
              width: "20",
              height: "46",
              rx: "6",
              fill: glow,
              opacity: "0.4"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "65",
              y: "180",
              width: "20",
              height: "46",
              rx: "6",
              fill: glow,
              opacity: "0.4"
            }
          )
        ] }),
        isActive("Cardio") && /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { filter: "url(#glow-filter)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("ellipse", { cx: "60", cy: "60", rx: "28", ry: "32", fill: glow, opacity: "0.3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "34",
              y: "126",
              width: "22",
              height: "52",
              rx: "6",
              fill: glow,
              opacity: "0.3"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "rect",
            {
              x: "64",
              y: "126",
              width: "22",
              height: "52",
              rx: "6",
              fill: glow,
              opacity: "0.3"
            }
          )
        ] })
      ]
    }
  );
}
function useVoiceNarrator() {
  const [playingId, setPlayingId] = reactExports.useState(null);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;
  const play = reactExports.useCallback(
    (exercise) => {
      if (!supported) return;
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(
        `Exercise: ${exercise.name}. Muscle Group: ${exercise.muscleGroup}. Difficulty: ${exercise.difficulty}. ${exercise.description} Correct form tip: ${exercise.correctFormTip}. Warning: ${exercise.wrongFormWarning}`
      );
      utterance.rate = 0.95;
      utterance.pitch = 1;
      utterance.onend = () => setPlayingId(null);
      utterance.onerror = () => setPlayingId(null);
      window.speechSynthesis.speak(utterance);
      setPlayingId(exercise.id);
    },
    [supported]
  );
  const stop = reactExports.useCallback(() => {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setPlayingId(null);
  }, [supported]);
  reactExports.useEffect(
    () => () => {
      if (supported) window.speechSynthesis.cancel();
    },
    [supported]
  );
  return { play, stop, playingId, supported };
}
function DifficultyDots({ difficulty }) {
  const count = DIFFICULTY_DOTS[difficulty] ?? 1;
  const colorMap = {
    Beginner: "bg-accent",
    Intermediate: "bg-secondary",
    Advanced: "bg-orange-400"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "flex items-center gap-1",
      "aria-label": `${difficulty} difficulty`,
      children: [1, 2, 3].map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: `w-2 h-2 rounded-full ${n <= count ? colorMap[difficulty] : "bg-white/15"}`
        },
        n
      ))
    }
  );
}
function ExerciseCard({
  exercise,
  index,
  isPlaying,
  onDetails,
  onVoice,
  onStopVoice,
  voiceSupported
}) {
  const colors = MUSCLE_COLORS[exercise.muscleGroup] ?? MUSCLE_COLORS.Cardio;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": `exercises.item.${index + 1}`,
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.05, duration: 0.35, ease: "easeOut" },
      whileHover: { scale: 1.02 },
      className: `card-glass p-4 flex flex-col gap-3 relative cursor-pointer select-none transition-shadow ${isPlaying ? "ring-2 ring-accent shadow-[0_0_18px_rgba(34,197,94,0.35)]" : ""}`,
      children: [
        isPlaying && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute top-2 right-2 w-2.5 h-2.5 rounded-full bg-accent",
            animate: { scale: [1, 1.5, 1], opacity: [1, 0.5, 1] },
            transition: { repeat: Number.POSITIVE_INFINITY, duration: 1.2 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
              style: { background: colors.bg },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { size: 18, className: colors.text })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-foreground leading-tight truncate", children: exercise.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colors.text} ${colors.border}`,
                  style: { background: colors.bg },
                  children: exercise.muscleGroup
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(DifficultyDots, { difficulty: exercise.difficulty }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground", children: exercise.difficulty })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed", children: exercise.description }),
        (exercise.sets || exercise.reps) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 text-[11px] text-muted-foreground", children: [
          exercise.sets && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 rounded glass border border-white/10", children: [
            exercise.sets,
            " sets"
          ] }),
          exercise.reps && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 rounded glass border border-white/10", children: [
            exercise.reps,
            " reps"
          ] }),
          exercise.durationSeconds && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "px-2 py-0.5 rounded glass border border-white/10", children: [
            exercise.durationSeconds,
            "s"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 pt-1 border-t border-white/6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              "data-ocid": `exercises.details_button.${index + 1}`,
              onClick: () => onDetails(exercise),
              className: "flex-1 py-1.5 text-xs font-semibold rounded-lg glass border border-white/15 text-foreground hover:border-accent/50 hover:text-accent transition-smooth",
              children: "Details"
            }
          ),
          voiceSupported && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              "data-ocid": `exercises.voice_button.${index + 1}`,
              onClick: () => isPlaying ? onStopVoice() : onVoice(exercise),
              "aria-label": isPlaying ? "Stop narration" : "Read exercise details",
              className: `px-3 py-1.5 text-xs font-semibold rounded-lg border transition-smooth flex items-center gap-1.5 ${isPlaying ? "bg-accent text-black border-accent" : "glass border-white/15 text-muted-foreground hover:text-accent hover:border-accent/50"}`,
              children: [
                isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { size: 13 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { size: 13 }),
                isPlaying ? "Stop" : "Voice"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function ExerciseModal({
  exercise,
  isPlaying,
  onVoice,
  onStopVoice,
  voiceSupported,
  onClose
}) {
  const colors = MUSCLE_COLORS[exercise.muscleGroup] ?? MUSCLE_COLORS.Cardio;
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  const formTips = exercise.correctFormTip.split(/[.,]/).map((s) => s.trim()).filter(Boolean);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4",
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      "data-ocid": "exercises.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "absolute inset-0 bg-black/70 backdrop-blur-sm",
            onClick: onClose,
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 }
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            className: "relative z-10 w-full sm:max-w-lg glass-elevated rounded-t-3xl sm:rounded-2xl overflow-hidden",
            initial: { y: 80, opacity: 0 },
            animate: { y: 0, opacity: 1 },
            exit: { y: 80, opacity: 0 },
            transition: { type: "spring", stiffness: 300, damping: 28 },
            style: { maxHeight: "92dvh", overflowY: "auto" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center pt-3 pb-1 sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-1 rounded-full bg-white/20" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 border-b border-white/8", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "span",
                    {
                      className: `text-xs font-semibold px-2.5 py-1 rounded-full border ${colors.text} ${colors.border}`,
                      style: { background: colors.bg },
                      children: exercise.muscleGroup
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(DifficultyDots, { difficulty: exercise.difficulty })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": "exercises.close_button",
                    onClick: onClose,
                    "aria-label": "Close modal",
                    className: "w-8 h-8 rounded-full flex items-center justify-center glass border border-white/15 text-muted-foreground hover:text-foreground transition-smooth",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-4 space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-display font-bold gradient-text leading-tight", children: exercise.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 leading-relaxed", children: exercise.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-start", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.div,
                    {
                      className: "w-28 flex-shrink-0 rounded-xl p-3 aspect-[1/2]",
                      style: { background: colors.bg },
                      initial: { opacity: 0, scale: 0.9 },
                      animate: { opacity: 1, scale: 1 },
                      transition: { delay: 0.1 },
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.div,
                        {
                          animate: isPlaying ? { opacity: [1, 0.7, 1] } : { opacity: 1 },
                          transition: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
                          className: "h-full",
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(BodySilhouette, { muscleGroup: exercise.muscleGroup })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 text-center", children: [
                      {
                        label: "Sets",
                        value: exercise.sets ? String(exercise.sets) : "—"
                      },
                      {
                        label: "Reps",
                        value: exercise.reps ? String(exercise.reps) : "—"
                      },
                      { label: "Duration", value: `${exercise.durationSeconds}s` }
                    ].map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "glass rounded-xl p-2 border border-white/10",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm font-bold text-foreground", children: value }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] text-muted-foreground", children: label })
                        ]
                      },
                      label
                    )) }),
                    voiceSupported && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        "data-ocid": "exercises.modal_voice_button",
                        onClick: isPlaying ? onStopVoice : onVoice,
                        className: `w-full py-2 text-xs font-semibold rounded-xl border flex items-center justify-center gap-2 transition-smooth ${isPlaying ? "bg-accent text-black border-accent" : "glass border-white/20 text-muted-foreground hover:text-accent hover:border-accent/50"}`,
                        children: isPlaying ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            motion.div,
                            {
                              animate: { scale: [1, 1.3, 1] },
                              transition: {
                                repeat: Number.POSITIVE_INFINITY,
                                duration: 0.8
                              },
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(VolumeX, { size: 13 })
                            }
                          ),
                          "Stop Narration"
                        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Volume2, { size: 13 }),
                          "Play Narration"
                        ] })
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-4 border border-accent/20 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-bold text-accent uppercase tracking-wider flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent" }),
                    "Correct Form"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-1.5", children: [
                    formTips.slice(0, 3).map((tip) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "li",
                      {
                        className: "flex gap-2 text-xs text-muted-foreground",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent flex-shrink-0", children: "✓" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: tip })
                        ]
                      },
                      tip
                    )),
                    formTips.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-2 text-xs text-muted-foreground", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent flex-shrink-0", children: "✓" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: exercise.correctFormTip })
                    ] })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-4 border border-red-500/20 space-y-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("h4", { className: "text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-red-400" }),
                    "Common Mistakes"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-red-400 flex-shrink-0", children: "⚠" }),
                    exercise.wrongFormWarning
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 pb-6 pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": "exercises.confirm_button",
                  onClick: onClose,
                  className: "w-full py-3 rounded-xl text-sm font-bold bg-gradient-to-r from-accent to-secondary text-black transition-smooth hover:opacity-90 active:scale-[0.98]",
                  children: "Got It"
                }
              ) })
            ]
          }
        )
      ]
    }
  );
}
function ExercisesPage() {
  const { backend, isFetching } = useBackend();
  const [exercises, setExercises] = reactExports.useState(FALLBACK_EXERCISES);
  const [search, setSearch] = reactExports.useState("");
  const [muscleFilter, setMuscleFilter] = reactExports.useState("All");
  const [diffFilter, setDiffFilter] = reactExports.useState("All");
  const [selectedExercise, setSelectedExercise] = reactExports.useState(
    null
  );
  const searchRef = reactExports.useRef(null);
  const {
    play,
    stop,
    playingId,
    supported: voiceSupported
  } = useVoiceNarrator();
  reactExports.useEffect(() => {
    if (!backend || isFetching) return;
    (async () => {
      try {
        const result = await backend.listExercises();
        if (Array.isArray(result) && result.length > 0) {
          const backendIds = new Set(result.map((e) => e.id));
          const merged = [
            ...result,
            ...FALLBACK_EXERCISES.filter((fe) => !backendIds.has(fe.id))
          ];
          setExercises(merged);
        }
      } catch {
      }
    })();
  }, [backend, isFetching]);
  const filtered = exercises.filter((ex) => {
    const q = search.toLowerCase();
    const matchSearch = ex.name.toLowerCase().includes(q) || ex.muscleGroup.toLowerCase().includes(q) || ex.description.toLowerCase().includes(q);
    const matchMuscle = muscleFilter === "All" || ex.muscleGroup === muscleFilter;
    const matchDiff = diffFilter === "All" || ex.difficulty === diffFilter;
    return matchSearch && matchMuscle && matchDiff;
  });
  const handleVoice = (ex) => {
    if (playingId === ex.id) {
      stop();
    } else {
      play(ex);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-6 pb-28 space-y-5", "data-ocid": "exercises.page", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          className: "flex items-center justify-between",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-display font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { size: 22, className: "text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "gradient-text", children: "Exercise Library" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
              exercises.length,
              " exercises · tap a card for form guide"
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { delay: 0.08 },
          className: "relative",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Search,
              {
                size: 15,
                className: "absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: searchRef,
                type: "text",
                "data-ocid": "exercises.search_input",
                placeholder: "Search by name, muscle group…",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                className: "w-full pl-9 pr-4 py-2.5 rounded-xl glass border border-white/12 bg-transparent text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-accent/50 transition-smooth"
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { delay: 0.12 },
          className: "space-y-2",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Funnel,
                {
                  size: 13,
                  className: "text-muted-foreground flex-shrink-0 mr-0.5"
                }
              ),
              MUSCLE_GROUPS.map((mg) => {
                const active = muscleFilter === mg;
                const col = mg !== "All" ? MUSCLE_COLORS[mg] : null;
                return /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "data-ocid": `exercises.muscle_filter.${mg.toLowerCase()}`,
                    onClick: () => setMuscleFilter(mg),
                    className: `flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold border transition-smooth ${active ? mg === "All" ? "bg-accent text-black border-accent" : `${(col == null ? void 0 : col.text) ?? ""} ${(col == null ? void 0 : col.border) ?? ""}` : "border-white/12 text-muted-foreground hover:text-foreground hover:border-white/25"}`,
                    style: active && col ? { background: col.bg } : void 0,
                    children: mg
                  },
                  mg
                );
              })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-muted-foreground flex-shrink-0 mr-0.5", children: "Level:" }),
              DIFFICULTIES.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  "data-ocid": `exercises.diff_filter.${d.toLowerCase()}`,
                  onClick: () => setDiffFilter(d),
                  className: `flex-shrink-0 px-3 py-1 rounded-full text-xs font-semibold border transition-smooth ${diffFilter === d ? d === "All" ? "bg-secondary text-black border-secondary" : d === "Beginner" ? "bg-accent text-black border-accent" : d === "Intermediate" ? "bg-secondary text-black border-secondary" : "bg-orange-400 text-black border-orange-400" : "border-white/12 text-muted-foreground hover:text-foreground hover:border-white/25"}`,
                  children: d
                },
                d
              ))
            ] })
          ]
        }
      ),
      (search || muscleFilter !== "All" || diffFilter !== "All") && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.p,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          className: "text-xs text-muted-foreground",
          children: [
            filtered.length,
            " result",
            filtered.length !== 1 ? "s" : "",
            " found"
          ]
        }
      ),
      filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 8 },
          animate: { opacity: 1, y: 0 },
          className: "text-center py-20 text-muted-foreground",
          "data-ocid": "exercises.empty_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Dumbbell, { size: 44, className: "mx-auto mb-4 opacity-20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold", children: "No exercises match your filters" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs mt-1 opacity-70", children: "Try adjusting your search or filters" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "mt-4 px-4 py-2 rounded-xl text-xs glass border border-white/15 text-muted-foreground hover:text-foreground transition-smooth",
                onClick: () => {
                  setSearch("");
                  setMuscleFilter("All");
                  setDiffFilter("All");
                },
                children: "Clear Filters"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 gap-3", children: filtered.map((ex, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        ExerciseCard,
        {
          exercise: ex,
          index: i,
          isPlaying: playingId === ex.id,
          onDetails: setSelectedExercise,
          onVoice: () => handleVoice(ex),
          onStopVoice: stop,
          voiceSupported
        },
        ex.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: selectedExercise && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ExerciseModal,
      {
        exercise: selectedExercise,
        isPlaying: playingId === selectedExercise.id,
        onVoice: () => play(selectedExercise),
        onStopVoice: stop,
        voiceSupported,
        onClose: () => {
          setSelectedExercise(null);
          stop();
        }
      }
    ) })
  ] });
}
export {
  ExercisesPage as default
};
