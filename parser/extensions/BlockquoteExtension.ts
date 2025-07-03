import { MarkdownExtension } from '../MarkdownParser';
import MarkdownIt from 'markdown-it';

export const BlockquoteExtension: MarkdownExtension = {
  name: 'blockquote',
  setup(md: MarkdownIt) {
    // Default blockquote rule is fine for markdown-it
  },
  // Optionally, add postProcess if needed for Tiptap conversion
}; 