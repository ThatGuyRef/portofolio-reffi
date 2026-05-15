import { useEffect, useState } from "react";

const HEADER_OFFSET = 80;

export default function useActiveSection() {
  const [active, setActive] = useState(null);
  const [isInHero, setIsInHero] = useState(true);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let frameId = 0;

    const syncActiveSection = () => {
      const sections = Array.from(document.querySelectorAll("section[id]"));
      const focusLine = window.innerHeight * 0.32 + HEADER_OFFSET;

      let nextSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= focusLine && rect.bottom >= focusLine;
      });

      if (!nextSection) {
        nextSection = sections.reduce((closest, section) => {
          const rect = section.getBoundingClientRect();
          const distance = Math.abs(rect.top - focusLine);

          if (!closest || distance < closest.distance) {
            return { element: section, distance };
          }

          return closest;
        }, null)?.element;
      }

      const nextId = nextSection?.id ?? "home";

      if (nextId === "home") {
        setIsInHero(true);
        setActive(null);
        return;
      }

      setIsInHero(false);
      setActive(nextId);
    };

    const requestSync = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(syncActiveSection);
    };

    requestSync();

    window.addEventListener("scroll", requestSync, { passive: true });
    window.addEventListener("resize", requestSync);
    window.addEventListener("load", requestSync);
    window.addEventListener("portfolio:navigate-section", requestSync);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestSync);
      window.removeEventListener("resize", requestSync);
      window.removeEventListener("load", requestSync);
      window.removeEventListener("portfolio:navigate-section", requestSync);
    };
  }, []);

  return { active, isInHero };
}
