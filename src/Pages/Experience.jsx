import {
  Sparkles,
  Rocket,
  Shield,
  Briefcase,
  Server,
  Wrench,
} from "lucide-react";

const pill =
  "inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80";

const card =
  "rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl";

function ExperienceCard({
  icon: Icon,
  role,
  company,
  time,
  location,
  summary,
  highlights,
  stack,
}) {
  return (
    <div className={card}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-black/25">
            <Icon size={18} className="text-white/85" />
          </div>

          <div>
            <div className="text-white">
              <span className="font-semibold">{role}</span>
            </div>
            <div className="mt-1 text-sm text-white/60">
              {company} • {location}
            </div>
          </div>
        </div>

        <span className="hidden sm:inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70">
          {time}
        </span>
        
      </div>

      {/* Summary */}
      <p className="mt-4 text-sm leading-6 text-white/75">{summary}</p>

      {/* Bullet points (ATS-friendly) */}
      <ul className="mt-4 space-y-2 text-sm text-white/80 list-disc pl-5 marker:text-white/50">
        {highlights.map((h) => (
          <li key={h} className="leading-6">
            {h}
          </li>
        ))}
      </ul>

      {/* Stack */}
      <div className="mt-5 flex flex-wrap gap-2">
        {stack.map((s) => (
          <span key={s} className={pill}>
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 text-white">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
          <Sparkles size={14} />
          Professional Experience
        </div>

      </div>

      {/* Experience list */}
      <div className="space-y-6">
        {/* Sports Excitement */}
        <ExperienceCard
          icon={Rocket}
          role="CTO Intern"
          company="Sports Excitement LLC"
          time="Sep 2025 - Present"
          location="New York, United States"
          summary="Worked across frontend development, infrastructure, and deployment pipelines to support production-grade web applications."
          highlights={[
            "Developed and maintained frontend features using React and Next.js for a consumer-facing web platform. Lead 2 engineering teams to design and develop scalable backend features and microservices, improving system throughput and ensuring smooth performance under high traffic workloads.",
            "Authored CI/CD pipelines and multi-cloud infrastructure that improved deployment reliability by 30% and reduced release turnaround by 25% through automation with Docker, GitLab, and Terraform that reduces deployment friction, increased release frequency, and strengthen reliability across distributed services.",
            "Diagnosed and resolved complex production issues by tracing cross-service failures, improving fault tolerance, and introducing engineering best practices that boosted overall platform stability and developer velocity. Configured Docker-based environments to standardize development and production builds.",
          ]}
          stack={[
            "React",
            "Next.js",
            "JavaScript",
            "Node.js",
            "Docker",
            "CI/CD",
            "Nginx",
            "Linux",
          ]}
        />

        <ExperienceCard
          icon={Shield}
          role="DevSecOps Security & Compliance Intern"
          company="IBM"
          time="Feb 2023 - Aug 2023"
          location="Ahmedabad, India"
          summary="Supported security, compliance, and DevSecOps initiatives within enterprise engineering environments."
          highlights={[
            "Collaborated with a 5-member Network Engineering team to streamline firewall configuration, supported migration and annual review of business continuity processes across 10+ products within sustainability software division.",
            "Ensured 2 vulnerability management software compliance, patching, and audit reporting, maintaining a 95%+ compliance ratio across 500+ servers and mitigating 40% of vulnerabilities.",
            "Engineered a roadmap by aligning internal processes with SOC, ISO 27001, and FedRAMP standards for strengthening audit frameworks, resulting in reduced policy deviations and faster certification cycles",
          ]}
          stack={[
            "DevSecOps",
            "Security",
            "Compliance",
            "CI/CD",
            "Jenkins",
            "GitLab",
            "Linux",
        ]}
        />

        {/* Clear Health — Lead IT Support Engineer */}
        <ExperienceCard
          icon={Briefcase}
          role="Lead Information Technology Support Engineer"
          company="Clear Health"
          time="Dec 2022 - Aug 2023"
          location="New York, United States (Remote)"
          summary="Led technical support and systems automation efforts for a healthcare platform serving providers and patients at scale."
          highlights={[
            "Architected custom automation scripts and internal tooling that replaced manual device provisioning and patient data entry, resulting in a 40% increase in operational efficiency.",
            "Owned end-to-end validation of telemedicine APIs and pharmacy integrations, ensuring secure and uninterrupted data flow for prescription delivery.",
            "Diagnosed and debugged cross-system failures involving authentication and video-telephony services, improving platform uptime and reliability for over 100 healthcare providers.",
            "Strengthened platform security by implementing granular access controls and automated auditing mechanisms to ensure HIPAA compliance across production systems.",
          ]}
          stack={[
            "Automation",
            "APIs",
            "Authentication",
            "HIPAA",
            "Security",
            "Monitoring",
            "Healthcare Systems",
          ]}
        />

        
        
      </div>
    </div>
  );
}
