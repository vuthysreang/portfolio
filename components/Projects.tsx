"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import Flux from "./Flux";

const projects = [
  {
    title: "Orbit Lab",
    art: "orbit",
    category: "Interactive concept",
    description:
      "A study in motion, geometry, and light. An interactive orbital sculpture for the browser.",
    tools: ["Canvas 2D", "TypeScript", "React"],
    detail:
      "Each strand follows a path across a deformed torus. Move your pointer across the field to tilt the sculpture, or pause it to study a single frame.",
  },
  {
    title: "Relay Mail",
    art: "relay",
    category: "Backend engineering",
    description:
      "An email delivery API built with Express, Nodemailer, and a containerized PostgreSQL backend.",
    tools: ["Node.js", "PostgreSQL", "Docker"],
    detail:
      "The express_nodemailer repository brings together Express routes, mail delivery, Sequelize models, and database migrations. Docker Compose provisions the local development services.",
    url: "https://github.com/vuthysreang/express_nodemailer",
  },
  {
    title: "Data Atlas",
    art: "atlas",
    category: "Data exploration",
    description:
      "A collection of R notebooks exploring datasets through hands-on analysis and visualization.",
    tools: ["R", "RStudio", "Notebooks"],
    detail:
      "This collection documents my semester-seven data science coursework. It includes R programming lessons, assignment notebooks, example datasets, and a midterm project you can explore in RStudio.",
    url: "https://github.com/vuthysreang/datascience_porfolio",
  },
];

function Artwork({ index }: { index: number }) {
  const p = projects[index];
  return (
    <div className={"art art-" + p.art} aria-hidden="true">
      <div className="art-grid" />
      <span className="art-corner">+</span>
      <span className="art-id">VS—0{index + 1}</span>
      <img src={"./art/" + p.art + ".webp"} alt="" width="810" height="425" />
    </div>
  );
}

export default function Projects() {
  const [selected, setSelected] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const p = selected === null ? null : projects[selected];
  useEffect(() => {
    const el = dialog.current;
    if (selected === null || !el) return;
    el.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      if (el.open) el.close();
    };
  }, [selected]);
  return (
    <>
      <div className="projects">
        {projects.map((project, i) => (
          <button
            key={project.art}
            className="project"
            onClick={() => setSelected(i)}
            aria-label={"Explore " + project.title}
          >
            <Artwork index={i} />
            <div className="project-body">
              <div className="category">
                <i />
                {project.category}
              </div>
              <div className="project-title">
                <h3>{project.title}</h3>
                <ArrowUpRight size={20} />
              </div>
              <p>{project.description}</p>
              <div className="tags">
                {project.tools.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="project-dialog"
        aria-labelledby="case-title"
        onCancel={() => setSelected(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelected(null);
        }}
      >
        {p && (
          <div className="dialog-content">
            <button
              className="icon-button close-dialog"
              aria-label="Close project"
              onClick={() => setSelected(null)}
              autoFocus
            >
              <X size={18} />
            </button>
            {selected === 0 ? (
              <div className="demo-field">
                <Flux />
              </div>
            ) : (
              <Artwork index={selected!} />
            )}
            <div className="dialog-copy">
              <div className="category">
                <i />
                {p.category}
              </div>
              <h2 id="case-title">{p.title}</h2>
              <p>{p.detail}</p>
              <div className="tags">
                {p.tools.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              {p.url && (
                <a
                  className="primary small"
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View repository <ArrowUpRight size={16} />
                </a>
              )}
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
