import { useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

export const useDailyNotes = (selectedDate: Date) => {
  const { user } = useAuth();
  
  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
    onUpdate: ({ editor }) => {
      if (!user) return;
      // 실제 구현에서는 여기서 서버에 데이터를 저장해야 합니다
      const content = editor.getHTML();
      console.log('저장된 내용:', content);
    }
  });

  useEffect(() => {
    if (user && editor) {
      const dateStr = selectedDate.toISOString().split('T')[0];
      const content = user.notes[dateStr] || '';
      editor.commands.setContent(content);
    }
  }, [selectedDate, user, editor]);

  return { editor };
}; 