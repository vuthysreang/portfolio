import { ArrowUpRight, GraduationCap } from "lucide-react";

const schools = [
  { name: "Hunsen1Mithona High School", years: "2015–2017" },
  { name: "Trokeat Secondary School", years: "2011–2014" },
  { name: "Preymul Primary School", years: "2004–2010" },
];

export default function Education() {
  return (
    <section
      id="education"
      className="wrap education"
      aria-labelledby="education-title"
    >
      <h2 id="education-title">
        Education<span>.</span>
      </h2>
      <div className="education-grid">
        <article className="degree-card">
          <div className="degree-meta">
            <GraduationCap size={27} aria-hidden="true" />
            <span>2017–2021 · Kampong Speu</span>
          </div>
          <h3>Bachelor of Software Engineering</h3>
          <p className="institute">Kirirom Institute of Technology</p>
          <p>
            In my final year, I used R notebooks to explore datasets and
            document my analysis.
          </p>
          <a
            className="text-link"
            href="https://github.com/vuthysreang/datascience_porfolio"
            target="_blank"
            rel="noreferrer"
          >
            Explore my coursework <ArrowUpRight size={15} />
          </a>
        </article>
        <div className="school-history">
          <h3>Earlier education</h3>
          <p className="school-location">Takeo, Cambodia</p>
          <ol>
            {schools.map((school) => (
              <li key={school.name}>
                <span>{school.years}</span>
                <strong>{school.name}</strong>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
