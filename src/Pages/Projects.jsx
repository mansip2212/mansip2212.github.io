import { useMemo, useState } from "react";
import {
  Sparkles,
  Folder,
  Search,
  ArrowUpRight,
  Github,
  Cpu,
  Server,
  Globe,
  Activity, 
  Map,
  Radar,
  LineChart,
} from "lucide-react";

const cx = (...c) => c.filter(Boolean).join(" ");

const pill =
  "inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80";

const card =
  "rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl";

function Chip({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "rounded-full border px-3 py-1 text-xs transition",
        active
          ? "border-white/20 bg-white/10 text-white"
          : "border-white/10 bg-white/5 text-white/75 hover:bg-white/8 hover:text-white"
      )}
    >
      {children}
    </button>
  );
}

// Generate beautiful AI-style gradient placeholder based on project title
function generateProjectPlaceholder(title) {
  // Generate consistent colors based on title hash
  let hash = 0;
  for (let i = 0; i < title.length; i++) {
    hash = title.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const hue1 = Math.abs(hash) % 360;
  const hue2 = (hue1 + 60) % 360;
  const hue3 = (hue1 + 120) % 360;
  
  // Create vibrant gradient colors
  const color1 = `hsl(${hue1}, 70%, 40%)`;
  const color2 = `hsl(${hue2}, 65%, 35%)`;
  const color3 = `hsl(${hue3}, 60%, 30%)`;
  
  // Encode SVG for use as data URI
  const svg = `<svg width="800" height="400" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:${color1};stop-opacity:1" />
        <stop offset="50%" style="stop-color:${color2};stop-opacity:1" />
        <stop offset="100%" style="stop-color:${color3};stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#grad)" />
  </svg>`.replace(/\n\s+/g, ' ').trim();
  
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

function ProjectCard({
  icon: Icon,
  title,
  subtitle,
  impact,
  bullets = [],
  tags = [],
  links = {},
  image,
}) {
  // Use provided image or generate an AI-style gradient placeholder
  const displayImage = image || generateProjectPlaceholder(title);
  
  return (
    <div className={card}>
      {/* Project Image - Always show (custom or AI-generated gradient) */}
      <div className="mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-3xl relative group">
        <img
          src={displayImage}
          alt={title}
          className="w-full h-48 object-cover border-b border-white/10 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            // Fallback to generated placeholder if image fails to load
            e.target.src = generateProjectPlaceholder(title);
          }}
        />
        {/* Overlay for AI-generated images */}
        {!image && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-3 left-4 text-white/80 text-xs font-medium">
              AI-Generated Preview
            </div>
          </div>
        )}
      </div>

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/25">
            <Icon size={18} className="text-white/85" />
          </div>

          <div>
            <div className="text-white">
              <span className="font-semibold">{title}</span>
            </div>
            <div className="mt-1 text-sm text-white/60">{subtitle}</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {links?.live && (
            <a
              href={links.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/20 px-4 py-1.5 text-xs font-medium text-blue-300 hover:bg-blue-500/30 hover:border-blue-400/50 hover:text-blue-200 transition-all duration-200 shadow-lg shadow-blue-500/10 hover:shadow-blue-500/20"
            >
              Live <ArrowUpRight size={14} />
            </a>
          )}
          {links?.github && (
            <a
              href={links.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/75 hover:bg-white/10 hover:text-white transition"
            >
              GitHub <Github size={14} />
            </a>
          )}
        </div>
      </div>

      {impact && (
        <div className="mt-4 rounded-2xl border border-white/10 bg-black/25 p-4 text-sm text-white/80">
          <span className="text-white/60">Impact:</span> {impact}
        </div>
      )}

      <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc pl-5 marker:text-white/50">
        {bullets.map((b) => (
          <li key={b} className="leading-6">
            {b}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span key={t} className={pill}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  // ✅ Projects pulled from your resume
  const projects = useMemo(
    () => [
      {
        id: "smartstock",
        icon: Radar,
        title: "SmartStock - LLM Based Inventory Management System",
        subtitle: "React.js, Next.js, Chart.js, Firebase, Stripe API, MCP",
        category: "Full Stack",
        image: "/projects/smartstock.png",
        impact:
          "Enabled token-efficient LLM queries with ~97% semantic retrieval precision and a 30% boost in operational efficiency; maintained <300ms inference latency in production.",
        bullets: [
          "Streamlined an LLM-augmented platform, integrating Google Gemini 2.0 Flash by context-window optimized query resolution with chat support and event-driven frontends over real-time Fire store streams across all locations enabling token-efficient queries with around 97% semantic retrieval precision and a 30% boost in operational efficiency.",
          "Developed secure OAuth 2.0 authentication layer and end-to-end zero-downtime CI/CD pipelines, enhancing deployment velocity by 30% and improving concurrent user handling by 50%, while maintaining inference latency under 300ms across production Firebase environments.",
        ],
        tags: [
          "React.js",
          "Next.js",
          "Chart.js",
          "Firebase",
          "Stripe API",
          "MCP",
          "Gemini 2.0 Flash",
          "OAuth 2.0",
          "CI/CD",
        ],
        links: {
          live: "https://smart-stock-murex.vercel.app/",
        },
      },
      {
        id: "segmentation",
        icon: Map,
        title: "Autonomous Vehicle Semantic Segmentation",
        subtitle: "TensorFlow, CNN, Scikit-learn, HuggingFace, NumPy",
        category: "AI/ML",
        image: "/projects/segmentation.png",
        impact:
          "Achieved >98% precision for object boundary detection critical for vehicle navigation.",
        bullets: [
          "Built a multi class semantic segmentation pipeline by 3 CNN models for boosting accuracy, based on the combination of Lyft and Audi Dataset, with over 98% precision for object boundary detection critical for vehicle navigation.",
          "Constructed data pre-processing and augmentation workflow plots, enhancing DeeplabV3 model generalization and improving segmentation accuracy across diverse urban driving scenarios.",
        ],
        tags: [
          "TensorFlow",
          "CNN",
          "Scikit-learn",
          "HuggingFace",
          "NumPy",
          "DeeplabV3",
          "Computer Vision",
        ],
        links: {},
      },
      {
        id: "slot-payout",
        icon: LineChart,
        title: "Slot Payout Management System",
        subtitle: "React, Laravel, Chart.js, MongoDB, C#, MySQL, MQTT, HangFire",
        category: "Full Stack",
        image: "/projects/slot-payout.png",
        impact:
          "Improved admin operational efficiency by 30% and contributed to a 25% surge in site-wide revenue via secure real-time reporting workflows.",
        bullets: [
          "Implemented scalable front-end and back-end modules for a centralized Admin Dashboard, enabling administrators to remotely monitor and configure operational systems across multiple locations with a 30% improvement in efficiency.",
          "Crafted secure reporting workflows by integrating with C# backend services, automating real-time data capture from slot machines and safeguarding transactional integrity, contributing to a 25% surge in site-wide revenue.",
        ],
        tags: [
          "React",
          "Laravel",
          "Chart.js",
          "MongoDB",
          "C#",
          "MySQL",
          "MQTT",
          "HangFire",
          "Admin Dashboard",
        ],
        links: {},
      },
      {
        id: "vaccine-reco-geo",
        icon: Activity,
        title: "Predicting Vaccine Recommendation with Geospatial Visualization",
        subtitle: "LSTM, ElasticNet, PySpark, Real-time APIs, Geospatial Analytics",
        category: "AI/ML",
        image: "/projects/vaccine-reco.png",
        impact:
          "Processed 1M+ records with ~96% predictive accuracy and enabled ~30% more efficient vaccine deployment in high-risk regions.",
        bullets: [
          "Developed a scalable COVID-19 vaccine recommendation system using LSTM neural networks and ElasticNet regression, processing 1M+ records via distributed PySpark pipelines and achieving ~96% predictive accuracy.",
          "Designed and deployed an interactive geospatial analytics dashboard integrating real-time public health APIs with choropleth maps, heatmaps, and trend visualizations, enabling data-driven allocation and improving deployment efficiency by ~30% in high-risk regions.",
        ],
        tags: [
          "Machine Learning",
          "LSTM",
          "ElasticNet",
          "PySpark",
          "Geospatial Analytics",
          "APIs",
          "Data Visualization",
          "Public Health",
        ],
        links: {
          // live: "https://...",
          // github: "https://...",
        },
      },

    ],
    []
  );

  const categories = ["All", "Full Stack", "AI/ML"];
  const [active, setActive] = useState("All");
  const [q, setQ] = useState("");

  // ✅ Crash-proof search (handles missing fields safely)
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return projects.filter((p) => {
      const inCategory = active === "All" ? true : p.category === active;

      const haystack = (
        (p.title ?? "") +
        " " +
        (p.subtitle ?? "") +
        " " +
        (p.category ?? "") +
        " " +
        (p.tags ?? []).join(" ") +
        " " +
        (p.bullets ?? []).join(" ")
      ).toLowerCase();

      const inQuery = query ? haystack.includes(query) : true;
      return inCategory && inQuery;
    });
  }, [projects, active, q]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 text-white">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
          <Sparkles size={14} />
          Projects
        </div>

        {/* Controls */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex w-full items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 backdrop-blur-xl sm:max-w-md">
            <Search size={16} className="text-white/60" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search (e.g., Firebase, OAuth, CNN, MQTT)"
              className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Chip key={c} active={c === active} onClick={() => setActive(c)}>
                {c}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filtered.map((p) => (
          <ProjectCard
            key={p.id}
            icon={p.icon || Folder}
            title={p.title}
            subtitle={p.subtitle}
            impact={p.impact}
            bullets={p.bullets}
            tags={p.tags}
            links={p.links}
            image={p.image}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-8 text-center text-white/70 backdrop-blur-xl">
          No projects match your search/filter.
        </div>
      )}
    </div>
  );
}
