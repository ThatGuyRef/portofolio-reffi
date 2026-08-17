const hudStats = [
  { label: "CLASS", value: "FRONTEND" },
  { label: "SUB-CLASS", value: "UI DESIGN" },
  { label: "REGION", value: "INDONESIA" },
  { label: "STATUS", value: "OPEN", accent: "var(--green)" },
];

export default function Hero() {
  const scrollTo = (id) => {
    const target = document.querySelector(id);
    if (!target) return;
    window.scrollTo({ top: target.offsetTop - 74, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="section section--magenta section--void hero screen-h relative flex items-center overflow-hidden"
    >
      {/* PARALLAX LAYERS */}
      <div
        data-par="0.12"
        className="starfield pointer-events-none absolute inset-[-10%]"
      />

      {/* glow — the parallax target must own its transform, so it is offset
          with left/top instead of a translate that GSAP would overwrite */}
      <div
        data-par="0.3"
        className="hero-glow pointer-events-none absolute"
        style={{
          background:
            "radial-gradient(circle, rgba(255,46,136,0.30) 0%, rgba(34,224,255,0.12) 45%, transparent 70%)",
        }}
      />

      {/* horizon — outer wrapper keeps the perspective, inner layer parallaxes */}
      <div
        className="pointer-events-none absolute bottom-0 left-[-20%] h-[42%] w-[140%] overflow-hidden"
        style={{
          transform: "perspective(500px) rotateX(64deg)",
          transformOrigin: "bottom center",
          maskImage: "linear-gradient(to top, #000 0%, transparent 78%)",
          WebkitMaskImage: "linear-gradient(to top, #000 0%, transparent 78%)",
        }}
      >
        <div
          data-par="0.5"
          className="pixel-grid pixel-grid--horizon absolute inset-[-30%]"
        />
      </div>

      <div className="shell relative z-10">
        <div className="grid items-center gap-8 md:gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
          <div>
            <div data-hero className="mb-7 flex flex-wrap items-center gap-2">
              <span className="tag tag--yellow">PLAYER 01</span>
              <span className="tag tag--green">● INSERT COIN</span>
            </div>

            <h1
              data-hero
              data-hero-title
              className="pix anim-glitch hero-title"
            >
              NAVARRO
              <br />
              <span style={{ color: "var(--yellow)" }}>REFFI</span> KAMAL
            </h1>

            <p data-hero className="pix hero-role">
              FRONTEND  X WEB DEVELOPER X SOFTWARE ENGINEER
            </p>

            <p data-hero className="body-copy" style={{ maxWidth: 560, marginTop: 18 }}>
              I build the parts of the frontend nobody screenshots: 
              clear structure, honest empty and offline states, and interfaces that stil make sense
              when the data is late or missing
            </p>

            <div data-hero className="hero-actions mt-9 flex flex-wrap gap-5">
              <button
                type="button"
                onClick={() => scrollTo("#quests")}
                className="btn btn--primary btn-block-sm"
              >
                ▶ SELECT QUEST
              </button>

              <button
                type="button"
                onClick={() => scrollTo("#contact")}
                className="btn btn--secondary btn-block-sm"
              >
                SEND SIGNAL
              </button>
            </div>
          </div>

          {/* HUD PANEL */}
          <div data-hero className="card card--raised hud-card">
            <p className="pix-meta" style={{ marginBottom: 16 }}>
              PLAYER CARD
            </p>

            <div
              className="mb-5 overflow-hidden"
              style={{ border: "3px solid var(--cyan)", background: "var(--void)" }}
            >
              <img
                src="/profile.jpg"
                alt="Navarro Reffi Kamal"
                className="hud-card__photo block"
                style={{ filter: "saturate(1.1) contrast(1.05)" }}
              />
            </div>

            <div className="flex flex-col gap-3">
              {hudStats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-between gap-3">
                  <span className="pix-meta">{stat.label}</span>
                  <span
                    className="pix"
                    style={{ fontSize: 9, color: stat.accent || "var(--ink)" }}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          data-hero
          className="anim-bob pix-meta hero-cue flex items-center gap-3"
          style={{ color: "var(--ink-faint)" }}
        >
          <span style={{ width: 8, height: 8, background: "var(--yellow)" }} />
          SCROLL TO CONTINUE
        </div>
      </div>
    </section>
  );
}
