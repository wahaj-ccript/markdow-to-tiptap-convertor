import { MarkdownExtension } from '../MarkdownParser';
import MarkdownIt from 'markdown-it';

export const TableExtension: MarkdownExtension = {
  name: 'table',
  setup(md: MarkdownIt) {
    // Default table support is enabled in markdown-it
  },
  // Optionally, add postProcess if needed for Tiptap conversion
}; 