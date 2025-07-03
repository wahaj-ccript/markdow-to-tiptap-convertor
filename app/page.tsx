'use client';
import React, { useState } from 'react';
import { MarkdownParser } from '../parser/MarkdownParser';
import * as extensions from '../parser/extensions';
import { TiptapEditor } from '../components/TiptapEditor';

export default function HomePage() {
  const [markdown, setMarkdown] = useState('# Hello World');
  const [tiptapJSON, setTiptapJSON] = useState<any>({});

  // Initialize parser and register extensions
  const parser = React.useMemo(() => {
    const p = new MarkdownParser();
    Object.values(extensions).forEach((ext) => p.registerExtension(ext));
    return p;
  }, []);

  React.useEffect(() => {
    setTiptapJSON(parser.parse(markdown));
  }, [markdown, parser]);

  return (
    <main className="max-w-3xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Markdown to Tiptap Demo</h1>
      <textarea
        className="w-full border rounded p-2 mb-4 min-h-[120px]"
        value={markdown}
        onChange={e => setMarkdown(e.target.value)}
        placeholder="Enter markdown here..."
      />
      <h2 className="text-xl font-semibold mb-2">Tiptap JSON Output (for debugging):</h2>
      <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto mb-4">
        {JSON.stringify(tiptapJSON, null, 2)}
      </pre>
      <h2 className="text-xl font-semibold mb-2">Tiptap Preview:</h2>
      <TiptapEditor content={tiptapJSON} />
    </main>
  );
}
