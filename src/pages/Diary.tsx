import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format, subDays } from 'date-fns';
import { ko } from 'date-fns/locale';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../styles/Diary.css';

interface WorkoutSet {
  weight: number;
  reps: number;
}

interface WorkoutRecord {
  id: number;
  date: string;
  exercise: string;
  sets: WorkoutSet[];
  memo: string;
}

interface WorkoutForm {
  exercise: string;
  weight: number;
  reps: number;
  memo: string;
}

interface DailyNote {
  [key: string]: string;
}

const exerciseOptions = [
  { value: 'squat', label: '스쿼트' },
  { value: 'deadlift', label: '데드리프트' },
  { value: 'benchPress', label: '벤치프레스' },
  { value: 'overhead', label: '오버헤드 프레스' },
  { value: 'rowing', label: '로잉' }
];

const Diary = () => {
  const [records, setRecords] = useState<WorkoutRecord[]>(() => {
    const savedRecords = localStorage.getItem('workoutRecords');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });
  
  const { register, handleSubmit, reset } = useForm<WorkoutForm>();
  const [selectedExercise, setSelectedExercise] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dailyNotes, setDailyNotes] = useState<DailyNote>(() => {
    const savedNotes = localStorage.getItem('workoutDailyNotes');
    return savedNotes ? JSON.parse(savedNotes) : {};
  });

  // 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem('workoutRecords', JSON.stringify(records));
  }, [records]);

  // 일일 노트 저장
  useEffect(() => {
    localStorage.setItem('workoutDailyNotes', JSON.stringify(dailyNotes));
  }, [dailyNotes]);

  // 차트 데이터 준비 함수 수정
  const getChartData = () => {
    if (!selectedExercise) return [];

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = format(subDays(new Date(), i), 'yyyy-MM-dd');
      const record = records.find(r => 
        r.date === date && r.exercise === selectedExercise
      );
      return {
        date: format(subDays(new Date(), i), 'MM/dd'),
        volume: (record?.sets[0]?.weight || 0) * (record?.sets[0]?.reps || 0),
        memo: record?.memo || ''  // 메모 데이터 추가
      };
    }).reverse();

    return last7Days;
  };

  const onSubmit = (data: WorkoutForm) => {
    const newRecord: WorkoutRecord = {
      id: Date.now(),
      date: format(selectedDate, 'yyyy-MM-dd'),
      exercise: data.exercise,
      sets: [{ weight: data.weight, reps: data.reps }],
      memo: data.memo,
    };

    setRecords([...records, newRecord]);
    reset();
  };

  // 선택된 날짜의 기록만 필터링
  const filteredRecords = records.filter(
    record => record.date === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div className="diary-container">
      <div className="diary-header">
        <div className="date-picker-wrapper">
          <button 
            className="calendar-button"
            onClick={() => (document.querySelector('.date-picker') as HTMLElement)?.click()}
          >
            📅
          </button>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => date && setSelectedDate(date)}
            dateFormat="yyyy년 MM월 dd일 (eee)"
            locale={ko}
            className="date-picker"
          />
        </div>
        <h1>운동 일지</h1>
      </div>

      <div className="diary-content">
        <div className="workout-form">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <label>운동 종류</label>
              <select 
                {...register('exercise')} 
                onChange={(e) => setSelectedExercise(e.target.value)}
              >
                <option value="">선택하세요</option>
                {exerciseOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>무게 (kg)</label>
                <input type="number" {...register('weight')} />
              </div>
              <div className="form-group">
                <label>횟수</label>
                <input type="number" {...register('reps')} />
              </div>
            </div>

            <div className="form-group">
              <label>메모</label>
              <textarea 
                {...register('memo')} 
                placeholder="운동 중 특이사항을 기록하세요"
              />
            </div>

            <button type="submit" className="submit-btn">기록하기</button>
          </form>
        </div>

        <div className="workout-history">
          <h2>운동 일지</h2>
          {filteredRecords.map(record => (
            <div key={record.id} className="record-card">
              <h3>{exerciseOptions.find(opt => opt.value === record.exercise)?.label}</h3>
              <p>무게: {record.sets[0].weight}kg / 횟수: {record.sets[0].reps}회</p>
              {record.memo && <p className="memo">{record.memo}</p>}
            </div>
          ))}
          <textarea 
            className="daily-note"
            placeholder="오늘의 운동 내용을 자유롭게 기록하세요..."
            value={dailyNotes[format(selectedDate, 'yyyy-MM-dd')] || ''}
            onChange={(e) => {
              setDailyNotes(prev => ({
                ...prev,
                [format(selectedDate, 'yyyy-MM-dd')]: e.target.value
              }));
            }}
          />
        </div>

        {selectedExercise && (
          <div className="chart-section">
            <h2>{exerciseOptions.find(opt => opt.value === selectedExercise)?.label} 진행 현황</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={getChartData()}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="custom-tooltip">
                        <p>볼륨: {payload[0].value} kg×회</p>
                        {payload[0].payload.memo && (
                          <p className="memo">{payload[0].payload.memo}</p>
                        )}
                      </div>
                    );
                  }
                  return null;
                }}/>
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#10B981" 
                  name="볼륨 (kg×회)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Diary; 