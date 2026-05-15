import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaBoltLightning } from "react-icons/fa6";
import useSectionVisibilityLifecycle from "../hooks/useSectionVisibilityLifecycle";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const sectionAnimationsRef = useRef([]);
  const bgParallaxRef = useRef(null);
  const bgRef = useRef(null);
  const gridRef = useRef(null);
  const contentParallaxRef = useRef(null);
  const contentRef = useRef(null);
  const badgeRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const statusRef = useRef(null);
  const buttonRef = useRef(null);
  const stickerLeftRef = useRef(null);
  const stickerRightRef = useRef(null);
  const cardRef = useRef(null);

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
          y: -45,
          scale: 1.025,
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
          y: 26,
          opacity: 0.98,
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
    gsap.set(bgRef.current, {
      opacity: 0,
      scale: 1.06,
      rotate: -1,
    });

    gsap.set(contentRef.current, {
      autoAlpha: 0,
      y: 48,
      scale: 0.97,
      rotate: -0.8,
      transformOrigin: "50% 58%",
    });

    gsap.set(gridRef.current, {
      opacity: 0,
      scale: 1.03,
    });

    gsap.set([badgeRef.current, nameRef.current, subtitleRef.current, statusRef.current], {
      autoAlpha: 0,
      y: 18,
    });

    gsap.set(buttonRef.current, {
      autoAlpha: 0,
      scale: 0.92,
      y: 12,
    });

    gsap.set(cardRef.current, {
      autoAlpha: 0,
      y: 24,
      rotate: 1.5,
    });

    gsap.set([stickerLeftRef.current, stickerRightRef.current], {
      autoAlpha: 0,
      scale: 0.72,
      rotate: (index) => (index === 0 ? -14 : 14),
    });
  }, []);

  const startHero = useCallback((controller) => {
    const introTimeline = gsap.timeline({ delay: 0.2 });

    introTimeline
      .to(contentRef.current, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        rotate: 0,
        duration: 0.85,
        ease: "back.out(1.45)",
      })
      .to(
        bgRef.current,
        {
          opacity: 0.32,
          scale: 1,
          rotate: 0,
          duration: 1.1,
          ease: "power2.out",
        },
        0
      )
      .to(
        gridRef.current,
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "power3.out",
        },
        0
      )
      .to(
        badgeRef.current,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          ease: "back.out(1.5)",
        },
        0.25
      )
      .to(
        nameRef.current,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          ease: "back.out(1.7)",
        },
        0.35
      )
      .to(
        subtitleRef.current,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.65,
          ease: "power3.out",
        },
        0.45
      )
      .to(
        statusRef.current,
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.55,
          ease: "power3.out",
        },
        0.6
      )
      .to(
        buttonRef.current,
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.65,
          ease: "back.out(1.6)",
        },
        0.7
      )
      .to(
        cardRef.current,
        {
          y: 0,
          rotate: 0,
          autoAlpha: 1,
          duration: 0.75,
          ease: "back.out(1.35)",
        },
        0.55
      )
      .to(
        [stickerLeftRef.current, stickerRightRef.current],
        {
          autoAlpha: 1,
          scale: 1,
          rotate: (index) => (index === 0 ? -8 : 8),
          duration: 0.7,
          stagger: 0.08,
          ease: "back.out(1.8)",
        },
        0.45
      );

    controller.add(introTimeline);

    controller.add(
      gsap.to(stickerLeftRef.current, {
        y: -10,
        rotate: -12,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    );

    controller.add(
      gsap.to(stickerRightRef.current, {
        y: 10,
        rotate: 12,
        duration: 3.4,
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
      className="neo-page relative flex min-h-screen w-full items-center justify-center overflow-hidden px-5 pb-16 pt-32 text-black md:px-6 md:pt-32 lg:px-12"
    >
      <div ref={bgParallaxRef} className="absolute inset-0 z-0 will-change-transform">
        <div className="absolute left-1/2 top-[49%] h-[66vh] w-[88vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[30px] border-4 border-black bg-white shadow-[9px_9px_0_#0b0b0b] md:top-1/2 md:h-[72vh] md:w-[76vw] md:rounded-[48px] md:shadow-[14px_14px_0_#0b0b0b]">
          <img
            ref={bgRef}
            src="/bg-comic-car.jpg"
            alt="comic car background"
            className="absolute inset-0 z-0 h-full w-full object-cover opacity-0 brightness-110 contrast-125 saturate-[0.9]"
          />

          <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#f7f4ea]/98 via-[#f7f4ea]/88 to-[#f7f4ea]/56 md:from-[#f7f4ea]/96 md:via-[#f7f4ea]/82 md:to-[#f7f4ea]/42" />

          <div
            className="absolute inset-0 z-20 opacity-[0.08] mix-blend-multiply md:opacity-[0.12]"
            style={{
              backgroundImage:
                "radial-gradient(rgba(11,11,11,0.18) 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
          />

          <div className="absolute inset-y-0 left-0 z-30 hidden w-8 border-r-4 border-black bg-[#35c9ff] md:block" />
          <div className="absolute inset-x-0 bottom-0 z-30 h-7 border-t-4 border-black bg-[#ffe45c] md:h-8" />
        </div>
      </div>

      <div
        ref={gridRef}
        className="absolute inset-0 z-10 opacity-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(11,11,11,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(11,11,11,0.04) 1px, transparent 1px)
          `,
          backgroundSize: "34px 34px",
        }}
      />

      <div className="absolute -left-28 top-36 z-10 hidden h-52 w-52 rounded-full border-4 border-black bg-[#35c9ff] shadow-[8px_8px_0_#0b0b0b] md:block" />
      <div className="absolute -right-28 bottom-24 z-10 hidden h-56 w-56 rounded-full border-4 border-black bg-[#ff4fd8] shadow-[8px_8px_0_#0b0b0b] md:block" />

      <div
        ref={contentParallaxRef}
        className="relative z-20 mx-auto w-full max-w-7xl will-change-transform"
      >
        <div
          ref={contentRef}
          className="relative grid w-full items-center gap-12 lg:grid-cols-[minmax(0,1fr)_390px] xl:grid-cols-[minmax(0,1fr)_410px]"
          style={{ willChange: "transform, opacity" }}
        >
          <div
            ref={stickerLeftRef}
            className="absolute -left-2 top-12 hidden rotate-[-8deg] rounded-[18px] border-4 border-black bg-[#35c9ff] px-5 py-4 text-2xl font-black shadow-[5px_5px_0_#0b0b0b] xl:block"
          >
            ⚡
          </div>

          <div
            ref={stickerRightRef}
            className="absolute right-8 top-24 hidden rotate-[8deg] rounded-[18px] border-4 border-black bg-[#ff4fd8] px-5 py-4 text-2xl font-black shadow-[5px_5px_0_#0b0b0b] xl:block"
          >
            ✦
          </div>

          <div className="flex max-w-[760px] flex-col items-start">
            <div className="w-full rounded-[24px] bg-[#f7f4ea]/86 p-4 backdrop-blur-[2px] md:rounded-[28px] md:bg-[#f7f4ea]/76 md:p-6">
              <div
                ref={badgeRef}
                className="mb-6 inline-flex rotate-[-2deg] rounded-full border-4 border-black bg-[#ffe45c] px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.16em] text-black shadow-[4px_4px_0_#0b0b0b] md:mb-7 md:px-5 md:py-3 md:text-xs md:tracking-[0.2em]"
              >
                Portfolio Interface
              </div>

              <h1 className="neo-title text-[2.55rem] leading-[0.9] min-[390px]:text-[2.85rem] sm:text-[4.8rem] md:text-[5.8rem] lg:text-[6.3rem] xl:text-[7.1rem]">
                BEYOND
                <span className="neo-highlight-pink block italic">MODERN</span>
                <span className="neo-highlight-cyan block">EXPERIENCE.</span>
              </h1>

              <div
                ref={nameRef}
                className="mt-5 inline-flex rounded-full border-4 border-black bg-white px-4 py-2 text-[9px] font-black uppercase tracking-[0.1em] text-black shadow-[4px_4px_0_#0b0b0b] min-[390px]:text-[10px] sm:text-xs md:mt-6 md:px-5 md:text-sm md:tracking-[0.14em]"
              >
                Navarro Reffi Kamal / UI Designer & Frontend Developer
              </div>

              <p
                ref={subtitleRef}
                className="mt-3 max-w-xl text-[12px] font-bold leading-6 text-black/75 min-[390px]:text-[13px] md:mt-4 md:text-base md:leading-7"
              >
                Building clean, bold, and interactive web experiences with
                smooth motion and strong visual direction.
              </p>

              <div
                ref={statusRef}
                className="mt-4 inline-flex max-w-full rounded-full border-4 border-black bg-white px-3 py-2.5 text-[8px] font-black uppercase tracking-[0.08em] text-black shadow-[4px_4px_0_#0b0b0b] min-[390px]:text-[9px] md:mt-5 md:px-5 md:py-3 md:text-xs md:tracking-[0.16em]"
              >
                Status: Open for Collaboration
              </div>

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
                className="neo-button mt-5 px-7 py-3.5 text-xs md:mt-7 md:px-11 md:py-5 md:text-base"
              >
                View Works
                <FaBoltLightning className="text-lg md:text-2xl" />
              </button>
            </div>
          </div>

          <div
            ref={cardRef}
            className="neo-card neo-card-hover relative mx-auto hidden w-full max-w-[370px] overflow-hidden p-4 lg:block"
          >
            <div className="rounded-[22px] border-4 border-black bg-[#ffe45c] p-4">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-4 w-4 rounded-full border-2 border-black bg-[#ff4fd8]" />
                <span className="h-4 w-4 rounded-full border-2 border-black bg-[#35c9ff]" />
                <span className="h-4 w-4 rounded-full border-2 border-black bg-[#b7ff4a]" />
              </div>

              <div className="rounded-[20px] border-4 border-black bg-white p-8 text-center shadow-[6px_6px_0_#0b0b0b]">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/50">
                  Identity
                </p>

                <h3 className="mt-4 text-4xl font-black uppercase leading-none tracking-[-0.06em]">
                  Navarro
                </h3>

                <p className="mt-5 text-[13px] font-bold leading-6 text-black/70">
                  Undergraduate student who is passionate about crafting clean and interactive web
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}