// src/components/llm/useMissionChat.js
import { useMemo, useState } from "react";
import { PORTFOLIO_CONTEXT } from "./portfolioContext";

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export function useMissionChat() {
  const [messages, setMessages] = useState([
    {
      id: uid(),
      role: "assistant",
      content:
        "Hello! I'm here to help you evaluate Mansi Patel as a candidate. Ask me about technical skills, experience, projects, or request a candidate summary. What would you like to know?",
      ts: Date.now(),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const suggested = useMemo(
    () => [
      "Is this candidate a fit for a Full-Stack Engineer role? Show evidence.",
      "What backend/API experience does the candidate have? Include specific projects.",
      "Summarize the candidate's top achievements with metrics and impact.",
      "What technical skills and technologies has the candidate used in production?",
      "Generate a 4-line recruiter summary with suggested experience level (junior/mid/senior).",
      "What are 5 interview questions to validate the candidate's technical depth?",
    ],
    []
  );

  async function send(userText) {
    const text = (userText || "").trim();
    if (!text) return;

    setError("");

    const userMsg = { id: uid(), role: "user", content: text, ts: Date.now() };
    setMessages((m) => [...m, userMsg]);
    setLoading(true);

    try {
      // In development, always use the Vite proxy (relative path) to avoid CORS.
      // In production builds, use the configured base URL.
      const apiBaseUrl = import.meta.env.PROD
        ? (import.meta.env.VITE_API_BASE_URL || "")
        : "";
      const normalizedBase = (apiBaseUrl || "").replace(/\/+$/, "");
      const apiUrl = `${normalizedBase}/api/chat`;
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map(({ role, content }) => ({ role, content })),
          system: PORTFOLIO_CONTEXT,
        }),
      });

      if (!res.ok) {
        const t = await res.text().catch(() => "");
        throw new Error(t || `Request failed: ${res.status}`);
      }

      const data = await res.json();
      const assistantText = (data?.reply || data?.text || "").trim();


      setMessages((m) => [
        ...m,
        {
          id: uid(),
          role: "assistant",
          content: assistantText || "I didn’t get a response. Try again.",
          ts: Date.now(),
        },
      ]);
    } catch (e) {
      setError(e?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function clear() {
    setMessages([
      {
        id: uid(),
        role: "assistant",
        content: "Conversation cleared. I'm ready to help you evaluate Mansi Patel. What would you like to know?",
        ts: Date.now(),
      },
    ]);
    setError("");
  }

  return { messages, loading, error, suggested, send, clear };
}
