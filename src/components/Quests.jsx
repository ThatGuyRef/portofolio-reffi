import { useState } from "react";
import { projects } from "../data/projects";
import SectionHeader from "./SectionHeader";
import QuestModal from "./QuestModal";

const statusMap = {
  Completed: { label: "CLEARED", tone: "green" },
  Research: { label: "RESEARCH RUN", tone: "cyan" },
  Development: { label: "IN PROGRESS", tone: "yellow" },
};

function QuestCover({ project }) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className="flex h-[200px] items-center justify-center px-4 text-center"
        style={{ background: "var(--void)", border: "3px solid var(--border-muted)" }}
      >
        <span className="pix" style={{ fontSize: 12, color: project.accent }}>
          {project.title}
        </span>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden"
      style={{ border: "3px solid var(--border-muted)", background: "var(--void)" }}
    >
      <img
        src={project.cover}
        alt={project.title}
        loading="lazy"
        decoding="async"
        onError={() => setHasError(true)}
        className="block h-[200px] w-full object-cover"
      />
    </div>
  );
}

export default function Quests() {
  const [selected, setSelected] = useState(null);
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="quests" className="section section--yellow section--deep">
      <div className="shell">
        <SectionHeader
          number="03"
          title="SELECT QUEST"
          intro="Four runs worth showing: a public service portal, a computer-vision research build, a showroom inventory system, and an IoT home-security system built end to end. Open one to walk its full flow, screen by screen."
        />

        <div className="grid-auto--wide grid-auto">
          {projects.map((project) => {
            const status = statusMap[project.status] || {
              label: project.status.toUpperCase(),
              tone: "muted",
            };

            return (
              <article
                key={project.code}
                className="card card-hover flex flex-col"
                data-reveal
                style={{ "--accent": project.accent, padding: 18 }}
              >
                <div className="mb-4 flex items-center justify-between gap-3">
                  <span className="pix-meta" style={{ color: project.accent }}>
                    {project.code}
                  </span>

                  <span className={`tag tag--${status.tone}`}>{status.label}</span>
                </div>

                <QuestCover project={project} />

                <h3 className="pix-card-title" style={{ margin: "20px 0 12px" }}>
                  {project.title}
                </h3>

                <p className="pix-meta" style={{ marginBottom: 14 }}>
                  {project.type} — {project.highlight}
                </p>

                <p className="body-copy-sm" style={{ flex: 1 }}>
                  {project.desc}
                </p>

                <div className="tag-row" style={{ margin: "20px 0" }}>
                  {project.stack.map((tech) => (
                    <span key={tech} className="tag tag--muted">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setSelected(project);
                      setActiveStep(0);
                    }}
                    className="btn btn--sm btn--primary btn-block-sm"
                  >
                    ▶ INSPECT ({project.roadmap.length})
                  </button>

                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--sm btn--secondary btn-block-sm"
                    >
                      SOURCE
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {selected && (
        <QuestModal
          project={selected}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          onClose={() => {
            setSelected(null);
            setActiveStep(0);
          }}
        />
      )}
    </section>
  );
}
