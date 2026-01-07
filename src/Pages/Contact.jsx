// src/Pages/Contact.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Mail,
  Send,
  Linkedin,
  Github,
  Copy,
  Check,
  Sparkles,
  Radio,
  ShieldCheck,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

function useElementSize() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const cr = entry.contentRect;
      setSize({ width: cr.width, height: cr.height });
    });
    ro.observe(ref.current);
    return () => ro.disconnect();
  }, []);

  return [ref, size];
}

function Starfield({ density = 90, className }) {
  const [wrapRef, size] = useElementSize();

  const stars = useMemo(() => {
    const w = size.width || 1200;
    const h = size.height || 800;
    return Array.from({ length: density }).map((_, i) => {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const r = 0.6 + Math.random() * 1.6;
      const o = 0.2 + Math.random() * 0.75;
      const tw = 1800 + Math.random() * 2600;
      const d = Math.random() * 1800;
      return { id: i, x, y, r, o, tw, d };
    });
  }, [size.width, size.height, density]);

  return (
    <div ref={wrapRef} className={cx("absolute inset-0 overflow-hidden", className)}>
      {stars.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full bg-white"
          style={{
            left: s.x,
            top: s.y,
            width: s.r,
            height: s.r,
            opacity: s.o,
            animation: `twinkle ${s.tw}ms ease-in-out ${s.d}ms infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

function CopyButton({ value }) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // ignore
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      className={cx(
        "inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2",
        "text-xs text-white/80 backdrop-blur-md transition hover:bg-white/10"
      )}
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function SocialPill({ href, icon: Icon, label, sub }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cx(
        "group flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-md",
        "transition hover:bg-white/10"
      )}
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
          <Icon className="h-5 w-5 text-white/90" />
        </span>
        <div>
          <div className="text-sm font-semibold text-white">{label}</div>
          <div className="text-xs text-white/60">{sub}</div>
        </div>
      </div>
      <span className="text-xs text-white/50 transition group-hover:text-white/70">
        open →
      </span>
    </a>
  );
}

function SignalMeter({ value }) {
  const bars = 5;
  const on = Math.max(1, Math.min(bars, value));

  return (
    <div className="flex items-end gap-1">
      {Array.from({ length: bars }).map((_, i) => {
        const idx = i + 1;
        const h = 6 + idx * 4;
        const active = idx <= on;
        return (
          <span
            key={idx}
            className={cx(
              "w-1.5 rounded-sm transition",
              active ? "bg-white/80" : "bg-white/15"
            )}
            style={{ height: h }}
          />
        );
      })}
    </div>
  );
}

export default function Contact() {
  // TODO: put your real details here
  const EMAIL = "mansijpatels@gmail.com";
  const LINKEDIN = "https://www.linkedin.com/in/mansipatel1222/";
  const GITHUB = "https://github.com/mansip2212";

  const [form, setForm] = useState({ name: "", email: "", topic: "Collaboration", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const signal = useMemo(() => {
    const len = (form.message || "").trim().length;
    if (len < 10) return 1;
    if (len < 40) return 2;
    if (len < 90) return 3;
    if (len < 160) return 4;
    return 5;
  }, [form.message]);

  const subject = useMemo(() => {
    const t = form.topic || "Hello";
    return `Contact • ${t} • ${form.name || "Anonymous"}`;
  }, [form.topic, form.name]);

  const mailtoHref = useMemo(() => {
    const body = [
      `Name: ${form.name || ""}`,
      `Email: ${form.email || ""}`,
      `Topic: ${form.topic || ""}`,
      "",
      (form.message || "").trim(),
    ].join("\n");
    return `mailto:${encodeURIComponent(EMAIL)}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }, [EMAIL, subject, form]);

  function updateField(k, v) {
    setForm((p) => ({ ...p, [k]: v }));
    setSent(false);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSending(true);

    // "Unique" UX: simulate a short transmission + open mail client.
    // (No backend needed. If you add EmailJS or API later, plug it in here.)
    await new Promise((r) => setTimeout(r, 700));

    window.location.href = mailtoHref;

    setSending(false);
    setSent(true);
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Background: video optional. Keep your space.mp4 if you want. */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
        src="/videos/space.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/70" />

      <Starfield density={110} className="opacity-50" />

      {/* soft nebula blobs */}
      <div className="pointer-events-none absolute -left-24 top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-10 h-80 w-80 rounded-full bg-white/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="inline-flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur-md">
              <Radio className="h-3.5 w-3.5" />
              Send a signal
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5" />
              spam-free, human replies
            </span>
          </div>
          <p className="max-w-2xl text-white/70">
            I treat messages like product work: clear, thoughtful, and worth replying to.
            Drop a note & I’ll respond with intent ✨.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* LEFT: Message Capsule */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-white">Transmission Console</div>
                <div className="mt-1 text-xs text-white/60">
                  Signal strength updates as you type.
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-3 py-2">
                <div className="text-xs text-white/60">signal</div>
                <SignalMeter value={signal} />
              </div>
            </div>

            <div className="my-5 h-px w-full bg-white/10" />

            <form onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <div className="mb-1 text-xs text-white/60">Name</div>
                  <input
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className={cx(
                      "w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white",
                      "placeholder:text-white/30 outline-none transition focus:border-white/25"
                    )}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </label>

                <label className="block">
                  <div className="mb-1 text-xs text-white/60">Email</div>
                  <input
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className={cx(
                      "w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white",
                      "placeholder:text-white/30 outline-none transition focus:border-white/25"
                    )}
                    placeholder="you@domain.com"
                    autoComplete="email"
                    type="email"
                  />
                </label>
              </div>

              <label className="block">
                <div className="mb-1 text-xs text-white/60">Topic</div>
                <select
                  value={form.topic}
                  onChange={(e) => updateField("topic", e.target.value)}
                  className={cx(
                    "w-full rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white",
                    "outline-none transition focus:border-white/25"
                  )}
                >
                  <option className="bg-black" value="Collaboration">
                    Collaboration
                  </option>
                  <option className="bg-black" value="Full-time role">
                    Full-time role
                  </option>
                  <option className="bg-black" value="Freelance">
                    Freelance
                  </option>
                  <option className="bg-black" value="Coffee chat">
                    Coffee chat
                  </option>
                  <option className="bg-black" value="Other">
                    Other
                  </option>
                </select>
              </label>

              <label className="block">
                <div className="mb-1 flex items-center justify-between text-xs text-white/60">
                  <span>Message</span>
                  <span className="text-white/45">{(form.message || "").length} chars</span>
                </div>
                <textarea
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  className={cx(
                    "min-h-[150px] w-full resize-none rounded-2xl border border-white/10 bg-black/25 px-4 py-3 text-sm text-white",
                    "placeholder:text-white/30 outline-none transition focus:border-white/25"
                  )}
                  placeholder="What are we building? What’s the goal, timeline, and your dream outcome?"
                />
              </label>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                {/* <div className="flex items-center gap-2 text-xs text-white/55">
                  <Sparkles className="h-4 w-4" />
                  <span>
                    This opens your email client with a pre-filled message (no backend needed).
                  </span>
                </div> */}

                <button
                  type="submit"
                  disabled={sending}
                  className={cx(
                    "inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm",
                    "transition hover:bg-white/15 active:scale-[0.99]",
                    sending && "opacity-70 cursor-not-allowed"
                  )}
                >
                  <Send className={cx("h-4 w-4", sending && "animate-pulse")} />
                  {sending ? "Transmitting..." : "Send Signal"}
                </button>
              </div>

              {sent && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-white/70">
                  Signal sent. If your mail app didn’t open, copy my email.
                </div>
              )}
            </form>
          </div>

          {/* RIGHT: Contact Routes + “Mission brief” */}
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="text-sm font-semibold text-white">Direct Route</div>
              <div className="mt-1 text-xs text-white/60">
                Fastest way to reach me is via email.
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                    <Mail className="h-5 w-5 text-white/90" />
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">{EMAIL}</div>
                    <div className="text-xs text-white/60">Email me anytime</div>
                  </div>
                </div>
                <CopyButton value={EMAIL} />
              </div>

              <div className="mt-4 grid gap-3">
                <SocialPill
                  href={LINKEDIN}
                  icon={Linkedin}
                  label="LinkedIn"
                  sub="Professional updates + roles"
                />
                <SocialPill
                  href={GITHUB}
                  icon={Github}
                  label="GitHub"
                  sub="Code, commits, projects"
                />
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="text-sm font-semibold text-white">Mini Mission Brief</div>
              <div className="mt-2 text-sm leading-relaxed text-white/75">
                If you’re reaching out about a role or collaboration, the fastest “yes”
                is a clear goal + constraints + timeline. I respond best to details.
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs text-white/55">BEST SUBJECT LINE</div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    “{`Project / Role — What you need + timeline` }”
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                  <div className="text-xs text-white/55">WHAT TO INCLUDE</div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    Goal • Stack • Timeline • Context
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
        @keyframes twinkle {
          0% { transform: translateY(0) scale(1); opacity: 0.25; }
          100% { transform: translateY(-2px) scale(1.12); opacity: 0.85; }
        }
      `}</style>
    </div>
  );
}
