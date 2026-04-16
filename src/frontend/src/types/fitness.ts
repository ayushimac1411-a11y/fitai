export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  heightCm: number;
  weightKg: number;
  address: string;
  fitnessGoal: "Weight Loss" | "Muscle Gain" | "Maintain";
  activityLevel: "Beginner" | "Intermediate" | "Advanced";
  createdAt: string;
  updatedAt: string;
}

export interface WeightEntry {
  date: string;
  weightKg: number;
  note?: string;
}

export interface DailyCheckIn {
  date: string;
  workoutCompleted: boolean;
  dietFollowed: boolean;
  waterIntakeLiters: number;
  steps: number;
  notes?: string;
}

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  description: string;
  videoUrl?: string;
  correctFormTip: string;
  wrongFormWarning: string;
  durationSeconds: number;
  sets?: number;
  reps?: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface AIPlan {
  id: string;
  userId: string;
  type: "diet" | "workout";
  content: string;
  generatedAt: string;
  weekStartDate: string;
}

export interface BMIResult {
  value: number;
  category: "Underweight" | "Normal" | "Overweight" | "Obese";
  message: string;
}

export type Result<T> = { ok: T } | { err: string };

export interface WeeklyTracking {
  date: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  workoutMinutes: number;
  workoutCompleted: boolean;
}

export interface StreakData {
  currentStreak: number;
  longestStreak: number;
  lastCheckIn: string;
}

export type FitnessGoal = "Weight Loss" | "Muscle Gain" | "Maintain";
export type ActivityLevel = "Beginner" | "Intermediate" | "Advanced";
export type Gender = "Male" | "Female" | "Other";
