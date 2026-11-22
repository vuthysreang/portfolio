import { ChevronDown, Download } from "lucide-react";
import roles from "../data/experience.json";

export default function Experience() {
  return (
    <section
      className="wrap experience"
      id="experience"
      aria-labelledby="experience-title"
    >
      <div className="career-intro">
        <div className="section-kicker">
          <span />
          Career
        </div>
        <h2 id="experience-title">
          Experience<span>.</span>
        </h2>
        <p>Web and mobile products I’ve worked on in Cambodia.</p>
        <a className="text-link" href="./Vuthy-Sreang-CV.pdf" download>
          Download my CV <Download size={15} />
        </a>
      </div>
      <div className="career-list">
        {roles.map((role, index) => (
          <details
            key={role.company}
            className="career-role"
            open={index === 0}
          >
            <summary>
              <span className="career-date">{role.dates}</span>
              <strong>{role.title}</strong>
              <span className="career-company">{role.company}</span>
              <ChevronDown aria-hidden="true" size={17} />
            </summary>
            <div className="role-details">
              <span className="role-meta">
                {[role.level, role.employmentType, role.location, role.workMode]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
              <p>{role.summary}</p>
              <ul>
                {role.details.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
              <div className="tags">
                {role.tools.map((tool) => (
                  <span key={tool}>{tool}</span>
                ))}
              </div>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
