import { MarkdownExtension } from '../MarkdownParser';
import MarkdownIt from 'markdown-it';

export const StrikeExtension: MarkdownExtension = {
  name: 'strike',
  setup(md: MarkdownIt) {
    md.enable('strikethrough'); // Ensure strikethrough is enabled
  },
  // Optionally, add postProcess if needed for Tiptap conversion
}; 