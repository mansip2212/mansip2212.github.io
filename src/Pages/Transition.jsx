import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Transition() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/home", { replace: true }), 900);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(900px_600px_at_20%_30%,rgba(124,122,207,0.20),transparent_60%),radial-gradient(900px_600px_at_80%_40%,rgba(64,202,255,0.14),transparent_55%),radial-gradient(900px_600px_at_50%_90%,rgba(255,140,105,0.12),transparent_55%),linear-gradient(180deg,#000_0%,#02020a_55%,#000_100%)]" />

      {/* Star streaks */}
      <div className="absolute inset-0 opacity-60">
        <div className="streak streak1" />
        <div className="streak streak2" />
        <div className="streak streak3" />
        <div className="streak streak4" />
      </div>

      {/* Center warp ring */}
      <div className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2">
        <div className="ring ringOuter" />
        <div className="ring ringMid" />
        <div className="ring ringInner" />
      </div>

      {/* Text */}
      <div className="relative z-10 grid min-h-screen place-items-center px-6">
        <div className="text-center">
          <h1 className="mb-4 text-xs tracking-[0.35em] uppercase text-white/60">
            Entering Portfolio
          </h1>
          {/* <h1 className="text-[clamp(34px,6vw,56px)] font-extrabold tracking-tight">
            Warp Drive
          </h1> */}
          {/* <p className="mt-3 text-white/70">
            Loading experience…
          </p> */}

          {/* Progress bar */}
          <div className="mx-auto mt-8 h-[10px] w-[260px] overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-full rounded-full bg-white/60 progress" />
          </div>
        </div>
      </div>

      {/* CSS in-component (safe for Vite/OXC) */}
      <style>{`
        .ring {
          position: absolute;
          inset: 0;
          border-radius: 999px;
          filter: blur(0px);
          opacity: 0.9;
        }

        .ringOuter {
          background: conic-gradient(
            from 180deg,
            rgba(124,122,207,0.55),
            rgba(64,202,255,0.28),
            rgba(255,140,105,0.22),
            rgba(124,122,207,0.55)
          );
          animation: spin 900ms cubic-bezier(.2,.9,.15,1) infinite;
          mask: radial-gradient(transparent 56%, #000 58%);
          -webkit-mask: radial-gradient(transparent 56%, #000 58%);
        }

        .ringMid {
          inset: 36px;
          background: radial-gradient(circle at 30% 30%, rgba(255,255,255,0.10), transparent 55%),
                      radial-gradient(circle at 70% 60%, rgba(64,202,255,0.18), transparent 60%);
          border: 1px solid rgba(255,255,255,0.10);
          animation: pulse 900ms ease-in-out infinite;
        }

        .ringInner {
          inset: 110px;
          background: radial-gradient(circle at 50% 50%, rgba(255,255,255,0.10), rgba(0,0,0,0.0) 60%);
          border: 1px solid rgba(255,255,255,0.08);
          animation: breathe 900ms ease-in-out infinite;
        }

        .streak {
          position: absolute;
          left: -20%;
          top: 20%;
          height: 2px;
          width: 40%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.38), transparent);
          opacity: 0.35;
          transform: rotate(12deg);
        }
        .streak1 { top: 18%; animation: streak 700ms ease-in-out infinite; }
        .streak2 { top: 38%; width: 55%; opacity: 0.25; animation: streak 820ms ease-in-out infinite; }
        .streak3 { top: 58%; width: 48%; opacity: 0.20; animation: streak 900ms ease-in-out infinite; }
        .streak4 { top: 74%; width: 62%; opacity: 0.18; animation: streak 980ms ease-in-out infinite; }

        .progress {
          transform-origin: left;
          animation: loadbar 900ms cubic-bezier(.2,.9,.15,1) forwards;
        }

        @keyframes spin {
          0% { transform: rotate(0deg) scale(0.98); opacity: 0.75; }
          60% { transform: rotate(200deg) scale(1.02); opacity: 0.95; }
          100% { transform: rotate(360deg) scale(1.00); opacity: 0.80; }
        }
        @keyframes pulse {
          0%,100% { transform: scale(0.98); opacity: 0.65; }
          50% { transform: scale(1.03); opacity: 0.95; }
        }
        @keyframes breathe {
          0%,100% { transform: scale(0.98); opacity: 0.55; }
          50% { transform: scale(1.02); opacity: 0.85; }
        }
        @keyframes streak {
          0% { transform: translateX(-30%) rotate(12deg); opacity: 0; }
          35% { opacity: 0.35; }
          100% { transform: translateX(260%) rotate(12deg); opacity: 0; }
        }
        @keyframes loadbar {
          0% { transform: scaleX(0.05); opacity: 0.65; }
          100% { transform: scaleX(1); opacity: 0.95; }
        }

        @media (prefers-reduced-motion: reduce) {
          .ringOuter, .ringMid, .ringInner, .streak1, .streak2, .streak3, .streak4, .progress {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}
