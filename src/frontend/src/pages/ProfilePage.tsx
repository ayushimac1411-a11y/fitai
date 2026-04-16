import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle2,
  ChevronRight,
  Key,
  Moon,
  Scale,
  Settings,
  Shield,
  Sun,
  User,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useBackend } from "../hooks/useBackend";
import { calculateBMI, getBMIColor, getBMIProgress } from "../lib/bmi";
import { useStore } from "../store/useStore";
import type {
  ActivityLevel,
  BMIResult,
  FitnessGoal,
  Gender,
} from "../types/fitness";

interface ProfileFormValues {
  fullName: string;
  age: number;
  gender: Gender;
  heightCm: number;
  weightKg: number;
  fitnessGoal: FitnessGoal;
  activityLevel: ActivityLevel;
}

// ─── Subcomponents ────────────────────────────────────────────────────────────

function ProfileAvatar({
  name,
  goal,
}: { name: string; goal: FitnessGoal | "" }) {
  const initials =
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  const goalColors: Record<FitnessGoal, string> = {
    "Weight Loss": "from-blue-500/30 to-secondary/20 border-secondary/40",
    "Muscle Gain": "from-accent/30 to-green-600/20 border-accent/40",
    Maintain: "from-purple-500/30 to-purple-600/20 border-purple-400/40",
  };
  const goalColor = goal
    ? goalColors[goal]
    : "from-accent/20 to-accent/10 border-accent/30";

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={`w-20 h-20 rounded-full bg-gradient-to-br ${goalColor} border-2 flex items-center justify-center shadow-lg`}
      >
        <span className="text-2xl font-display font-bold gradient-text">
          {initials}
        </span>
      </div>
      {goal && (
        <span
          className={`text-xs px-3 py-1 rounded-full font-medium border ${
            goal === "Weight Loss"
              ? "bg-secondary/10 border-secondary/30 text-secondary"
              : goal === "Muscle Gain"
                ? "bg-accent/10 border-accent/30 text-accent"
                : "bg-purple-500/10 border-purple-400/30 text-purple-400"
          }`}
        >
          {goal}
        </span>
      )}
    </div>
  );
}

function BMIScale({ bmi }: { bmi: BMIResult }) {
  const pct = getBMIProgress(bmi.value);

  const zones = [
    { label: "Under", max: "18.5", color: "#38BDF8", width: "25%" },
    { label: "Normal", max: "25", color: "#22C55E", width: "25%" },
    { label: "Over", max: "30", color: "#EAB308", width: "25%" },
    { label: "Obese", max: "40+", color: "#F97316", width: "25%" },
  ];

  const badgeBg: Record<string, string> = {
    Underweight: "bg-blue-500/20 text-blue-400 border-blue-400/40",
    Normal: "bg-green-500/20 text-green-400 border-green-400/40",
    Overweight: "bg-yellow-500/20 text-yellow-400 border-yellow-400/40",
    Obese: "bg-orange-500/20 text-orange-400 border-orange-400/40",
  };

  return (
    <div className="space-y-4">
      {/* Big number */}
      <div className="flex items-end gap-4">
        <div
          className={`text-6xl font-display font-bold ${getBMIColor(bmi.category)}`}
        >
          {bmi.value}
        </div>
        <div className="pb-2 space-y-1">
          <span
            className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${badgeBg[bmi.category] ?? ""}`}
          >
            {bmi.category}
          </span>
        </div>
      </div>

      {/* Scale bar */}
      <div className="relative">
        <div className="flex h-3 rounded-full overflow-hidden">
          {zones.map((z) => (
            <div
              key={z.label}
              style={{ width: z.width, background: z.color, opacity: 0.7 }}
            />
          ))}
        </div>
        {/* Pointer */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 border-foreground shadow-lg"
          style={{ left: `calc(${pct}% - 8px)` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 260 }}
        />
      </div>

      {/* Labels */}
      <div className="flex justify-between text-[10px] text-muted-foreground px-0.5">
        <span>
          &lt;18.5
          <br />
          Underweight
        </span>
        <span className="text-center">
          18.5–25
          <br />
          Normal
        </span>
        <span className="text-center">
          25–30
          <br />
          Overweight
        </span>
        <span className="text-right">
          &gt;30
          <br />
          Obese
        </span>
      </div>

      {/* Health message */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {bmi.message}
      </p>
    </div>
  );
}

function FormField({
  label,
  error,
  children,
  delay = 0,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="space-y-1.5"
    >
      <Label className="text-xs text-muted-foreground uppercase tracking-wide font-semibold">
        {label}
      </Label>
      {children}
      {error && (
        <p
          className="text-xs text-destructive flex items-center gap-1"
          data-ocid="profile.field_error"
        >
          <XCircle size={12} /> {error}
        </p>
      )}
    </motion.div>
  );
}

const inputClass =
  "bg-white/5 border-white/20 text-foreground placeholder:text-muted-foreground focus:border-accent/60 focus:ring-1 focus:ring-accent/40 transition-smooth h-11";

const selectClass =
  "w-full h-11 px-3 rounded-md border bg-white/5 border-white/20 text-foreground focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/40 transition-smooth text-sm appearance-none";

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { backend, isFetching } = useBackend();
  const { userProfile, setUserProfile, darkMode, setDarkMode } = useStore();
  const queryClient = useQueryClient();
  const [apiKeyModalOpen, setApiKeyModalOpen] = useState(false);
  const [apiKeyValue, setApiKeyValue] = useState("");
  const [savingKey, setSavingKey] = useState(false);

  // Live BMI from form watch
  const [liveBmi, setLiveBmi] = useState<BMIResult | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: "",
      age: 25,
      gender: "Male",
      heightCm: 170,
      weightKg: 70,
      fitnessGoal: "Maintain",
      activityLevel: "Beginner",
    },
  });

  // Watch weight+height for live BMI
  const watchedHeight = watch("heightCm");
  const watchedWeight = watch("weightKg");
  const watchedGoal = watch("fitnessGoal");
  const watchedName = watch("fullName");

  useEffect(() => {
    const h = Number(watchedHeight);
    const w = Number(watchedWeight);
    if (h > 50 && w > 10) setLiveBmi(calculateBMI(w, h));
  }, [watchedHeight, watchedWeight]);

  // Load profile from backend
  const { isLoading, data: profileData } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!backend) return null;
      return backend.getProfile();
    },
    enabled: !!backend && !isFetching,
    staleTime: 0,
  });

  // Populate form when profile loads from backend
  // Track last populated timestamp to re-populate after saves
  const lastPopulatedAt = useRef<bigint | null>(null);
  useEffect(() => {
    if (profileData && profileData.updatedAt !== lastPopulatedAt.current) {
      lastPopulatedAt.current = profileData.updatedAt;
      const mapped = {
        fullName: profileData.name,
        age: Number(profileData.age),
        gender: profileData.gender as Gender,
        heightCm: profileData.heightCm,
        weightKg: profileData.weightKg,
        fitnessGoal: profileData.fitnessGoal as FitnessGoal,
        activityLevel: profileData.activityLevel as ActivityLevel,
      };
      reset(mapped);
      setUserProfile({
        id: profileData.userId.toString(),
        fullName: profileData.name,
        email: "",
        mobile: "",
        address: "",
        age: Number(profileData.age),
        gender: profileData.gender as Gender,
        heightCm: profileData.heightCm,
        weightKg: profileData.weightKg,
        fitnessGoal: profileData.fitnessGoal as FitnessGoal,
        activityLevel: profileData.activityLevel as ActivityLevel,
        createdAt: String(profileData.createdAt),
        updatedAt: String(profileData.updatedAt),
      });
      setLiveBmi(calculateBMI(profileData.weightKg, profileData.heightCm));
    }
  }, [profileData, reset, setUserProfile]);

  // Has Gemini key
  const { data: hasApiKey } = useQuery({
    queryKey: ["hasGeminiKey"],
    queryFn: async () => {
      if (!backend) return false;
      return backend.hasGeminiApiKey();
    },
    enabled: !!backend && !isFetching,
  });

  // Save profile mutation
  const saveMutation = useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      if (!backend) throw new Error("Backend not available");
      const result = await backend.saveProfile(
        values.fullName,
        BigInt(Math.round(values.age)),
        values.gender,
        values.heightCm,
        values.weightKg,
        values.fitnessGoal,
        values.activityLevel,
        darkMode,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
      return result;
    },
    onSuccess: (_, values) => {
      // Build complete profile from form values — never spread userProfile (may be null on first save)
      const now = new Date().toISOString();
      setUserProfile({
        id: userProfile?.id ?? "",
        fullName: values.fullName,
        email: userProfile?.email ?? "",
        mobile: userProfile?.mobile ?? "",
        address: userProfile?.address ?? "",
        age: values.age,
        gender: values.gender,
        heightCm: values.heightCm,
        weightKg: values.weightKg,
        fitnessGoal: values.fitnessGoal,
        activityLevel: values.activityLevel,
        createdAt: userProfile?.createdAt ?? now,
        updatedAt: now,
      });
      // Refetch from backend so AIPlansPage sees the updated profile
      void queryClient.invalidateQueries({ queryKey: ["profile"] });
      toast.success("Profile saved!", {
        description: "Your fitness profile has been updated.",
      });
    },
    onError: (err: Error) => {
      toast.error("Save failed", { description: err.message });
    },
  });

  const onSubmit = (values: ProfileFormValues) => saveMutation.mutate(values);

  const handleSaveApiKey = async () => {
    if (!backend || !apiKeyValue.trim()) return;
    setSavingKey(true);
    try {
      await backend.setGeminiApiKey(apiKeyValue.trim());
      queryClient.invalidateQueries({ queryKey: ["hasGeminiKey"] });
      toast.success("API key saved!", {
        description: "Gemini AI features are now unlocked.",
      });
      setApiKeyModalOpen(false);
      setApiKeyValue("");
    } catch {
      toast.error("Failed to save API key");
    } finally {
      setSavingKey(false);
    }
  };

  return (
    <div className="px-4 py-6 space-y-6 pb-24" data-ocid="profile.page">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-glass p-6 text-center"
        data-ocid="profile.header"
      >
        {isLoading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-white/5 animate-pulse" />
            <div className="h-4 w-32 rounded bg-white/5 animate-pulse" />
          </div>
        ) : (
          <ProfileAvatar
            name={watchedName || userProfile?.fullName || ""}
            goal={watchedGoal || ""}
          />
        )}
        {userProfile?.fullName && (
          <h1 className="text-xl font-display font-bold text-foreground mt-3">
            {userProfile.fullName}
          </h1>
        )}
        {!userProfile && !isLoading && (
          <p className="text-sm text-muted-foreground mt-2">
            Complete your profile to get started
          </p>
        )}
      </motion.div>

      {/* BMI Card — live preview */}
      <AnimatePresence>
        {liveBmi && (
          <motion.div
            key="bmi-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ delay: 0.1 }}
            className="card-glass p-5 bg-gradient-to-br from-accent/5 to-secondary/5"
            data-ocid="profile.bmi_card"
          >
            <div className="flex items-center gap-2 mb-4">
              <Scale size={16} className="text-accent" />
              <h2 className="font-display font-semibold text-sm text-foreground">
                BMI Analysis
              </h2>
              <span className="ml-auto text-[10px] text-muted-foreground bg-white/5 px-2 py-0.5 rounded-full">
                Live preview
              </span>
            </div>
            <BMIScale bmi={liveBmi} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Profile Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="card-glass p-5"
        data-ocid="profile.form_card"
      >
        <div className="flex items-center gap-2 mb-5">
          <User size={16} className="text-accent" />
          <h2 className="font-display font-semibold text-foreground">
            Profile Details
          </h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Full Name"
            error={errors.fullName?.message}
            delay={0.05}
          >
            <Input
              {...register("fullName", {
                required: "Name is required",
                minLength: { value: 2, message: "Too short" },
              })}
              placeholder="e.g. Aditya Kumar"
              className={inputClass}
              data-ocid="profile.fullname_input"
            />
          </FormField>

          <div className="grid grid-cols-2 gap-3">
            <FormField label="Age" error={errors.age?.message} delay={0.1}>
              <Input
                type="number"
                {...register("age", {
                  required: "Required",
                  valueAsNumber: true,
                  min: { value: 10, message: "Min 10" },
                  max: { value: 100, message: "Max 100" },
                })}
                className={inputClass}
                data-ocid="profile.age_input"
              />
            </FormField>

            <FormField
              label="Gender"
              error={errors.gender?.message}
              delay={0.12}
            >
              <select
                {...register("gender", { required: "Required" })}
                className={selectClass}
                data-ocid="profile.gender_select"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </FormField>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <FormField
              label="Height (cm)"
              error={errors.heightCm?.message}
              delay={0.15}
            >
              <Input
                type="number"
                step="0.1"
                {...register("heightCm", {
                  required: "Required",
                  valueAsNumber: true,
                  min: { value: 100, message: "Min 100" },
                  max: { value: 250, message: "Max 250" },
                })}
                className={inputClass}
                data-ocid="profile.height_input"
              />
            </FormField>

            <FormField
              label="Weight (kg)"
              error={errors.weightKg?.message}
              delay={0.17}
            >
              <Input
                type="number"
                step="0.1"
                {...register("weightKg", {
                  required: "Required",
                  valueAsNumber: true,
                  min: { value: 30, message: "Min 30" },
                  max: { value: 300, message: "Max 300" },
                })}
                className={inputClass}
                data-ocid="profile.weight_input"
              />
            </FormField>
          </div>

          <FormField
            label="Fitness Goal"
            error={errors.fitnessGoal?.message}
            delay={0.2}
          >
            <select
              {...register("fitnessGoal", { required: "Required" })}
              className={selectClass}
              data-ocid="profile.goal_select"
            >
              <option value="Weight Loss">Weight Loss</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="Maintain">Maintain</option>
            </select>
          </FormField>

          <FormField
            label="Activity Level"
            error={errors.activityLevel?.message}
            delay={0.22}
          >
            <select
              {...register("activityLevel", { required: "Required" })}
              className={selectClass}
              data-ocid="profile.activity_select"
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </FormField>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28 }}
            className="pt-2"
          >
            <Button
              type="submit"
              disabled={isSubmitting || saveMutation.isPending}
              className="w-full h-12 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-base transition-smooth"
              data-ocid="profile.save_button"
            >
              {saveMutation.isPending ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-accent-foreground border-t-transparent animate-spin" />
                  Saving...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Save Profile
                </span>
              )}
            </Button>
          </motion.div>
        </form>
      </motion.div>

      {/* Settings Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card-glass p-5"
        data-ocid="profile.settings_card"
      >
        <div className="flex items-center gap-2 mb-4">
          <Settings size={16} className="text-accent" />
          <h2 className="font-display font-semibold text-foreground">
            Settings
          </h2>
        </div>

        <div className="space-y-3">
          {/* Dark mode toggle */}
          <button
            type="button"
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer transition-smooth hover:bg-white/8"
            onClick={() => setDarkMode(!darkMode)}
            data-ocid="profile.darkmode_toggle"
          >
            <div className="flex items-center gap-3">
              {darkMode ? (
                <Moon size={16} className="text-secondary" />
              ) : (
                <Sun size={16} className="text-yellow-400" />
              )}
              <div>
                <div className="text-sm font-medium text-foreground">
                  {darkMode ? "Dark Mode" : "Light Mode"}
                </div>
                <div className="text-xs text-muted-foreground">
                  App appearance
                </div>
              </div>
            </div>
            <div
              className={`w-11 h-6 rounded-full transition-smooth relative ${darkMode ? "bg-accent" : "bg-muted"}`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-smooth ${darkMode ? "left-5" : "left-0.5"}`}
              />
            </div>
          </button>

          {/* Gemini API Key */}
          <button
            type="button"
            className="w-full flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 cursor-pointer transition-smooth hover:bg-white/8"
            onClick={() => setApiKeyModalOpen(true)}
            data-ocid="profile.apikey_button"
          >
            <div className="flex items-center gap-3">
              <Key size={16} className="text-accent" />
              <div>
                <div className="text-sm font-medium text-foreground">
                  Gemini API Key
                </div>
                <div className="text-xs text-muted-foreground">
                  Power AI features
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {hasApiKey ? (
                <span className="text-xs px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30 flex items-center gap-1">
                  <Shield size={10} /> Active
                </span>
              ) : (
                <span className="text-xs px-2 py-0.5 rounded-full bg-destructive/15 text-destructive border border-destructive/30">
                  Not set
                </span>
              )}
              <ChevronRight size={14} className="text-muted-foreground" />
            </div>
          </button>
        </div>
      </motion.div>

      {/* Gemini API Key Modal */}
      <Dialog open={apiKeyModalOpen} onOpenChange={setApiKeyModalOpen}>
        <DialogContent
          className="glass-elevated border-white/12 text-foreground max-w-sm mx-auto"
          data-ocid="profile.apikey_dialog"
        >
          <DialogHeader>
            <DialogTitle className="font-display gradient-text flex items-center gap-2">
              <Key size={18} className="text-accent" />
              Set Gemini API Key
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              Enter your Google Gemini API key to enable AI-powered diet &
              workout plans.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <Input
              type="password"
              placeholder="AIza..."
              value={apiKeyValue}
              onChange={(e) => setApiKeyValue(e.target.value)}
              className={inputClass}
              data-ocid="profile.apikey_input"
              onKeyDown={(e) => e.key === "Enter" && handleSaveApiKey()}
            />
            <p className="text-xs text-muted-foreground">
              Get your free key at{" "}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noreferrer"
                className="text-accent underline"
              >
                aistudio.google.com
              </a>
            </p>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-white/20 text-foreground hover:bg-white/5"
                onClick={() => setApiKeyModalOpen(false)}
                data-ocid="profile.apikey_cancel_button"
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-accent hover:bg-accent/90 text-accent-foreground font-semibold"
                onClick={handleSaveApiKey}
                disabled={savingKey || !apiKeyValue.trim()}
                data-ocid="profile.apikey_confirm_button"
              >
                {savingKey ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </span>
                ) : (
                  "Save Key"
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
