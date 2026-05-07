import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["About", "Ministry", "Qualifications", "Skills", "Journey", "Testimonials", "Contact"];

const QUALIFICATIONS = [
  { year: "2016–2018", institution: "Northwestern Theological Seminary, Florida USA", award: "Masters Degree in Biblical Studies", gpa: "GPA 3.66", color: "#4A3728" },
  { year: "2013–2015", institution: "Biltmore University / Northwestern Theological Seminary", award: "Bachelor of Arts in Biblical Studies", gpa: "GPA 2.75 · 120 Credits", color: "#5C4033" },
  { year: "2009–2011", institution: "Bungoma Bible School / Biltmore Bible School of Theology USA", award: "Advanced Diploma in Biblical Studies", gpa: "Avg Grade A · 136 Credit Hours", color: "#6D4C41" },
  { year: "2008", institution: "Bungoma Bible School", award: "Certificate – School of Worship", gpa: "", color: "#795548" },
  { year: "2004–2005", institution: "Bungoma Bible School", award: "Certificate in Biblical Studies", gpa: "GPA 92%", color: "#8D6E63" },
  { year: "1998–1999", institution: "Wote Training Institute", award: "Business Education (KNEC)", gpa: "", color: "#A1887F" },
  { year: "1995", institution: "Kegoye Secondary School", award: "KCSE Certificate", gpa: "", color: "#BCAAA4" },
];

const MINISTRY_ROLES = [
  { period: "2010 – Present", role: "Praise & Worship Leader", org: "Bungoma Bible School", desc: "Leading all congregational worship, preparing and training songs, coordinating praise and worship teams, and equipping other worship leaders for effective ministry.", icon: "🎵" },
  { period: "2025 – Present", role: "Registrar / Office Manager", org: "Bungoma Bible School", desc: "Student records management, office administration, and coordination of school functions.", icon: "📋" },
  { period: "2011 – 2023", role: "Registrar / Office Manager", org: "Bungoma Bible School", desc: "Records management, administrative support, and coordination of school functions.", icon: "🗂️" },
  { period: "2008 – 2011", role: "Assistant Office Manager", org: "Bungoma Bible School", desc: "Office operations, document management, and communication.", icon: "📁" },
  { period: "2005 – 2011", role: "Librarian", org: "Bungoma Bible School", desc: "Library management, resource cataloguing, and student assistance.", icon: "📚" },
];

const SKILLS = [
  { label: "Worship Leading & Team Coordination", level: 98 },
  { label: "Bible Teaching & Sermon Preparation", level: 95 },
  { label: "Pastoral Care & Counselling", level: 88 },
  { label: "Office Administration & Records", level: 92 },
  { label: "Training & Mentorship", level: 90 },
  { label: "Communication (English & Swahili)", level: 97 },
];

const TESTIMONIALS = [
  {
    name: "Dr. Bishop Justus Ochuro",
    title: "Director, Bungoma Bible School",
    initials: "JO",
    contact: "0710 595 790",
    quote: "Eunice has served with exceptional dedication as our Praise and Worship Leader and in various administrative roles. Her spiritual commitment, competence, and leadership have been a cornerstone of this institution.",
  },
  {
    name: "Dr. Susan Munayi",
    title: "Teacher, Bungoma High School",
    initials: "SM",
    contact: "0714 476 079",
    quote: "Eunice is a woman of remarkable academic discipline and spiritual depth. Her pursuit of excellence from certificate level through to a Masters degree reflects her unwavering commitment to growth.",
  },
];

const JOURNEY_POINTS = [
  { year: "1995", event: "Completed KCSE at Kegoye Secondary School — the beginning of a lifelong pursuit of knowledge." },
  { year: "2001", event: "Attended the East Africa Ministers' Conference and the Word Explosion Pastors & Leaders Conference, stepping into ministerial networks." },
  { year: "2004", event: "Enrolled at Bungoma Bible School for Certificate in Biblical Studies — achieving 92% GPA." },
  { year: "2008", event: "Completed the School of Worship — earning formal training in worship theology, team dynamics, and practical leading." },
  { year: "2010", event: "Appointed Praise & Worship Leader at Bungoma Bible School — a role she holds to this day, 15+ years strong." },
  { year: "2011", event: "Graduated with an Advanced Diploma in Biblical Studies (Average Grade A, 136 credit hours). Also appointed Registrar." },
  { year: "2015", event: "Earned a Bachelor of Arts in Biblical Studies from Biltmore University / Northwestern Theological Seminary." },
  { year: "2018", event: "Completed a Master's Degree in Biblical Studies (GPA 3.66) — the pinnacle of her academic journey." },
  { year: "2026", event: "Pursuing KNQF Level 6 RPL in Christian Ministry & Chaplaincy — formalising a lifetime of service." },
];

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return inView;
}

function AnimatedSection({ children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} className={`anim-section ${inView ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function SkillBar({ label, level, delay }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  return (
    <div ref={ref} style={{ marginBottom: "1.4rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "14px", color: "#3d2b1f", fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: "13px", color: "#8B6A4F" }}>{level}%</span>
      </div>
      <div style={{ background: "#EDE0D4", borderRadius: "100px", height: "6px", overflow: "hidden" }}>
        <div style={{
          height: "100%",
          borderRadius: "100px",
          background: "linear-gradient(90deg, #8B4513, #C2956C)",
          width: inView ? `${level}%` : "0%",
          transition: `width 1.2s cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
        }} />
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("About");
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#FAF6F1", color: "#3d2b1f", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #FAF6F1; }
        .display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .sans { font-family: 'Jost', sans-serif; }
        .anim-section { opacity: 0; transform: translateY(32px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .anim-section.visible { opacity: 1; transform: translateY(0); }
        nav a { text-decoration: none; color: inherit; cursor: pointer; }
        .nav-link { font-family: 'Jost', sans-serif; font-size: 13px; letter-spacing: 0.1em; text-transform: uppercase; color: #5C3D2E; padding: 6px 0; transition: color 0.2s; cursor: pointer; border: none; background: none; }
        .nav-link:hover { color: #8B4513; }
        .btn-primary { display: inline-block; background: #8B4513; color: #FAF6F1; padding: 12px 32px; border-radius: 2px; font-family: 'Jost', sans-serif; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; border: none; cursor: pointer; transition: background 0.2s; }
        .btn-primary:hover { background: #6B3410; }
        .btn-outline { display: inline-block; border: 1px solid #8B4513; color: #8B4513; padding: 11px 28px; border-radius: 2px; font-family: 'Jost', sans-serif; font-size: 13px; letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; background: none; cursor: pointer; transition: all 0.2s; }
        .btn-outline:hover { background: #8B4513; color: #FAF6F1; }
        .section-label { font-family: 'Jost', sans-serif; font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase; color: #8B6A4F; margin-bottom: 12px; display: block; }
        .divider { width: 48px; height: 1px; background: #C2956C; margin: 0 auto 2.5rem; }
        .divider-left { width: 48px; height: 1px; background: #C2956C; margin: 0 0 2.5rem; }
        .card { background: #FFFDF9; border: 1px solid #E8DDD4; border-radius: 4px; padding: 2rem; transition: box-shadow 0.2s, transform 0.2s; }
        .card:hover { box-shadow: 0 8px 32px rgba(139,69,19,0.08); transform: translateY(-2px); }
        .timeline-dot { width: 12px; height: 12px; border-radius: 50%; background: #8B4513; flex-shrink: 0; margin-top: 5px; }
        .qual-bar { width: 3px; border-radius: 2px; align-self: stretch; flex-shrink: 0; }
        input, textarea { font-family: 'Jost', sans-serif; font-size: 14px; padding: 12px 16px; border: 1px solid #D4C4B8; border-radius: 2px; background: #FFFDF9; color: #3d2b1f; width: 100%; outline: none; transition: border-color 0.2s; }
        input:focus, textarea:focus { border-color: #8B4513; }
        @media (max-width: 768px) {
          .hero-content { flex-direction: column !important; text-align: center; }
          .hero-text { max-width: 100% !important; }
          .cols-2 { grid-template-columns: 1fr !important; }
          .cols-3 { grid-template-columns: 1fr !important; }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .mobile-menu { display: ${menuOpen ? "flex" : "none"} !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* NAV */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(250,246,241,0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid #E8DDD4" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span className="display" style={{ fontSize: "18px", fontWeight: 500, letterSpacing: "0.02em", color: "#3d2b1f" }}>Eunice Ngosia Mukhebi</span>
          </div>
          <nav className="desktop-nav" style={{ display: "flex", gap: "2rem" }}>
            {NAV_LINKS.map(l => (
              <button key={l} className="nav-link" onClick={() => scrollTo(l)}>{l}</button>
            ))}
          </nav>
          <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: "5px" }}>
            {[0,1,2].map(i => <span key={i} style={{ display: "block", width: "22px", height: "1.5px", background: "#3d2b1f" }} />)}
          </button>
        </div>
        {/* mobile menu */}
        <div className="mobile-menu" style={{ flexDirection: "column", padding: "1rem 2rem 1.5rem", borderTop: "1px solid #E8DDD4", gap: "1rem" }}>
          {NAV_LINKS.map(l => (
            <button key={l} className="nav-link" onClick={() => scrollTo(l)}>{l}</button>
          ))}
        </div>
      </header>

      {/* HERO */}
      <section id="about" style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: "64px", background: "linear-gradient(160deg, #FAF6F1 60%, #F0E6D8 100%)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "5rem 2rem" }}>
          <div className="hero-content" style={{ display: "flex", alignItems: "center", gap: "5rem" }}>
            <div className="hero-text" style={{ maxWidth: "600px" }}>
              <span className="section-label">Portfolio of Evidence · RPL · KNQF Level 6</span>
              <h1 className="display" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 400, lineHeight: 1.1, color: "#2C1A0E", marginBottom: "1.5rem" }}>
                Eunice<br />
                <em style={{ fontStyle: "italic", color: "#8B4513" }}>Ngosia</em><br />
                Mukhebi
              </h1>
              <div className="divider-left" />
              <p className="sans" style={{ fontSize: "16px", lineHeight: 1.8, color: "#5C3D2E", marginBottom: "2rem", fontWeight: 300 }}>
                Praise & Worship Leader · Biblical Studies Scholar · Ministry Administrator<br />
                <span style={{ color: "#8B6A4F" }}>15+ years of dedicated service at Bungoma Bible School</span>
              </p>
              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                <button className="btn-primary" onClick={() => scrollTo("Ministry")}>View Ministry</button>
                <button className="btn-outline" onClick={() => scrollTo("Contact")}>Get In Touch</button>
              </div>
            </div>
            <div style={{ flex: "0 0 auto" }}>
              <div style={{ width: "240px", height: "300px", background: "linear-gradient(145deg, #D4B896, #C2956C)", borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0, background: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
                <div style={{ textAlign: "center", position: "relative", zIndex: 1 }}>
                  <div className="display" style={{ fontSize: "72px", lineHeight: 1, color: "rgba(255,255,255,0.9)" }}>E</div>
                  <div className="sans" style={{ fontSize: "12px", letterSpacing: "0.15em", color: "rgba(255,255,255,0.7)", textTransform: "uppercase", marginTop: "8px" }}>Photo</div>
                </div>
              </div>
              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <p className="sans" style={{ fontSize: "11px", color: "#8B6A4F", letterSpacing: "0.08em" }}>BUNGOMA, KENYA</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ marginTop: "5rem", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1.5rem" }}>
            {[
              { num: "15+", label: "Years in Ministry" },
              { num: "MSc", label: "Biblical Studies" },
              { num: "136", label: "Diploma Credit Hours" },
              { num: "92%", label: "Certificate GPA" },
            ].map(s => (
              <div key={s.label} style={{ textAlign: "center", padding: "1.5rem", borderLeft: "1px solid #D4C4B8" }}>
                <div className="display" style={{ fontSize: "2.5rem", fontWeight: 500, color: "#8B4513" }}>{s.num}</div>
                <div className="sans" style={{ fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B6A4F", marginTop: "4px" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MINISTRY */}
      <section id="ministry" style={{ padding: "7rem 2rem", background: "#FFFDF9" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <AnimatedSection>
            <span className="section-label" style={{ textAlign: "center", display: "block" }}>Ministry Experience</span>
            <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", textAlign: "center", fontWeight: 400, marginBottom: "1rem" }}>A Life of Faithful Service</h2>
            <div className="divider" />
          </AnimatedSection>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {MINISTRY_ROLES.map((r, i) => (
              <AnimatedSection key={i}>
                <div className="card" style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                  <div style={{ fontSize: "2rem", flexShrink: 0 }}>{r.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "8px" }}>
                      <h3 className="display" style={{ fontSize: "1.25rem", fontWeight: 500 }}>{r.role}</h3>
                      <span className="sans" style={{ fontSize: "12px", background: "#F0E6D8", color: "#6B3410", padding: "4px 12px", borderRadius: "2px", letterSpacing: "0.05em" }}>{r.period}</span>
                    </div>
                    <p className="sans" style={{ fontSize: "13px", color: "#8B6A4F", marginBottom: "8px", letterSpacing: "0.05em", textTransform: "uppercase" }}>{r.org}</p>
                    <p className="sans" style={{ fontSize: "14px", color: "#5C3D2E", lineHeight: 1.7, fontWeight: 300 }}>{r.desc}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* QUALIFICATIONS */}
      <section id="qualifications" style={{ padding: "7rem 2rem", background: "#FAF6F1" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <AnimatedSection>
            <span className="section-label" style={{ textAlign: "center", display: "block" }}>Academic Qualifications</span>
            <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", textAlign: "center", fontWeight: 400, marginBottom: "1rem" }}>A Scholar's Journey</h2>
            <div className="divider" />
          </AnimatedSection>

          <div style={{ position: "relative", paddingLeft: "2rem" }}>
            <div style={{ position: "absolute", left: "5px", top: 0, bottom: 0, width: "1px", background: "#D4C4B8" }} />
            {QUALIFICATIONS.map((q, i) => (
              <AnimatedSection key={i}>
                <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem", position: "relative" }}>
                  <div className="timeline-dot" style={{ position: "absolute", left: "-2rem", top: "6px" }} />
                  <div className="card" style={{ flex: 1, borderLeft: `3px solid ${q.color}` }}>
                    <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "8px", marginBottom: "6px" }}>
                      <span className="sans" style={{ fontSize: "12px", color: "#8B6A4F", letterSpacing: "0.1em", textTransform: "uppercase" }}>{q.year}</span>
                      {q.gpa && <span className="sans" style={{ fontSize: "12px", background: "#F0E6D8", color: "#6B3410", padding: "3px 10px", borderRadius: "2px" }}>{q.gpa}</span>}
                    </div>
                    <h3 className="display" style={{ fontSize: "1.15rem", fontWeight: 500, marginBottom: "4px" }}>{q.award}</h3>
                    <p className="sans" style={{ fontSize: "13px", color: "#8B6A4F", fontWeight: 300 }}>{q.institution}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "7rem 2rem", background: "#3d2b1f" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <AnimatedSection>
            <span className="section-label" style={{ textAlign: "center", display: "block", color: "#C2956C" }}>Skills & Competencies</span>
            <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", textAlign: "center", fontWeight: 400, marginBottom: "1rem", color: "#FAF6F1" }}>What She Brings</h2>
            <div className="divider" style={{ background: "#C2956C" }} />
          </AnimatedSection>

          <div className="cols-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "start" }}>
            <AnimatedSection>
              <div>
                {SKILLS.map((s, i) => (
                  <SkillBar key={s.label} label={s.label} level={s.level} delay={i * 100} />
                ))}
              </div>
            </AnimatedSection>
            <AnimatedSection>
              <div style={{ color: "#EDE0D4" }}>
                <h3 className="display" style={{ fontSize: "1.8rem", fontWeight: 400, color: "#FAF6F1", marginBottom: "1.5rem" }}>Competencies at a Glance</h3>
                <p className="sans" style={{ fontSize: "14px", lineHeight: 1.9, fontWeight: 300, marginBottom: "1.5rem", color: "#C2956C" }}>
                  Eunice's competencies span the full spectrum of Christian ministry — from leading thousands in worship to quietly maintaining institutional records with precision and care.
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["Worship Theology", "Hermeneutics", "Homiletics", "Song Writing", "Team Building", "Pastoral Care", "Records Management", "Computer Literacy", "English & Swahili", "Church Administration"].map(tag => (
                    <span key={tag} className="sans" style={{ fontSize: "12px", border: "1px solid #5C3D2E", color: "#C2956C", padding: "5px 14px", borderRadius: "2px", letterSpacing: "0.05em" }}>{tag}</span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* JOURNEY */}
      <section id="journey" style={{ padding: "7rem 2rem", background: "#FFFDF9" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <AnimatedSection>
            <span className="section-label" style={{ textAlign: "center", display: "block" }}>Reflective Journey</span>
            <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", textAlign: "center", fontWeight: 400, marginBottom: "1rem" }}>The Story Behind the Service</h2>
            <div className="divider" />
            <p className="sans" style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto 4rem", fontSize: "15px", lineHeight: 1.8, color: "#5C3D2E", fontWeight: 300 }}>
              "I have grown from being a solo worship participant to a confident worship leader and trainer. My continued academic development has strengthened my ability to ground worship in sound theology."
            </p>
          </AnimatedSection>

          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {JOURNEY_POINTS.map((j, i) => (
              <AnimatedSection key={i}>
                <div style={{ display: "flex", gap: "2rem", padding: "1.5rem 0", borderBottom: i < JOURNEY_POINTS.length - 1 ? "1px solid #E8DDD4" : "none" }}>
                  <div style={{ flexShrink: 0, width: "64px", textAlign: "right" }}>
                    <span className="display" style={{ fontSize: "1.1rem", fontWeight: 500, color: "#8B4513" }}>{j.year}</span>
                  </div>
                  <div style={{ width: "1px", background: "#D4C4B8", flexShrink: 0 }} />
                  <p className="sans" style={{ fontSize: "14px", lineHeight: 1.8, color: "#5C3D2E", fontWeight: 300 }}>{j.event}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="testimonials" style={{ padding: "7rem 2rem", background: "#F0E6D8" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <AnimatedSection>
            <span className="section-label" style={{ textAlign: "center", display: "block" }}>Testimonials & References</span>
            <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", textAlign: "center", fontWeight: 400, marginBottom: "1rem" }}>What Others Say</h2>
            <div className="divider" />
          </AnimatedSection>

          <div className="cols-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
            {TESTIMONIALS.map((t, i) => (
              <AnimatedSection key={i}>
                <div className="card" style={{ position: "relative" }}>
                  <div className="display" style={{ fontSize: "5rem", color: "#C2956C", lineHeight: 0.8, marginBottom: "1rem", opacity: 0.4 }}>"</div>
                  <p className="sans" style={{ fontSize: "14px", lineHeight: 1.9, color: "#5C3D2E", fontWeight: 300, marginBottom: "1.5rem", fontStyle: "italic" }}>{t.quote}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid #E8DDD4", paddingTop: "1rem" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#8B4513", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span className="sans" style={{ fontSize: "14px", fontWeight: 500, color: "#FAF6F1" }}>{t.initials}</span>
                    </div>
                    <div>
                      <p className="display" style={{ fontSize: "1rem", fontWeight: 500 }}>{t.name}</p>
                      <p className="sans" style={{ fontSize: "12px", color: "#8B6A4F" }}>{t.title}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "7rem 2rem", background: "#2C1A0E" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <AnimatedSection>
            <span className="section-label" style={{ color: "#C2956C" }}>Contact</span>
            <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "1rem", color: "#FAF6F1" }}>Get In Touch</h2>
            <div className="divider" style={{ background: "#8B4513" }} />
            <p className="sans" style={{ color: "#C2956C", marginBottom: "3rem", fontSize: "15px", fontWeight: 300 }}>Bungoma Bible School · Along Bungoma-Mumias Road · P.O. Box 1962-50200, Bungoma, Kenya</p>

            <div className="cols-3" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1.5rem", marginBottom: "3rem" }}>
              {[
                { icon: "📞", label: "Primary", value: "0711 296 177" },
                { icon: "📱", label: "Secondary", value: "0726 382 991" },
                { icon: "✉️", label: "Email", value: "eunicengosia6@gmail.com" },
              ].map(c => (
                <div key={c.label} style={{ padding: "1.5rem", border: "1px solid #3d2b1f", borderRadius: "4px", textAlign: "center" }}>
                  <div style={{ fontSize: "1.5rem", marginBottom: "8px" }}>{c.icon}</div>
                  <p className="sans" style={{ fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#8B6A4F", marginBottom: "4px" }}>{c.label}</p>
                  <p className="sans" style={{ fontSize: "13px", color: "#EDE0D4", fontWeight: 400 }}>{c.value}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#1a0f08", padding: "2rem", textAlign: "center" }}>
        <p className="sans" style={{ fontSize: "12px", color: "#5C3D2E", letterSpacing: "0.08em" }}>
          © 2026 Eunice Ngosia Mukhebi · Christian Ministry & Chaplaincy · KNQF Level 6 RPL Candidate
        </p>
      </footer>
    </div>
  );
}