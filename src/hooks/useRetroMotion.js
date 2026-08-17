import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Drives every scroll/entrance animation from data attributes:
 *   data-hero            hero elements — fade + rise 40px, 0.12s stagger on start
 *   data-par="0.12"      parallax layer — scrubs on scroll and drifts with the cursor
 *   data-reveal          fade + rise 46px at `top 88%`
 *   data-bar="90"        stat bar fill — grows 0 -> 90% at `top 92%`
 */
export default function useRetroMotion(active) {
  useEffect(() => {
    if (!active) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const heroItems = gsap.utils.toArray("[data-hero]");

      if (heroItems.length) {
        gsap.fromTo(
          heroItems,
          { autoAlpha: 0, y: reduced ? 0 : 40 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.1,
          }
        );
      }

      gsap.utils.toArray("[data-reveal]").forEach((element) => {
        gsap.fromTo(
          element,
          { autoAlpha: 0, y: reduced ? 0 : 46 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 88%",
            },
          }
        );
      });

      gsap.utils.toArray("[data-bar]").forEach((element) => {
        const level = Number(element.dataset.bar) || 0;

        gsap.fromTo(
          element,
          { width: "0%" },
          {
            width: `${level}%`,
            duration: 1.1,
            ease: "steps(24)",
            scrollTrigger: {
              trigger: element,
              start: "top 92%",
            },
          }
        );
      });

      if (reduced) return;

      const layers = gsap.utils.toArray("[data-par]");
      const drifters = [];

      layers.forEach((layer) => {
        const depth = Number(layer.dataset.par) || 0.2;
        const scope = layer.closest("section") || layer.parentElement;

        gsap.to(layer, {
          yPercent: depth * 40,
          ease: "none",
          scrollTrigger: {
            trigger: scope,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
          },
        });

        drifters.push({
          depth,
          setX: gsap.quickTo(layer, "x", { duration: 0.9, ease: "power3.out" }),
          setY: gsap.quickTo(layer, "y", { duration: 0.9, ease: "power3.out" }),
        });
      });

      const title = document.querySelector("[data-hero-title]");
      const setTitleX = title
        ? gsap.quickTo(title, "x", { duration: 1, ease: "power3.out" })
        : null;

      const handlePointer = (event) => {
        const offsetX = event.clientX / window.innerWidth - 0.5;
        const offsetY = event.clientY / window.innerHeight - 0.5;

        drifters.forEach(({ depth, setX, setY }) => {
          setX(offsetX * depth * 120);
          setY(offsetY * depth * 90);
        });

        // hero headline counter-drifts against the layers
        setTitleX?.(offsetX * -10);
      };

      window.addEventListener("pointermove", handlePointer);

      return () => window.removeEventListener("pointermove", handlePointer);
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 350);

    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [active]);
}
