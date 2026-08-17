import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";

export default function QuestModal({ project, activeStep, setActiveStep, onClose }) {
  const roadmap = project?.roadmap || [];
  const step = roadmap[activeStep];

  const goPrev = useCallback(() => {
    setActiveStep((previous) => (previous === 0 ? roadmap.length - 1 : previous - 1));
  }, [roadmap.length, setActiveStep]);

  const goNext = useCallback(() => {
    setActiveStep((previous) => (previous === roadmap.length - 1 ? 0 : previous + 1));
  }, [roadmap.length, setActiveStep]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [goNext, goPrev, onClose]);

  if (!project || !step) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[9500] flex items-center justify-center p-2 sm:p-4"
      style={{ background: "rgba(13, 7, 32, 0.94)" }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="flex h-[92dvh] w-full flex-col overflow-hidden"
        style={{
          maxWidth: 1100,
          border: "4px solid var(--ink)",
          background: "var(--deep)",
          boxShadow: "10px 10px 0 var(--magenta)",
        }}
      >
        {/* HEADER */}
        <div
          className="flex shrink-0 items-center justify-between gap-3 px-4 py-4 sm:gap-4 sm:px-6 sm:py-5"
          style={{ borderBottom: "4px solid var(--magenta)", background: "var(--void)" }}
        >
          <div className="min-w-0">
            <p className="pix-meta" style={{ marginBottom: 8 }}>
              QUEST LOG // {project.code}
            </p>

            <h3
              className="pix truncate"
              style={{ fontSize: 14, letterSpacing: 2, color: "var(--ink)" }}
            >
              {project.title}
            </h3>
          </div>

          <button type="button" onClick={onClose} className="btn btn--sm btn--primary">
            ✕ EXIT
          </button>
        </div>

        {/* BODY */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-6 sm:py-7">
          <div className="mx-auto w-full" style={{ maxWidth: 900 }}>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <span className="tag tag--yellow">STEP {step.step}</span>
              <span className="tag tag--muted">{step.group}</span>
              <span className="tag tag--cyan">
                {activeStep + 1}/{roadmap.length}
              </span>
            </div>

            <h4
              className="pix"
              style={{
                fontSize: 13,
                letterSpacing: 1,
                color: "var(--ink)",
                marginBottom: 20,
                textTransform: "uppercase",
              }}
            >
              {step.title}
            </h4>

            {/* the frame hugs the image so portrait app screenshots don't sit
                inside a mostly-empty box */}
            <div className="flex justify-center">
              <div
                style={{
                  border: "3px solid var(--cyan)",
                  background: "var(--void)",
                  padding: 8,
                }}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="block max-h-[54vh] w-auto max-w-full object-contain"
                />
              </div>
            </div>

            <p className="body-copy" style={{ marginTop: 22 }}>
              {step.desc}
            </p>

            {/* STEP SELECTOR */}
            <div
              className="mt-8 pt-6"
              style={{ borderTop: "4px solid var(--border-muted)" }}
            >
              <p className="pix-meta" style={{ marginBottom: 14 }}>
                DEVELOPMENT FLOW
              </p>

              <div className="flex flex-wrap gap-2">
                {roadmap.map((item, index) => (
                  <button
                    key={item.step}
                    type="button"
                    onClick={() => setActiveStep(index)}
                    className="pix"
                    title={item.title}
                    style={{
                      fontSize: 9,
                      padding: "8px 10px",
                      cursor: "pointer",
                      color: activeStep === index ? "var(--void)" : "var(--ink-dim)",
                      background:
                        activeStep === index ? "var(--green)" : "var(--panel-raised)",
                      border: `2px solid ${
                        activeStep === index ? "var(--green)" : "var(--border-muted)"
                      }`,
                    }}
                  >
                    {item.step}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div
          className="flex shrink-0 items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4"
          style={{ borderTop: "4px solid var(--magenta)", background: "var(--void)" }}
        >
          <button type="button" onClick={goPrev} className="btn btn--sm btn--secondary">
            ◀ PREV
          </button>

          <span className="pix-meta hidden sm:block">
            ARROW KEYS TO NAVIGATE - ESC TO EXIT
          </span>

          <button type="button" onClick={goNext} className="btn btn--sm btn--secondary">
            NEXT ▶
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
