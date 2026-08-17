export default function Footer() {
  return (
    <footer
      className="px-6 py-12"
      style={{ background: "var(--deep)", borderTop: "4px solid var(--yellow)" }}
    >
      <div className="shell flex flex-col items-center gap-6 text-center">
        <p className="pix anim-blink" style={{ fontSize: 16, color: "var(--magenta)" }}>
          GAME OVER
        </p>

        <div className="hard-divider w-full" style={{ "--accent": "var(--border-muted)" }} />

        <p className="pix-meta">NAVARRO REFFI KAMAL — UI DESIGNER &amp; FRONTEND DEV</p>

        <p className="pix-meta">
          BUILT WITH REACT + GSAP · © 2026 · INSERT COIN TO CONTINUE
        </p>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="btn btn--sm btn--secondary"
        >
          BACK TO START
        </button>
      </div>
    </footer>
  );
}
