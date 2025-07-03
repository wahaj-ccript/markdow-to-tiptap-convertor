import { MarkdownExtension } from '../MarkdownParser';
import MarkdownIt from 'markdown-it';
import markdownItTaskLists from 'markdown-it-task-lists';

export const TaskListExtension: MarkdownExtension = {
  name: 'task_list',
  setup(md: MarkdownIt) {
    md.use(markdownItTaskLists, { enabled: true });
  },
  // Optionally, add postProcess if needed for Tiptap conversion
}; 