import { Shield, Sparkles, Code2, Cpu, GraduationCap, MapPin } from "lucide-react";

const pill = "rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80";

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 md:px-8 text-white">
     
       <div className="mb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80">
          <Sparkles className="h-4 w-4" />
          About
        </div>

        {/* <p className="mt-3 max-w-3xl text-sm leading-6 text-white/75 md:text-base">
          I build modern web products that feel premium: fast UIs, scalable systems, and AI features that
          ship cleanly. My background spans full-stack development, DevSecOps, and applied ML — with a
          strong focus on reliability and real-world impact.
        </p> */}

        {/* <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className={pill}>
            <MapPin className="mr-1 inline h-4 w-4" />
            Tempe, AZ (Remote-friendly)
          </span>
          <span className={pill}><Code2 className="mr-1 inline h-4 w-4" /> Full Stack</span>
          <span className={pill}><Cpu className="mr-1 inline h-4 w-4" /> ML/AI</span>
          <span className={pill}><Shield className="mr-1 inline h-4 w-4" /> Security</span>
        </div> */}
      </div> 
      <div className="grid gap-6 md:grid-cols-3">
        
        <section className="md:col-span-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold text-white">My story</h2>

            <p className="mt-3 text-sm leading-6 text-white/80">
              I didn’t enter tech because it looked flashy or because I wanted to chase trends.
              I entered it because I kept noticing how small engineering decisions quietly
              shape people’s daily experiences whether a product feels trustworthy,
              responsive, or frustrating.
            </p>

            <p className="mt-4 text-sm leading-6 text-white/75">
              Early on, I found myself drawn to the parts of systems most people don’t see:
              how data moves, how failures are handled, how security is enforced without
              breaking usability. I liked understanding <em>why</em> something worked
              not just that it worked.
            </p>

            <p className="mt-4 text-sm leading-6 text-white/75">
              Over time, that curiosity evolved into a clear direction. I enjoy building
              products where design, performance, and reliability aren’t treated as separate
              concerns. Where AI features feel integrated instead of bolted on. Where security
              exists by default, not as an afterthought.
            </p>

            <p className="mt-4 text-sm leading-6 text-white/75">
              What keeps me in this field is the responsibility that comes with shipping
              real software. Real users. Real consequences. I care deeply about building
              things that scale calmly, fail gracefully, and earn trust over time.
            </p>

            <p className="mt-4 text-sm leading-6 text-white/80">
              Today, I see myself not just as a developer, but as a product-minded engineer,
              someone who thinks about systems holistically, from architecture to experience.
              That mindset is what drives my work, and it’s why I’m intentional about every
              product I choose to build.
            </p>


            {/* <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center gap-2 text-white">
                  <Code2 className="h-4 w-4" />
                  <span className="font-medium">Product-grade UX</span>
                </div>
                <p className="mt-2 text-sm text-white/70">
                  Editorial layouts, motion that feels “native,” and UI polish that reads as premium.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center gap-2 text-white">
                  <Shield className="h-4 w-4" />
                  <span className="font-medium">Security mindset</span>
                </div>
                <p className="mt-2 text-sm text-white/70">
                  DevSecOps experience: compliance, vulnerability management, and reliable deployment flows.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center gap-2 text-white">
                  <Cpu className="h-4 w-4" />
                  <span className="font-medium">AI that feels native</span>
                </div>
                <p className="mt-2 text-sm text-white/70">
                  I prefer AI features that integrate naturally into a product — not random chat widgets.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center gap-2 text-white">
                  <Sparkles className="h-4 w-4" />
                  <span className="font-medium">Taste + performance</span>
                </div>
                <p className="mt-2 text-sm text-white/70">
                  Clean code, strong defaults, and small details that reduce friction for users.
                </p>
              </div>
            </div> */}
          </div>

          {/* <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold text-white">Timeline</h2>

            <ol className="mt-4 space-y-4">
              <li className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-white">
                    <span className="font-medium">CTO Intern — Sports Excitement LLC</span>
                    <div className="text-sm text-white/70">Microservices • CI/CD • Infra</div>
                  </div>
                  <span className="text-xs text-white/60">Sep 2025 — Present</span>
                </div>
                <p className="mt-2 text-sm text-white/70">
                  Leading engineering execution, improving reliability and deployment automation.
                </p>
              </li>

              <li className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-white">
                    <span className="font-medium">DevSecOps Security & Compliance Intern — IBM</span>
                    <div className="text-sm text-white/70">Compliance • Patching • Audit</div>
                  </div>
                  <span className="text-xs text-white/60">Feb 2023 — Jul 2023</span>
                </div>
                <p className="mt-2 text-sm text-white/70">
                  Worked on firewall/process improvements, vulnerability management, and standards-aligned roadmaps.
                </p>
              </li>
            </ol>
          </div> */}
        </section>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <h2 className="text-lg font-semibold text-white">Core skills</h2>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className={pill}>React</span>
              <span className={pill}>Node.js</span>
              <span className={pill}>JavaScript</span>
              <span className={pill}>Python</span>
              <span className={pill}>Java</span>
              <span className={pill}>C++</span>
              <span className={pill}>SQL</span>
              <span className={pill}>PostgreSQL</span>
              <span className={pill}>MongoDB</span>
              <span className={pill}>Docker</span>
              <span className={pill}>CI/CD</span>
              <span className={pill}>Terraform</span>
              <span className={pill}>AWS</span>
              <span className={pill}>GCP</span>
              <span className={pill}>REST APIs</span>
              <span className={pill}>Microservices</span>
              <span className={pill}>DevSecOps</span>
              <span className={pill}>Security & Compliance</span>
              <span className={pill}>Linux</span>
              <span className={pill}>Git & GitLab</span>
              <span className={pill}>Jenkins</span>
              <span className={pill}>System Design</span>
              <span className={pill}>ML Systems</span>
              <span className={pill}>PyTorch</span>
              <span className={pill}>TensorFlow</span>

            </div>

            <p className="mt-4 text-sm text-white/70">
              Broad stack across frontend, backend, infrastructure, and applied ML. 
            </p>
          </div>

          {/* <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 text-white">
              <GraduationCap className="h-5 w-5" />
              <h2 className="text-lg font-semibold">Education</h2>
            </div>

            <div className="mt-4 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-white">
                  <div className="font-medium">Arizona State University</div>
                  <div className="text-sm text-white/70">M.S. in Information Technology</div>
                </div>
                <div className="mt-2 text-xs text-white/60">May 2025 • GPA 3.97</div>
                <div className="mt-2 text-xs text-white/60">Tempe, AZ</div>
                <div className="mt-2 text-xs text-white/60">Cloud • Advanced DB • Systems Dev</div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="text-white">
                  <div className="font-medium">Gujarat Technological University</div>
                  <div className="text-sm text-white/70">B.E. in Information Technology</div>
                </div>
                <div className="mt-2 text-xs text-white/60">Jun 2023 • GPA 4.00</div>
              </div>
            </div>
          </div> */}
        </aside> 
      </div>
    </div>
  );
}
