import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useSectionVisibilityLifecycle(
  sectionRef,
  animationsRef,
  { start = "top bottom", end = "bottom top", onEnter, onLeave, onReset } = {}
) {
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    let isRunning = false;
    let frameId = 0;

    const clearAnimations = () => {
      animationsRef.current.forEach((animation) => animation?.kill?.());
      animationsRef.current = [];
    };

    const controller = {
      add(animation) {
        if (animation?.kill) {
          animationsRef.current.push(animation);
        }

        return animation;
      },
      clear: clearAnimations,
    };

    const isSectionVisible = () => {
      const rect = section.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < window.innerHeight;
    };

    const handleEnter = () => {
      if (isRunning) return;

      isRunning = true;
      clearAnimations();
      onReset?.();
      onEnter?.(controller);
    };

    const handleLeave = () => {
      if (!isRunning) {
        onReset?.();
        return;
      }

      isRunning = false;
      clearAnimations();
      onLeave?.(controller);
      onReset?.();
    };

    const trigger = ScrollTrigger.create({
      trigger: section,
      start,
      end,
      onEnter: handleEnter,
      onEnterBack: handleEnter,
      onLeave: handleLeave,
      onLeaveBack: handleLeave,
    });

    const syncInitialState = () => {
      ScrollTrigger.refresh();

      if (trigger.isActive || isSectionVisible()) {
        handleEnter();
        return;
      }

      clearAnimations();
      onReset?.();
    };

    frameId = window.requestAnimationFrame(syncInitialState);

    return () => {
      window.cancelAnimationFrame(frameId);
      isRunning = false;
      trigger.kill();
      clearAnimations();
      onReset?.();
    };
  }, [animationsRef, end, onEnter, onLeave, onReset, sectionRef, start]);
}
