import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';

interface Todo {
  id: number;
  title: string;
  date: string;
  completed: boolean;
}

const ScheduleContainer = styled.div`
  display: flex;
  gap: 24px;
  padding: 24px;
`;

const CalendarSection = styled.div`
  flex: 2;
  background: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TodoSection = styled.div`
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TodoInputContainer = styled.div`
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
`;

const TodoInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 4px;
`;

const AddButton = styled.button`
  padding: 8px 16px;
  background-color: #3B82F6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const TodoList = styled.div`
  min-height: 50px;
`;

const TodoItemContainer = styled.div<{ $isDragging?: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px;
  border-bottom: 1px solid #eee;
  background: white;
`;

const CompletedText = styled.span<{ $completed: boolean }>`
  text-decoration: ${props => props.$completed ? 'line-through' : 'none'};
  color: ${props => props.$completed ? '#9CA3AF' : 'inherit'};
`;

const DragHandle = styled.div`
  cursor: grab;
  color: #9CA3AF;
  padding: 0 4px;
  user-select: none;
  
  &:active {
    cursor: grabbing;
  }
`;

const DeleteButton = styled.button`
  margin-left: auto;
  padding: 4px 8px;
  background-color: #EF4444;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #DC2626;
  }
`;

const SortableItem = ({ todo, onDelete, onToggle }: { 
  todo: Todo; 
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <TodoItemContainer 
      ref={setNodeRef}
      style={style}
    >
      <DragHandle {...attributes} {...listeners}>
        ⋮⋮
      </DragHandle>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <CompletedText $completed={todo.completed}>
        {todo.title}
      </CompletedText>
      <DeleteButton onClick={() => onDelete(todo.id)}>
        삭제
      </DeleteButton>
    </TodoItemContainer>
  );
};

const Schedule = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>(() => {
    return user?.todos || [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    if (user) {
      setTodos(user.todos);
    }
  }, [user]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now(),
        title: newTodo,
        date: selectedDate.toISOString().split('T')[0],
        completed: false
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map(t => 
      t.id === id ? {...t, completed: !t.completed} : t
    ));
  };

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active && over && active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const filteredTodos = todos.filter(
    todo => todo.date === selectedDate.toISOString().split('T')[0]
  );

  return (
    <ScheduleContainer>
      <CalendarSection>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={[
            ...todos.map(todo => ({
              title: todo.title,
              date: todo.date,
              backgroundColor: todo.completed ? '#10B981' : '#3B82F6'
            })),
            {
              start: selectedDate.toISOString().split('T')[0],
              end: new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0],
              display: 'background',
              backgroundColor: 'rgba(200, 200, 200, 0.5)'
            }
          ]}
          dateClick={(info) => {
            setSelectedDate(new Date(info.dateStr));
          }}
        />
      </CalendarSection>
      
      <TodoSection>
        <h2>{formatDate(selectedDate)}의 플랜</h2>
        <TodoInputContainer>
          <TodoInput
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="새로운 일정을 입력하세요"
          />
          <AddButton onClick={handleAddTodo}>추가</AddButton>
        </TodoInputContainer>
        
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredTodos.map(todo => todo.id)}
            strategy={verticalListSortingStrategy}
          >
            <TodoList>
              {filteredTodos.map((todo) => (
                <SortableItem
                  key={todo.id}
                  todo={todo}
                  onDelete={handleDeleteTodo}
                  onToggle={handleToggleTodo}
                />
              ))}
            </TodoList>
          </SortableContext>
        </DndContext>
      </TodoSection>
    </ScheduleContainer>
  );
};

export default Schedule; 