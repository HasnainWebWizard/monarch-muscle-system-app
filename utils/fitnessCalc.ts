// utils/fitnessCalc.ts

export interface BodyMetrics {
  heightCm: number; // Dynamic height in centimeters
  weightKg: number; // Dynamic weight in kilograms
  age: number;
  gender: 'male' | 'female';
}

/**
 * Dynamically calculates Body Mass Index (BMI) for any height and weight scale.
 * Formula: weight (kg) / height (m)^2
 */
export function calculateBMI(heightCm: number, weightKg: number): { bmi: number; category: string } {
  if (heightCm <= 0 || weightKg <= 0) return { bmi: 0, category: 'Unknown' };

  const heightMeters = heightCm / 100;
  const bmi = parseFloat((weightKg / (heightMeters * heightMeters)).toFixed(1));

  let category = 'Normal';
  if (bmi < 18.5) category = 'Underweight';
  else if (bmi >= 25 && bmi < 29.9) category = 'Overweight';
  else if (bmi >= 30) category = 'Obese';

  return { bmi, category };
}

/**
 * Calculates Total Daily Energy Expenditure (TDEE) using the Mifflin-St Jeor Equation.
 * Completely adjusts based on the individual's specific metrics.
 */
export function calculateTDEE(metrics: BodyMetrics, activityMultiplier: number = 1.2): number {
  const { heightCm, weightKg, age, gender } = metrics;
  
  if (heightCm <= 0 || weightKg <= 0 || age <= 0) return 0;

  // Mifflin-St Jeor BMR formula
  const baseBMR = 10 * weightKg + 6.25 * heightCm - 5 * age;
  const bmr = gender === 'male' ? baseBMR + 5 : baseBMR - 161;

  return Math.round(bmr * activityMultiplier);
}

/**
 * Calculates a dynamic daily water intake target in liters based on body weight.
 * Baseline approach: ~35ml of water per kg of body weight.
 */
export function calculateWaterGoal(weightKg: number): number {
  if (weightKg <= 0) return 0;
  return parseFloat(((weightKg * 35) / 1000).toFixed(1));
}