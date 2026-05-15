import React, { useCallback, useRef } from "react";
import gsap from "gsap";
import useSectionVisibilityLifecycle from "../hooks/useSectionVisibilityLifecycle";

import {
  FaReact,
  FaJs,
  FaGitAlt,
  FaPhp,
  FaLaravel,
  FaDatabase,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiGsap,
  SiTypescript,
  SiPython,
  SiMysql,
  SiVuedotjs,
} from "react-icons/si";

const roleWords = [
  "Clean Interface Designer",
  "Bold Motion Builder",
  "Interactive Web Creator",
  "Visual System Thinker",
  "Digital Product Maker",
];

const goalWords = ["bold", "smooth", "playful", "memorable"];

const skills = [
  { icon: FaReact, name: "React", level: 90 },
  { icon: SiGsap, name: "GSAP", level: 85 },
  { icon: SiTailwindcss, name: "Tailwind", level: 90 },
  { icon: FaJs, name: "JavaScript", level: 90 },
  { icon: SiTypescript, name: "TypeScript", level: 85 },
  { icon: FaGitAlt, name: "Git", level: 90 },
  { icon: SiPython, name: "Python", level: 90 },
  { icon: SiMysql, name: "SQL", level: 85 },
  { icon: FaDatabase, name: "Oracle", level: 85 },
  { icon: FaLaravel, name: "Laravel", level: 75 },
  { icon: FaPhp, name: "PHP", level: 75 },
  { icon: SiVuedotjs, name: "Vue.js", level: 75 },
];

const brutalColors = [
  "#35c9ff",
  "#ff4fd8",
  "#ffe45c",
  "#b7ff4a",
  "#8f5cff",
];

export default function About() {
  const sectionRef = useRef(null);
  const sectionAnimationsRef = useRef([]);

  const depthRef = useRef(null);
  const contentRef = useRef(null);
  const backgroundRef = useRef(null);
  const glowRef = useRef(null);
  const profileRef = useRef(null);
  const textRef = useRef(null);

  const roleTextRef = useRef(null);

  const goalTextRef = useRef(null);
  const goalWordRef = useRef(null);

  const systemsDepthRef = useRef(null);
  const systemsRef = useRef(null);

  const cardsRef = useRef([]);
  const barsRef = useRef([]);
  const percentsRef = useRef([]);

  const resetAboutAnimation = useCallback(() => {
    const cards = cardsRef.current.filter(Boolean);
    const bars = barsRef.current.filter(Boolean);
    const percents = percentsRef.current.filter(Boolean);

    percents.forEach((element) => {
      element.textContent = "0%";
    });

    if (roleTextRef.current) {
      roleTextRef.current.textContent = "";
    }

    if (goalWordRef.current) {
      goalWordRef.current.textContent = goalWords[0];
    }

    gsap.set(contentRef.current, {
      autoAlpha: 0,
      y: 52,
      rotate: -1.5,
      scale: 0.96,
      transformOrigin: "50% 60%",
    });

    gsap.set([textRef.current, systemsRef.current], {
      autoAlpha: 0,
      y: 42,
    });

    gsap.set(roleTextRef.current, {
      autoAlpha: 0,
      y: 28,
      rotate: 1.5,
      scale: 0.96,
      filter: "blur(6px)",
    });

    gsap.set(goalTextRef.current, {
      autoAlpha: 0,
      y: 16,
    });

    gsap.set(goalWordRef.current, {
      autoAlpha: 1,
      y: 0,
    });

    gsap.set(cards, {
      autoAlpha: 0,
      x: (index) => (index % 3 - 1) * 18,
      y: (index) => 70 + index * 6,
      rotate: (index) => (index % 2 === 0 ? -3 : 3),
      scale: 0.88,
      zIndex: (index) => cards.length - index,
      transformOrigin: "50% 100%",
    });

    gsap.set(bars, {
      width: 0,
    });

    gsap.set(backgroundRef.current, {
      yPercent: 0,
      scale: 1,
    });

    gsap.set(glowRef.current, {
      yPercent: 0,
      rotate: 0,
      scale: 1,
    });

    gsap.set(depthRef.current, {
      yPercent: 0,
      rotate: 0,
    });

    gsap.set(profileRef.current, {
      yPercent: 0,
      rotate: -4,
      scale: 0.96,
    });

    gsap.set(systemsDepthRef.current, {
      yPercent: 0,
    });
  }, []);

  const startAboutAnimation = useCallback((controller) => {
    if (!roleTextRef.current) return;

    const cards = cardsRef.current.filter(Boolean);
    const bars = barsRef.current.filter(Boolean);
    const percents = percentsRef.current.filter(Boolean);

    let goalWordIndex = 0;

    const roleTimeline = gsap.timeline({
      repeat: -1,
      repeatDelay: 0.35,
      paused: true,
    });

    roleWords.forEach((word) => {
      roleTimeline.call(() => {
        if (roleTextRef.current) {
          roleTextRef.current.textContent = word;
        }
      });

      roleTimeline.fromTo(
        roleTextRef.current,
        {
          autoAlpha: 0,
          y: 28,
          rotate: 1.5,
          scale: 0.96,
          filter: "blur(6px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 0.65,
          ease: "back.out(1.6)",
        }
      );

      roleTimeline.to({}, { duration: 1.35 });

      roleTimeline.to(roleTextRef.current, {
        autoAlpha: 0,
        y: -24,
        rotate: -1.5,
        scale: 0.96,
        filter: "blur(6px)",
        duration: 0.38,
        ease: "power3.inOut",
      });
    });

    const goalWordLoop = gsap.timeline({
      repeat: -1,
      repeatDelay: 1.2,
      paused: true,
    });

    goalWordLoop.to(goalWordRef.current, {
      autoAlpha: 0,
      y: -10,
      duration: 0.28,
      ease: "power2.in",
      onComplete: () => {
        goalWordIndex = (goalWordIndex + 1) % goalWords.length;

        if (goalWordRef.current) {
          goalWordRef.current.textContent = goalWords[goalWordIndex];
        }

        gsap.set(goalWordRef.current, { y: 10 });
      },
    });

    goalWordLoop.to(goalWordRef.current, {
      autoAlpha: 1,
      y: 0,
      duration: 0.32,
      ease: "back.out(1.5)",
    });

    const introTimeline = gsap.timeline();

    introTimeline
      .to(contentRef.current, {
        autoAlpha: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        duration: 0.75,
        ease: "back.out(1.35)",
      })
      .to(
        [textRef.current, systemsRef.current],
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.42"
      )
      .call(() => {
        roleTimeline.play(0);
      }, null, "-=0.2")
      .to(
        goalTextRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power2.out",
          onComplete: () => goalWordLoop.play(0),
        },
        "-=0.28"
      )
      .to(
        cards,
        {
          autoAlpha: 1,
          x: 0,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.72,
          stagger: 0.08,
          ease: "back.out(1.35)",
        },
        "-=0.28"
      )
      .to(
        bars,
        {
          width: (index, bar) => `${bar.dataset.level}%`,
          duration: 0.85,
          stagger: 0.06,
          ease: "power3.out",
        },
        "-=0.35"
      )
      .to(
        percents,
        {
          duration: 0.85,
          stagger: 0.06,
          ease: "power3.out",
          onStart() {
            this.targets().forEach((element) => {
              const target = Number(element.dataset.level);
              const counter = { value: 0 };

              gsap.to(counter, {
                value: target,
                duration: 0.85,
                ease: "power3.out",
                onUpdate: () => {
                  element.textContent = `${Math.round(counter.value)}%`;
                },
              });
            });
          },
        },
        "<"
      );

    controller.add(introTimeline);
    controller.add(roleTimeline);
    controller.add(goalWordLoop);

    controller.add(
      gsap.to(goalWordRef.current, {
        y: -3,
        duration: 1,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    );

    controller.add(
      gsap.to(backgroundRef.current, {
        yPercent: 12,
        scale: 1.04,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    );

    controller.add(
      gsap.to(glowRef.current, {
        yPercent: -18,
        rotate: 8,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      })
    );

    controller.add(
      gsap.to(depthRef.current, {
        yPercent: -5,
        rotate: -0.8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
        },
      })
    );

    controller.add(
      gsap.to(profileRef.current, {
        yPercent: -10,
        rotate: 2,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      })
    );

    controller.add(
      gsap.to(systemsDepthRef.current, {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.8,
        },
      })
    );
  }, []);

  useSectionVisibilityLifecycle(sectionRef, sectionAnimationsRef, {
    onEnter: startAboutAnimation,
    onReset: resetAboutAnimation,
  });

  return (
    <section
      ref={sectionRef}
      id="manifest"
      className="neo-page relative flex min-h-screen items-center overflow-hidden px-6 py-24 text-black lg:px-12"
    >
      <div
        ref={backgroundRef}
        className="pointer-events-none absolute -inset-x-12 -inset-y-20"
      >
        <div className="absolute left-[-4rem] top-20 h-56 w-56 rounded-full border-4 border-black bg-[#ffe45c] shadow-[8px_8px_0_#0b0b0b]" />
        <div className="absolute bottom-16 right-[-5rem] h-72 w-72 rounded-full border-4 border-black bg-[#35c9ff] shadow-[8px_8px_0_#0b0b0b]" />
        <div className="absolute left-1/3 top-1/2 h-24 w-24 rotate-12 rounded-[24px] border-4 border-black bg-[#ff4fd8] shadow-[6px_6px_0_#0b0b0b]" />
      </div>

      <div
        ref={glowRef}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#b7ff4a]/40 blur-3xl"
      />

      <div
        ref={depthRef}
        className="relative z-10 mx-auto w-full max-w-7xl"
        style={{
          willChange: "transform, opacity",
        }}
      >
        <div
          ref={contentRef}
          className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr]"
          style={{
            willChange: "transform, opacity",
          }}
        >
          <div ref={textRef}>
            <div
              ref={profileRef}
              className="group relative mb-10 h-56 w-56 rotate-[-4deg] rounded-[32px] border-4 border-black bg-[#ffe45c] p-3 shadow-[10px_10px_0_#0b0b0b] md:h-64 md:w-64"
              style={{
                willChange: "transform",
              }}
            >
              <img
                src="/profile.jpg"
                alt="Navarro"
                loading="lazy"
                decoding="async"
                className="h-full w-full rounded-[22px] border-4 border-black object-cover transition-all duration-500 group-hover:scale-[1.03]"
              />

              <div className="absolute -right-6 -top-6 rounded-2xl border-4 border-black bg-[#35c9ff] px-4 py-3 text-2xl font-black shadow-[5px_5px_0_#0b0b0b]">
                ✦
              </div>

              <div className="absolute -bottom-5 -left-5 rounded-full border-4 border-black bg-[#ff4fd8] px-5 py-2 text-xs font-black uppercase tracking-[0.16em] shadow-[5px_5px_0_#0b0b0b]">
                Profile
              </div>
            </div>

            <h2 className="neo-label mb-7">Core Profile</h2>

            <h3 className="mb-6 min-h-[96px] overflow-hidden text-4xl font-black uppercase italic leading-[0.95] tracking-[-0.06em] md:min-h-[120px] md:text-6xl">
              <span
                ref={roleTextRef}
                className="inline-block text-[#ff4fd8] [-webkit-text-stroke:1.5px_#0b0b0b] [text-shadow:4px_4px_0_#ffe45c] will-change-transform"
              />
            </h3>

            <div className="neo-card p-6">
              <p className="text-base font-bold leading-8 text-black/75">
                I design and build bold web interfaces with clean structure,
                smooth motion, and practical frontend logic. My focus is
                creating digital products that are readable, interactive, and
                visually memorable.
              </p>

              <p
                ref={goalTextRef}
                className="mt-5 text-sm font-black uppercase tracking-[0.14em] text-black/65"
              >
                My goal is to create interfaces that feel{" "}
                <span
                  ref={goalWordRef}
                  className="inline-block rounded-full border-4 border-black bg-[#b7ff4a] px-3 py-1 text-black shadow-[3px_3px_0_#0b0b0b]"
                >
                  bold
                </span>{" "}
                — not static pages.
              </p>
            </div>
          </div>

          <div
            ref={systemsDepthRef}
            style={{
              willChange: "transform",
            }}
          >
            <div
              ref={systemsRef}
              style={{
                willChange: "transform, opacity",
              }}
            >
              <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
                <div>
                  <h2 className="neo-label">Core Systems</h2>
                  <p className="mt-5 max-w-xl text-sm font-bold leading-7 text-black/65">
                    Tools and stacks I use to turn ideas into working digital
                    interfaces.
                  </p>
                </div>

                <div className="hidden rotate-3 rounded-2xl border-4 border-black bg-[#ff4fd8] px-5 py-3 text-sm font-black uppercase tracking-[0.14em] shadow-[5px_5px_0_#0b0b0b] md:block">
                  Skill Map
                </div>
              </div>

              <div className="grid grid-cols-2 gap-5 sm:grid-cols-3">
                {skills.map(({ icon: Icon, name, level }, index) => {
                  const color = brutalColors[index % brutalColors.length];

                  return (
                    <div
                      key={name}
                      ref={(element) => (cardsRef.current[index] = element)}
                      className="group relative rounded-[24px] border-4 border-black bg-white p-5 shadow-[6px_6px_0_#0b0b0b] transition-all duration-300 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[3px_3px_0_#0b0b0b]"
                      style={{
                        willChange: "transform, opacity",
                      }}
                    >
                      <div
                        className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border-4 border-black text-2xl shadow-[4px_4px_0_#0b0b0b]"
                        style={{ backgroundColor: color }}
                      >
                        {React.createElement(Icon)}
                      </div>

                      <div className="mb-3 text-[12px] font-black uppercase tracking-[0.15em] text-black">
                        {name}
                      </div>

                      <div className="relative h-[10px] w-full rounded-full border-2 border-black bg-[#f7f4ea]">
                        <div
                          ref={(element) => (barsRef.current[index] = element)}
                          className="h-full rounded-full border-r-2 border-black bg-[#0b0b0b]"
                          data-level={level}
                          style={{ width: "0%" }}
                        />
                      </div>

                      <div
                        ref={(el) => (percentsRef.current[index] = el)}
                        data-level={level}
                        className="mt-2 text-right text-[11px] font-black text-black"
                      >
                        0%
                      </div>

                      <div
                        className="absolute right-3 top-3 h-4 w-4 rounded-full border-2 border-black"
                        style={{ backgroundColor: color }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}