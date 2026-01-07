export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden text-white bg-black">
      {/* Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/videos/space.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/65" />

      {/* Content */}
      <section className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-6 py-16">
        {/* Editorial Card */}
        <div
          // className="
          //  w-full rounded-[34px]
          //  bg-white/3
          //  backdrop-blur-md
          //  border border-white/8
          //  shadow-[0_14px_40px_rgba(0,0,0,0.22)]
          //  overflow-hidden"

        >
          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-10 p-10 md:p-14 items-center">
            {/* LEFT: editorial text */}
            <div>
              <p className="mb-5 text-xs tracking-[0.28em] uppercase text-white/55">
                FULL STACK • ML/AI • Security
              </p>

              {/* Big name like the reference */}
              <h1 className="text-[64px] md:text-[78px] font-extrabold leading-[0.92] tracking-tight">
                Mansi
                <span className="block text-white/70">Patel</span>
              </h1>

              <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-white/70">
                I design and build modern web systems with a focus on performance, scalability, and clean user experience. My work spans full-stack development, cloud infrastructure, and AI-driven features always with an emphasis on building software that holds up in the real world.
              </p>

              {/* Buttons like the reference */}
              <div className="mt-10 flex flex-wrap items-center gap-4">
                {/* <a
                  href="/projects"
                  className="
                    rounded-full bg-white px-8 py-3
                    font-semibold text-black
                    shadow-[0_18px_50px_rgba(0,0,0,0.45)]
                    hover:opacity-95 transition
                  "
                >
                  View Projects →
                </a> */}

                {/* <a
                  href="/contact"
                  className="
                    rounded-full bg-white/10 px-8 py-3
                    font-semibold text-white
                    border border-white/10 backdrop-blur
                    hover:bg-white/14 transition
                  "
                >
                  Contact
                </a> */}
              </div>

              {/* Small details line like the reference */}
              <div className="mt-10 text-sm text-white/55">
                📍United States, Earth, Milky Way
              </div>
            </div>

            {/* RIGHT: oval/circle portrait like the reference */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                {/* Subtle glow behind image */}
                <div className="absolute -inset-10 rounded-full bg-indigo-500/10 blur-3xl" />

                {/* Oval portrait */}
                <div
                  className="
                    relative h-[320px] w-[260px] md:h-[360px] md:w-[300px]
                    overflow-hidden
                    rounded-[999px]
                    border border-white/12
                    bg-white/5
                    shadow-[0_30px_80px_rgba(0,0,0,0.60)]
                  "
                >
                  <img
                    src="/me.JPG"
                    alt="My portrait"
                    className="h-full w-full object-cover"
                  />
                  {/* soft highlight */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent" />
                </div>

                {/* Tiny tag under photo (optional) */}
                {/* <div
                  className="
                    mt-5 text-center text-xs text-white/60
                    tracking-[0.18em] uppercase
                  "
                >
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </section>         
    </main>
  );
}
