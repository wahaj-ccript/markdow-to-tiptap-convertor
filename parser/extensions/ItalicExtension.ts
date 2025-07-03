import { MarkdownExtension } from '../MarkdownParser';
import MarkdownIt from 'markdown-it';

export const ItalicExtension: MarkdownExtension = {
  name: 'italic',
  setup(md: MarkdownIt) {
    // Default em rule is fine for markdown-it
  },
  // Optionally, add postProcess if needed for Tiptap conversion
}; 