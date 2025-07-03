import { MarkdownExtension } from '../MarkdownParser';
import MarkdownIt from 'markdown-it';

export const BoldExtension: MarkdownExtension = {
  name: 'bold',
  setup(md: MarkdownIt) {
    // Default strong rule is fine for markdown-it
  },
  // Optionally, add postProcess if needed for Tiptap conversion
}; 