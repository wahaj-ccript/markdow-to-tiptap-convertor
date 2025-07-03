import { MarkdownExtension } from '../MarkdownParser';
import MarkdownIt from 'markdown-it';

export const LinkExtension: MarkdownExtension = {
  name: 'link',
  setup(md: MarkdownIt) {
    // Default link rule is fine for markdown-it
  },
  // Optionally, add postProcess if needed for Tiptap conversion
}; 