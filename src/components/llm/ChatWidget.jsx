// src/components/llm/ChatWidget.jsx
import { useState } from "react";
import { MessageSquare, Sparkles } from "lucide-react";
import MissionConsole from "./MissionConsole";
import { useMissionChat } from "./useMissionChat";

const cx = (...c) => c.filter(Boolean).join(" ");

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const chat = useMissionChat();

  return (
    <>
      {/* Floating Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cx(
            "group relative flex items-center gap-3 rounded-2xl border border-white/10 bg-white/10 px-4 py-3",
            "text-white backdrop-blur-md shadow-[0_18px_70px_rgba(0,0,0,0.45)]",
            "transition hover:bg-white/15 active:scale-[0.99]"
          )}
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/20">
            <MessageSquare className="h-5 w-5" />
          </span>
          <div className="text-left">
            <div className="text-sm font-semibold leading-tight">Recruiter Assistant</div>
            <div className="text-xs text-white/65">Ask about candidate</div>
          </div>

          <Sparkles className="h-4 w-4 text-white/70 transition group-hover:rotate-12" />
        </button>
      </div>

      <MissionConsole open={open} onClose={() => setOpen(false)} chat={chat} />
    </>
  );
}
