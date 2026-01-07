// // src/components/llm/ConstellationMap.jsx
// import { useEffect, useMemo, useRef, useState } from "react";

// function hashTo01(str) {
//   // deterministic 0..1
//   let h = 2166136261;
//   for (let i = 0; i < str.length; i++) {
//     h ^= str.charCodeAt(i);
//     h = Math.imul(h, 16777619);
//   }
//   return ((h >>> 0) % 100000) / 100000;
// }

// function clamp(n, a, b) {
//   return Math.max(a, Math.min(b, n));
// }

// export default function ConstellationMap({ messages, activeId, onSelect }) {
//   const ref = useRef(null);
//   const [size, setSize] = useState({ w: 320, h: 420 });

//   useEffect(() => {
//     if (!ref.current) return;
//     const ro = new ResizeObserver(([entry]) => {
//       const cr = entry.contentRect;
//       setSize({ w: cr.width, h: cr.height });
//     });
//     ro.observe(ref.current);
//     return () => ro.disconnect();
//   }, []);

//   const nodes = useMemo(() => {
//     const w = size.w || 320;
//     const h = size.h || 420;
//     const pad = 22;

//     // spiral-ish layout, but jittered deterministically by message id
//     const N = messages.length;
//     const centerX = w * 0.52;
//     const centerY = h * 0.52;

//     return messages.map((m, i) => {
//       const t = i / Math.max(1, N - 1);
//       const angle = t * Math.PI * 4.2 + hashTo01(m.id) * 0.9;
//       const radius = (Math.min(w, h) * 0.10) + t * (Math.min(w, h) * 0.33);

//       const jx = (hashTo01(m.id + "x") - 0.5) * 22;
//       const jy = (hashTo01(m.id + "y") - 0.5) * 22;

//       const x = clamp(centerX + Math.cos(angle) * radius + jx, pad, w - pad);
//       const y = clamp(centerY + Math.sin(angle) * radius + jy, pad, h - pad);

//       const baseR = m.role === "user" ? 3.2 : 2.7;
//       const glow = m.id === activeId ? 1 : 0;
//       const strength = clamp(0.2 + (m.content.length / 200) * 0.8, 0.25, 1);

//       return { id: m.id, role: m.role, x, y, r: baseR, glow, strength };
//     });
//   }, [messages, size.w, size.h, activeId]);

//   useEffect(() => {
//     const canvas = ref.current?.querySelector("canvas");
//     if (!canvas) return;

//     const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
//     canvas.width = Math.floor(size.w * dpr);
//     canvas.height = Math.floor(size.h * dpr);
//     canvas.style.width = `${size.w}px`;
//     canvas.style.height = `${size.h}px`;

//     const ctx = canvas.getContext("2d");
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

//     let raf = 0;
//     const start = performance.now();

//     const draw = (now) => {
//       const t = (now - start) / 1000;
//       ctx.clearRect(0, 0, size.w, size.h);

//       // background haze
//       const grad = ctx.createRadialGradient(
//         size.w * 0.5,
//         size.h * 0.45,
//         10,
//         size.w * 0.5,
//         size.h * 0.45,
//         Math.max(size.w, size.h) * 0.7
//       );
//       grad.addColorStop(0, "rgba(255,255,255,0.06)");
//       grad.addColorStop(1, "rgba(255,255,255,0)");
//       ctx.fillStyle = grad;
//       ctx.fillRect(0, 0, size.w, size.h);

//       // lines: connect sequential messages
//       for (let i = 1; i < nodes.length; i++) {
//         const a = nodes[i - 1];
//         const b = nodes[i];
//         const pulse = 0.35 + 0.25 * Math.sin(t * 1.2 + i * 0.7);

//         ctx.beginPath();
//         ctx.moveTo(a.x, a.y);
//         ctx.lineTo(b.x, b.y);
//         ctx.strokeStyle = `rgba(255,255,255,${0.08 + pulse * 0.08})`;
//         ctx.lineWidth = 1;
//         ctx.stroke();
//       }

//       // stars
//       for (const n of nodes) {
//         const tw = 0.6 + 0.4 * Math.sin(t * (1.2 + n.strength) + hashTo01(n.id) * 10);

//         // glow ring
//         if (n.glow) {
//           ctx.beginPath();
//           ctx.arc(n.x, n.y, 16, 0, Math.PI * 2);
//           ctx.fillStyle = "rgba(255,255,255,0.06)";
//           ctx.fill();
//         }

//         // core star
//         ctx.beginPath();
//         ctx.arc(n.x, n.y, n.r + tw * 1.0, 0, Math.PI * 2);

//         const alpha = n.role === "user" ? 0.78 : 0.62;
//         ctx.fillStyle = `rgba(255,255,255,${alpha})`;
//         ctx.fill();

//         // tiny halo
//         ctx.beginPath();
//         ctx.arc(n.x, n.y, 10, 0, Math.PI * 2);
//         ctx.fillStyle = `rgba(255,255,255,${0.04 + tw * 0.04})`;
//         ctx.fill();
//       }

//       raf = requestAnimationFrame(draw);
//     };

//     raf = requestAnimationFrame(draw);
//     return () => cancelAnimationFrame(raf);
//   }, [nodes, size.w, size.h]);

//   function onClick(e) {
//     const wrap = ref.current;
//     const canvas = wrap?.querySelector("canvas");
//     if (!wrap || !canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;

//     // find nearest
//     let best = null;
//     let bestD = 999999;
//     for (const n of nodes) {
//       const dx = n.x - x;
//       const dy = n.y - y;
//       const d = dx * dx + dy * dy;
//       if (d < bestD) {
//         bestD = d;
//         best = n;
//       }
//     }

//     if (best && bestD < 22 * 22) onSelect?.(best.id);
//   }

//   return (
//     <div ref={ref} className="relative h-full w-full" onClick={onClick}>
//       <canvas className="absolute inset-0" />
//       <div className="pointer-events-none absolute inset-0 rounded-3xl border border-white/10" />
//       <div className="pointer-events-none absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-white/75 backdrop-blur-md">
//         Constellation Map • click a star
//       </div>
//     </div>
//   );
// }
