import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import "../styles/pages/Diary.css";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

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
  { value: 'overhead', label: '밀리터리 프레스' },
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

  const editor = useEditor({
    extensions: [StarterKit],
    content: dailyNotes[format(selectedDate, 'yyyy-MM-dd')] || '',
    editorProps: {
      attributes: {
        class: 'diary-editor-content',
      },
    },
    onUpdate: ({ editor }) => {
      setDailyNotes(prev => ({
        ...prev,
        [format(selectedDate, 'yyyy-MM-dd')]: editor.getHTML()
      }));
    },
  });

  useEffect(() => {
    localStorage.setItem('workoutRecords', JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem('workoutDailyNotes', JSON.stringify(dailyNotes));
  }, [dailyNotes]);

  useEffect(() => {
    if (editor) {
      const savedContent = dailyNotes[format(selectedDate, 'yyyy-MM-dd')] || '';
      editor.commands.setContent(savedContent);
    }
  }, [selectedDate, editor, dailyNotes]);

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

  const deleteRecord = (id: number) => {
    if (window.confirm('이 운동 기록을 삭제하시겠습니까?')) {
      setRecords(records.filter(record => record.id !== id));
    }
  };

  const filteredRecords = records.filter(
    record => record.date === format(selectedDate, 'yyyy-MM-dd')
  );

  const getChartData = () => {
    if (!selectedExercise) return [];

    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = format(new Date(Date.now() - i * 24 * 60 * 60 * 1000), 'yyyy-MM-dd');
      const record = records.find(r => 
        r.date === date && r.exercise === selectedExercise
      );
      return {
        date: format(new Date(Date.now() - i * 24 * 60 * 60 * 1000), 'MM/dd'),
        volume: (record?.sets[0]?.weight || 0) * (record?.sets[0]?.reps || 0),
        memo: record?.memo || ''
      };
    }).reverse();

    return last7Days;
  };

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