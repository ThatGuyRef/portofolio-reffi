import SectionHeader from "./SectionHeader";

const stages = [
  {
    id: "STAGE 01",
    title: "SECUREHOME — IOT HOME SECURITY",
    role: ["Flutter", "Supabase", "ESP32"],
    status: { label: "CLEARED", tone: "green" },
    body: "Undergraduate thesis, designed and built alone across three layers: a Flutter app, a PostgreSQL backend, and firmware on two ESP32 boards — 19 screens, 6 tables, 2 microcontrollers. The idea that carried it was modes: Disarmed, Home, and Away change how every sensor event is treated, because a single operating mode makes a resident walking to the kitchen look identical to an intruder, and false alarms train people to ignore the system. Access is enforced by row-level security in the database rather than by hiding things in the UI, which I verified by attacking it from a second account. The hardest bug was not code at all — the buzzer's inrush current dragged the supply under the brownout threshold and rebooted the board every time the siren fired.",
  },
  {
    id: "STAGE 02",
    title: "SI-PANDU — CITIZEN SERVICE PORTAL",
    role: ["Fullstack", "Laravel", "MySQL"],
    status: { label: "CLEARED", tone: "green" },
    body: "Built the full request loop for a kelurahan administrative service: citizens pick a letter type, fill their identity data, upload supporting documents, and get a reference number they can track. On the other side, admins review the submission, verify attachments, leave internal notes, and approve, revise, or reject it. Twelve screens, one continuous flow, and a status model that both sides read the same way.",
  },
  {
    id: "STAGE 03",
    title: "ETLE PLATE DETECTION — RESEARCH RUN",
    role: ["Python", "YOLOv8", "EasyOCR"],
    status: { label: "RESEARCH", tone: "cyan" },
    body: "Trained a YOLOv8 model to detect three classes — helmet, no_helmet, and plate number — then evaluated it with precision, recall, and mAP curves before pointing it at real road footage. Detected plate regions get cropped and handed to EasyOCR, so a violation ends up as a readable plate string instead of a bounding box. The interesting work was in the seams: cleaning crops so OCR stops guessing.",
  },
  {
    id: "STAGE 04",
    title: "FORZAAUTOHALL — SHOWROOM INVENTORY",
    role: ["CodeIgniter 4", "PHP", "Tailwind"],
    status: { label: "IN PROGRESS", tone: "yellow" },
    body: "A vehicle inventory system on a proper MVC structure: dashboard summary, full CRUD over units, image upload, and a detail page that gives a buyer everything in one screen. Smaller than the service portal, but the place where I got strict about separating controllers, models, and views instead of letting logic leak into templates.",
  },
  {
    id: "STAGE 05",
    title: "THIS PORTFOLIO — 16-BIT INTERFACE",
    role: ["React", "GSAP", "ScrollTrigger"],
    status: { label: "LIVE", tone: "magenta" },
    body: "A console-era interface built as a real design system rather than a theme: fixed palette, two typefaces, hard-shadow components with no soft edges, and one motion layer driven by data attributes so every reveal, parallax, and stat bar follows the same rules. The CRT overlays sit on top without touching layout.",
  },
];

export default function Stages() {
  return (
    <section id="stages" className="section section--magenta section--void">
      <div className="shell shell--prose">
        <SectionHeader
          number="04"
          title="STAGES CLEARED"
          intro="Longer form: what each build actually required, and what it taught me."
        />

        <div className="flex flex-col gap-6">
          {stages.map((stage) => (
            <article
              key={stage.id}
              className="card card-hover"
              data-reveal
              style={{ "--accent": `var(--${stage.status.tone})` }}
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <span className="pix" style={{ fontSize: 10, color: "var(--yellow)" }}>
                  {stage.id}
                </span>

                <span className={`tag tag--${stage.status.tone}`}>
                  {stage.status.label}
                </span>
              </div>

              <h3 className="pix-card-title" style={{ marginBottom: 16 }}>
                {stage.title}
              </h3>

              <div className="tag-row" style={{ marginBottom: 18 }}>
                {stage.role.map((item) => (
                  <span key={item} className="tag tag--muted">
                    {item}
                  </span>
                ))}
              </div>

              <p className="body-copy">{stage.body}</p>
            </article>
          ))}
        </div>

        <div
          className="card card--raised mt-6 flex flex-wrap items-center justify-between gap-4"
          data-reveal
          style={{ "--accent": "var(--yellow)" }}
        >
          <p className="body-copy" style={{ maxWidth: 520 }}>
            Next stage is open. If you have a build that needs an interface with
            actual structure behind it, the contact panel is below.
          </p>

          <span className="pix anim-blink" style={{ fontSize: 10, color: "var(--green)" }}>
            ▶ CONTINUE
          </span>
        </div>
      </div>
    </section>
  );
}
