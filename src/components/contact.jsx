import { useCallback, useRef } from "react";
import gsap from "gsap";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
  FaBoltLightning,
} from "react-icons/fa6";
import useSectionVisibilityLifecycle from "../hooks/useSectionVisibilityLifecycle";

const contactLinks = [
  {
    label: "Instagram",
    value: "@reffiref_",
    href: "https://www.instagram.com/reffiref_",
    icon: FaInstagram,
    color: "#ff35ab",
  },
  {
    label: "GitHub",
    value: "ThatGuyRef",
    href: "https://github.com/ThatGuyRef",
    icon: FaGithub,
    color: "#ffe45c",
  },
  {
    label: "LinkedIn",
    value: "Connect Profile",
    href: "https://www.linkedin.com/in/navarro-reffi-54271a374?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    icon: FaLinkedin,
    color: "#4a83ff",
  },
  {
    label: "WhatsApp",
    value: "Available on Request",
    href: "https://wa.me/6285156246190?text=Hello%20Navarro,%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20connect.",
    icon: FaWhatsapp,
    color: "#5eff4f",
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const sectionAnimationsRef = useRef([]);

  const gridRef = useRef(null);
  const glowRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const cardRef = useRef(null);
  const linksRef = useRef([]);
  const stickerRef = useRef(null);

  const resetSignalAnimation = useCallback(() => {
    gsap.set(gridRef.current, {
      autoAlpha: 0,
    });

    gsap.set(glowRef.current, {
      autoAlpha: 0,
      scale: 0.75,
    });

    gsap.set([eyebrowRef.current, titleRef.current, descRef.current], {
      autoAlpha: 0,
      y: 36,
    });

    gsap.set(cardRef.current, {
      autoAlpha: 0,
      y: 54,
      rotate: -1.5,
      scale: 0.95,
    });

    gsap.set(linksRef.current.filter(Boolean), {
      autoAlpha: 0,
      y: 38,
      rotate: (index) => (index % 2 === 0 ? -2 : 2),
      scale: 0.92,
    });

    gsap.set(stickerRef.current, {
      autoAlpha: 0,
      scale: 0.7,
      rotate: -10,
    });
  }, []);

  const startSignalAnimation = useCallback((controller) => {
    const links = linksRef.current.filter(Boolean);
    const introTimeline = gsap.timeline();

    introTimeline
      .to(gridRef.current, {
        autoAlpha: 1,
        duration: 0.6,
        ease: "power2.out",
      })
      .to(
        glowRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.45"
      )
      .to(
        eyebrowRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.55,
          ease: "power3.out",
        },
        "-=0.65"
      )
      .to(
        titleRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "back.out(1.35)",
        },
        "-=0.35"
      )
      .to(
        descRef.current,
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.65,
          ease: "power3.out",
        },
        "-=0.45"
      )
      .to(
        cardRef.current,
        {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.75,
          ease: "back.out(1.35)",
        },
        "-=0.3"
      )
      .to(
        links,
        {
          autoAlpha: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "back.out(1.45)",
        },
        "-=0.45"
      )
      .to(
        stickerRef.current,
        {
          autoAlpha: 1,
          scale: 1,
          rotate: -6,
          duration: 0.65,
          ease: "back.out(1.8)",
        },
        "-=0.45"
      );

    controller.add(introTimeline);

    controller.add(
      gsap.to(stickerRef.current, {
        y: -10,
        rotate: -10,
        duration: 2.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    );

    controller.add(
      gsap.to(glowRef.current, {
        xPercent: 8,
        yPercent: -8,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    );
  }, []);

  useSectionVisibilityLifecycle(sectionRef, sectionAnimationsRef, {
    onEnter: startSignalAnimation,
    onReset: resetSignalAnimation,
  });

  return (
    <section
      ref={sectionRef}
      id="signal"
      className="neo-page relative flex min-h-screen items-center overflow-hidden px-5 pb-32 pt-28 text-black md:px-6 md:py-24 lg:px-12"
    >
      {/* BACKGROUND DECOR */}
      <div ref={gridRef} className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-24 hidden h-72 w-72 rounded-full border-4 border-black bg-[#ff4fd8] shadow-[8px_8px_0_#0b0b0b] md:block" />
        <div className="absolute -right-28 bottom-20 hidden h-72 w-72 rounded-full border-4 border-black bg-[#ffe45c] shadow-[8px_8px_0_#0b0b0b] md:block" />
        <div className="absolute left-[45%] top-28 hidden h-24 w-24 rotate-12 rounded-[24px] border-4 border-black bg-[#35c9ff] shadow-[6px_6px_0_#0b0b0b] md:block" />
      </div>

      <div
        ref={glowRef}
        className="pointer-events-none absolute right-[-10rem] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-[#b7ff4a]/45 blur-3xl"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1fr_0.9fr]">
        {/* LEFT CONTENT */}
        <div>
          <p ref={eyebrowRef} className="neo-label mb-6">
            Signal
          </p>

          <h2
            ref={titleRef}
            className="neo-title text-[3.3rem] leading-[0.9] sm:text-6xl md:text-8xl"
          >
            LET&apos;S
            <span className="neo-highlight-pink block italic">BUILD</span>
            <span className="neo-highlight-cyan block">SOMETHING BOLD.</span>
          </h2>

          <p
            ref={descRef}
            className="mt-6 max-w-2xl text-sm font-bold leading-7 text-black/70 md:text-lg md:leading-8"
          >
            Open for collaboration, frontend development, interface design, and
            project discussions. Send a signal and let&apos;s turn the idea into a
            working digital experience.
          </p>

          <div
            ref={cardRef}
            className="mt-8 rounded-[28px] border-4 border-black bg-white p-5 shadow-[8px_8px_0_#0b0b0b] md:p-6"
          >
            <div className="mb-5 flex items-center justify-between gap-4 border-b-4 border-black pb-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.25em] text-black/50">
                  Current Status
                </p>
                <h3 className="mt-2 text-2xl font-black uppercase italic tracking-[-0.04em] text-black md:text-4xl">
                  Available Now
                </h3>
              </div>

              <div className="rounded-full border-4 border-black bg-[#b7ff4a] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] shadow-[4px_4px_0_#0b0b0b]">
                Online
              </div>
            </div>

            <p className="text-sm font-bold leading-7 text-black/70 md:text-base">
              Best fit for web interface builds, React-based frontend projects,
              UI motion, portfolio systems, and practical digital products.
            </p>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=navarrorevi@gmail.com&su=Portfolio%20Inquiry&body=Hello%20Navarro,%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20would%20like%20to%20connect."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full border-4 border-black bg-black px-6 py-4 text-[11px] font-black uppercase tracking-[0.18em] text-white shadow-[5px_5px_0_#35c9ff] transition-all duration-300 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_#35c9ff] sm:w-auto"
            >
              Send Message
              <FaBoltLightning />
            </a>
          </div>
        </div>

        {/* RIGHT CONTACT PANEL */}
        <div className="relative">
          <div
            ref={stickerRef}
            className="absolute -right-2 -top-7 z-20 rotate-[-6deg] rounded-2xl border-4 border-black bg-[#ff4fd8] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] shadow-[5px_5px_0_#0b0b0b] md:-right-5"
          >
            Ping Me!
          </div>

          <div className="rounded-[34px] border-4 border-black bg-[#ffe45c] p-4 shadow-[10px_10px_0_#0b0b0b] md:p-5">
            <div className="mb-5 rounded-[26px] border-4 border-black bg-white p-5 shadow-[6px_6px_0_#0b0b0b]">
              <p className="text-[10px] font-black uppercase tracking-[0.25em] text-black/50">
                Contact Panel
              </p>

              <h3 className="mt-3 text-4xl font-black uppercase italic leading-none tracking-[-0.06em] text-black md:text-5xl">
                SIGNAL
                <span className="block text-[#ff4fd8] [-webkit-text-stroke:1.3px_#0b0b0b]">
                  CHANNELS
                </span>
              </h3>
            </div>

            <div className="grid gap-4">
              {contactLinks.map(({ label, value, href, icon: Icon, color }, index) => (
                <a
                  key={label}
                  ref={(element) => (linksRef.current[index] = element)}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="group flex items-center gap-4 rounded-[24px] border-4 border-black bg-white p-4 shadow-[5px_5px_0_#0b0b0b] transition-all duration-300 hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-[2px_2px_0_#0b0b0b]"
                >
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-4 border-black text-2xl shadow-[4px_4px_0_#0b0b0b]"
                    style={{ backgroundColor: color }}
                  >
                    <Icon />
                  </div>

                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-black/50">
                      {label}
                    </p>

                    <p className="mt-1 truncate text-sm font-black text-black md:text-base">
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}