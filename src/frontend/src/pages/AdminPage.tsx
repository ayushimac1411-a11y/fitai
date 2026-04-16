import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  CheckCircle2,
  Dumbbell,
  KeyRound,
  LayoutDashboard,
  Pencil,
  Plus,
  Save,
  Shield,
  ShieldOff,
  Trash2,
  X,
  XCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { Exercise } from "../backend.d";
import { useBackend } from "../hooks/useBackend";
import { useStore } from "../store/useStore";

/* ---------- Types ---------- */
interface ExerciseFormValues {
  name: string;
  muscleGroup: string;
  difficulty: string;
  description: string;
}

const MUSCLE_GROUPS = [
  "Chest",
  "Back",
  "Legs",
  "Shoulders",
  "Arms",
  "Core",
  "Cardio",
];
const DIFFICULTY_LABELS: Record<string, string> = {
  "1": "1 – Beginner",
  "2": "2 – Easy",
  "3": "3 – Intermediate",
  "4": "4 – Hard",
  "5": "5 – Advanced",
};
const DIFFICULTY_COLORS: Record<number, string> = {
  1: "text-accent",
  2: "text-emerald-400",
  3: "text-yellow-400",
  4: "text-orange-400",
  5: "text-red-400",
};

/* ---------- Sub-components ---------- */
function AdminBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-orange-500/20 text-orange-400 border border-orange-500/30">
      <Shield size={10} /> ADMIN
    </span>
  );
}

function AccessDenied({ onBack }: { onBack: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-6"
      data-ocid="admin.access_denied_card"
    >
      <div className="card-glass p-10 text-center max-w-sm w-full">
        <ShieldOff
          size={48}
          className="text-destructive mx-auto mb-4 opacity-80"
        />
        <h2 className="text-xl font-display font-bold text-foreground mb-2">
          Access Denied
        </h2>
        <p className="text-sm text-muted-foreground mb-6">
          You don't have administrator privileges to access this panel.
        </p>
        <Button
          variant="outline"
          className="w-full"
          onClick={onBack}
          data-ocid="admin.back_to_dashboard_button"
        >
          <LayoutDashboard size={14} className="mr-2" />
          Back to Dashboard
        </Button>
      </div>
    </motion.div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
  ocid,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  ocid: string;
}) {
  return (
    <div
      className={`card-glass p-5 flex items-center gap-4 bg-gradient-to-br ${color} to-transparent`}
      data-ocid={ocid}
    >
      <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-background/30">
        {icon}
      </div>
      <div>
        <div className="text-2xl font-display font-bold text-foreground leading-tight">
          {value}
        </div>
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

/* ---------- Exercise Modal ---------- */
interface ExerciseModalProps {
  exercise?: Exercise | null;
  onClose: () => void;
  onSave: (data: ExerciseFormValues) => Promise<void>;
  isSaving: boolean;
}

function ExerciseModal({
  exercise,
  onClose,
  onSave,
  isSaving,
}: ExerciseModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ExerciseFormValues>({
    defaultValues: {
      name: exercise?.name ?? "",
      muscleGroup: exercise?.muscleGroup ?? MUSCLE_GROUPS[0],
      difficulty: exercise ? String(exercise.difficulty) : "3",
      description: exercise?.description ?? "",
    },
  });

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        data-ocid="admin.exercise_modal.dialog"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        />
        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="glass-elevated relative w-full sm:max-w-md rounded-t-2xl sm:rounded-2xl p-6 z-10 max-h-[90vh] overflow-y-auto no-scrollbar"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-display font-bold text-lg text-foreground">
              {exercise ? "Edit Exercise" : "Add New Exercise"}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-muted transition-smooth text-muted-foreground"
              data-ocid="admin.exercise_modal.close_button"
            >
              <X size={18} />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSave)} className="space-y-4">
            {/* Name */}
            <div className="space-y-1.5">
              <Label
                htmlFor="ex-name"
                className="text-sm font-medium text-foreground"
              >
                Exercise Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="ex-name"
                placeholder="e.g. Barbell Squat"
                className="bg-background/50 border-border/60"
                data-ocid="admin.exercise_modal.name_input"
                {...register("name", { required: "Exercise name is required" })}
              />
              {errors.name && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="admin.exercise_modal.name_input.field_error"
                >
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Muscle Group */}
            <div className="space-y-1.5">
              <Label
                htmlFor="ex-muscle"
                className="text-sm font-medium text-foreground"
              >
                Muscle Group
              </Label>
              <select
                id="ex-muscle"
                className="w-full h-10 px-3 rounded-lg bg-background/50 border border-border/60 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                data-ocid="admin.exercise_modal.muscle_group_select"
                {...register("muscleGroup")}
              >
                {MUSCLE_GROUPS.map((g) => (
                  <option key={g} value={g} className="bg-card">
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div className="space-y-1.5">
              <Label
                htmlFor="ex-diff"
                className="text-sm font-medium text-foreground"
              >
                Difficulty
              </Label>
              <select
                id="ex-diff"
                className="w-full h-10 px-3 rounded-lg bg-background/50 border border-border/60 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring transition-smooth"
                data-ocid="admin.exercise_modal.difficulty_select"
                {...register("difficulty")}
              >
                {Object.entries(DIFFICULTY_LABELS).map(([val, label]) => (
                  <option key={val} value={val} className="bg-card">
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <Label
                htmlFor="ex-desc"
                className="text-sm font-medium text-foreground"
              >
                Description <span className="text-destructive">*</span>
              </Label>
              <textarea
                id="ex-desc"
                rows={3}
                placeholder="Describe the exercise, form tips..."
                className="w-full px-3 py-2 rounded-lg bg-background/50 border border-border/60 text-foreground text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring transition-smooth placeholder:text-muted-foreground"
                data-ocid="admin.exercise_modal.description_textarea"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p
                  className="text-xs text-destructive"
                  data-ocid="admin.exercise_modal.description_textarea.field_error"
                >
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                className="flex-1"
                onClick={onClose}
                data-ocid="admin.exercise_modal.cancel_button"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-accent text-accent-foreground hover:bg-accent/90"
                disabled={isSaving}
                data-ocid="admin.exercise_modal.submit_button"
              >
                {isSaving ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-accent-foreground/40 border-t-accent-foreground animate-spin" />
                    Saving...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Save size={14} />
                    {exercise ? "Update" : "Add Exercise"}
                  </span>
                )}
              </Button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

/* ---------- Main Page ---------- */
export default function AdminPage() {
  const { backend, isFetching } = useBackend();
  const queryClient = useQueryClient();
  const { setActiveTab } = useStore();

  const [showExerciseModal, setShowExerciseModal] = useState(false);
  const [editingExercise, setEditingExercise] = useState<Exercise | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [apiKeyInput, setApiKeyInput] = useState("");
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);

  /* --- Queries --- */
  const adminQuery = useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!backend) return false;
      return backend.isAdmin();
    },
    enabled: !!backend && !isFetching,
  });

  const exercisesQuery = useQuery({
    queryKey: ["exercises"],
    queryFn: async () => {
      if (!backend) return [];
      return backend.listExercises();
    },
    enabled: !!backend && !isFetching && adminQuery.data === true,
  });

  const hasKeyQuery = useQuery({
    queryKey: ["hasGeminiApiKey"],
    queryFn: async () => {
      if (!backend) return false;
      return backend.hasGeminiApiKey();
    },
    enabled: !!backend && !isFetching && adminQuery.data === true,
  });

  /* --- Mutations --- */
  const addExerciseMutation = useMutation({
    mutationFn: async (data: ExerciseFormValues & { id: string }) => {
      if (!backend) throw new Error("No backend");
      const result = await backend.addExercise(
        data.id,
        data.name,
        data.muscleGroup,
        BigInt(data.difficulty),
        data.description,
      );
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      setShowExerciseModal(false);
      setEditingExercise(null);
      toast.success("Exercise saved successfully");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteExerciseMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!backend) throw new Error("No backend");
      const result = await backend.deleteExercise(id);
      if (result.__kind__ === "err") throw new Error(result.err);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["exercises"] });
      const prev = queryClient.getQueryData<Exercise[]>(["exercises"]);
      queryClient.setQueryData<Exercise[]>(["exercises"], (old) =>
        (old ?? []).filter((e) => e.id !== id),
      );
      return { prev };
    },
    onError: (_err, _id, ctx) => {
      queryClient.setQueryData(["exercises"], ctx?.prev);
      toast.error("Failed to delete exercise");
    },
    onSuccess: () => {
      setDeletingId(null);
      toast.success("Exercise deleted");
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["exercises"] }),
  });

  const setApiKeyMutation = useMutation({
    mutationFn: async (key: string) => {
      if (!backend) throw new Error("No backend");
      await backend.setGeminiApiKey(key);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hasGeminiApiKey"] });
      setShowApiKeyInput(false);
      setApiKeyInput("");
      toast.success("API key saved securely");
    },
    onError: () => toast.error("Failed to save API key"),
  });

  /* --- Handlers --- */
  const handleSaveExercise = async (data: ExerciseFormValues) => {
    const id = editingExercise?.id ?? `ex_${Date.now()}`;
    await addExerciseMutation.mutateAsync({ ...data, id });
  };

  /* --- Loading state --- */
  const isLoading = isFetching || adminQuery.isLoading;

  if (isLoading) {
    return (
      <div className="px-4 py-6 space-y-4" data-ocid="admin.loading_state">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-2 gap-3">
          <Skeleton className="h-24 rounded-xl" />
          <Skeleton className="h-24 rounded-xl" />
        </div>
        <Skeleton className="h-64 rounded-xl" />
      </div>
    );
  }

  if (adminQuery.data === false) {
    return <AccessDenied onBack={() => setActiveTab("dashboard")} />;
  }

  const exercises: Exercise[] = exercisesQuery.data ?? [];

  return (
    <div className="px-4 py-6 space-y-6 pb-28" data-ocid="admin.page">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl font-display font-bold text-foreground">
              Admin Panel
            </h1>
            <AdminBadge />
          </div>
          <p className="text-xs text-muted-foreground">
            Manage exercises, API keys &amp; app settings
          </p>
        </div>
        <Shield size={28} className="text-orange-400 opacity-70" />
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08 }}
      >
        <StatCard
          icon={<Dumbbell size={20} className="text-accent" />}
          label="Exercises in Library"
          value={exercisesQuery.isLoading ? "—" : exercises.length}
          color="from-accent/10"
          ocid="admin.exercises_stat_card"
        />
      </motion.div>

      {/* Exercise Management */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.14 }}
        data-ocid="admin.exercises_section"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display font-semibold text-foreground flex items-center gap-2">
            <Dumbbell size={16} className="text-accent" />
            Exercise Library
          </h2>
          <Button
            size="sm"
            className="bg-accent text-accent-foreground hover:bg-accent/90 gap-1.5 h-8 text-xs"
            onClick={() => {
              setEditingExercise(null);
              setShowExerciseModal(true);
            }}
            data-ocid="admin.add_exercise_button"
          >
            <Plus size={13} /> Add Exercise
          </Button>
        </div>

        <div className="card-glass overflow-hidden">
          {exercisesQuery.isLoading ? (
            <div className="p-4 space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-14 rounded-lg" />
              ))}
            </div>
          ) : exercises.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-12 text-center px-6"
              data-ocid="admin.exercises_empty_state"
            >
              <Dumbbell size={36} className="text-muted-foreground/40 mb-3" />
              <p className="text-sm font-medium text-foreground">
                No exercises yet
              </p>
              <p className="text-xs text-muted-foreground mt-1 mb-4">
                Add exercises to populate the library
              </p>
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setEditingExercise(null);
                  setShowExerciseModal(true);
                }}
                data-ocid="admin.exercises_empty_state.add_exercise_button"
              >
                <Plus size={13} className="mr-1" /> Add First Exercise
              </Button>
            </div>
          ) : (
            <div className="divide-y divide-border/40">
              {exercises.map((ex, idx) => {
                const diffNum = Number(ex.difficulty);
                const isDeleting = deletingId === ex.id;
                return (
                  <motion.div
                    key={ex.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className={`flex items-center gap-3 px-4 py-3 transition-smooth hover:bg-white/[0.03] ${
                      idx % 2 === 0 ? "bg-transparent" : "bg-white/[0.015]"
                    }`}
                    data-ocid={`admin.exercise_list.item.${idx + 1}`}
                  >
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-foreground truncate max-w-[140px]">
                          {ex.name}
                        </span>
                        <Badge
                          variant="secondary"
                          className="text-[10px] px-1.5 py-0 h-4 bg-muted/50 border-border/40"
                        >
                          {ex.muscleGroup}
                        </Badge>
                        <span
                          className={`text-xs font-semibold ${DIFFICULTY_COLORS[diffNum] ?? "text-muted-foreground"}`}
                        >
                          Lv.{diffNum}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground mt-0.5 line-clamp-1">
                        {ex.description}
                      </p>
                    </div>

                    {/* Actions */}
                    {isDeleting ? (
                      <div
                        className="flex items-center gap-2 shrink-0"
                        data-ocid={`admin.exercise_delete_confirm.${idx + 1}`}
                      >
                        <span className="text-[11px] text-destructive font-medium flex items-center gap-1">
                          <AlertTriangle size={11} /> Delete?
                        </span>
                        <button
                          type="button"
                          className="p-1.5 rounded-md bg-destructive/20 hover:bg-destructive/30 text-destructive transition-smooth"
                          onClick={() => deleteExerciseMutation.mutate(ex.id)}
                          data-ocid={`admin.exercise_confirm_delete_button.${idx + 1}`}
                        >
                          <CheckCircle2 size={14} />
                        </button>
                        <button
                          type="button"
                          className="p-1.5 rounded-md hover:bg-muted text-muted-foreground transition-smooth"
                          onClick={() => setDeletingId(null)}
                          data-ocid={`admin.exercise_cancel_delete_button.${idx + 1}`}
                        >
                          <XCircle size={14} />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          className="p-1.5 rounded-md hover:bg-secondary/20 text-secondary transition-smooth"
                          onClick={() => {
                            setEditingExercise(ex);
                            setShowExerciseModal(true);
                          }}
                          aria-label={`Edit ${ex.name}`}
                          data-ocid={`admin.exercise_edit_button.${idx + 1}`}
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          type="button"
                          className="p-1.5 rounded-md hover:bg-destructive/20 text-destructive/70 hover:text-destructive transition-smooth"
                          onClick={() => setDeletingId(ex.id)}
                          aria-label={`Delete ${ex.name}`}
                          data-ocid={`admin.exercise_delete_button.${idx + 1}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </motion.section>

      {/* Gemini API Key Management */}
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.22 }}
        data-ocid="admin.api_key_section"
      >
        <h2 className="font-display font-semibold text-foreground flex items-center gap-2 mb-3">
          <KeyRound size={16} className="text-secondary" />
          Gemini API Key
        </h2>

        <div className="card-glass p-5 bg-gradient-to-br from-secondary/5 to-transparent">
          {/* Status */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-foreground mb-0.5">
                API Key Status
              </p>
              <p className="text-xs text-muted-foreground">
                Powers AI diet &amp; workout generation
              </p>
            </div>
            {hasKeyQuery.isLoading ? (
              <Skeleton className="h-6 w-20 rounded-full" />
            ) : hasKeyQuery.data ? (
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent/20 text-accent border border-accent/30"
                data-ocid="admin.api_key_status"
              >
                <CheckCircle2 size={12} /> Active
              </span>
            ) : (
              <span
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-destructive/15 text-destructive border border-destructive/30"
                data-ocid="admin.api_key_status"
              >
                <XCircle size={12} /> Not Set
              </span>
            )}
          </div>

          {/* Input toggle */}
          {showApiKeyInput ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-3"
            >
              <div className="space-y-1.5">
                <Label
                  htmlFor="api-key-input"
                  className="text-sm font-medium text-foreground"
                >
                  Enter Gemini API Key
                </Label>
                <Input
                  id="api-key-input"
                  type="password"
                  placeholder="AIza..."
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="bg-background/50 border-border/60 font-mono text-sm"
                  data-ocid="admin.api_key_input"
                />
              </div>
              <div className="flex items-start gap-2 p-3 rounded-lg bg-secondary/10 border border-secondary/20">
                <Shield size={14} className="text-secondary mt-0.5 shrink-0" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  API key is stored securely on the backend canister and never
                  exposed to other users.
                </p>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => {
                    setShowApiKeyInput(false);
                    setApiKeyInput("");
                  }}
                  data-ocid="admin.api_key_cancel_button"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
                  disabled={!apiKeyInput.trim() || setApiKeyMutation.isPending}
                  onClick={() => setApiKeyMutation.mutate(apiKeyInput.trim())}
                  data-ocid="admin.api_key_save_button"
                >
                  {setApiKeyMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 rounded-full border-2 border-secondary-foreground/40 border-t-secondary-foreground animate-spin" />
                      Saving...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Save size={13} /> Save Key
                    </span>
                  )}
                </Button>
              </div>
            </motion.div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="w-full border-secondary/30 text-secondary hover:bg-secondary/10 hover:border-secondary/50"
              onClick={() => setShowApiKeyInput(true)}
              data-ocid="admin.set_api_key_button"
            >
              <KeyRound size={13} className="mr-2" />
              {hasKeyQuery.data ? "Update API Key" : "Set API Key"}
            </Button>
          )}
        </div>
      </motion.section>

      {/* Exercise Modal */}
      {showExerciseModal && (
        <ExerciseModal
          exercise={editingExercise}
          onClose={() => {
            setShowExerciseModal(false);
            setEditingExercise(null);
          }}
          onSave={handleSaveExercise}
          isSaving={addExerciseMutation.isPending}
        />
      )}
    </div>
  );
}
