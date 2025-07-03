import { MarkdownExtension } from '../MarkdownParser';
import MarkdownIt from 'markdown-it';

export const CodeBlockExtension: MarkdownExtension = {
  name: 'code_block',
  setup(md: MarkdownIt) {
    // Default fence rule is fine for markdown-it
  },
  // Optionally, add postProcess if needed for Tiptap conversion
}; 