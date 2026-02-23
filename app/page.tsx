"use client";

import { useEffect, useRef, useState } from 'react';
import {
  Blocks, Code, Layout, Smartphone,
  Server, Cpu, Globe, Lock,
  Database, TableProperties, Network,
  Braces, Binary, Activity, Github
} from 'lucide-react';
import finpilotImg from './images/finpilot.png';
import passfilImg from './images/Passfil.png';
import donutImg from './images/donut.png';

// Use intersection observer for section reveal
function useOnScreen(ref: React.RefObject<Element | null>) {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, [ref]);

  return isIntersecting;
}

function Section({ children, id, className = "" }: { children: React.ReactNode, id: string, className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const visible = useOnScreen(ref);

  return (
    <section ref={ref} id={id} className={`${visible ? 'visible' : ''} ${className}`}>
      {children}
    </section>
  );
}

function TypewriterHeading({ text, as: Component = 'h2', className = '' }: { text: string, as?: 'h1' | 'h2' | 'h3', className?: string }) {
  const ref = useRef<any>(null);
  const visible = useOnScreen(ref);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasTyped, setHasTyped] = useState(false);

  useEffect(() => {
    if (visible && !hasTyped) {
      setIsTyping(true);
      let i = 0;
      const timeout = setTimeout(() => {
        const interval = setInterval(() => {
          setDisplayedText(text.slice(0, i + 1));
          i++;
          if (i >= text.length) {
            clearInterval(interval);
            setIsTyping(false);
            setHasTyped(true);
          }
        }, 60); // Moderate typing speed
        return () => clearInterval(interval);
      }, 300); // 300ms delay before typing
      return () => clearTimeout(timeout);
    }
  }, [visible, hasTyped, text]);

  return (
    <Component ref={ref} className={`${className} typewriter-heading`}>
      <span style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>{text}</span>
      <span style={{ position: 'relative', display: 'inline-block' }} aria-hidden="true">
        <span style={{ visibility: 'hidden' }}>{text}</span>
        <span className="typewriter-content" style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap' }}>
          {displayedText}
          <span className={`typewriter-cursor ${hasTyped ? 'fade-out' : ''}`}>_</span>
        </span>
      </span>
    </Component>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Dynamic Theme Interpolation Logic
  // Emerald: #10b981 (rgb 16, 185, 129)
  // Aqua: #0ea5e9 (rgb 14, 165, 233)
  const calculateAccentColor = (progress: number) => {
    // We start transforming slightly after the top and finish slightly before the bottom
    // Constrain transformation factor between 0 and 1
    const factor = Math.min(Math.max((progress - 0.1) * 1.25, 0), 1);

    // Easing function for smoother color transition (ease-in-out roughly)
    const easedFactor = factor * factor * (3 - 2 * factor);

    const r = Math.round(16 + (14 - 16) * easedFactor);
    const g = Math.round(185 + (165 - 185) * easedFactor);
    const b = Math.round(129 + (233 - 129) * easedFactor);

    return `rgb(${r}, ${g}, ${b})`;
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      setScrolled(scrollTop > 50);

      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);

      // Update global CSS variable for theme transition
      document.documentElement.style.setProperty('--accent-primary', calculateAccentColor(progress));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* SCROLL-DRIVEN CIRCUIT BG */}
      <div
        className="circuit-bg"
        style={{ '--scroll-progress': scrollProgress } as React.CSSProperties}
        aria-hidden="true"
      >
        {/* Dynamic Grid Overlay */}
        <div className="struct-grid-dynamic"></div>

        {/* Left Circuit Path A */}
        <div className="c-line cl-1"></div><div className="c-node cn-l cn-1"></div>
        <div className="c-line cl-2"></div><div className="c-node cn-l cn-2"></div>
        <div className="c-line cl-3"></div><div className="c-node cn-l cn-3"></div>

        {/* Left Circuit Path B */}
        <div className="c-line cl-4"></div><div className="c-node cn-l cn-4"></div>
        <div className="c-line cl-5"></div><div className="c-node cn-l cn-5"></div>
        <div className="c-line cl-6"></div><div className="c-node cn-l cn-6"></div>

        {/* Right Circuit Path A */}
        <div className="c-line cr-1"></div><div className="c-node cn-r cn-7"></div>
        <div className="c-line cr-2"></div><div className="c-node cn-r cn-8"></div>
        <div className="c-line cr-3"></div><div className="c-node cn-r cn-9"></div>

        {/* Right Circuit Path B */}
        <div className="c-line cr-4"></div><div className="c-node cn-br cn-10"></div>
        <div className="c-line cr-5"></div><div className="c-node cn-br cn-11"></div>
        <div className="c-line cr-6"></div><div className="c-node cn-br cn-12"></div>
      </div>
      <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo"><span className="glow-text">AS</span></div>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="/certificates">Certificates</a>
            <a href="#profiles">Profiles</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section id="hero" className="hero visible">
          <div className="hero-content">
            <div className="hero-accent-line"></div>
            <div>
              <TypewriterHeading text="Anand Sharma" as="h1" className="hero-title" />
              <TypewriterHeading text="Full Stack Web Developer" as="h2" className="hero-subtitle glow-text" />
              <p className="hero-description">
                Building scalable, performant web applications with a strong foundation in Data Structures and Algorithms. Focused on clean architecture and problem-solving.
              </p>
              <a href="#projects" className="btn mt-4">View My Work</a>
            </div>
          </div>
          <div className="hero-glow"></div>
        </section>

        {/* ABOUT SECTION */}
        <Section id="about" className="about-section">
          <TypewriterHeading text="About Me" />
          <div className="glass-panel about-panel">
            <div className="about-content">
              <p>
                I am a Full Stack Developer who bridges the gap between robust engineering and seamless user experiences.
                My background in Data Structures & Algorithms allows me to write highly optimized and scalable code.
              </p>
              <br />
              <p>
                Whether it's designing clean RESTful APIs, optimizing database queries, or building responsive interfaces
                in React and Next.js, my goal is always to deliver modern, reliable, and high-performance applications.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <span className="stat-value glow-text">DSA</span>
                <span className="stat-label">Strong Foundation</span>
              </div>
              <div className="stat-item">
                <span className="stat-value glow-text">Scale</span>
                <span className="stat-label">Full Stack Arch</span>
              </div>
            </div>
          </div>
        </Section>

        {/* SKILLS SECTION */}
        <Section id="skills" className="skills-section">
          <TypewriterHeading text="Technical Arsenal" />
          <div className="skills-grid">
            <div className="glass-panel skill-card">
              <h3>Frontend</h3>
              <ul>
                <li><Blocks size={18} className="skill-icon" /> React & Next.js</li>
                <li><Code size={18} className="skill-icon" /> JavaScript (ES6+)</li>
                <li><Layout size={18} className="skill-icon" /> HTML5 & CSS3</li>
                <li><Smartphone size={18} className="skill-icon" /> Responsive Design</li>
              </ul>
            </div>
            <div className="glass-panel skill-card">
              <h3>Backend</h3>
              <ul>
                <li><Server size={18} className="skill-icon" /> Node.js</li>
                <li><Cpu size={18} className="skill-icon" /> Express.js</li>
                <li><Globe size={18} className="skill-icon" /> REST APIs</li>
                <li><Lock size={18} className="skill-icon" /> Authentication</li>
              </ul>
            </div>
            <div className="glass-panel skill-card">
              <h3>Database</h3>
              <ul>
                <li><Database size={18} className="skill-icon" /> MongoDB</li>
                <li><TableProperties size={18} className="skill-icon" /> PostgreSQL</li>
                <li><Database size={18} className="skill-icon" /> MySQL</li>
                <li><Network size={18} className="skill-icon" /> Prisma ORM</li>
              </ul>
            </div>
            <div className="glass-panel skill-card">
              <h3>Core & Tools</h3>
              <ul>
                <li><Braces size={18} className="skill-icon" /> Data Structures</li>
                <li><Binary size={18} className="skill-icon" /> Algorithms</li>
                <li><Activity size={18} className="skill-icon" /> Problem Solving</li>
                <li><Github size={18} className="skill-icon" /> Git & GitHub</li>
              </ul>
            </div>
          </div>
        </Section>

        {/* PROJECTS SECTION */}
        <Section id="projects" className="projects-section">
          <TypewriterHeading text="Featured Work" />
          <div className="projects-grid">
            {/* Project 1: Finpilot */}
            <div className="glass-panel project-card project-card-1">
              <div className="project-image-box">
                <img src={finpilotImg.src} alt="Finpilot Finance Manager" />
              </div>
              <div className="project-overlay">
                <div className="project-desc">
                  <p>A comprehensive digital finance manager providing a centralized dashboard to track spendings, income, taxes, and investments. Engineered with dynamic visual analytics and detailed reporting to help users make informed economic decisions.</p>
                  <div className="tech-tags">
                    <span>Next.js</span>
                    <span>TailwindCSS</span>
                    <span>Finance Toolkit</span>
                  </div>
                  <div className="project-links mt-4">
                    <a href="https://finpilot-eta.vercel.app/" target="_blank" rel="noreferrer" className="btn-small">Live Demo</a>
                    <a href="https://github.com/noob-anand/Finpilot" target="_blank" rel="noreferrer" className="text-link">GitHub <span>→</span></a>
                  </div>
                </div>
              </div>
              <div className="project-header">
                <h3>Finpilot</h3>
              </div>
            </div>

            {/* Project 2: Passfil */}
            <div className="glass-panel project-card project-card-2">
              <div className="project-image-box">
                <img src={passfilImg.src} alt="Passfil Password Manager" />
              </div>
              <div className="project-overlay">
                <div className="project-desc">
                  <p>A highly secure password manager engineered to safely store, organize, and manage your sensitive credentials. Features robust encryption protocols to keep your passwords protected while offering a seamless user experience for quick creation and retrieval.</p>
                  <div className="tech-tags">
                    <span>React</span>
                    <span>Security</span>
                    <span>Encryption</span>
                  </div>
                  <div className="project-links mt-4">
                    <a href="https://passfil.vercel.app/" target="_blank" rel="noreferrer" className="btn-small">Live Demo</a>
                    <a href="https://github.com/noob-anand/Passfil" target="_blank" rel="noreferrer" className="text-link">GitHub <span>→</span></a>
                  </div>
                </div>
              </div>
              <div className="project-header">
                <h3>Passfil</h3>
              </div>
            </div>

            {/* Project 3: Donut */}
            <div className="glass-panel project-card project-card-3">
              <div className="project-image-box">
                <img src={donutImg.src} alt="Donut Creator Platform" />
              </div>
              <div className="project-overlay">
                <div className="project-desc">
                  <p>A modern creator-supporter platform designed to bridge the gap between fans and their favorite personalities. It provides an engaging interface for users to connect and show their appreciation by securely donating 'donuts'.</p>
                  <div className="tech-tags">
                    <span>Next.js</span>
                    <span>Payment Gateway</span>
                    <span>Creators</span>
                  </div>
                  <div className="project-links mt-4">
                    <a href="https://github.com/noob-anand/donut" target="_blank" rel="noreferrer" className="btn-small">Source Code</a>
                    <a href="https://github.com/noob-anand/donut" target="_blank" rel="noreferrer" className="text-link">GitHub <span>→</span></a>
                  </div>
                </div>
              </div>
              <div className="project-header">
                <h3>Donut</h3>
              </div>
            </div>
          </div>
        </Section>

        {/* PROFILES SECTION */}
        <Section id="profiles" className="profiles-section">
          <TypewriterHeading text="Coding Profiles" />
          <div className="profiles-grid">

            <a href="https://codolio.com/profile/NOOB_ANAND" target="_blank" rel="noreferrer" className="glass-panel profile-card profile-codolio">
              <div className="profile-content">
                <div className="profile-icon">{"</>"}</div>
                <h3>Codolio</h3>
                <p>View my consolidated coding statistics and contest ratings.</p>
                <span className="text-link mt-4">Visit Profile <span>→</span></span>
              </div>
            </a>

            <a href="https://leetcode.com/u/NOOBANAND/?utm=codolio" target="_blank" rel="noreferrer" className="glass-panel profile-card profile-leetcode">
              <div className="profile-content">
                <div className="profile-icon">{"L"}</div>
                <h3>LeetCode</h3>
                <p>Hundreds of data structure and algorithm problems solved.</p>
                <span className="text-link mt-4">Visit Profile <span>→</span></span>
              </div>
            </a>

            <a href="https://www.codechef.com/users/noob_anand?utm=codolio" target="_blank" rel="noreferrer" className="glass-panel profile-card profile-codechef">
              <div className="profile-content">
                <div className="profile-icon">{"C"}</div>
                <h3>CodeChef</h3>
                <p>Active participant in competitive programming contests.</p>
                <span className="text-link mt-4">Visit Profile <span>→</span></span>
              </div>
            </a>

          </div>
        </Section>

        {/* CONTACT SECTION */}
        <Section id="contact" className="contact-section">
          <div className="glass-panel contact-panel">
            <TypewriterHeading text="Let's Build Something" />
            <p>Currently open for Internships and high-impact projects. Feel free to reach out if you're looking for a developer who understands both scale and experience.</p>

            <div className="contact-info" style={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p>
                Email: <a href="mailto:anandsharma@gmail.com" className="glow-text" style={{ fontWeight: 500 }}>anandsharma@gmail.com</a>
              </p>
              <p>
                Phone: <a href="tel:+919356157514" className="glow-text" style={{ fontWeight: 500 }}>+91 9356157514</a>
              </p>
            </div>

            <div className="contact-links">
              <a href="https://www.linkedin.com/in/anand-sharma-404675371/" target="_blank" rel="noreferrer" className="btn">LinkedIn</a>
              <a href="mailto:anandsharma@gmail.com" className="btn btn-secondary">Email Me</a>
              <a href="tel:+919356157514" className="btn btn-secondary">Call Me</a>
              <a href="https://github.com/noob-anand" target="_blank" rel="noreferrer" className="btn btn-secondary">GitHub</a>
            </div>
          </div>
        </Section>
      </main>

      <footer>
        <p>&copy; {new Date().getFullYear()} Anand Sharma. Engineered with precision.</p>
      </footer>
    </>
  );
}
