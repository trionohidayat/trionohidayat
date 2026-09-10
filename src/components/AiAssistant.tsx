'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Bot, User, RotateCcw, AlertCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const DEFAULT_QUESTIONS = [
  'Apa saja proyek GovTech yang pernah dibuat Triono?',
  'Bagaimana pengalaman Triono dalam automasi n8n?',
  'Apakah Triono terbuka untuk freelance / remote?',
  'Bagaimana cara menghubungi Triono untuk kerja sama?',
];

export const AiAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        'Halo! Saya adalah **AI Digital Twin dari Triono Hidayat**, ditenagai oleh **Google Gemini 3.6 Flash**. Ada yang ingin Anda ketahui tentang keahlian sistem pemerintahan, automasi n8n, proyek web Next.js, atau ketersediaan kerja sama?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || input).trim();
    if (!messageContent || isLoading) return;

    setError(null);
    setInput('');

    const newMessages: Message[] = [...messages, { role: 'user', content: messageContent }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      // Send message along with previous conversation history
      const res = await fetch('/api/ai-assistant', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: messageContent,
          history: newMessages.slice(1, -1), // skip initial greeting and current prompt
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Gagal menghubungi asisten AI.');
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: data.reply,
        },
      ]);
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'Terjadi kendala saat menghubungkan ke Gemini.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        role: 'assistant',
        content:
          'Halo! Saya adalah **AI Digital Twin dari Triono Hidayat**, ditenagai oleh **Google Gemini 3.6 Flash**. Ada yang ingin Anda ketahui tentang keahlian sistem pemerintahan, automasi n8n, proyek web Next.js, atau ketersediaan kerja sama?',
      },
    ]);
    setError(null);
    setInput('');
  };

  return (
    <section
      id="ai-twin"
      className="py-16 sm:py-24 px-4 sm:px-6 relative isolate overflow-hidden w-full max-w-full"
    >
      {/* Background Accent Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-mono mb-4 shadow-lg shadow-blue-500/5">
          <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          <span>Powered by Google Gemini 3.6 Flash</span>
        </div>

        {/* Section Heading */}
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Ask My <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-400">AI Digital Twin</span>
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl leading-relaxed">
          Punya pertanyaan seputar arsitektur GovTech, automasi n8n, atau ingin mendiskusikan peluang kerja sama? Tanyakan langsung pada representasi AI saya.
        </p>

        {/* Suggestion Chips */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 max-w-2xl">
          {DEFAULT_QUESTIONS.map((question, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(question)}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 text-[11px] sm:text-xs text-zinc-300 hover:text-white border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
            >
              💡 {question}
            </button>
          ))}
        </div>

        {/* Interactive Chat Box Container */}
        <div className="mt-8 w-full rounded-2xl glass-panel bg-zinc-950/85 border border-white/10 shadow-2xl overflow-hidden text-left flex flex-col h-[480px] sm:h-[520px]">
          {/* Chat Header Bar */}
          <div className="px-4 py-3 border-b border-white/10 bg-zinc-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white tracking-tight">Triono AI Twin</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
                <span className="text-[10px] text-zinc-400 font-mono">Gemini 3.6 Flash &bull; Knowledge Grounded</span>
              </div>
            </div>

            <button
              onClick={handleResetChat}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="Mulai ulang percakapan"
              aria-label="Reset chat"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Messages Scroll Area */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 no-scrollbar">
            {messages.map((msg, i) => {
              const isUser = msg.role === 'user';
              return (
                <div
                  key={i}
                  className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-6 h-6 rounded-md bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                  )}

                  <div
                    className={`rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      isUser
                        ? 'bg-blue-600 text-white rounded-tr-sm px-4 py-2.5 max-w-[85%] shadow-md shadow-blue-600/20'
                        : 'bg-zinc-900/90 border border-white/10 text-zinc-200 rounded-tl-sm p-4 max-w-[90%] sm:max-w-[85%] whitespace-pre-wrap'
                    }`}
                  >
                    {renderFormattedText(msg.content)}
                  </div>

                  {isUser && (
                    <div className="w-6 h-6 rounded-md bg-zinc-800 border border-white/10 flex items-center justify-center text-zinc-300 shrink-0 mt-0.5">
                      <User className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Thinking / Loading Bubble */}
            {isLoading && (
              <div className="flex items-start gap-2.5 justify-start">
                <div className="w-6 h-6 rounded-md bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <div className="bg-zinc-900/90 border border-white/10 text-zinc-400 rounded-2xl rounded-tl-sm px-4 py-3 text-xs flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-bounce" />
                  <span className="ml-1 text-[11px] font-mono text-zinc-400">Gemini sedang merangkum jawaban...</span>
                </div>
              </div>
            )}

            {/* Error message */}
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-2 text-xs text-red-400">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Chat Input Bar */}
          <div className="p-3 sm:p-4 border-t border-white/10 bg-zinc-900/50">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Tanyakan sesuatu tentang Triono..."
                disabled={isLoading}
                className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                title="Kirim pesan"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// Simple formatter to parse bold **text**, bullet points, and links into React elements
function renderFormattedText(text: string): React.ReactNode {
  const lines = text.split('\n');
  return lines.map((line, idx) => {
    const trimmed = line.trim();
    if (!trimmed) {
      return <div key={idx} className="h-1.5" />;
    }

    // Bullet point line
    const isBullet = trimmed.startsWith('- ') || trimmed.startsWith('* ');
    const displayContent = isBullet ? trimmed.replace(/^[-*]\s+/, '') : line;

    // Inline regex for bold **text** and markdown links [text](url)
    const parts = displayContent.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);

    const renderedParts = parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} className="font-semibold text-white">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
        const match = part.match(/\[(.*?)\]\((.*?)\)/);
        if (match) {
          return (
            <a
              key={pIdx}
              href={match[2]}
              target="_blank"
              rel="noreferrer"
              className="text-blue-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
            >
              {match[1]}
            </a>
          );
        }
      }
      return part;
    });

    if (isBullet) {
      return (
        <div key={idx} className="flex items-start gap-1.5 my-0.5">
          <span className="text-blue-400 leading-none mt-1 text-[11px]">&bull;</span>
          <span className="flex-1">{renderedParts}</span>
        </div>
      );
    }

    return (
      <div key={idx} className="my-0.5">
        {renderedParts}
      </div>
    );
  });
}
