"use client";
import React, { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Strike from '@tiptap/extension-strike';

interface TiptapEditorProps {
  content: any;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({ content }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Table.configure({ resizable: true }),
      TableRow,
      TableCell,
      TableHeader,
      TaskList,
      TaskItem,
      Strike,
    ],
    content,
    editable: false,
  });

  // Update editor content when prop changes
  useEffect(() => {
    if (editor && content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  return (
    <div className="tiptap border rounded p-2 bg-white min-h-[120px]">
      <EditorContent editor={editor} />
    </div>
  );
}; 