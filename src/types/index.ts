export interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
  isScalable: boolean;
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  order: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  baseWeightGrams: number;
  ingredients: Ingredient[];
  phases: Phase[];
}

export interface ActiveTimer {
  id: string;
  recipeId: string;
  phaseId: string;
  startTime: string; // ISO string
  endTime: string;   // ISO string
  status: 'running' | 'completed' | 'paused';
}
