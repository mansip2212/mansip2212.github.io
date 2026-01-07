// src/Pages/Hobbies.jsx
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Stars,
  Sparkles,
  Heart,
  Music,
  Camera,
  Gamepad2,
  BookOpen,
  Compass,
  Utensils,
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

/**
 * Wider orbits + smaller planets.
 * Two rings supported by ring: 1 | 2 and angle degrees.
 */
function computeOrbitLayout(items, width, height) {
  const base = Math.min(width, height);
  const cx0 = width / 2;
  const cy0 = height / 2;

  const tiny = width < 360;
  const small = width < 420;

  // ✅ Reduce inset so planets can go farther out without being clamped too early
  const inset = Math.max(10, base * 0.05);

  // ✅ Make orbits ~2x larger (but capped so they don't go out of bounds)
  const orbitScale = 2; 
  const maxR = base / 2 - inset; // max possible radius inside the box

  const r1Raw = base * (tiny ? 0.32 : small ? 0.36 : 0.40) * orbitScale;
  const r2Raw = base * (tiny ? 0.48 : small ? 0.52 : 0.58) * orbitScale;

  const r1 = Math.min(r1Raw, maxR * 0.72);
  const r2 = Math.min(r2Raw, maxR * 0.92);

  // ✅ slightly smaller planets (recommended if orbits go wider)
  const minSize = tiny ? 40 : 44;
  const maxSize = tiny ? 56 : 64;

  return items.map((h) => {
    const R = h.ring === 2 ? r2 : r1;
    const rad = (h.angle * Math.PI) / 180;

    const size = Math.max(minSize, Math.min(h.size, maxSize));
    const half = size / 2;

    let x = cx0 + Math.cos(rad) * R;
    let y = cy0 + Math.sin(rad) * R;

    // clamp so nothing is cut off
    x = Math.max(inset + half, Math.min(width - inset - half, x));
    y = Math.max(inset + half, Math.min(height - inset - half, y));

    return { ...h, _x: x, _y: y, _size: size };
  });
}


const HOBBIES = [
  {
    id: "music",
    label: "Music",
    icon: Music,
    color: "from-pink-400 via-fuchsia-400 to-violet-400",
    vibe: "Main character energy.",
    diary: {
      title: "Music = my emotional reset button 🎧",
      text: "When my brain is loud, music makes it softer. When I’m tired, it gives me a second wind. It’s not background noise, it’s a mood designer.",
      littleThings: [
        "Headphones on = instant focus",
        "Playlists for every life phase",
        "I code better with rhythm",
      ],
      secretSkill: "I can change my energy in minutes just by switching a playlist.",
    },
    tags: ["Flow", "Mood", "Reset"],
    ring: 1,
    angle: 330,
    size: 35,
  },
  {
    id: "travel",
    label: "Exploring",
    icon: Compass,
    color: "from-emerald-300 via-teal-300 to-sky-300",
    vibe: "New places = new perspectives.",
    diary: {
      title: "Exploring keeps me inspired ✈️",
      text: "New environments give me new input. I come back with fresher ideas, calmer energy, and better perspective on what matters.",
      littleThings: ["Walking playlists", "City lights", "Cafés with good chairs"],
      secretSkill: "I adapt fast without losing myself.",
    },
    tags: ["Curiosity", "Perspective", "Energy"],
    ring: 1,
    angle: 40,
    size: 28,
  },
  {
    id: "reading",
    label: "Reading",
    icon: BookOpen,
    color: "from-sky-300 via-cyan-300 to-emerald-300",
    vibe: "Quiet girl brain = activated.",
    diary: {
      title: "Reading is my private upgrade 📖",
      text: "I read when I want my brain to feel bigger. It’s the most peaceful way I learn, reflect, and collect ideas that later show up in how I build.",
      littleThings: ["Notes > quotes", "Stories + non-fiction mix", "I love clean writing"],
      secretSkill: "I turn random ideas into structured thinking.",
    },
    tags: ["Depth", "Ideas", "Calm"],
    ring: 1,
    angle: 120,
    size: 32,
  },
  {
    id: "food",
    label: "Food Experiments",
    icon: Utensils,
    color: "from-rose-300 via-pink-300 to-amber-200",
    vibe: "Cute chaos in the kitchen.",
    diary: {
      title: "Cooking is experimentation but delicious 😋",
      text: "I like changing one variable and seeing what happens. It’s basically engineering… with seasoning.",
      littleThings: ["Trying new recipes", "Balancing flavors", "Plating = aesthetic points"],
      secretSkill: "I iterate quickly and don’t panic when things aren’t perfect.",
    },
    tags: ["Experiment", "Iteration", "Joy"],
    ring: 1,
    angle: 200,
    size: 36,
  },
  {
    id: "photography",
    label: "Photography",
    icon: Camera,
    color: "from-amber-300 via-orange-300 to-rose-300",
    vibe: "Soft details. Sharp taste.",
    diary: {
      title: "Photography trains my taste 📸",
      text: "It makes me notice light, balance, and what doesn’t belong. That spills into my UI work clean, intentional, and never random.",
      littleThings: ["Golden-hour obsession", "Minimal frames", "Tiny details = the whole story"],
      secretSkill: "I’m good at editing out the noise in photos and in products.",
    },
    tags: ["Taste", "Composition", "Detail"],
    ring: 1,
    angle: 260,
    size: 29,
  },
  {
    id: "games",
    label: "Games",
    icon: Gamepad2,
    color: "from-violet-400 via-indigo-400 to-sky-300",
    vibe: "Strategy + dopamine + systems.",
    diary: {
      title: "Games taught me systems 🎮",
      text: "I love games that reward mastery. Clean rules. Strong feedback loops. It’s literally product thinking disguised as fun.",
      littleThings: ["Progression curves", "Optimizing builds", "Co-op chaos (respectfully)"],
      secretSkill: "I spot feedback loops fast and I design for them.",
    },
    tags: ["Systems", "Loops", "Mastery"],
    ring: 2,
    angle: 150,
    size: 31,
  },
];

function Pill({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur-md">
      {children}
    </span>
  );
}

function PlanetButton({ hobby, active, onClick }) {
  const Icon = hobby.icon;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cx(
        "group absolute rounded-full border border-white/10 bg-white/10 backdrop-blur-md",
        "transition hover:scale-[1.08] hover:bg-white/15",
        active &&
          "shadow-[0_0_0_1px_rgba(255,255,255,0.22),0_0_52px_rgba(236,72,153,0.20)]"
      )}
      style={{
        left: `${hobby._x}px`,
        top: `${hobby._y}px`,
        width: `${hobby._size}px`,
        height: `${hobby._size}px`,
        transform: "translate(-50%, -50%)",
      }}
      aria-label={hobby.label}
    >
      <div className={cx("absolute inset-0 rounded-full bg-gradient-to-r opacity-75", hobby.color)} />
      <div className="absolute inset-[12%] rounded-full bg-black/25" />

      <div
        className={cx(
          "pointer-events-none absolute -inset-2 rounded-full opacity-0 transition-opacity",
          active ? "opacity-100" : "group-hover:opacity-60"
        )}
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.30), rgba(255,255,255,0) 60%)",
          filter: "blur(8px)",
        }}
      />

      <div className="relative flex h-full w-full items-center justify-center">
        <div className="rounded-xl border border-white/10 bg-white/10 p-2">
          <Icon className="h-4 w-4 text-white/90" />
        </div>
      </div>

      <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-xs text-white/70 opacity-0 transition-opacity group-hover:opacity-100">
        {hobby.label}
      </div>
    </button>
  );
}

export default function Hobbies() {
  const [activeId, setActiveId] = useState(HOBBIES[0].id);
  const active = useMemo(() => HOBBIES.find((h) => h.id === activeId) || HOBBIES[0], [activeId]);
  const ActiveIcon = active.icon;

  const [orbitRef, orbitSize] = useElementSize();
  const orbitPlanets = useMemo(() => {
    if (!orbitSize.width || !orbitSize.height) return [];
    return computeOrbitLayout(HOBBIES, orbitSize.width, orbitSize.height);
  }, [orbitSize.width, orbitSize.height]);

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Background */}
      <video
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-90"
        src="/videos/space.mp4"
        autoPlay
        muted
        loop
        playsInline
      />
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-10 md:px-6">
        {/* Header */}
        <div className="flex flex-col gap-3">
          <div className="inline-flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur-md">
              <Stars className="h-3.5 w-3.5" />
              My Universe of Joy
            </span>
            {/* <Pill>soft + smart</Pill>
            <Pill>creative energy</Pill>
            <Pill>not a boring list</Pill> */}
          </div>

          {/* <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
            hobbies, but make it aesthetic ✨
          </h1>
          <p className="max-w-2xl text-white/70">
            These aren’t “things I do sometimes.” They’re the little worlds I orbit —
            the ones that keep me inspired, grounded, and honestly… happy.
          </p> */}
        </div>

        {/* Main grid */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* LEFT: Expanded Orbit Card */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
            <div className="flex items-center justify-between gap-4">
              <div>
                {/* <div className="text-xs text-white/60">INTERACTIVE MOODBOARD</div> */}
                <div className="mt-1 text-sm font-semibold text-white">
                  Click a planet to read the diary entry
                </div>
              </div>

              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                <Sparkles className="h-3.5 w-3.5" />
                orbiting hobbies
              </span>
            </div>

            <div className="mt-5">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/20 p-4">
                {/* grid */}
                <div
                  className="pointer-events-none absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
                    backgroundSize: "22px 22px",
                  }}
                />

                {/* orbit stage */}
                <div
                    ref={orbitRef}
                    className="relative mx-auto mt-4 w-full h-[210px] sm:h-[260px] md:h-[310px]"
                >
                  {/* rings (scale with the box via base = min(w,h)) */}
                  <div className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md" />
                  <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 opacity-55" />
                  <div className="absolute left-1/2 top-1/2 h-[14rem] w-[14rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 opacity-30" />

                  {/* center */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="inline-flex items-center justify-center rounded-lg border border-white/10 bg-white/10 p-2 backdrop-blur-md">
                      <Heart className="h-1.5 w-1.5 text-white/90" />
                    </div>
                    <div className="mt-2 text-xs text-white/70">ME</div>
                    {/* <div className="text-[11px] text-white/50">soft + ambitious</div> */}
                  </div>

                  {/* planets */}
                  {orbitPlanets.map((h) => (
                    <PlanetButton
                      key={h.id}
                      hobby={h}
                      active={h.id === activeId}
                      onClick={() => setActiveId(h.id)}
                    />
                  ))}
                </div>

                <div className="mt-2 text-xs text-white/55">
                  Tip: hover planets for labels • click to switch diary
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Details / Diary panel */}
          <div className="lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
              <div className="flex items-start justify-between gap-4">
                <div>
                  {/* <div className="text-xs text-white/60">DIARY ENTRY</div> */}
                  <div className="mt-1 text-xl font-semibold text-white">
                    {active.diary.title}
                  </div>
                  <div className="mt-2 text-sm text-white/70">{active.vibe}</div>
                </div>
                <div className={cx("h-10 w-10 rounded-2xl bg-gradient-to-r opacity-80", active.color)} />
              </div>

              <div className="my-5 h-px w-full bg-white/10" />

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-sm leading-relaxed text-white/80">{active.diary.text}</p>

                <div className="mt-4">
                  <div className="text-xs text-white/55">LITTLE THINGS I LOVE:</div>
                  <ul className="mt-2 space-y-2 text-sm text-white/75">
                    {active.diary.littleThings.map((x) => (
                      <li key={x} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 rounded-full bg-white/40" />
                        <span>{x}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center gap-2 text-xs text-white/60">
                    <Sparkles className="h-3.5 w-3.5" />
                    secret skill unlocked
                  </div>
                  <div className="mt-1 text-sm font-semibold text-white">
                    {active.diary.secretSkill}
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                  <ActiveIcon className="h-3.5 w-3.5" />
                  {active.label}
                </span>
                {active.tags.map((t) => (
                  <Pill key={t}>{t}</Pill>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { transition: none !important; animation: none !important; }
        }
      `}</style>
    </div>
  );
}
