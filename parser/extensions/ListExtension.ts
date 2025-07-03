import { MarkdownExtension } from '../MarkdownParser';
import MarkdownIt from 'markdown-it';

export const ListExtension: MarkdownExtension = {
  name: 'list',
  setup(md: MarkdownIt) {
    // Default list rules are fine for markdown-it
  },
  // Optionally, add postProcess if needed for Tiptap conversion
}; 