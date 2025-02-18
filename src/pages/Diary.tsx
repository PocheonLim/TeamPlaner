import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ko } from 'date-fns/locale';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styled from 'styled-components';
import { EditorContent } from '@tiptap/react';
import { useWorkoutRecords } from '../hooks/useWorkoutRecords';
import { useDailyNotes } from '../hooks/useDailyNotes';
import { useWorkoutChart } from '../hooks/useWorkoutChart';
import { WorkoutForm } from '../types/workout';

const DiaryContainer = styled.div`
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
`;

const DiaryHeader = styled.div`
  margin-bottom: 32px;

  h1 {
    font-size: 28px;
    color: #111827;
    margin: 0;
  }

  p {
    color: #6B7280;
    margin: 8px 0 0 0;
  }
`;

const DatePickerWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
`;

const StyledDatePicker = styled(DatePicker)`
  border: none;
  background: none;
  font-size: 20px;
  color: #111827;
  font-weight: 500;
  cursor: pointer;
`;

const CalendarButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const DiaryContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const WorkoutFormContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const FormGroup = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 8px;
    color: #374151;
    font-weight: 500;
  }

  select,
  input,
  textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #D1D5DB;
    border-radius: 6px;
    font-size: 14px;
  }
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563EB;
  }
`;

const WorkoutHistory = styled.div`
  background: transparent;
  padding: 24px;
  box-shadow: none;
`;

const RecordCard = styled.div`
  padding: 16px;
  background: #F9FAFB;
  border-radius: 8px;
  margin-bottom: 12px;

  h3 {
    margin: 0 0 8px 0;
    color: #111827;
  }

  p {
    margin: 4px 0;
    color: #4B5563;
  }

  .memo {
    color: #6B7280;
    font-size: 14px;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #E5E7EB;
  }
`;

const DiaryEditor = styled.div`
  margin-top: 16px;
  border: 1px solid #E5E7EB;
  border-radius: 8px;
  background-color: white;
  overflow: hidden;

  .ProseMirror {
    min-height: 400px;
    padding: 20px;
    background-color: white;
  }
`;

const EditorToolbar = styled.div`
  padding: 8px;
  border-bottom: 1px solid #E5E7EB;
  background-color: #F9FAFB;
  display: flex;
  gap: 4px;
`;

const ToolbarButton = styled.button<{ $isActive?: boolean }>`
  width: 32px;
  height: 32px;
  padding: 0;
  background: ${props => props.$isActive ? '#e5e7eb' : 'transparent'};
  border: none;
  border-radius: 4px;
  font-size: 18px;
  color: ${props => props.$isActive ? '#000' : '#666'};
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f3f4f6;
  }
`;

const ChartSection = styled.div`
  grid-column: 1 / -1;
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CustomTooltip = styled.div`
  background: white;
  padding: 8px;
  border: 1px solid #E5E7EB;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  p {
    margin: 0;
    &.memo {
      color: #6B7280;
      font-size: 12px;
      margin-top: 4px;
    }
  }
`;

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
    <DiaryContainer>
      <DiaryHeader>
        <DatePickerWrapper>
          <CalendarButton 
            onClick={() => (document.querySelector('.react-datepicker-wrapper input') as HTMLElement)?.click()}
          >
            📅
          </CalendarButton>
          <StyledDatePicker
            selected={selectedDate}
            onChange={(date: Date | null) => date && setSelectedDate(date)}
            dateFormat="yyyy년 MM월 dd일 (eee)"
            locale={ko}
          />
        </DatePickerWrapper>
        <h1>운동 일지</h1>
      </DiaryHeader>

      <DiaryContent>
        <WorkoutFormContainer>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
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
            </FormGroup>

            <FormRow>
              <FormGroup>
                <label>무게 (kg)</label>
                <input type="number" {...register('weight')} />
              </FormGroup>
              <FormGroup>
                <label>횟수</label>
                <input type="number" {...register('reps')} />
              </FormGroup>
            </FormRow>

            <FormGroup>
              <label>메모</label>
              <textarea 
                {...register('memo')} 
                placeholder="운동 중 특이사항을 기록하세요"
              />
            </FormGroup>

            <SubmitButton type="submit">기록하기</SubmitButton>
          </form>
        </WorkoutFormContainer>

        <WorkoutHistory>
          <h2>운동 일지</h2>
          <div>
            {filteredRecords.map(record => (
              <RecordCard key={record.id}>
                <div>
                  <h3>{exerciseOptions.find(opt => opt.value === record.exercise)?.label}</h3>
                  <button 
                    onClick={() => deleteRecord(record.id)}
                    title="삭제"
                  >
                    ❌
                  </button>
                </div>
                <p>무게: {record.sets[0].weight}kg / 횟수: {record.sets[0].reps}회</p>
                {record.memo && <p className="memo">{record.memo}</p>}
              </RecordCard>
            ))}
          </div>
          <DiaryEditor>
            <EditorToolbar>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBold().run()}
                $isActive={editor?.isActive('bold')}
                title="굵게"
              >
                B
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleItalic().run()}
                $isActive={editor?.isActive('italic')}
                title="기울임"
              >
                I
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleBulletList().run()}
                $isActive={editor?.isActive('bulletList')}
                title="목록"
              >
                •
              </ToolbarButton>
              <ToolbarButton
                onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                $isActive={editor?.isActive('orderedList')}
                title="번호"
              >
                1
              </ToolbarButton>
            </EditorToolbar>
            <EditorContent editor={editor} />
          </DiaryEditor>
        </WorkoutHistory>

        {selectedExercise && (
          <ChartSection>
            <h2>{exerciseOptions.find(opt => opt.value === selectedExercise)?.label} 진행 현황</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    return (
                      <CustomTooltip>
                        <p>볼륨: {payload[0].value} kg×회</p>
                        {payload[0].payload.memo && (
                          <p className="memo">{payload[0].payload.memo}</p>
                        )}
                      </CustomTooltip>
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
          </ChartSection>
        )}
      </DiaryContent>
    </DiaryContainer>
  );
};

export default Diary; 