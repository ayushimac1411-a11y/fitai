import type { BMIResult } from "../types/fitness";

export function calculateBMI(weightKg: number, heightCm: number): BMIResult {
  const heightM = heightCm / 100;
  const value = Math.round((weightKg / (heightM * heightM)) * 10) / 10;
  const category = getBMICategory(value);
  const message = getBMIMessage(value);
  return { value, category, message };
}

export function getBMICategory(
  bmi: number,
): "Underweight" | "Normal" | "Overweight" | "Obese" {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function getBMIMessage(bmi: number): string {
  if (bmi < 18.5) {
    return "You are underweight. Focus on nutrient-dense foods and strength training to build healthy mass.";
  }
  if (bmi < 25) {
    return "Your BMI is in the healthy range. Keep up your balanced lifestyle to maintain it!";
  }
  if (bmi < 30) {
    return "You are slightly overweight. A mix of cardio and mindful eating can help you reach a healthier weight.";
  }
  return "Your BMI indicates obesity. Consult a healthcare professional and start with low-intensity workouts and a structured diet.";
}

export function getBMIColor(category: string): string {
  switch (category) {
    case "Underweight":
      return "text-blue-400";
    case "Normal":
      return "text-green-400";
    case "Overweight":
      return "text-yellow-400";
    case "Obese":
      return "text-red-400";
    default:
      return "text-foreground";
  }
}

export function getBMIProgress(bmi: number): number {
  // Maps BMI 10-40 to 0-100 percent for progress ring
  const clamped = Math.max(10, Math.min(40, bmi));
  return ((clamped - 10) / 30) * 100;
}
