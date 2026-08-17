import SectionHeader from "./SectionHeader";

const entries = [
  {
    no: "LOG-01",
    title: "SCANLINES WITHOUT KILLING SCROLL",
    tags: ["CSS", "PERFORMANCE"],
    teaser:
      "Three fixed overlays on top of a scroll-driven page, and why compositing them correctly matters more than the effect itself.",
  },
  {
    no: "LOG-02",
    title: "CLEAN CROPS BEFORE OCR",
    tags: ["PYTHON", "COMPUTER VISION"],
    teaser:
      "What I had to fix between YOLOv8 detection and EasyOCR before plate strings stopped coming back as noise.",
  },
  {
    no: "LOG-03",
    title: "ONE FLOW, TWO ROLES",
    tags: ["LARAVEL", "UX"],
    teaser:
      "Modelling a citizen request and an admin review as the same record without two competing sources of truth.",
  },
  {
    no: "LOG-04",
    title: "MOTION AS DATA ATTRIBUTES",
    tags: ["GSAP", "REACT"],
    teaser:
      "Moving every reveal, parallax layer, and stat bar behind four data attributes so the markup stays readable.",
  },
];

export default function DevLog() {
  return (
    <section id="devlog" className="section section--cyan section--deep">
      <div className="shell">
        <SectionHeader
          number="05"
          title="DEV LOG"
          intro="Notes in progress. Titles are locked, the articles are not written yet — no links here until they are."
        />

        <div className="grid-auto--tight grid-auto">
          {entries.map((entry) => (
            <article
              key={entry.no}
              className="card card--muted"
              data-reveal
              style={{ "--accent": "var(--border-muted)" }}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <span className="pix-meta">{entry.no}</span>
                <span className="tag tag--muted">DRAFT</span>
              </div>

              <h3
                className="pix"
                style={{
                  fontSize: 11,
                  letterSpacing: 1,
                  lineHeight: 1.6,
                  color: "var(--ink-dim)",
                  marginBottom: 14,
                }}
              >
                {entry.title}
              </h3>

              <p className="body-copy-sm" style={{ color: "var(--ink-faint)" }}>
                {entry.teaser}
              </p>

              <div className="tag-row" style={{ marginTop: 18 }}>
                {entry.tags.map((tag) => (
                  <span key={tag} className="tag tag--muted">
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>

        <p className="pix-meta mt-8" data-reveal>
          // ENTRIES UNLOCK WHEN WRITTEN
        </p>
      </div>
    </section>
  );
}
