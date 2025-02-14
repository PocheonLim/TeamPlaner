import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { WorkoutRecord, WorkoutForm } from '../types/workout';

export const useWorkoutRecords = (selectedDate: Date) => {
  const [records, setRecords] = useState<WorkoutRecord[]>(() => {
    const savedRecords = localStorage.getItem('workoutRecords');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });

  useEffect(() => {
    localStorage.setItem('workoutRecords', JSON.stringify(records));
  }, [records]);

  const addRecord = (data: WorkoutForm) => {
    const newRecord: WorkoutRecord = {
      id: Date.now(),
      date: format(selectedDate, 'yyyy-MM-dd'),
      exercise: data.exercise,
      sets: [{ weight: data.weight, reps: data.reps }],
      memo: data.memo,
    };
    setRecords([...records, newRecord]);
    return newRecord;
  };

  const deleteRecord = (id: number) => {
    if (window.confirm('이 운동 기록을 삭제하시겠습니까?')) {
      setRecords(records.filter(record => record.id !== id));
    }
  };

  const getFilteredRecords = () => {
    return records.filter(
      record => record.date === format(selectedDate, 'yyyy-MM-dd')
    );
  };

  return {
    records,
    addRecord,
    deleteRecord,
    getFilteredRecords
  };
}; 