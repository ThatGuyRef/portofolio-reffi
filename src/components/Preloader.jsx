import { useEffect, useRef, useState } from "react";

const SEGMENTS = 20;

export default function Preloader({ skipIntro = false, isExiting = false, onFinish }) {
  const [progress, setProgress] = useState(skipIntro ? 100 : 0);
  const [isLoaded, setIsLoaded] = useState(skipIntro);
  const hasFiredRef = useRef(false);

  useEffect(() => {
    if (skipIntro) {
      if (!hasFiredRef.current) {
        hasFiredRef.current = true;
        onFinish?.();
      }
      return undefined;
    }

    const interval = window.setInterval(() => {
      setProgress((previous) => {
        const next = Math.min(previous + Math.floor(Math.random() * 9) + 4, 100);

        if (next >= 100) {
          window.clearInterval(interval);
          setIsLoaded(true);
        }

        return next;
      });
    }, 90);

    return () => window.clearInterval(interval);
  }, [skipIntro, onFinish]);

  const start = () => {
    if (hasFiredRef.current) return;
    hasFiredRef.current = true;
    onFinish?.();
  };

  useEffect(() => {
    if (!isLoaded) return undefined;

    const handleKey = (event) => {
      if (event.key === "Enter" || event.key === " ") start();
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded]);

  const filled = Math.round((progress / 100) * SEGMENTS);

  return (
    <div
      onClick={isLoaded ? start : undefined}
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center px-6 transition-opacity duration-500 ${
        isExiting ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ background: "var(--void)" }}
    >
      <div className="boot-banner">
        <span className="pix boot-banner__text">SYSTEM BOOT : 16-BIT</span>
      </div>

      {/* CARTRIDGE */}
      <div className="cartridge relative overflow-hidden">
        {/* label bar */}
        <div className="cartridge__label mx-auto flex items-center justify-center">
          <span className="pix cartridge__label-text">Reffi&apos;s Portofolio</span>
        </div>

        <div className="cartridge__notch mx-auto" />

        {/* pin slots — drawn as a gradient so the row scales with the shell */}
        <div className="cartridge__pins" />

        {/* scan bar */}
        <div
          className="absolute left-0 w-full"
          style={{
            height: 4,
            background: "var(--green)",
            animation: "cartridge-scan 1.6s linear infinite",
          }}
        />
      </div>

      {/* SEGMENTED PROGRESS */}
      <div
        className="boot-progress mt-10 flex gap-[3px] p-[3px]"
        style={{ border: "3px solid var(--ink)", background: "var(--void)" }}
      >
        {Array.from({ length: SEGMENTS }).map((_, index) => (
          <span
            key={index}
            className="boot-progress__seg"
            style={{
              background:
                index < filled
                  ? index % 2 === 0
                    ? "var(--green)"
                    : "var(--cyan)"
                  : "transparent",
            }}
          />
        ))}
      </div>

      <div className="mt-6 flex w-full max-w-[420px] flex-wrap items-center justify-center gap-4">
        <span className="pix" style={{ fontSize: 9, color: "var(--ink-faint)" }}>
          READING CARTRIDGE
        </span>

        <span className="pix" 
        style={{ fontSize: 9, color: "var(--green)" }}>
          {progress}%
        </span>
      </div>

      <div className="mt-12 h-[24px]">
        {isLoaded && (
          <button
            type="button"
            onClick={start}
            className="btn btn--primary anim-blink retro-play-btn"
          >
            PRESS START
          </button>
        )}
      </div>
    </div>
  );
}
