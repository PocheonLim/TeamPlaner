import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { WorkoutForm } from '../types/workout';

interface WorkoutRecord {
  id: number;
  date: string;
  exercise: string;
  sets: Array<{ weight: number; reps: number }>;
  memo?: string;
}

export const useWorkoutRecords = (selectedDate: Date) => {
  const { user } = useAuth();
  const [records, setRecords] = useState<WorkoutRecord[]>([]);

  useEffect(() => {
    if (user?.workouts) {
      setRecords(user.workouts);
    }
  }, [user]);

  const getFilteredRecords = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    return records.filter(record => record.date === dateStr);
  };

  const addRecord = (data: WorkoutForm) => {
    if (!user) return;

    const newRecord: WorkoutRecord = {
      id: Date.now(),
      date: selectedDate.toISOString().split('T')[0],
      exercise: data.exercise,
      sets: [{ weight: Number(data.weight), reps: Number(data.reps) }],
      memo: data.memo
    };

    const updatedRecords = [...records, newRecord];
    setRecords(updatedRecords);
    // 실제 구현에서는 여기서 서버에 데이터를 저장해야 합니다
  };

  const deleteRecord = (id: number) => {
    if (!user) return;

    const updatedRecords = records.filter(record => record.id !== id);
    setRecords(updatedRecords);
    // 실제 구현에서는 여기서 서버에서 데이터를 삭제해야 합니다
  };

  return {
    records,
    addRecord,
    deleteRecord,
    getFilteredRecords
  };
}; 