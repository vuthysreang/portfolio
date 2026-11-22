import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Braces,
  Download,
  Mail,
  MessageSquare,
  Languages,
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
import Experience from "../components/Experience";
import Education from "../components/Education";

const github = "https://github.com/vuthysreang";
const linkedin = "https://www.linkedin.com/in/vuthy-sreang/";
const email = "vuthysreang.zevo@gmail.com";
const stack = [
  {
    title: "Web & mobile",
    text: "React · Next.js · React Native · Tailwind CSS",
    icon: Layers3,
  },
  {
    title: "APIs",
    text: "Java · Spring Boot · TypeScript · NestJS · Express",
    icon: Braces,
  },
  {
    title: "Databases",
    text: "PostgreSQL · MySQL · SQL Server · MongoDB",
    icon: Database,
  },
  {
    title: "Delivery",
    text: "Docker · Jenkins · Kubernetes · AWS · Git",
    icon: Terminal,
  },
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
            <a href="#experience">Experience</a>
            <a href="#work">Projects</a>
            <a href="#about">About</a>
            <a href="#education">Education</a>
            <a className="mobile-contact-link" href="#contact">
              Contact
            </a>
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
                I build HR software at ABA Bank and have worked on insurance,
                payments, and mobile apps. Based in{" "}
                <span>Phnom Penh, Cambodia.</span>
              </p>
              <div className="hero-actions">
                <a href="#experience" className="primary">
                  View experience <ArrowDownRight size={17} />
                </a>
                <a
                  href="./Vuthy-Sreang-CV.pdf"
                  className="github-link"
                  download
                >
                  Download CV <Download size={15} />
                </a>
              </div>
            </div>
            <Flux />
            <a className="scroll-cue" href="#experience">
              <ArrowDown size={12} />
              Scroll to explore
            </a>
          </div>
        </section>
        <Experience />
        <section id="work" className="wrap work">
          <div className="section-kicker">
            <span />
            Personal projects
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
              <h2>
                About me<span>.</span>
              </h2>
              <div className="location">
                <MapPin size={15} /> Phnom Penh, Cambodia <i /> UTC+7
              </div>
            </div>
            <div className="bio">
              <div className="profile-intro">
                <img
                  src="./art/vuthy-sreang.webp"
                  width="96"
                  height="96"
                  alt="Vuthy Sreang"
                  loading="lazy"
                />
                <p>
                  Experienced Full-Stack web developer with a passion for all
                  aspects of the software development life cycle. Proven team
                  collaborator and a self-managing individual for independent
                  projects.
                </p>
              </div>
              <ul className="about-notes">
                <li>
                  I’m currently working on{" "}
                  <strong>full-stack web applications</strong>.
                </li>
                <li>
                  I’m currently learning <strong>🤫 ...</strong>
                </li>
                <li>
                  Ask me about{" "}
                  <strong>
                    Front-End, Back-End, APIs, Databases &amp; DevOps
                  </strong>
                  .
                </li>
                <li>
                  Fun fact: <strong>I think I’m funny 😎</strong>
                </li>
              </ul>
              <p className="profile-languages">
                <Languages size={17} aria-hidden="true" />I speak Khmer as my
                native language and English fluently.
              </p>
            </div>
          </div>
        </section>
        <Education />
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
        <section
          id="contact"
          className="contact"
          aria-labelledby="contact-title"
        >
          <div className="wrap contact-inner">
            <div className="contact-copy">
              <div className="section-kicker">
                <span />
                Contact
              </div>
              <h2 id="contact-title">
                Get in touch<span>.</span>
              </h2>
              <p>
                Have a web or mobile project in mind? Tell me what you’re
                building and where you could use a hand.
              </p>
              <div className="location">
                <MapPin size={15} aria-hidden="true" /> Phnom Penh, Cambodia{" "}
                <i /> UTC+7
              </div>
            </div>
            <address className="contact-channels">
              <a href={"mailto:" + email}>
                <Mail className="channel-icon" size={22} aria-hidden="true" />
                <span>
                  <small>Email me</small>
                  <strong>{email}</strong>
                </span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
              <a href={linkedin} target="_blank" rel="noreferrer">
                <MessageSquare
                  className="channel-icon"
                  size={22}
                  aria-hidden="true"
                />
                <span>
                  <small>Connect on LinkedIn</small>
                  <strong>Vuthy Sreang</strong>
                </span>
                <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </address>
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
          <a href={linkedin} target="_blank" rel="noreferrer">
            LinkedIn <ArrowUpRight size={12} />
          </a>
        </div>
      </footer>
    </div>
  );
}
