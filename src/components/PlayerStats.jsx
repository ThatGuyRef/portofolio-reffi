import SectionHeader from "./SectionHeader";

const coreStats = [
  { label: "INTERFACE BUILD", level: 90, fill: "bar__fill--cyan" },
  { label: "RESPONSIVE LAYOUT", level: 88, fill: "bar__fill--magenta" },
  { label: "MOTION SYSTEM", level: 85, fill: "bar__fill--yellow" },
  { label: "DATA / BACKEND FLOW", level: 82, fill: "bar__fill--green" },
];

const loadout = [
  {
    slot: "PRIMARY",
    title: "JS / REACT / PYTHON",
    desc: "Modern web interfaces with strong frontend logic, responsive layouts, and interaction that actually responds.",
    accent: "cyan",
  },
  {
    slot: "FRONTEND",
    title: "REACT / GSAP / TAILWIND",
    desc: "Component structure, scroll-driven motion, and layout systems that stay readable as a project grows.",
    accent: "magenta",
  },
  {
    slot: "BACKEND",
    title: "LARAVEL / PHP / SQL",
    desc: "Wiring interfaces to database-driven systems, request flows, and application logic.",
    accent: "yellow",
  },
  {
    slot: "DESIGN",
    title: "FIGMA / PROTOTYPING",
    desc: "Layouts drafted before they are built — spacing, hierarchy, and user journey mapped first.",
    accent: "green",
  },
];

export default function PlayerStats() {
  return (
    <section id="stats" className="section section--magenta section--deep">
      <div className="shell">
        <SectionHeader
          number="01"
          title="PLAYER STATS"
          intro="Undergraduate student building web interfaces that are readable, interactive, and visually memorable. Here is the current stat sheet."
        />

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* BIO */}
          <div className="card card--raised" data-reveal>
            <p className="pix-meta" style={{ marginBottom: 14 }}>
              PROFILE
            </p>

            <h3 className="pix-card-title" style={{ marginBottom: 16 }}>
              WHAT I ACTUALLY DO
            </h3>

            <p className="body-copy">
              I design and build bold web interfaces with clean structure, smooth
              motion, and practical frontend logic. Most of my work sits where an
              interface meets real data — service portals, dashboards, inventory
              systems.
            </p>

            <p className="body-copy" style={{ marginTop: 14 }}>
              The goal is never decoration for its own sake: every panel, bar, and
              transition should tell you where you are and what happens next.
            </p>

            <div className="tag-row" style={{ marginTop: 20 }}>
              <span className="tag tag--cyan">CLEAN STRUCTURE</span>
              <span className="tag tag--magenta">MOTION</span>
              <span className="tag tag--yellow">SYSTEM THINKING</span>
            </div>
          </div>

          {/* STAT BARS */}
          <div className="card" data-reveal>
            <p className="pix-meta" style={{ marginBottom: 20 }}>
              CORE ATTRIBUTES
            </p>

            <div className="flex flex-col gap-6">
              {coreStats.map((stat) => (
                <div key={stat.label}>
                  <div className="mb-2 flex items-end justify-between gap-3">
                    <span
                      className="pix"
                      style={{ fontSize: 9, letterSpacing: 1, color: "var(--ink)" }}
                    >
                      {stat.label}
                    </span>

                    <span
                      className="pix"
                      style={{ fontSize: 9, color: "var(--ink-faint)" }}
                    >
                      {stat.level}
                    </span>
                  </div>

                  <div className="bar">
                    <span className={`bar__fill ${stat.fill}`} data-bar={stat.level} />
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-7 pt-5"
              style={{ borderTop: "2px solid var(--border-muted)" }}
            >
              <p className="body-copy-sm" style={{ color: "var(--ink-faint)" }}>
                Calibrated for responsive interface systems, layered motion, and
                data-driven workflows.
              </p>
            </div>
          </div>
        </div>

        {/* LOADOUT */}
        <div className="grid-auto" style={{ marginTop: 26 }}>
          {loadout.map((item) => (
            <div
              key={item.slot}
              className="card card-hover card--raised"
              data-reveal
              style={{ "--accent": `var(--${item.accent})` }}
            >
              <span className={`tag tag--${item.accent}`}>{item.slot}</span>

              <h3 className="pix-card-title" style={{ margin: "18px 0 12px" }}>
                {item.title}
              </h3>

              <p className="body-copy-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
