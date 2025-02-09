import { useState, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import '../styles/Schedule.css';

interface Todo {
  id: number;
  title: string;
  date: string;
  completed: boolean;
}

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
    <div 
      ref={setNodeRef}
      style={style}
      className="todo-item"
    >
      <div {...attributes} {...listeners} className="drag-handle">
        ⋮⋮
      </div>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className={todo.completed ? 'completed' : ''}>
        {todo.title}
      </span>
      <button 
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
      >
        삭제
      </button>
    </div>
  );
};

const Feature1 = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [newTodo, setNewTodo] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

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
    <div className="schedule-container">
      <div className="calendar-section">
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
      </div>
      
      <div className="todo-section">
        <h2>{formatDate(selectedDate)}의 플랜</h2>
        <div className="todo-input">
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="새로운 일정을 입력하세요"
          />
          <button onClick={handleAddTodo}>추가</button>
        </div>
        
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={filteredTodos.map(todo => todo.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="todo-list">
              {filteredTodos.map((todo) => (
                <SortableItem
                  key={todo.id}
                  todo={todo}
                  onDelete={handleDeleteTodo}
                  onToggle={handleToggleTodo}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default Feature1; 