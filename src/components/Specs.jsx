import { useCallback, useRef } from "react";
import gsap from "gsap";
import useSectionVisibilityLifecycle from "../hooks/useSectionVisibilityLifecycle";

const specs = [
  {
    label: "Primary Stack",
    value: "JavaScript / React / Python",
    desc: "Building modern web interfaces with strong frontend logic, responsive layouts, and interactive user experiences.",
  },
  {
    label: "Frontend Focus",
    value: "React / GSAP / Tailwind",
    desc: "Crafting responsive interfaces with smooth motion, clean structure, and immersive visual flow.",
  },
  {
    label: "Backend Support",
    value: "Laravel / PHP / SQL",
    desc: "Able to connect interfaces with database-driven systems and application logic.",
  },
  {
    label: "Design Sense",
    value: "Figma / Prototyping",
    desc: "Creating layouts that feel modern, readable, and smooth across user journeys.",
  },
];

const stats = [
  { number: "90%", label: "React Interface Development", level: 90 },
  { number: "88%", label: "Responsive UI Layout", level: 88 },
  { number: "85%", label: "GSAP Motion System", level: 85 },
  { number: "82%", label: "Backend & Database Flow", level: 82 },
];

const cardColors = ["#35c9ff", "#ff4fd8", "#ffe45c", "#b7ff4a"];

export default function Specs() {
  const sectionRef = useRef(null);
  const sectionAnimationsRef = useRef([]);

  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const cardsRef = useRef([]);
  const statsRef = useRef([]);
  const lineRef = useRef(null);
  const glowRef = useRef(null);

  const resetSpecsAnimation = useCallback(() => {
    gsap.set([titleRef.current, subtitleRef.current], {
      autoAlpha: 0,
      y: 36,
    });

    gsap.set(cardsRef.current.filter(Boolean), {
      autoAlpha: 0,
      y: 70,
      rotate: (index) => (index % 2 === 0 ? -3 : 3),
      scale: 0.92,
      transformOrigin: "50% 100%",
    });

    gsap.set(statsRef.current.filter(Boolean), {
      autoAlpha: 0,
      y: 40,
      scale: 0.9,
    });

    gsap.set(lineRef.current, {
      scaleX: 0,
      transformOrigin: "left center",
    });

    gsap.set(glowRef.current, {
      autoAlpha: 0,
      scale: 0.8,
    });
  }, []);

  const startSpecsAnimation = useCallback((controller) => {
    const cards = cardsRef.current.filter(Boolean);
    const statsItems = statsRef.current.filter(Boolean);

    const introTimeline = gsap.timeline();

    introTimeline
      .to(glowRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
      })
      .to(
        titleRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "back.out(1.35)",
        },
        "-=0.75"
      )
      .to(
        subtitleRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        },
        "-=0.45"
      )
      .to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 0.9,
          ease: "power3.inOut",
        },
        "-=0.35"
      )
      .to(
        cards,
        {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.75,
          stagger: 0.12,
          ease: "back.out(1.45)",
        },
        "-=0.45"
      )
      .to(
        statsItems,
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.35"
      );

    controller.add(introTimeline);

    controller.add(
      gsap.to(glowRef.current, {
        yPercent: -12,
        rotate: 8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    );

    controller.add(
      gsap.to(cards, {
        y: -6,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.18,
        ease: "sine.inOut",
      })
    );
  }, []);

  useSectionVisibilityLifecycle(sectionRef, sectionAnimationsRef, {
    onEnter: startSpecsAnimation,
    onReset: resetSpecsAnimation,
  });

  return (
    <section
      ref={sectionRef}
      id="specs"
      className="neo-page relative flex min-h-screen items-center overflow-hidden px-6 py-24 text-black lg:px-12"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-6rem] top-20 h-64 w-64 rounded-full border-4 border-black bg-[#ff4fd8] shadow-[8px_8px_0_#0b0b0b]" />
        <div className="absolute bottom-16 right-[-6rem] h-72 w-72 rounded-full border-4 border-black bg-[#ffe45c] shadow-[8px_8px_0_#0b0b0b]" />
      </div>

      <div
        ref={glowRef}
        className="pointer-events-none absolute right-[-10rem] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-[#35c9ff]/35 blur-3xl"
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="mb-14 max-w-4xl">
          <p ref={subtitleRef} className="neo-label mb-6">
            Technical Specifications
          </p>

          <h2
            ref={titleRef}
            className="neo-title text-5xl sm:text-6xl md:text-8xl"
          >
            BUILT FOR
            <span className="neo-highlight-pink block italic">
              CLEAN SYSTEMS,
            </span>
            <span className="neo-highlight-cyan block">
              SHARP MOTION.
            </span>
          </h2>

          <div
            ref={lineRef}
            className="mt-8 h-4 w-full origin-left rounded-full border-4 border-black bg-[#b7ff4a]"
          />
        </div>

        <div className="grid items-start gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-6 sm:grid-cols-2">
            {specs.map((item, index) => (
              <article
                key={item.label}
                ref={(element) => (cardsRef.current[index] = element)}
                className="group relative rounded-[28px] border-4 border-black bg-white p-6 shadow-[8px_8px_0_#0b0b0b] transition-all duration-300 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[4px_4px_0_#0b0b0b]"
              >
                <div
                  className="mb-5 inline-flex rounded-full border-4 border-black px-4 py-2 text-[10px] font-black uppercase tracking-[0.25em] shadow-[4px_4px_0_#0b0b0b]"
                  style={{ backgroundColor: cardColors[index % cardColors.length] }}
                >
                  {item.label}
                </div>

                <h3 className="mb-4 text-3xl font-black uppercase italic leading-none tracking-[-0.05em] text-black transition-colors duration-300 group-hover:text-[#ff4fd8]">
                  {item.value}
                </h3>

                <p className="text-sm font-bold leading-7 text-black/70">
                  {item.desc}
                </p>

                <div className="mt-6 h-[12px] w-full overflow-hidden rounded-full border-2 border-black bg-[#f7f4ea]">
                  <div
                    className="h-full w-2/3 rounded-full border-r-2 border-black bg-black transition-all duration-500 group-hover:w-full"
                  />
                </div>

                <div
                  className="absolute -right-3 -top-3 h-9 w-9 rounded-full border-4 border-black shadow-[3px_3px_0_#0b0b0b]"
                  style={{ backgroundColor: cardColors[(index + 1) % cardColors.length] }}
                />
              </article>
            ))}
          </div>

          <div className="relative rounded-[32px] border-4 border-black bg-white p-7 shadow-[10px_10px_0_#0b0b0b]">
            <div className="absolute -right-5 -top-5 rotate-6 rounded-2xl border-4 border-black bg-[#35c9ff] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] shadow-[5px_5px_0_#0b0b0b]">
              Matrix
            </div>

            <p className="mb-8 text-[12px] font-black uppercase tracking-[0.3em] text-black/55">
              Performance Matrix
            </p>

            <div className="space-y-5">
              {stats.map((item, index) => {
                const radius = 18;
                const circumference = 2 * Math.PI * radius;
                const progress = circumference * (1 - item.level / 100);
                const color = cardColors[index % cardColors.length];

                return (
                  <div
                    key={item.label}
                    ref={(element) => (statsRef.current[index] = element)}
                    className="flex items-center justify-between gap-5 rounded-[24px] border-4 border-black bg-[#f7f4ea] p-4 shadow-[5px_5px_0_#0b0b0b]"
                  >
                    <div>
                      <p className="text-4xl font-black italic text-black">
                        {item.number}
                      </p>

                      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-black/60">
                        {item.label}
                      </p>
                    </div>

                    <div
                      className="relative h-14 w-14 rounded-full border-4 border-black shadow-[4px_4px_0_#0b0b0b]"
                      style={{ backgroundColor: color }}
                    >
                      <svg
                        className="absolute inset-0 h-full w-full -rotate-90"
                        viewBox="0 0 48 48"
                      >
                        <circle
                          cx="24"
                          cy="24"
                          r={radius}
                          fill="none"
                          stroke="rgba(11,11,11,0.22)"
                          strokeWidth="4"
                        />

                        <circle
                          cx="24"
                          cy="24"
                          r={radius}
                          fill="none"
                          stroke="#0b0b0b"
                          strokeWidth="4"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={progress}
                        />
                      </svg>

                      <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-black bg-white" />
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 rounded-[24px] border-4 border-black bg-[#b7ff4a] p-5 shadow-[5px_5px_0_#0b0b0b]">
              <p className="text-sm font-bold leading-7 text-black/75">
                Calibrated for responsive interface systems, smooth motion
                layers, clean component structure, and reliable data-driven web
                workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}