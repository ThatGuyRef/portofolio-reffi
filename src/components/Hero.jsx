import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBoltLightning } from "react-icons/fa6";
import useSectionVisibilityLifecycle from "../hooks/useSectionVisibilityLifecycle";

gsap.registerPlugin(ScrollTrigger);

const heroText = "NAVARRO // FRONTEND ENGINEER";

export default function Hero() {
  const containerRef = useRef(null);
  const sectionAnimationsRef = useRef([]);
  const bgParallaxRef = useRef(null);
  const bgRef = useRef(null);
  const gridRef = useRef(null);
  const glowRef = useRef(null);
  const contentParallaxRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const statusRef = useRef(null);
  const buttonRef = useRef(null);
  const hudLeftRef = useRef(null);
  const hudRightRef = useRef(null);
  const decoLeftRef = useRef(null);
  const decoRightRef = useRef(null);

  useEffect(() => {
    const bg = bgParallaxRef.current;
    const content = contentParallaxRef.current;
    const container = containerRef.current;

    if (!bg || !content || !container) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        bg,
        { y: 0, scale: 1 },
        {
          y: -80,
          scale: 1.08,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );

      gsap.fromTo(
        content,
        { y: 0, opacity: 1 },
        {
          y: 40,
          opacity: 0.92,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  const resetHero = useCallback(() => {
    const title = titleRef.current;

    if (title) {
      title.innerHTML = "";
    }

    gsap.set(bgRef.current, {
      opacity: 0,
      scale: 1.08,
      filter: "brightness(1) blur(0px)",
    });
    gsap.set(contentRef.current, {
      autoAlpha: 0.28,
      y: -90,
      z: -220,
      rotateX: 9,
      scale: 0.94,
      transformPerspective: 1000,
      transformOrigin: "50% 58%",
    });
    gsap.set(gridRef.current, {
      yPercent: -14,
      opacity: 0.01,
      scale: 1.08,
    });
    gsap.set(glowRef.current, {
      yPercent: -20,
      scale: 1.18,
      opacity: 0.35,
    });
    gsap.set([badgeRef.current, subtitleRef.current], {
      autoAlpha: 0,
      y: 20,
    });
    gsap.set(statusRef.current, {
      autoAlpha: 0,
      y: 10,
    });
    gsap.set(buttonRef.current, {
      autoAlpha: 0,
      scale: 0.94,
    });
    gsap.set([hudLeftRef.current, hudRightRef.current], {
      y: 0,
    });
    gsap.set([decoLeftRef.current, decoRightRef.current], {
      autoAlpha: 0.25,
      scaleX: 0.35,
      x: (index) => (index === 0 ? -42 : 42),
    });
  }, []);

  const startHero = useCallback((controller) => {
    const title = titleRef.current;
    const background = bgRef.current;
    const decor = [decoLeftRef.current, decoRightRef.current];
    const chars = [];

    if (title) {
      heroText.split("").forEach((char) => {
        const span = document.createElement("span");
        span.textContent = char;
        span.style.opacity = "0";
        title.appendChild(span);
        chars.push(span);
      });

      const cursor = document.createElement("span");
      cursor.textContent = "|";
      cursor.style.marginLeft = "6px";
      title.appendChild(cursor);

      controller.add(
        gsap.to(cursor, {
          opacity: 0,
          repeat: -1,
          yoyo: true,
          duration: 0.5,
          ease: "none",
        })
      );
    }

    const introTimeline = gsap.timeline({ delay: 0.3 });
    introTimeline
      .to(contentRef.current, {
        autoAlpha: 1,
        y: 0,
        z: 0,
        rotateX: 0,
        scale: 1,
        duration: 0.85,
        ease: "power3.out",
      })
      .to(
        background,
        {
          opacity: 0.25,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        },
        0
      )
      .to(
        chars,
        {
          opacity: 1,
          duration: 0.05,
          stagger: 0.04,
          ease: "power1.out",
        },
        0.15
      )
      .to(
        badgeRef.current,
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
        },
        "-=1"
      )
      .to(
        subtitleRef.current,
        {
          y: 0,
          autoAlpha: 1,
          duration: 1,
        },
        "-=0.8"
      )
      .to(
        statusRef.current,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.8,
        },
        "-=0.7"
      )
      .to(
        buttonRef.current,
        {
          scale: 1,
          autoAlpha: 1,
          duration: 0.8,
        },
        "-=0.6"
      )
      .to(
        gridRef.current,
        {
          yPercent: 0,
          opacity: 0.03,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        0.2
      )
      .to(
        glowRef.current,
        {
          yPercent: 0,
          scale: 1,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        0.2
      )
      .to(
        decor,
        {
          autoAlpha: 1,
          scaleX: 1,
          x: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        0.25
      );

    controller.add(introTimeline);
    controller.add(
      gsap.to(hudLeftRef.current, {
        y: -10,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    );
    controller.add(
      gsap.to(hudRightRef.current, {
        y: 10,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    );
  }, []);

  useSectionVisibilityLifecycle(containerRef, sectionAnimationsRef, {
    onEnter: startHero,
    onReset: resetHero,
  });

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden pt-20 lg:pl-24"
    >
      <div className="fixed inset-0 pointer-events-none scanline z-[100] opacity-20" />

      <div ref={bgParallaxRef} className="absolute inset-0 z-0 will-change-transform">
        <img
          ref={bgRef}
          src="/bg2.png"
          alt="background"
          className="absolute inset-0 w-full h-[120%] object-cover opacity-0 scale-110 will-change-transform"
        />
      </div>

      <div className="absolute inset-0 bg-[#101417]/60 z-10" />

      <div
        ref={gridRef}
        className="absolute inset-0 z-10 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0,245,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,245,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        ref={glowRef}
        className="absolute inset-0 z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(0,245,255,0.08) 0%, transparent 60%)",
        }}
      />

      <div
        ref={contentParallaxRef}
        className="relative z-20 w-full max-w-6xl mx-auto px-6 lg:px-12 will-change-transform"
      >
        <div
          ref={contentRef}
          className="relative w-full"
          style={{ transformStyle: "preserve-3d", willChange: "transform, opacity" }}
        >
        <div
          ref={hudLeftRef}
          className="hud-left absolute top-8 left-6 lg:left-12 hidden md:flex flex-col gap-3 p-4 border-l-2 border-t-2 border-[#00f5ff]/30"
        >
          <span className="text-[10px] text-[#00f5ff] font-black tracking-[0.2em]">
            SYSTEM_STABILITY
          </span>
          <div className="flex gap-1.5">
            <div className="w-2 h-5 bg-[#00f5ff]" />
            <div className="w-2 h-5 bg-[#00f5ff]" />
            <div className="w-2 h-5 bg-[#00f5ff]" />
            <div className="w-2 h-5 bg-[#00f5ff]/20" />
          </div>
          <span className="text-[#00f5ff] font-mono text-xs tracking-wider">
            CALIBRATING<span className="animate-pulse">...</span>
          </span>
        </div>

        <div ref={hudRightRef} className="hud-right absolute bottom-8 right-6 lg:right-12 hidden md:block text-right">
          <div className="text-[10px] text-[#ffb693] font-black tracking-[0.2em] mb-1">
            THREAT_LEVEL: LOW
          </div>
          <div className="text-5xl font-headline font-black text-white tracking-tight">
            00:93 <span className="text-[#ffb693] text-lg font-bold">UC</span>
          </div>
        </div>

        <div className="text-center flex flex-col items-center py-20">
          <div
            ref={badgeRef}
            className="hero-badge mb-8 px-5 py-2 bg-[#00f5ff]/10 border border-[#00f5ff]/30 text-[#00f5ff] text-[11px] font-black tracking-[0.4em] uppercase"
          >
            Neural Interface Established
          </div>

          <h1
            ref={titleRef}
            className="hero-title text-3xl sm:text-3xl md:text-3xl lg:text-3xl xl:text-6xl font-headline font-black text-white tracking-tighter leading-[0.9] mb-8 uppercase"
          />

          <p
            ref={subtitleRef}
            className="hero-subtitle max-w-lg text-[#b9caca] text-sm md:text-base uppercase tracking-[0.12em] leading-relaxed mb-4"
          >
            Frontend Engineer designing interactive systems where performance meets immersive UI.
          </p>

          <span ref={statusRef} className="text-[#00dce5] text-sm tracking-[0.12em]">
            Status: Open for Collaboration
          </span>

          <button
            ref={buttonRef}
            onClick={() => {
              window.dispatchEvent(
                new CustomEvent("portfolio:navigate-section", {
                  detail: { targetId: "hangar" },
                })
              );
              document.getElementById("hangar")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="hero-btn group relative bg-[#00f5ff] text-[#003739] px-10 md:px-14 py-4 md:py-5 chamfer-btn font-headline font-bold text-sm md:text-base tracking-[0.15em] uppercase overflow-hidden transition-all duration-300 flex items-center gap-4 hover:bg-white"
          >
            <div className="absolute inset-0 bg-[#00f5ff] opacity-0 group-hover:opacity-20 blur-md transition-all duration-300" />
            Resume
            <FaBoltLightning className="text-xl md:text-2xl group-hover:rotate-12 transition-transform duration-300" />
          </button>
        </div>
        </div>
      </div>

      <div
        ref={decoLeftRef}
        className="deco-line absolute left-[15%] top-[30%] w-40 h-px bg-gradient-to-r from-[#00f5ff] to-transparent origin-left"
      />
      <div
        ref={decoRightRef}
        className="deco-line absolute right-[15%] bottom-[30%] w-40 h-px bg-gradient-to-l from-[#ffb693] to-transparent origin-right"
      />
    </section>
  );
}
