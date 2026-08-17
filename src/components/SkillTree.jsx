import { createElement } from "react";
import { FaReact, FaJs, FaGitAlt, FaPhp, FaLaravel, FaDatabase } from "react-icons/fa";
import {
  SiTailwindcss,
  SiGsap,
  SiTypescript,
  SiPython,
  SiMysql,
  SiVuedotjs,
} from "react-icons/si";
import SectionHeader from "./SectionHeader";

const PIP_COUNT = 10;

const branches = [
  {
    name: "INTERFACE BRANCH",
    accent: "cyan",
    note: "Everything the user actually touches.",
    skills: [
      { icon: FaReact, name: "REACT", level: 90 },
      { icon: SiGsap, name: "GSAP", level: 85 },
      { icon: SiTailwindcss, name: "TAILWIND", level: 90 },
      { icon: SiVuedotjs, name: "VUE.JS", level: 75 },
    ],
  },
  {
    name: "LANGUAGE BRANCH",
    accent: "magenta",
    note: "The logic underneath the pixels.",
    skills: [
      { icon: FaJs, name: "JAVASCRIPT", level: 90 },
      { icon: SiTypescript, name: "TYPESCRIPT", level: 85 },
      { icon: SiPython, name: "PYTHON", level: 90 },
      { icon: FaPhp, name: "PHP", level: 75 },
    ],
  },
  {
    name: "DATA & TOOLS BRANCH",
    accent: "yellow",
    note: "Where the interface meets real records.",
    skills: [
      { icon: SiMysql, name: "SQL", level: 85 },
      { icon: FaDatabase, name: "ORACLE", level: 85 },
      { icon: FaLaravel, name: "LARAVEL", level: 75 },
      { icon: FaGitAlt, name: "GIT", level: 90 },
    ],
  },
];

function Pips({ level, accent }) {
  const filled = Math.round((level / 100) * PIP_COUNT);

  return (
    <div className="pips" style={{ "--accent": `var(--${accent})` }}>
      {Array.from({ length: PIP_COUNT }).map((_, index) => (
        <span key={index} className={`pip ${index < filled ? "pip--on" : ""}`} />
      ))}
    </div>
  );
}

export default function SkillTree() {
  return (
    <section id="skills" className="section section--cyan section--void">
      <div className="shell">
        <SectionHeader
          number="02"
          title="SKILL TREE"
          intro="Three branches, unlocked through coursework, client-facing builds, and research projects. Filled pips are where I work daily."
        />

        <div className="grid-auto--wide grid-auto">
          {branches.map((branch) => (
            <div
              key={branch.name}
              className="card card-hover"
              data-reveal
              style={{ "--accent": `var(--${branch.accent})` }}
            >
              <span className={`tag tag--${branch.accent}`}>{branch.name}</span>

              <p
                className="body-copy-sm"
                style={{ margin: "16px 0 22px", color: "var(--ink-faint)" }}
              >
                {branch.note}
              </p>

              <div className="flex flex-col gap-5">
                {branch.skills.map((skill, index) => (
                  <div key={skill.name}>
                    <div className="mb-2 flex items-center gap-3">
                      <span
                        className="pix"
                        style={{ fontSize: 9, color: "var(--border-muted)" }}
                      >
                        {index === branch.skills.length - 1 ? "└" : "├"}
                      </span>

                      <span
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 28,
                          height: 28,
                          fontSize: 15,
                          color: `var(--${branch.accent})`,
                          border: "2px solid var(--border-muted)",
                          background: "var(--void)",
                        }}
                      >
                        {createElement(skill.icon)}
                      </span>

                      <span
                        className="pix"
                        style={{ fontSize: 9, letterSpacing: 1, color: "var(--ink)" }}
                      >
                        {skill.name}
                      </span>
                    </div>

                    <div style={{ paddingLeft: 42 }}>
                      <Pips level={skill.level} accent={branch.accent} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div
          className="card card--raised mt-7 flex flex-wrap items-center justify-between gap-5"
          data-reveal
          style={{ "--accent": "var(--green)" }}
        >
          <div>
            <p className="pix-meta" style={{ marginBottom: 10 }}>
              NEXT UNLOCK
            </p>
            <p className="body-copy" style={{ maxWidth: 520 }}>
              Currently grinding: deeper TypeScript typing patterns and testing
              real projects against slower devices.
            </p>
          </div>

          <span className="tag tag--green">IN PROGRESS</span>
        </div>
      </div>
    </section>
  );
}
