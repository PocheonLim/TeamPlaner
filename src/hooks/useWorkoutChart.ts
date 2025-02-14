import { format } from 'date-fns';
import { WorkoutRecord } from '../types/workout';

interface ChartData {
  date: string;
  volume: number;
  memo: string;
}

export const useWorkoutChart = (records: WorkoutRecord[]) => {
  const getChartData = (selectedExercise: string): ChartData[] => {
    if (!selectedExercise) return [];

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = format(new Date(Date.now() - i * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
      const record = records.find(r => 
        r.date === date && r.exercise === selectedExercise
      );

      return {
        date: format(new Date(Date.now() - i * 24 * 60 * 60 * 1000), 'MM/dd'),
        volume: record ? record.sets.reduce((sum, set) => sum + (set.weight * set.reps), 0) : 0,
        memo: record?.memo || ''
      };
    }).reverse();

    return last7Days;
  };

  return {
    getChartData
  };
}; 