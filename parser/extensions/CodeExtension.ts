import { MarkdownExtension } from '../MarkdownParser';
import MarkdownIt from 'markdown-it';

export const CodeExtension: MarkdownExtension = {
  name: 'code',
  setup(md: MarkdownIt) {
    // Default code_inline rule is fine for markdown-it
  },
  // Optionally, add postProcess if needed for Tiptap conversion
}; 