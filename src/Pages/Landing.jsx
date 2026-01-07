import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  const words = useMemo(
    () => [
      { text: "Hello!", lang: "English" },
      { text: "Hola!", lang: "Español" },
      { text: "Bonjour!", lang: "Français" },
      { text: "Ciao!", lang: "Italiano" },
      { text: "Hallo!", lang: "Deutsch" },
      { text: "नमस्ते 🙏", lang: "Hindi" },
      { text: "こんにちは!", lang: "日本語" },
      { text: "안녕하세요!", lang: "한국어" },
      { text: "مرحبا", lang: "العربية" },
      { text: "કેમ છો? મજામાં?", lang: "ગુજરાતી" },
      { text: "你好!", lang: "中文" },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, 1100);
    return () => clearInterval(id);
  }, [words.length]);

  const current = words[index];

  return (
    <main
      className="
        relative grid min-h-screen place-items-center p-6 overflow-hidden
        text-white/90 [font-family:var(--font)]
        bg-[radial-gradient(1200px_800px_at_20%_20%,rgba(60,59,99,0.14),transparent_55%),radial-gradient(1000px_700px_at_80%_30%,rgba(255,100,65,0.12),transparent_55%),radial-gradient(900px_700px_at_50%_90%,rgba(30,150,185,0.10),transparent_55%),linear-gradient(180deg,#000000_0%,#02020a_50%,#000000_100%)]
        after:content-['']
        after:absolute
        after:inset-0
        after:pointer-events-none
        after:z-0
        after:bg-[linear-gradient(180deg,rgba(0,0,0,0.14),rgba(0,0,0,0.22))]
      "
    >
      <div
        className="
          absolute -inset-[60%] -z-10 pointer-events-none
          opacity-[0.18] blur-[80px] animate-drift
          bg-[conic-gradient(from_180deg,rgba(120,119,198,0.18),rgba(64,202,255,0.10),rgba(255,140,105,0.12),rgba(120,119,198,0.18))]
        " aria-hidden="true"
      />
      
      <section
        className="
          relative z-10 w-full max-w-[900px] text-center
        "
      >
        <div
          className="
            relative inline-grid place-items-center
            mb-3 pb-2
          " aria-label={`Hello in ${current.lang}`}
        >
          <span
            className="
              absolute inset-0
              translate-y-[6px] scale-[1.02]
              opacity-[0.25]
              blur-[12px]
              select-none pointer-events-none
              text-transparent
              bg-[linear-gradient(90deg,rgba(255,255,255,0.18),rgba(255,255,255,0.02))]
              bg-clip-text
              [font-family:'Great_Vibes',cursive,var(--font)]
              font-normal
              tracking-[-0.04em]
              text-[clamp(56px,8vw,108px)]
            "
          >{current.text}</span>
          <span
            key={current.text}
            className="
              relative
              text-transparent
              bg-[linear-gradient(90deg,rgba(255,255,255,0.92),rgba(255,255,255,0.55))]
              bg-clip-text
              [font-family:'Edu_NSW_ACT_Cursive',cursive,var(--font)]
              font-normal
              tracking-[0]
              leading-[2]
              text-[clamp(56px,8vw,108px)]
              animate-popIn
            "
          >
            {current.text}
          </span>
        </div>

        <p
          className="
            mx-auto mb-[22px] max-w-[520px] text-[16px] leading-[1.6] text-white/70
          "
        >
        Let me show you around.
        </p>

        <button
        onClick={() => navigate("/transition")}
        className="
          group relative inline-flex items-center justify-center gap-3
          px-[26px] py-3 rounded-full bg-transparent text-white
          font-semibold text-[17px] tracking-[-0.01em] cursor-pointer z-[3]
          overflow-visible antialiased [text-rendering:optimizeLegibility]
          transition-transform transition-shadow duration-200
          [transition-timing-function:cubic-bezier(.2,.9,.17,1)]

          hover:-translate-y-[3px] hover:scale-[1.01]
          hover:shadow-[0_18px_48px_rgba(124,122,207,0.12),0_6px_22px_rgba(255,140,105,0.06)]
          active:translate-y-0 active:scale-[0.995]
          active:shadow-[0_8px_20px_rgba(0,0,0,0.18)]
          focus-visible:outline-none
          focus-visible:shadow-[0_0_0_4px_rgba(124,122,207,0.10)]
          motion-reduce:transition-none motion-reduce:transform-none

          before:content-[''] before:absolute before:inset-0 before:rounded-full before:z-0
          before:opacity-[0.12] before:blur-[6px] before:saturate-[1.15]
          before:bg-[linear-gradient(90deg,#7C7ACF_0%,#A98FE6_40%,#FF8C69_100%)]
          before:shadow-[0_10px_30px_rgba(124,122,207,0.10),0_4px_14px_rgba(255,140,105,0.05)]

          after:content-[''] after:absolute after:inset-[1px] after:rounded-full after:z-[1]
          after:pointer-events-none after:bg-white/[0.02] after:backdrop-blur-[6px]
        "
      >
          <span className="relative z-10">Start Journey 🛸</span>
      </button>
      </section>
    </main>
  );
}
