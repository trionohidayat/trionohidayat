'use client';

import React, { useState } from 'react';
import { Check, Copy } from 'lucide-react';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // Split content by code blocks first
  const parts = content.split(/(```[\s\S]*?```)/g);

  return (
    <div className="prose-clean flex flex-col space-y-4 text-zinc-300 leading-relaxed text-sm sm:text-base">
      {parts.map((part, index) => {
        if (part.startsWith('```')) {
          // Extract language and code
          const firstLineEnd = part.indexOf('\n');
          const lang = part.substring(3, firstLineEnd).trim();
          const code = part.substring(firstLineEnd + 1, part.length - 3).trim();
          return <CodeBlock key={index} code={code} language={lang} />;
        }

        // Regular markdown lines
        return <TextSection key={index} text={part} />;
      })}
    </div>
  );
};

const CodeBlock: React.FC<{ code: string; language: string }> = ({ code, language }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 rounded-xl border border-white/10 bg-zinc-950 overflow-hidden shadow-xl">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-zinc-900/60 text-xs font-mono text-zinc-400">
        <span className="uppercase tracking-wider text-blue-400 font-semibold">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
          title="Copy code"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-[11px] text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span className="text-[11px]">Copy</span>
            </>
          )}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-xs sm:text-sm font-mono text-zinc-200 leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
};

const TextSection: React.FC<{ text: string }> = ({ text }) => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];
  let isOrderedList = false;

  const flushList = () => {
    if (currentList.length > 0) {
      if (isOrderedList) {
        elements.push(
          <ol key={`ol-${elements.length}`} className="my-3 pl-6 list-decimal space-y-1.5 text-zinc-300">
            {currentList.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {renderInline(item)}
              </li>
            ))}
          </ol>
        );
      } else {
        elements.push(
          <ul key={`ul-${elements.length}`} className="my-3 pl-6 list-disc space-y-1.5 text-zinc-300">
            {currentList.map((item, idx) => (
              <li key={idx} className="leading-relaxed">
                {renderInline(item)}
              </li>
            ))}
          </ul>
        );
      }
      currentList = [];
      isOrderedList = false;
    }
  };

  lines.forEach((rawLine, idx) => {
    const line = rawLine.trim();

    if (!line) {
      flushList();
      return;
    }

    if (line === '---') {
      flushList();
      elements.push(<hr key={`hr-${idx}`} className="my-8 border-white/10" />);
      return;
    }

    if (line.startsWith('## ')) {
      flushList();
      elements.push(
        <h2
          key={`h2-${idx}`}
          className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-8 mb-3 pb-2 border-b border-white/5"
        >
          {line.replace('## ', '')}
        </h2>
      );
      return;
    }

    if (line.startsWith('### ')) {
      flushList();
      elements.push(
        <h3 key={`h3-${idx}`} className="text-lg font-semibold text-blue-400 mt-6 mb-2">
          {line.replace('### ', '')}
        </h3>
      );
      return;
    }

    if (line.startsWith('> ')) {
      flushList();
      elements.push(
        <blockquote
          key={`quote-${idx}`}
          className="border-l-4 border-blue-500 pl-4 py-2 my-4 bg-blue-500/5 rounded-r-xl text-zinc-300 italic"
        >
          {renderInline(line.replace('> ', ''))}
        </blockquote>
      );
      return;
    }

    // Unordered list item (- or *)
    if (line.startsWith('- ') || line.startsWith('* ')) {
      if (isOrderedList) flushList();
      currentList.push(line.replace(/^[-*]\s+/, ''));
      return;
    }

    // Ordered list item (1. 2. etc)
    if (/^\d+\.\s+/.test(line)) {
      if (!isOrderedList && currentList.length > 0) flushList();
      isOrderedList = true;
      currentList.push(line.replace(/^\d+\.\s+/, ''));
      return;
    }

    // Default paragraph
    flushList();
    elements.push(
      <p key={`p-${idx}`} className="my-2 leading-relaxed text-zinc-300">
        {renderInline(line)}
      </p>
    );
  });

  flushList();

  return <>{elements}</>;
};

// Helper for inline markdown: bold (**), inline code (`), and links ([text](url))
function renderInline(text: string): React.ReactNode {
  // Regex to match bold, inline code, and links
  const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
  const parts = text.split(regex);

  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-white">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          className="px-1.5 py-0.5 rounded bg-zinc-900 border border-white/10 text-blue-300 font-mono text-xs"
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        return (
          <a
            key={i}
            href={match[2]}
            target={match[2].startsWith('http') ? '_blank' : undefined}
            rel={match[2].startsWith('http') ? 'noreferrer' : undefined}
            className="text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
          >
            {match[1]}
          </a>
        );
      }
    }
    return part;
  });
}
