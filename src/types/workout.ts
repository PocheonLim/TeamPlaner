export interface WorkoutSet {
  weight: number;
  reps: number;
}

export interface WorkoutRecord {
  id: number;
  date: string;
  exercise: string;
  sets: WorkoutSet[];
  memo: string;
}

export interface WorkoutForm {
  exercise: string;
  weight: number;
  reps: number;
  memo: string;
} 