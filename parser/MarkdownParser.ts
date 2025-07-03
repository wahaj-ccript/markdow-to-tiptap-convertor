import MarkdownIt from 'markdown-it';

export interface MarkdownExtension {
  name: string;
  setup(md: MarkdownIt): void;
  postProcess?(tokens: any[]): any[];
}

// Basic mapping from markdown-it tokens to Tiptap nodes
function cleanEmptyTextNodes(node: any): any {
  if (Array.isArray(node.content)) {
    node.content = node.content
      .map(cleanEmptyTextNodes)
      .filter((n: any) => !(n.type === 'text' && n.text === ''));
  }
  return node;
}

function tokensToTiptapJSON(tokens: any[]): any {
  const stack: any[] = [];
  let current: any = { type: 'doc', content: [] };

  function pushNode(node: any) {
    if (stack.length > 0) {
      const parent = stack[stack.length - 1];
      if (!parent.content) parent.content = [];
      parent.content.push(node);
    } else {
      current.content.push(node);
    }
  }

  let i = 0;
  while (i < tokens.length) {
    const token = tokens[i];
    switch (token.type) {
      case 'heading_open': {
        // Extract heading level from tag (e.g., h1, h2, ...)
        let level = 1;
        if (token.tag && token.tag.startsWith('h')) {
          const parsed = parseInt(token.tag.slice(1), 10);
          if (!isNaN(parsed)) {
            level = Math.max(1, Math.min(parsed, 6));
          }
        }
        const node = { type: 'heading', attrs: { level }, content: [] };
        stack.push(node);
        i++;
        break;
      }
      case 'heading_close': {
        const node = stack.pop();
        pushNode(node);
        i++;
        break;
      }
      case 'paragraph_open': {
        const node = { type: 'paragraph', content: [] };
        stack.push(node);
        i++;
        break;
      }
      case 'paragraph_close': {
        const node = stack.pop();
        pushNode(node);
        i++;
        break;
      }
      case 'inline': {
        // Recursively process children
        const children = tokensToTiptapJSON(token.children || []);
        if (stack.length > 0) {
          const parent = stack[stack.length - 1];
          if (!parent.content) parent.content = [];
          parent.content.push(...children.content);
        } else {
          current.content.push(...children.content);
        }
        i++;
        break;
      }
      case 'text': {
        const node = { type: 'text', text: token.content };
        if (stack.length > 0) {
          const parent = stack[stack.length - 1];
          if (!parent.content) parent.content = [];
          parent.content.push(node);
        } else {
          current.content.push(node);
        }
        i++;
        break;
      }
      case 'strong_open':
        stack.push({ type: 'mark', mark: 'bold', content: [] });
        i++;
        break;
      case 'strong_close': {
        const node = stack.pop();
        const mark = { type: 'bold' };
        const marked = (node.content || []).map((n: any) =>
          n.type === 'text'
            ? { ...n, marks: [...(n.marks || []), mark] }
            : n
        );
        if (stack.length > 0) {
          const parent = stack[stack.length - 1];
          parent.content = [...(parent.content || []), ...marked];
        } else {
          current.content.push(...marked);
        }
        i++;
        break;
      }
      case 'em_open':
        stack.push({ type: 'mark', mark: 'italic', content: [] });
        i++;
        break;
      case 'em_close': {
        const node = stack.pop();
        const mark = { type: 'italic' };
        const marked = (node.content || []).map((n: any) =>
          n.type === 'text'
            ? { ...n, marks: [...(n.marks || []), mark] }
            : n
        );
        if (stack.length > 0) {
          const parent = stack[stack.length - 1];
          parent.content = [...(parent.content || []), ...marked];
        } else {
          current.content.push(...marked);
        }
        i++;
        break;
      }
      case 'code_inline': {
        const node = { type: 'text', marks: [{ type: 'code' }], text: token.content };
        pushNode(node);
        i++;
        break;
      }
      case 'blockquote_open': {
        const node = { type: 'blockquote', content: [] };
        stack.push(node);
        i++;
        break;
      }
      case 'blockquote_close': {
        const node = stack.pop();
        pushNode(node);
        i++;
        break;
      }
      case 'bullet_list_open': {
        const node = { type: 'bulletList', content: [] };
        stack.push(node);
        i++;
        break;
      }
      case 'bullet_list_close': {
        const node = stack.pop();
        pushNode(node);
        i++;
        break;
      }
      case 'ordered_list_open': {
        const node = { type: 'orderedList', content: [] };
        stack.push(node);
        i++;
        break;
      }
      case 'ordered_list_close': {
        const node = stack.pop();
        pushNode(node);
        i++;
        break;
      }
      case 'list_item_open': {
        const node = { type: 'listItem', content: [] };
        stack.push(node);
        i++;
        break;
      }
      case 'list_item_close': {
        const node = stack.pop();
        pushNode(node);
        i++;
        break;
      }
      case 'fence': {
        const node = { type: 'codeBlock', attrs: { language: token.info || null }, content: [{ type: 'text', text: token.content }] };
        pushNode(node);
        i++;
        break;
      }
      case 'link_open': {
        const href = token.attrs?.find((a: any) => a[0] === 'href')?.[1] || '';
        const node = { type: 'text', marks: [{ type: 'link', attrs: { href } }], text: '' };
        stack.push(node);
        i++;
        break;
      }
      case 'link_close': {
        const node = stack.pop();
        if (node.text === '' && node.content) {
          node.text = node.content.map((n: any) => n.text).join('');
          delete node.content;
        }
        pushNode(node);
        i++;
        break;
      }
      case 's_open': {
        const node = { type: 'text', marks: [{ type: 'strike' }], text: '' };
        stack.push(node);
        i++;
        break;
      }
      case 's_close': {
        const node = stack.pop();
        if (node.text === '' && node.content) {
          node.text = node.content.map((n: any) => n.text).join('');
          delete node.content;
        }
        pushNode(node);
        i++;
        break;
      }
      case 'table_open':
        stack.push({ type: 'table', content: [] });
        i++;
        break;
      case 'table_close': {
        const node = stack.pop();
        pushNode(node);
        i++;
        break;
      }
      case 'thead_open':
      case 'tbody_open':
        // Optionally handle table head/body grouping
        i++;
        break;
      case 'thead_close':
      case 'tbody_close':
        i++;
        break;
      case 'tr_open':
        stack.push({ type: 'tableRow', content: [] });
        i++;
        break;
      case 'tr_close': {
        const node = stack.pop();
        pushNode(node);
        i++;
        break;
      }
      case 'th_open':
        stack.push({ type: 'tableHeader', content: [] });
        i++;
        break;
      case 'th_close': {
        const node = stack.pop();
        pushNode(node);
        i++;
        break;
      }
      case 'td_open':
        stack.push({ type: 'tableCell', content: [] });
        i++;
        break;
      case 'td_close': {
        const node = stack.pop();
        pushNode(node);
        i++;
        break;
      }
      // Table, task list, and other features can be added here
      default: {
        i++;
        break;
      }
    }
  }
  return cleanEmptyTextNodes(current);
}

export class MarkdownParser {
  private md: MarkdownIt;
  private extensions: MarkdownExtension[] = [];

  constructor() {
    this.md = new MarkdownIt();
  }

  registerExtension(extension: MarkdownExtension) {
    this.extensions.push(extension);
    extension.setup(this.md);
  }

  parse(markdown: string): any {
    // Parse markdown to tokens
    let tokens = this.md.parse(markdown, {});
    // Post-process tokens with each extension if needed
    for (const ext of this.extensions) {
      if (ext.postProcess) {
        tokens = ext.postProcess(tokens);
      }
    }
    // Convert tokens to Tiptap JSON
    return tokensToTiptapJSON(tokens);
  }
} 