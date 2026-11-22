import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Code2,
  Database,
  Layers3,
  MapPin,
  Orbit,
  Terminal,
} from "lucide-react";
import ThemeButton from "../components/ThemeButton";
import Flux from "../components/Flux";
import Projects from "../components/Projects";

const github = "https://github.com/vuthysreang";
const stack = [
  { title: "Interface", text: "React · Next.js · Vue", icon: Layers3 },
  { title: "Backend", text: "Node.js · NestJS · Spring Boot", icon: Terminal },
  {
    title: "Languages",
    text: "TypeScript · JavaScript · Java · Python",
    icon: Braces,
  },
  { title: "Data", text: "PostgreSQL · MongoDB · R", icon: Database },
];
function Brand() {
  return (
    <a className="brand" href="#top" aria-label="Vuthy Sreang, back to top">
      <span className="brand-icon">
        <Orbit size={29} strokeWidth={1.7} />
      </span>
      vuthy<span className="brand-muted">.dev</span>
    </a>
  );
}
export default function Portfolio() {
  return (
    <div id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header>
        <div className="wrap header-inner">
          <Brand />
          <nav aria-label="Main navigation">
            <a href="#work">Work</a>
            <a href="#about">About</a>
            <a href="#stack">Stack</a>
          </nav>
          <div className="header-actions">
            <ThemeButton />
            <a className="contact-nav" href="#contact">
              Get in touch <ArrowUpRight size={14} />
            </a>
          </div>
        </div>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="star-map" aria-hidden="true" />
          <div className="wrap hero-inner">
            <div className="intro">
              <div className="role">
                <i /> Full-stack developer
              </div>
              <h1 id="hero-title">
                Vuthy
                <br />
                Sreang<span>.</span>
              </h1>
              <p>
                I build thoughtful interfaces and the systems that power them.
                Creating from <span>Cambodia.</span>
              </p>
              <div className="hero-actions">
                <a href="#work" className="primary">
                  Explore my work <ArrowDownRight size={17} />
                </a>
                <a
                  href={github}
                  className="github-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
            <Flux />
            <a className="scroll-cue" href="#work">
              <ArrowDown size={12} />
              Scroll to explore
            </a>
          </div>
        </section>
        <section id="work" className="wrap work">
          <div className="section-kicker">
            <span />
            Portfolio
          </div>
          <div className="section-heading">
            <h2>
              Selected work<span>.</span>
            </h2>
            <a
              className="text-link"
              href={github + "?tab=repositories"}
              target="_blank"
              rel="noreferrer"
            >
              All repositories <ArrowUpRight size={15} />
            </a>
          </div>
          <Projects />
        </section>
        <section id="about" className="about">
          <div className="wrap about-grid">
            <div>
              <div className="section-kicker">
                <span />
                About me
              </div>
              <h2>
                Behind the code<span>.</span>
              </h2>
              <div className="location">
                <MapPin size={15} /> Cambodia <i /> UTC+7
              </div>
            </div>
            <div className="bio">
              <p>
                I’m Vuthy, a full-stack web developer with a soft spot for the
                details you can feel when you use a product.
              </p>
              <p>
                I work across interfaces, APIs, and databases. My public
                projects range from email infrastructure to data notebooks, and
                this site gives me a space to experiment with motion and
                creative coding.
              </p>
              <a
                className="text-link"
                href={github}
                target="_blank"
                rel="noreferrer"
              >
                My GitHub profile <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </section>
        <section className="wrap stack" id="stack">
          <div className="section-kicker">
            <span />
            Toolkit
          </div>
          <h2>
            My stack<span>.</span>
          </h2>
          <div className="stack-grid">
            {stack.map(({ title, text, icon: Icon }) => (
              <div key={title}>
                <Icon size={21} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <section id="contact" className="contact">
          <div className="wrap contact-inner">
            <div>
              <div className="section-kicker">
                <span />
                Contact
              </div>
              <h2>
                Let’s build something<span>.</span>
              </h2>
              <p>Have a project in mind? I’d love to hear about it.</p>
            </div>
            <a className="primary" href="mailto:vuthysreang.zevo@gmail.com">
              Email me <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
      </main>
      <footer className="wrap">
        <span className="footer-name">
          <Code2 size={16} />
          Vuthy Sreang
        </span>
        <div>
          <a href={github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight size={12} />
          </a>
          <a
            href="https://www.linkedin.com/in/vuthy-sreang/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn <ArrowUpRight size={12} />
          </a>
        </div>
      </footer>
    </div>
  );
}
