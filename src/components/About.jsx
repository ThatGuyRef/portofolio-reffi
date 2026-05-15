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
  "Frontend Interface Engineer",
  "React Experience Developer",
  "UI/UX Motion Enthusiast",
  "Digital Product Builder",
  "Futuristic Web Creator",
];

const goalWords = ["alive", "cinematic", "immersive", "dynamic"];

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
      y: 36,
      rotateX: 6,
      z: -80,
      transformPerspective: 900,
      transformOrigin: "50% 60%",
    });

    gsap.set([textRef.current, systemsRef.current], {
      autoAlpha: 0,
      y: 42,
      z: -40,
    });

    gsap.set(roleTextRef.current, {
      autoAlpha: 0,
      y: 18,
      filter: "blur(8px)",
    });

    gsap.set(goalTextRef.current, {
      autoAlpha: 0,
      y: 16,
      textShadow: "0 0 0 rgba(0,245,255,0)",
    });

    gsap.set(goalWordRef.current, {
      autoAlpha: 1,
      y: 0,
    });

    gsap.set(cards, {
      autoAlpha: 0,
      x: (index) => (index % 3 - 1) * 18,
      y: (index) => 80 + index * 8,
      z: (index) => -220 - index * 16,
      rotateX: 18,
      rotateY: (index) => (index % 2 === 0 ? -7 : 7),
      scale: 0.86,
      zIndex: (index) => cards.length - index,
      transformPerspective: 800,
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
    });

    gsap.set(depthRef.current, {
      yPercent: 0,
      rotateX: 0,
      z: 0,
    });

    gsap.set(profileRef.current, {
      yPercent: 0,
      rotateX: 0,
      z: 0,
    });

    gsap.set(systemsDepthRef.current, {
      yPercent: 0,
      z: 0,
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
          y: 18,
          filter: "blur(8px)",
        },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.85,
          ease: "power3.out",
        }
      );

      roleTimeline.to({}, { duration: 1.75 });

      roleTimeline.to(roleTextRef.current, {
        autoAlpha: 0,
        y: -14,
        filter: "blur(8px)",
        duration: 0.5,
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
      ease: "power2.out",
    });

    const introTimeline = gsap.timeline();

    introTimeline
      .to(contentRef.current, {
        autoAlpha: 1,
        y: 0,
        z: 0,
        rotateX: 0,
        duration: 0.7,
        ease: "power3.out",
      })
      .to(
        [textRef.current, systemsRef.current],
        {
          autoAlpha: 1,
          y: 0,
          z: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
        },
        "-=0.45"
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
          z: 0,
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          duration: 0.78,
          stagger: 0.11,
          ease: "power3.out",
        },
        "-=0.35"
      )
      .to(
        bars,
        {
          width: (index, bar) => `${bar.dataset.level}%`,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
        },
        "-=0.35"
      )
      .to(
        percents,
        {
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          onStart() {
            this.targets().forEach((element) => {
              const target = Number(element.dataset.level);
              const counter = { value: 0 };

              gsap.to(counter, {
                value: target,
                duration: 0.9,
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
      gsap.to(goalTextRef.current, {
        textShadow: "0 0 12px rgba(0,245,255,0.28)",
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    );

    controller.add(
      gsap.to(backgroundRef.current, {
        yPercent: 18,
        scale: 1.08,
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
        yPercent: -24,
        rotate: 10,
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
        yPercent: -8,
        rotateX: -3,
        z: 70,
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
        yPercent: -14,
        rotateX: 4,
        z: 90,
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
        yPercent: 7,
        z: 45,
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
      className="min-h-screen px-6 lg:px-12 py-24 flex items-center relative overflow-hidden"
      style={{ perspective: "1100px" }}
    >
      <div
        ref={backgroundRef}
        className="absolute -inset-x-12 -inset-y-20 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,245,255,0.18),transparent_28%),radial-gradient(circle_at_82%_68%,rgba(255,182,147,0.12),transparent_30%),linear-gradient(180deg,transparent,rgba(0,245,255,0.05),transparent)] blur-2xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,245,255,0.07)_1px,transparent_1px),linear-gradient(90deg,rgba(0,245,255,0.05)_1px,transparent_1px)] bg-[size:48px_48px] opacity-30" />
      </div>

      <div
        ref={glowRef}
        className="absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#00f5ff]/10 blur-3xl pointer-events-none"
      />

      <div
        ref={depthRef}
        className="max-w-6xl mx-auto w-full relative z-10"
        style={{
          transformStyle: "preserve-3d",
          willChange: "transform, opacity",
        }}
      >
        <div
          ref={contentRef}
          className="grid md:grid-cols-2 gap-16 items-center"
          style={{
            transformStyle: "preserve-3d",
            willChange: "transform, opacity",
          }}
        >
          <div ref={textRef} style={{ transformStyle: "preserve-3d" }}>
            <div
              ref={profileRef}
              className="relative w-52 h-52 md:w-60 md:h-60 mb-10 group"
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
            >
              <div className="absolute inset-0 border border-[#00f5ff]/30" />
              <div className="absolute top-0 left-0 w-5 h-5 border-t border-l border-[#00f5ff]" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b border-r border-[#00f5ff]" />

              <img
                src="/profile.jpg"
                alt="Navarro"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-[#00f5ff]/10 opacity-0 group-hover:opacity-100 transition-all duration-500" />
            </div>

            <h2 className="text-[#00f5ff] text-xs tracking-[0.4em] font-black mb-6 uppercase">
              SYSTEM PROFILE
            </h2>

            <h3 className="min-h-[90px] md:min-h-[110px] text-3xl md:text-5xl font-headline font-black mb-6 tracking-[-0.06em] uppercase italic overflow-hidden">
              <span
                ref={roleTextRef}
                className="inline-block bg-gradient-to-r from-[#00f5ff] via-white to-[#ffb693] bg-clip-text text-transparent drop-shadow-[0_0_12px_rgba(0,245,255,0.45)]"
              />
            </h3>

            <p className="text-[#b9caca] leading-relaxed mb-6">
              I build interactive UI systems that blend cutting-edge tech with
              sleek design. With a focus on performance, motion, and immersive
              user experience. I create dynamic web experiences that captivate
              users and push the boundaries of what&apos;s possible on the web.
            </p>

            <p ref={goalTextRef} className="text-[#b9caca]/70 text-sm">
              My goal is to create interfaces that feel{" "}
              <span ref={goalWordRef} className="inline-block text-[#00f5ff]">
                alive
              </span>{" "}
              - not static pages.
            </p>
          </div>

          <div
            ref={systemsDepthRef}
            style={{
              transformStyle: "preserve-3d",
              willChange: "transform",
            }}
          >
            <div
              ref={systemsRef}
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform, opacity",
              }}
            >
              <h2 className="text-[#00f5ff] text-xs tracking-[0.4em] font-black mb-10 uppercase">
                CORE SYSTEMS
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                {skills.map(({ icon: Icon, name, level }, index) => (
                  <div
                    key={name}
                    ref={(element) => (cardsRef.current[index] = element)}
                    className="border border-[#00f5ff]/20 p-6 group hover:bg-[#00f5ff]/5 transition-all duration-300 transform hover:scale-105 relative"
                    style={{
                      transformStyle: "preserve-3d",
                      willChange: "transform, opacity",
                    }}
                  >
                    {React.createElement(Icon, {
                      className: "text-3xl text-[#00f5ff] mb-4",
                    })}

                    <div className="text-[12px] uppercase tracking-[0.15em] text-[#b9caca] mb-3">
                      {name}
                    </div>

                    <div className="w-full h-[5px] bg-[#1a1f23] relative">
                      <div
                        ref={(element) => (barsRef.current[index] = element)}
                        className="skill-bar h-full bg-[#00f5ff]"
                        data-level={level}
                        style={{ width: "0%" }}
                      />
                    </div>

                    <div
                      ref={(el) => (percentsRef.current[index] = el)}
                      data-level={level}
                      className="text-[10px] text-[#00f5ff] mt-2 text-right"
                    >
                      0%
                    </div>

                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f5ff]" />
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f5ff]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}