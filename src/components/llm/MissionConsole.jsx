// src/components/llm/MissionConsole.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Sparkles, X, Send, Trash2, AlertTriangle, Bot, User } from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

function fmtTime(ts) {
  try {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
}

// Simple markdown renderer for bold, lists, and paragraphs
function renderMarkdown(text) {
  if (!text) return text;
  
  // Split by double newlines for paragraphs, but preserve single newlines within paragraphs
  const blocks = text.split(/\n\n+/).filter(block => block.trim());
  
  return blocks.map((block, blockIdx) => {
    block = block.trim();
    if (!block) return null;
    
    // Check if entire block is a list
    const lines = block.split('\n');
    const firstLine = lines[0].trim();
    
    if (/^[-*•]\s/.test(firstLine) || /^\d+\.\s/.test(firstLine)) {
      return (
        <ul key={blockIdx} className="list-disc list-inside space-y-1.5 my-2 ml-4">
          {lines.filter(line => line.trim()).map((item, i) => {
            const cleaned = item.replace(/^[-*•]\s*|\d+\.\s*/, "").trim();
            return (
              <li key={i} className="markdown-item">
                {renderInlineMarkdown(cleaned)}
              </li>
            );
          })}
        </ul>
      );
    }
    
    // Check if it's a heading
    if (/^###\s/.test(firstLine)) {
      return (
        <h3 key={blockIdx} className="font-semibold text-base mt-4 mb-2 text-white">
          {renderInlineMarkdown(firstLine.replace(/^###\s/, ""))}
        </h3>
      );
    }
    
    if (/^##\s/.test(firstLine)) {
      return (
        <h2 key={blockIdx} className="font-bold text-lg mt-4 mb-2 text-white">
          {renderInlineMarkdown(firstLine.replace(/^##\s/, ""))}
        </h2>
      );
    }
    
    // Regular paragraph - preserve line breaks within it
    return (
      <div key={blockIdx} className="my-2">
        {lines.map((line, lineIdx) => (
          <p key={lineIdx} className={lineIdx > 0 ? "mt-1.5" : ""}>
            {renderInlineMarkdown(line.trim())}
          </p>
        ))}
      </div>
    );
  }).filter(Boolean);
}

function renderInlineMarkdown(text) {
  if (!text) return null;
  
  // Handle **bold** text
  const parts = [];
  let lastIndex = 0;
  const boldRegex = /\*\*([^*]+)\*\*/g;
  let match;
  let matchCount = 0;
  
  while ((match = boldRegex.exec(text)) !== null) {
    // Add text before the bold
    if (match.index > lastIndex) {
      const beforeText = text.substring(lastIndex, match.index);
      if (beforeText) parts.push(beforeText);
    }
    // Add bold text
    parts.push(
      <strong key={`bold-${matchCount++}`} className="font-semibold text-white">
        {match[1]}
      </strong>
    );
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text
  if (lastIndex < text.length) {
    const remaining = text.substring(lastIndex);
    if (remaining) parts.push(remaining);
  }
  
  return parts.length > 0 ? parts : text;
}

function Chip({ children, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cx(
        "rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-md",
        "transition-all duration-200 hover:bg-white/10 hover:border-white/20 hover:text-white hover:scale-105",
        "active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      )}
    >
      {children}
    </button>
  );
}

export default function MissionConsole({ open, onClose, chat }) {
  const { messages, loading, error, suggested, send, clear } = chat;
  const [draft, setDraft] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    requestAnimationFrame(() => {
      const el = listRef.current;
      if (!el) return;
      el.scrollTop = el.scrollHeight;
    });
  }, [messages.length, loading]);

  const stats = useMemo(() => {
    const userCount = messages.filter((m) => m.role === "user").length;
    const aiCount = messages.filter((m) => m.role === "assistant").length;
    const last = messages[messages.length - 1];
    return { userCount, aiCount, last };
  }, [messages]);

  async function onSubmit(e) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || loading) return;
    setDraft("");
    await send(text);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Panel */}
      <div
        className={cx(
          "absolute left-1/2 top-1/2 h-[90vh] max-h-[800px] w-[95vw] max-w-4xl -translate-x-1/2 -translate-y-1/2",
          "flex flex-col rounded-2xl border border-white/10 bg-gradient-to-br from-black/90 via-black/85 to-black/90",
          "backdrop-blur-xl shadow-2xl shadow-black/50"
        )}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5">
              <Bot className="h-5 w-5 text-white/90" />
            </div>
            <div>
              <div className="text-base font-semibold text-white">Recruiter Assistant</div>
              <div className="text-xs text-white/50">
                {stats.userCount} questions • {stats.aiCount} responses
                {stats.last && ` • Last: ${fmtTime(stats.last.ts)}`}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={clear}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
              title="Clear conversation"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Clear
            </button>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
              title="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Suggestions Bar */}
          {messages.length <= 1 && (
            <div className="border-b border-white/10 px-6 py-3">
              <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Quick questions for recruiters:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {suggested.map((s) => (
                  <Chip key={s} onClick={() => send(s)} disabled={loading}>
                    {s}
                  </Chip>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div 
            ref={listRef} 
            className="flex-1 overflow-y-auto px-6 py-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
          >
            <div className="mx-auto max-w-3xl space-y-4">
              {messages.map((m) => {
                const isUser = m.role === "user";
                return (
                  <div
                    key={m.id}
                    className={cx(
                      "flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                      isUser ? "justify-end" : "justify-start"
                    )}
                  >
                    {!isUser && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/5">
                        <Bot className="h-4 w-4 text-white/80" />
                      </div>
                    )}
                    
                    <div
                      className={cx(
                        "max-w-[85%] rounded-2xl px-4 py-3 shadow-lg",
                        isUser
                          ? "bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-400/20 text-white"
                          : "bg-gradient-to-br from-white/10 to-white/5 border border-white/10 text-white/90"
                      )}
                    >
                      <div className="mb-1.5 flex items-center gap-2 text-[10px] font-medium uppercase tracking-wide">
                        <span className={isUser ? "text-blue-300/70" : "text-white/50"}>
                          {isUser ? "RECRUITER" : "ASSISTANT"}
                        </span>
                        <span className="text-white/30">•</span>
                        <span className="text-white/40">{fmtTime(m.ts)}</span>
                      </div>
                      <div className="text-sm leading-relaxed break-words prose prose-invert prose-sm max-w-none">
                        {!isUser ? renderMarkdown(m.content) : <span className="whitespace-pre-wrap">{m.content}</span>}
                      </div>
                    </div>

                    {isUser && (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/5">
                        <User className="h-4 w-4 text-white/80" />
                      </div>
                    )}
                  </div>
                );
              })}
              
              {loading && (
                <div className="flex gap-3 justify-start animate-in fade-in">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-gradient-to-br from-white/10 to-white/5">
                    <Bot className="h-4 w-4 text-white/80" />
                  </div>
                  <div className="max-w-[85%] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="h-2 w-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="h-2 w-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="h-2 w-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-xs text-white/50">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Error Display */}
          {error && (
            <div className="mx-6 mb-3 flex items-center gap-2 rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200 backdrop-blur-sm">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Input Area */}
          <form onSubmit={onSubmit} className="border-t border-white/10 p-4">
            <div className="mx-auto max-w-3xl">
              <div className="flex items-end gap-3">
                <div className="relative flex-1">
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        onSubmit(e);
                      }
                    }}
                    placeholder="Ask about candidate fit, technical skills, experience, or projects..."
                    className={cx(
                      "min-h-[52px] max-h-[140px] w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white",
                      "placeholder:text-white/30 outline-none transition-all",
                      "focus:border-white/20 focus:bg-white/8 focus:ring-2 focus:ring-white/10",
                      "disabled:opacity-50 disabled:cursor-not-allowed"
                    )}
                    disabled={loading}
                    rows={1}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading || !draft.trim()}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-medium text-white",
                    "transition-all duration-200 hover:bg-white/15 hover:border-white/20 hover:scale-105 active:scale-95",
                    "disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:bg-white/10",
                    "shadow-lg shadow-black/20"
                  )}
                >
                  <Send className="h-4 w-4" />
                  Send
                </button>
              </div>
            </div>
          </form>
        </div>

        <style>{`
          @media (prefers-reduced-motion: reduce) {
            * { transition: none !important; animation: none !important; }
          }
          .scrollbar-thin::-webkit-scrollbar {
            width: 6px;
          }
          .scrollbar-thin::-webkit-scrollbar-track {
            background: transparent;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb {
            background-color: rgba(255, 255, 255, 0.1);
            border-radius: 3px;
          }
          .scrollbar-thin::-webkit-scrollbar-thumb:hover {
            background-color: rgba(255, 255, 255, 0.2);
          }
        `}</style>
      </div>
    </div>
  );
}
