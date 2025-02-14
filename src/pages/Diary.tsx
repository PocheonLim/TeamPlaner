import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ko } from 'date-fns/locale';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/pages/Diary.css";
import { EditorContent } from '@tiptap/react';
import { useWorkoutRecords } from '../hooks/useWorkoutRecords';
import { useDailyNotes } from '../hooks/useDailyNotes';
import { useWorkoutChart } from '../hooks/useWorkoutChart';
import { WorkoutForm } from '../types/workout';

const exerciseOptions = [
  { value: 'squat', label: '스쿼트' },
  { value: 'deadlift', label: '데드리프트' },
  { value: 'benchPress', label: '벤치프레스' },
  { value: 'overhead', label: '밀리터리 프레스' },
];

const Diary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedExercise, setSelectedExercise] = useState('');
  const { records, addRecord, deleteRecord, getFilteredRecords } = useWorkoutRecords(selectedDate);
  const { editor } = useDailyNotes(selectedDate);
  const { getChartData } = useWorkoutChart(records);
  const { register, handleSubmit, reset } = useForm<WorkoutForm>();

  const onSubmit = (data: WorkoutForm) => {
    addRecord(data);
    reset();
  };

  const filteredRecords = getFilteredRecords();
  const chartData = getChartData(selectedExercise);

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
          <div className="workout-records">
            {filteredRecords.map(record => (
              <div key={record.id} className="record-card">
                <div className="record-header">
                  <h3>{exerciseOptions.find(opt => opt.value === record.exercise)?.label}</h3>
                  <button 
                    onClick={() => deleteRecord(record.id)}
                    className="delete-btn"
                    title="삭제"
                  >
                    ❌
                  </button>
                </div>
                <p>무게: {record.sets[0].weight}kg / 횟수: {record.sets[0].reps}회</p>
                {record.memo && <p className="memo">{record.memo}</p>}
              </div>
            ))}
          </div>
          <div className="diary-editor">
            <div className="editor-toolbar">
              <button
                onClick={() => editor?.chain().focus().toggleBold().run()}
                className={editor?.isActive('bold') ? 'is-active' : ''}
                title="굵게"
              >
                B
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                className={editor?.isActive('italic') ? 'is-active' : ''}
                title="기울임"
              >
                I
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                className={editor?.isActive('bulletList') ? 'is-active' : ''}
                title="목록"
              >
                •
              </button>
              <button
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                className={editor?.isActive('orderedList') ? 'is-active' : ''}
                title="번호"
              >
                1
              </button>
            </div>
            <EditorContent editor={editor} />
          </div>
        </div>

        {selectedExercise && (
          <div className="chart-section">
            <h2>{exerciseOptions.find(opt => opt.value === selectedExercise)?.label} 진행 현황</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
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