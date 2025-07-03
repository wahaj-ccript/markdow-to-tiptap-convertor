import { MarkdownExtension } from '../MarkdownParser';
import MarkdownIt from 'markdown-it';

export const HeadingExtension: MarkdownExtension = {
  name: 'heading',
  setup(md: MarkdownIt) {
    // Default heading rule is fine for markdown-it, so no custom rule needed
  },
  // Optionally, add postProcess if needed for Tiptap conversion
}; 