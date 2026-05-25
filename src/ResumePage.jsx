import { useState, useEffect, useRef } from "react";
import { canPreviewInline, getMediaType, mediaLibrary } from "./utils/media";

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

function DocumentCard({ name, type, size, downloadPath, previewPath, onPreview }) {
  const getIcon = (type) => {
    const icons = { pdf: "📄", docx: "📋", doc: "📋", xlsx: "📊", xls: "📊" };
    return icons[type.toLowerCase()] || "📎";
  };

  return (
    <AnimatedSection>
      <div style={{ background: "#FFFDF9", border: "1px solid #E8DDD4", borderRadius: "4px", padding: "1.5rem", transition: "all 0.3s", cursor: "pointer" }} 
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(139,69,19,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem" }}>
          <div style={{ fontSize: "2.5rem", flexShrink: 0 }}>{getIcon(type)}</div>
          <div style={{ flex: 1 }}>
            <h4 className="display" style={{ fontSize: "1rem", fontWeight: 500, color: "#2C1A0E", marginBottom: "4px" }}>{name}</h4>
            <p className="sans" style={{ fontSize: "12px", color: "#8B6A4F", marginBottom: "12px" }}>{type.toUpperCase()} · {size}</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {downloadPath && (
                <a href={downloadPath} download style={{ display: "inline-block", background: "#8B4513", color: "#FAF6F1", padding: "6px 14px", borderRadius: "2px", textDecoration: "none", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={(e) => e.currentTarget.style.background = "#6B3410"}
                  onMouseLeave={(e) => e.currentTarget.style.background = "#8B4513"}>
                  ⬇ Download
                </a>
              )}
              {previewPath && (
                <button type="button" style={{ display: "inline-block", border: "1px solid #8B4513", color: "#8B4513", padding: "6px 14px", borderRadius: "2px", textDecoration: "none", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", transition: "all 0.2s", background: "transparent" }}
                  onClick={() => onPreview?.({ name, path: previewPath, type })}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "#8B4513"; e.currentTarget.style.color = "#FAF6F1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#8B4513"; }}>
                  👁 Preview
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}

function ImageGallery({ images, onPreview }) {
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
        {images.map((img, i) => (
          <AnimatedSection key={i}>
            <div style={{ cursor: "pointer", overflow: "hidden", borderRadius: "4px", aspectRatio: "1", position: "relative" }}
              onClick={() => onPreview?.({ name: img.name, path: img.path, type: "image" })}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}>
              <img src={img.path} alt={img.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)", display: "flex", alignItems: "center", justifyContent: "center", opacity: 1, transition: "opacity 0.3s", cursor: "pointer" }}>
                <span style={{ color: "#FAF6F1", fontSize: "2rem" }}>🔍</span>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}

function VideoPlayer({ src, title, onPreview }) {
  return (
    <AnimatedSection>
      <div style={{ background: "#FFFDF9", border: "1px solid #E8DDD4", borderRadius: "4px", overflow: "hidden" }}>
        <div style={{ background: "#2C1A0E", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <video src={src} controls autoPlay style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        <div style={{ padding: "1.5rem" }}>
          <h4 className="display" style={{ fontSize: "1rem", fontWeight: 500, color: "#2C1A0E" }}>{title}</h4>
          <button
            type="button"
            className="sans"
            onClick={() => onPreview?.({ name: title, path: src, type: "video" })}
            style={{ marginTop: "12px", border: "1px solid #8B4513", color: "#8B4513", background: "transparent", padding: "8px 14px", fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", borderRadius: "2px", cursor: "pointer" }}>
            👁 Preview
          </button>
        </div>
      </div>
    </AnimatedSection>
  );
}

function MediaPreviewModal({ item, onClose }) {
  useEffect(() => {
    if (!item) {
      return undefined;
    }

    const onEsc = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [item, onClose]);

  if (!item) {
    return null;
  }

  return (
    <div
      onClick={onClose}
      style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "2rem" }}>
      <button
        type="button"
        onClick={onClose}
        style={{ position: "absolute", top: "2rem", right: "2rem", background: "#8B4513", border: "none", color: "#FAF6F1", fontSize: "1.5rem", cursor: "pointer", width: "44px", height: "44px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        ✕
      </button>

      <div onClick={(event) => event.stopPropagation()} style={{ width: "min(1100px, 94vw)", maxHeight: "90vh", background: "#1a0f08", borderRadius: "6px", overflow: "hidden", border: "1px solid #6B3410" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.75rem 1rem", background: "#2C1A0E", color: "#FAF6F1" }}>
          <span className="sans" style={{ fontSize: "12px", letterSpacing: "0.06em", textTransform: "uppercase" }}>{item.name}</span>
          <a href={item.path} target="_blank" rel="noopener noreferrer" className="sans" style={{ fontSize: "11px", color: "#FAF6F1", textDecoration: "underline" }}>
            Open in New Tab
          </a>
        </div>

        {item.mediaType === "image" && (
          <img src={item.path} alt={item.name} style={{ width: "100%", maxHeight: "calc(90vh - 60px)", objectFit: "contain", background: "#000" }} />
        )}

        {item.mediaType === "video" && (
          <video src={item.path} controls autoPlay style={{ width: "100%", maxHeight: "calc(90vh - 60px)", objectFit: "contain", background: "#000" }} />
        )}

        {item.mediaType === "pdf" && (
          <iframe src={item.path} title={item.name} style={{ width: "100%", height: "calc(90vh - 60px)", border: "none", background: "#fff" }} />
        )}
      </div>
    </div>
  );
}

function TabNavigation({ tabs, activeTab, setActiveTab }) {
  return (
    <div style={{ display: "flex", gap: "1rem", borderBottom: "1px solid #D4C4B8", marginBottom: "3rem", overflowX: "auto", paddingBottom: "0" }}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className="sans"
          style={{
            background: "none",
            border: "none",
            padding: "1rem 1.5rem",
            cursor: "pointer",
            fontSize: "14px",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: activeTab === tab.id ? "#8B4513" : "#8B6A4F",
            borderBottom: activeTab === tab.id ? "2px solid #8B4513" : "none",
            transition: "all 0.2s",
            fontWeight: activeTab === tab.id ? 500 : 400,
            marginBottom: "-1px"
          }}>
          {tab.icon} {tab.label}
        </button>
      ))}
    </div>
  );
}

function SectionHeader({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: "3rem" }}>
      <span className="sans" style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B6A4F", display: "block", marginBottom: "12px" }}>{label}</span>
      <h2 className="display" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 400, marginBottom: "1rem", color: "#2C1A0E" }}>{title}</h2>
      <div style={{ width: "48px", height: "1px", background: "#C2956C" }} />
      {subtitle && <p className="sans" style={{ fontSize: "15px", lineHeight: 1.8, color: "#5C3D2E", marginTop: "1.5rem", maxWidth: "600px", fontWeight: 300 }}>{subtitle}</p>}
    </div>
  );
}

export default function ResumePage({ onBackClick }) {
  const [activeTab, setActiveTab] = useState("resume");
  const [previewItem, setPreviewItem] = useState(null);

  const resumeDocuments = mediaLibrary.resumeDocuments;
  const certificates = mediaLibrary.certificates;
  const documents = mediaLibrary.documents;
  const images = mediaLibrary.images;
  const videos = mediaLibrary.videos;

  const handlePreview = ({ name, path, type }) => {
    const mediaType = getMediaType(path, type);

    if (!canPreviewInline(mediaType)) {
      window.open(path, "_blank", "noopener,noreferrer");
      return;
    }

    setPreviewItem({ name, path, mediaType });
  };

  const tabs = [
    { id: "resume", label: "Resume", icon: "📄" },
    { id: "certificates", label: "Certificates", icon: "🎓" },
    { id: "documents", label: "Documents", icon: "📋" },
    { id: "images", label: "Images", icon: "🖼️" },
    { id: "videos", label: "Videos", icon: "🎬" },
    { id: "testimonials", label: "Testimonials", icon: "⭐" },
    { id: "achievements", label: "Achievements", icon: "🏆" },
  ];

  const testimonialsList = [
    {
      name: "Dr. Bishop Justus Ochuro",
      title: "Director, Bungoma Bible School",
      initials: "JO",
      quote: "Eunice has served with exceptional dedication as our Praise and Worship Leader and in various administrative roles. Her spiritual commitment, competence, and leadership have been a cornerstone of this institution.",
    },
    {
      name: "Dr. Susan Munayi",
      title: "Teacher, Bungoma High School",
      initials: "SM",
      quote: "Eunice is a woman of remarkable academic discipline and spiritual depth. Her pursuit of excellence from certificate level through to a Masters degree reflects her unwavering commitment to growth.",
    },
  ];

  const achievements = [
    { year: "2018", achievement: "Completed Master's Degree in Biblical Studies with GPA 3.66 — the pinnacle of academic achievement." },
    { year: "2015", achievement: "Earned Bachelor of Arts in Biblical Studies, demonstrating sustained academic excellence." },
    { year: "2010", achievement: "Appointed Praise & Worship Leader at Bungoma Bible School — a position held for 15+ years." },
    { year: "2008", achievement: "Completed formal training in worship theology, team dynamics, and practical worship leadership." },
    { year: "2026", achievement: "Pursuing KNQF Level 6 RPL in Christian Ministry & Chaplaincy — formalising a lifetime of service." },
  ];

  return (
    <div style={{ fontFamily: "'Georgia', 'Times New Roman', serif", background: "#FAF6F1", color: "#3d2b1f", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,400;1,500&family=Jost:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .display { font-family: 'Cormorant Garamond', Georgia, serif; }
        .sans { font-family: 'Jost', sans-serif; }
        .anim-section { opacity: 0; transform: translateY(32px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .anim-section.visible { opacity: 1; transform: translateY(0); }
        @media (max-width: 768px) {
          .cols-2 { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* HEADER WITH BACK BUTTON */}
      <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(250,246,241,0.95)", backdropFilter: "blur(8px)", borderBottom: "1px solid #E8DDD4" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 2rem", height: "64px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <button onClick={onBackClick} className="sans" style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", letterSpacing: "0.1em", textTransform: "uppercase", color: "#8B4513", display: "flex", alignItems: "center", gap: "8px", transition: "color 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.color = "#6B3410"}
            onMouseLeave={(e) => e.currentTarget.style.color = "#8B4513"}>
            ← Back to Portfolio
          </button>
          <span className="display" style={{ fontSize: "18px", fontWeight: 500, letterSpacing: "0.02em", color: "#3d2b1f" }}>Resume & Portfolio</span>
          <div style={{ width: "120px" }} />
        </div>
      </header>

      {/* CONTENT */}
      <div style={{ paddingTop: "80px", paddingBottom: "4rem" }}>
        <section style={{ padding: "5rem 2rem", background: "linear-gradient(160deg, #FAF6F1 60%, #F0E6D8 100%)" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <AnimatedSection>
              <span className="sans" style={{ fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#8B6A4F", display: "block", marginBottom: "12px" }}>Portfolio of Evidence</span>
              <h1 className="display" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 400, lineHeight: 1.1, color: "#2C1A0E", marginBottom: "1.5rem" }}>
                Resume & Supporting Materials
              </h1>
              <div style={{ width: "48px", height: "1px", background: "#C2956C", marginBottom: "2rem" }} />
              <p className="sans" style={{ fontSize: "15px", lineHeight: 1.8, color: "#5C3D2E", maxWidth: "700px", fontWeight: 300 }}>
                A comprehensive collection of certifications, qualifications, achievements, and media showcasing 15+ years of dedicated ministry service, academic excellence, and professional contributions.
              </p>
            </AnimatedSection>
          </div>
        </section>

        {/* TAB NAVIGATION */}
        <section style={{ padding: "3rem 2rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
            <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          </div>
        </section>

        {/* TAB CONTENT */}
        <section style={{ padding: "0 2rem 5rem" }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto" }}>

            {/* RESUME */}
            {activeTab === "resume" && (
              <AnimatedSection>
                <SectionHeader label="Main Document" title="Resume / CV" subtitle="Professional resume and curriculum vitae for ministry and professional opportunities." />
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }}>
                  {resumeDocuments.map((doc, i) => (
                    <DocumentCard key={i} {...doc} onPreview={handlePreview} />
                  ))}
                </div>
              </AnimatedSection>
            )}

            {/* CERTIFICATES */}
            {activeTab === "certificates" && (
              <AnimatedSection>
                <SectionHeader label="Academic Credentials" title="Certificates & Degrees" subtitle="Official certificates and degrees from recognized institutions, ranging from certificate to master's level." />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
                  {certificates.map((cert, i) => (
                    <DocumentCard key={i} {...cert} onPreview={handlePreview} />
                  ))}
                </div>
              </AnimatedSection>
            )}

            {/* DOCUMENTS */}
            {activeTab === "documents" && (
              <AnimatedSection>
                <SectionHeader label="Supporting Files" title="Documents & References" subtitle="Additional documents including statements of purpose, detailed CVs, portfolio collections, and professional references." />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "2rem" }}>
                  {documents.map((doc, i) => (
                    <DocumentCard key={i} {...doc} onPreview={handlePreview} />
                  ))}
                </div>
              </AnimatedSection>
            )}

            {/* IMAGES */}
            {activeTab === "images" && (
              <AnimatedSection>
                <SectionHeader label="Visual Gallery" title="Images & Photos" subtitle="Professional photos and images from ministry, academic, and professional contexts." />
                {images.length > 0 ? (
                  <ImageGallery images={images} onPreview={handlePreview} />
                ) : (
                  <div style={{ padding: "3rem 2rem", textAlign: "center", background: "#FFFDF9", borderRadius: "4px", border: "1px solid #E8DDD4" }}>
                    <p className="sans" style={{ fontSize: "14px", color: "#8B6A4F" }}>No images available yet. Add images to /public/media/images/ folder.</p>
                  </div>
                )}
              </AnimatedSection>
            )}

            {/* VIDEOS */}
            {activeTab === "videos" && (
              <AnimatedSection>
                <SectionHeader label="Multimedia" title="Videos" subtitle="Worship recordings, ministry highlights, and video testimonials." />
                {videos.length > 0 ? (
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "2rem" }}>
                    {videos.map((video, i) => (
                      <VideoPlayer key={i} src={video.path} title={video.name} onPreview={handlePreview} />
                    ))}
                  </div>
                ) : (
                  <div style={{ padding: "3rem 2rem", textAlign: "center", background: "#FFFDF9", borderRadius: "4px", border: "1px solid #E8DDD4" }}>
                    <p className="sans" style={{ fontSize: "14px", color: "#8B6A4F" }}>No videos available yet. Add videos to /public/media/videos/ folder.</p>
                  </div>
                )}
              </AnimatedSection>
            )}

            {/* TESTIMONIALS */}
            {activeTab === "testimonials" && (
              <AnimatedSection>
                <SectionHeader label="References" title="Testimonials" subtitle="Professional and personal testimonials from colleagues, supervisors, and ministry partners." />
                <div className="cols-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
                  {testimonialsList.map((t, i) => (
                    <AnimatedSection key={i}>
                      <div className="card" style={{ background: "#FFFDF9", border: "1px solid #E8DDD4", borderRadius: "4px", padding: "2rem", transition: "all 0.2s", position: "relative" }}>
                        <div className="display" style={{ fontSize: "3rem", color: "#C2956C", lineHeight: 0.8, marginBottom: "1rem", opacity: 0.4 }}>"</div>
                        <p className="sans" style={{ fontSize: "14px", lineHeight: 1.8, color: "#5C3D2E", fontWeight: 300, marginBottom: "1.5rem", fontStyle: "italic" }}>{t.quote}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", borderTop: "1px solid #E8DDD4", paddingTop: "1rem" }}>
                          <div style={{ width: "44px", height: "44px", borderRadius: "50%", background: "#8B4513", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                            <span className="sans" style={{ fontSize: "14px", fontWeight: 500, color: "#FAF6F1" }}>{t.initials}</span>
                          </div>
                          <div>
                            <p className="display" style={{ fontSize: "1rem", fontWeight: 500, color: "#2C1A0E" }}>{t.name}</p>
                            <p className="sans" style={{ fontSize: "12px", color: "#8B6A4F" }}>{t.title}</p>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </AnimatedSection>
            )}

            {/* ACHIEVEMENTS */}
            {activeTab === "achievements" && (
              <AnimatedSection>
                <SectionHeader label="Milestones" title="Key Achievements" subtitle="Notable accomplishments and milestones throughout an exemplary career in ministry and academia." />
                <div style={{ position: "relative", paddingLeft: "2rem" }}>
                  <div style={{ position: "absolute", left: "5px", top: 0, bottom: 0, width: "1px", background: "#D4C4B8" }} />
                  {achievements.map((a, i) => (
                    <AnimatedSection key={i}>
                      <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem", position: "relative" }}>
                        <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#8B4513", flexShrink: 0, marginTop: "5px", position: "absolute", left: "-2rem", top: "6px" }} />
                        <div style={{ background: "#FFFDF9", border: "1px solid #E8DDD4", borderRadius: "4px", padding: "2rem", flex: 1 }}>
                          <span className="sans" style={{ fontSize: "12px", color: "#8B6A4F", letterSpacing: "0.1em", textTransform: "uppercase", display: "block", marginBottom: "8px" }}>{a.year}</span>
                          <p className="sans" style={{ fontSize: "14px", lineHeight: 1.7, color: "#5C3D2E", fontWeight: 300 }}>{a.achievement}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </AnimatedSection>
            )}

          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer style={{ background: "#1a0f08", padding: "2rem", textAlign: "center" }}>
        <p className="sans" style={{ fontSize: "12px", color: "#5C3D2E", letterSpacing: "0.08em" }}>
          © 2026 Eunice Ngosia Mukhebi · Christian Ministry & Chaplaincy · KNQF Level 6 RPL Candidate
        </p>
      </footer>

      <MediaPreviewModal item={previewItem} onClose={() => setPreviewItem(null)} />
    </div>
  );
}
