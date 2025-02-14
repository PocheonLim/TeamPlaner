import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

interface DailyNote {
  [key: string]: string;
}

export const useDailyNotes = (selectedDate: Date) => {
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
      const content = editor.getHTML();
      setDailyNotes(prev => ({
        ...prev,
        [format(selectedDate, 'yyyy-MM-dd')]: content
      }));
    },
  });

  useEffect(() => {
    localStorage.setItem('workoutDailyNotes', JSON.stringify(dailyNotes));
  }, [dailyNotes]);

  useEffect(() => {
    if (editor) {
      const savedContent = dailyNotes[format(selectedDate, 'yyyy-MM-dd')] || '';
      editor.commands.setContent(savedContent);
    }
  }, [selectedDate, editor, dailyNotes]);

  return {
    editor,
    dailyNotes
  };
}; 