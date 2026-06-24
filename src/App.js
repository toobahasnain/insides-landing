import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import "./App.css";
import "./fonts.css";

const C = {
  midnight: "#2667BB", evergreen: "#257C42", blush: "#E4B7C8",
  violet: "#8E7BAD", citrus: "#CBC000", pale: "#FFFF9F", cream: "#FDF8F4",
};

const T = {
  de: {
    nav: { features: "Features", about: "Über uns", team: "Team", faq: "FAQ", contact: "Kontakt" },
    langBtn: "EN",
    hero: {
      badge: "Demnächst verfügbar",
      h1: "Watch. Learn. Enjoy", h2: "Real Intimacy",
      sub: "Streame realistische Storys über Liebe, Beziehungen und Sexualität. Lerne aus den Erfahrungen anderer und teile deine eigenen. Nutze unseren KI-Coach, um deine Beziehungen und Intimität besser zu verstehen.",
      emailLabel: "Sei unter den Ersten, wenn wir starten",
      emailPlaceholder: "deine@email.de", emailBtn: "Benachrichtigen",
      emailSuccess: "Du bist dabei! Wir melden uns bald. 🎉",
    },
    about: {
      label: "Über Insides", headline: "Wir schließen die Lücke zwischen Schule und Realität",
      text1: "Sexualaufklärung in Deutschland ist oft veraltet, unvollständig und weit entfernt von der Lebensrealität junger Menschen. TikTok und YouTube füllen diese Lücke — oft mit falschen Informationen.",
      text2: "Insides verbindet evidenzbasierte Gesundheitsbildung mit dem Edutainment-Format, das Gen Z wirklich nutzt. Unsere KI-gestützte Plattform bietet realistische Serien, eine anonyme Community und einen persönlichen KI-Coach.",
      text3: "Entwickelt von einem Team aus Gesundheit, Technologie und Bildung — in enger Zusammenarbeit mit Schulen in Bayern.",
      s1n: "4", s1l: "Gründerinnen", s2n: "3", s2l: "Kernfeatures", s3n: "WHO", s3l: "Standards", s4n: "DSGVO", s4l: "Konform",
    },
    features: {
      label: "Was wir bauen", headline: "Bildung trifft Unterhaltung Drei Wege, über Sexualität und Beziehung zu lernen.",
      f1t: "Edutainment-Serie", f1d: "Realistische, nachvollziehbare Geschichten über Beziehungen und Intimität — in Formaten, die Gen Z wirklich schaut. Keine trockene Theorie, sondern echtes Leben.",
      f2t: "Anonyme Community", f2d: "Teile und tausche Erfahrungen mit Gleichaltrigen — vollständig anonym und ohne Urteile. Ein sicherer Raum für echte Gespräche.",
      f3t: "KI-Coach", f3d: "Stell deine privatesten Fragen oder reflektiere persönliche Erlebnisse mit einem einfühlsamen KI-Coach. Rund um die Uhr verfügbar — evidenzbasiert und sicher.",
    },
    team: {
      label: "Das Team", headline: "Vier Gründerinnen. Eine Vision.",
      members: [
        { name: "Anne Miller-Hermann", role: "Impact, Finance & Projektmanagement", init: "AM" },
        { name: "Jil Clausen", role: "Produkt, Content & Community", init: "JC" },
        { name: "Ifrah Asif", role: "UI/UX Design & Produktinterface", init: "IA" },
        { name: "Syeda Tooba Hasnain", role: "Technologie, KI & Softwareentwicklung", init: "ST" },
      ],
    },
    faq: {
      label: "Häufige Fragen", headline: "FAQ",
      items: [
        { q: "Für wen ist Insides?", a: "Insides richtet sich an Gen Z, die nach ehrlicher, nachvollziehbarer Sexualaufklärung suchen — sowie an Schulen und Lehrkräfte, die ansprechende, evidenzbasierte Inhalte für ihren Unterricht wünschen." },
        { q: "Sind die Inhalte für Jugendliche geeignet?", a: "Absolut. Alle Inhalte sind evidenzbasiert, jugendschutzkonform und werden in Übereinstimmung mit den WHO-Standards für Sexualaufklärung entwickelt." },
        { q: "Wann startet Insides?", a: "Wir befinden uns derzeit in der Entwicklungsphase und arbeiten eng mit Partnerschulen in Bayern zusammen. Melde dich oben an, um als Erste informiert zu werden!" },
        { q: "Können Schulen Insides nutzen?", a: "Ja! Wir bieten spezielle Schullizenzmodelle mit lehrplankonformen Inhalten, einem Stundenplaner und Klassenzimmer-Tools. Kontaktiere uns für mehr Informationen." },
        { q: "Wie schützt Insides meine Daten?", a: "Datenschutz steht bei uns an erster Stelle. Wir sind DSGVO-konform, speichern alle Daten auf deutschen Servern und verarbeiten niemals sensible Gesundheitsdaten ohne ausdrückliche Zustimmung." },
      ],
    },
    contact: {
      label: "Kontakt", headline: "Lass uns reden",
      sub: "Ob Schule, Partner oder einfach neugierig — wir freuen uns von dir zu hören.",
      email: "E-Mail schreiben", linkedin: "LinkedIn besuchen",
    },
    footer: "Alle Rechte vorbehalten",
  },
  en: {
    nav: { features: "Features", about: "About", team: "Team", faq: "FAQ", contact: "Contact" },
    langBtn: "DE",
    hero: {
      badge: "Coming Soon",
      h1: "Sex ed that", h2: "actually speaks", h3: "your language.",
      sub: "Edutainment. AI Coaching. Anonymous Community. All in one place — for Gen Z and schools.",
      emailLabel: "Be the first to know when we launch",
      emailPlaceholder: "your@email.com", emailBtn: "Notify me",
      emailSuccess: "You're on the list! We'll be in touch soon. 🎉",
    },
    about: {
      label: "About Insides", headline: "We bridge the gap between school and real life",
      text1: "Sex education in Germany is often outdated, incomplete, and far from the lived reality of young people. TikTok and YouTube fill this gap — often with misinformation.",
      text2: "Insides combines evidence-based health education with the edutainment format Gen Z actually uses. Our AI-powered platform offers realistic series, an anonymous community, and a personal AI coach.",
      text3: "Built by a team from health, technology and education — in close collaboration with schools in Bavaria.",
      s1n: "4", s1l: "Founders", s2n: "3", s2l: "Core Features", s3n: "WHO", s3l: "Standards", s4n: "GDPR", s4l: "Compliant",
    },
    features: {
      label: "What we're building", headline: "Education meets entertainment", sub: "Three ways to experience real sex education",
      f1t: "Edutainment Series", f1d: "Realistic, relatable stories about relationships and intimacy — told in formats Gen Z actually watches. No dry theory, just real life.",
      f2t: "Anonymous Community", f2d: "Share and exchange experiences with peers — fully anonymously and without judgment. A safe space for real conversations.",
      f3t: "AI Coach", f3d: "Ask your most private questions or reflect on personal experiences with an empathetic AI coach. Available 24/7 — evidence-based and safe.",
    },
    team: {
      label: "The Team", headline: "Four founders. One vision.",
      members: [
        { name: "Anne Miller-Hermann", role: "Impact, Finance & Project Management", init: "AM" },
        { name: "Jil Clausen", role: "Product, Content & Community", init: "JC" },
        { name: "Ifrah Asif", role: "UI/UX Design & Product Interface", init: "IA" },
        { name: "Syeda Tooba Hasnain", role: "Technology, AI & Software Development", init: "ST" },
      ],
    },
    faq: {
      label: "Common Questions", headline: "FAQ",
      items: [
        { q: "Who is Insides for?", a: "Insides is for Gen Z individuals looking for honest, relatable sex education — and for schools & teachers who want engaging, evidence-based content for their classrooms." },
        { q: "Is the content safe for young people?", a: "Absolutely. All content is evidence-based, youth-protection compliant, and developed in alignment with WHO standards for sexuality education." },
        { q: "When does Insides launch?", a: "We are currently in the development phase, working closely with partner schools in Bavaria. Sign up above to be the first to know!" },
        { q: "Can schools use Insides?", a: "Yes! We offer dedicated school licenses with curriculum-aligned content, a lesson builder and classroom tools. Reach out to us to learn more." },
        { q: "How does Insides protect my data?", a: "Privacy is our top priority. We are GDPR-compliant, store all data on German servers, and never process sensitive health data without explicit consent." },
      ],
    },
    contact: {
      label: "Contact", headline: "Let's talk",
      sub: "Whether you're a school, a partner, or just curious — we'd love to hear from you.",
      email: "Send an email", linkedin: "Visit LinkedIn",
    },
    footer: "All rights reserved",
  },
};

// ── BLOB ──────────────────────────────────────────────────
function Blob({ style, color, delay = 0 }) {
  return (
    <motion.div
      animate={{ y: [0, -28, 0], scale: [1, 1.06, 1] }}
      transition={{ duration: 9, repeat: Infinity, delay, ease: "easeInOut" }}
      style={{ position: "absolute", borderRadius: "50%", background: color, opacity: 0.13, filter: "blur(2px)", pointerEvents: "none", ...style }}
    />
  );
}

// ── FADE IN WRAPPER COMPONENT ─────────────────────────────
function FadeIn({ children, delay = 0, y = 40, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay }} style={style}>
      {children}
    </motion.div>
  );
}

// ── PHONE MOCKUP ──────────────────────────────────────────
function PhoneMockup({ lang = "de" }) {
  const [msgIdx, setMsgIdx] = useState(0);
  const msgs = lang === "de" ? [
    { from: "user", text: "Ich fühle mich oft unsicher in Beziehungen..." },
    { from: "bot", text: "Das ist völlig normal. Viele fühlen so. Lass uns darüber sprechen 💙" },
    { from: "user", text: "Wirklich? Wie kann ich damit umgehen?" },
    { from: "bot", text: "Hier sind Ansätze, die wirklich helfen können..." },
  ] : [
    { from: "user", text: "I often feel insecure in relationships..." },
    { from: "bot", text: "That's completely normal. Many people feel this way 💙" },
    { from: "user", text: "Really? How can I deal with it?" },
    { from: "bot", text: "Here are some approaches that can really help..." },
  ];
  useEffect(() => {
    const t = setInterval(() => setMsgIdx(m => (m + 1) % msgs.length), 2200);
    return () => clearInterval(t);
  }, [msgs.length]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <motion.div
      animate={{ y: [0, -12, 0], rotateY: [0, 4, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{ width: 220, height: 420, background: "linear-gradient(160deg,#1a1a2e 0%,#2667BB 100%)", borderRadius: 32, border: "5px solid rgba(255,255,255,0.1)", boxShadow: "0 40px 80px rgba(38,103,187,0.35)", display: "flex", flexDirection: "column", overflow: "hidden" }}
    >
      <div style={{ width: 70, height: 18, background: "#0d0d1a", borderRadius: "0 0 12px 12px", margin: "0 auto" }} />
      <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.blush, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>🤖</div>
        <div>
          <div style={{ color: "white", fontSize: 12, fontWeight: 600 }}>Insides Coach</div>
          <div style={{ color: C.pale, fontSize: 9, opacity: 0.7 }}>● Online</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: "8px 12px", display: "flex", flexDirection: "column", gap: 8, justifyContent: "flex-end" }}>
        <AnimatePresence mode="popLayout">
          {msgs.slice(0, msgIdx + 1).map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 14, scale: 0.92 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.35 }}
              style={{ alignSelf: m.from === "user" ? "flex-end" : "flex-start", background: m.from === "user" ? C.violet : "rgba(255,255,255,0.12)", color: "white", borderRadius: m.from === "user" ? "14px 14px 3px 14px" : "14px 14px 14px 3px", padding: "7px 11px", fontSize: 10.5, maxWidth: "85%", lineHeight: 1.5 }}>
              {m.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
      <div style={{ padding: "10px 12px", background: "rgba(0,0,0,0.3)", display: "flex", gap: 8, alignItems: "center" }}>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.08)", borderRadius: 18, padding: "6px 11px", fontSize: 10, color: "rgba(255,255,255,0.4)" }}>{lang === "de" ? "Schreib etwas..." : "Write something..."}</div>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: C.midnight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11 }}>➤</div>
      </div>
    </motion.div>
  );
}

// ── VIDEO MOCKUP ──────────────────────────────────────────
function VideoMockup({ lang = "de" }) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
      style={{ width: 220, height: 300, borderRadius: 18, overflow: "hidden", boxShadow: "0 30px 60px rgba(0,0,0,0.35)", border: "1.5px solid rgba(255,255,255,0.08)", position: "relative" }}
    >
      <img src="https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=440&h=600&fit=crop&crop=center" alt="romantic" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,transparent 40%,rgba(0,0,0,0.85) 100%)" }} />
      <div style={{ position: "absolute", top: "38%", left: "50%", transform: "translate(-50%,-50%)" }}>
        <motion.div animate={{ scale: [1, 1.12, 1] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⏸</motion.div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "14px 12px" }}>
        <div style={{ color: "white", fontSize: 12, fontWeight: 600, marginBottom: 3 }}>{lang === "de" ? "Staffel 1 · Episode 1" : "Season 1 · Episode 1"}</div>
        <div style={{ color: "rgba(255,255,255,0.55)", fontSize: 10, marginBottom: 10 }}>{lang === "de" ? "Erste Liebe — Was ist normal?" : "First Love — What is normal?"}</div>
        <div style={{ height: 3, background: "rgba(255,255,255,0.2)", borderRadius: 2 }}>
          <motion.div animate={{ width: ["0%", "65%"] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 1 }}
            style={{ height: "100%", background: C.blush, borderRadius: 2 }} />
        </div>
      </div>
      <div style={{ position: "absolute", top: 12, left: 12, background: "rgba(0,0,0,0.5)", borderRadius: 6, padding: "3px 8px", color: "white", fontSize: 10, fontWeight: 700, letterSpacing: 1 }}>INSIDES</div>
    </motion.div>
  );
}

// ── COMMUNITY MOCKUP ──────────────────────────────────────
function CommunityMockup({ lang = "de" }) {
  const posts = lang === "de" ? [
    { init: "A", color: C.blush, text: "Hat jemand ähnliche Erfahrungen? Ich fühle mich so allein damit 💙", likes: 24 },
    { init: "B", color: C.citrus, text: "Danke für diesen Thread — ich dachte ich bin die Einzige!", likes: 18 },
    { init: "C", color: C.evergreen, text: "Episode 3 hat mir wirklich geholfen ✨", likes: 31 },
  ] : [
    { init: "A", color: C.blush, text: "Has anyone had similar experiences? I feel so alone with this 💙", likes: 24 },
    { init: "B", color: C.citrus, text: "Thanks for this thread — I thought I was the only one!", likes: 18 },
    { init: "C", color: C.evergreen, text: "Episode 3 really helped me understand this ✨", likes: 31 },
  ];
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      style={{ width: 220, background: "white", borderRadius: 18, overflow: "hidden", boxShadow: "0 20px 50px rgba(0,0,0,0.12)", border: "1.5px solid rgba(228,183,200,0.3)" }}
    >
      <div style={{ background: C.midnight, padding: "12px 14px", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 14 }}>💬</span>
        <span style={{ color: "white", fontSize: 12, fontWeight: 600 }}>Community</span>
        <div style={{ marginLeft: "auto", width: 7, height: 7, borderRadius: "50%", background: C.pale }} />
      </div>
      {posts.map((p, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.3 + 0.5 }}
          style={{ padding: "11px 13px", borderBottom: "1px solid rgba(228,183,200,0.2)" }}>
          <div style={{ display: "flex", gap: 7, marginBottom: 5 }}>
            <div style={{ width: 24, height: 24, borderRadius: "50%", background: p.color, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "white" }}>{p.init}</div>
            <span style={{ fontSize: 9, color: "#aaa", paddingTop: 4 }}>{lang === "de" ? "Anonym" : "Anonymous"}</span>
          </div>
          <p style={{ fontSize: 10.5, color: "#333", lineHeight: 1.5, marginBottom: 7 }}>{p.text}</p>
          <div style={{ fontSize: 9.5, color: "#bbb" }}>♥ {p.likes}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}


// ── ABOUT MOCKUP — team illustration ─────────────────────
function AboutMockup({ lang }) {
  const members = [
    { init: "AM", color: "#2667BB", name: "Anne", role: lang === "de" ? "Impact & Finanzen" : "Impact & Finance" },
    { init: "JC", color: "#257C42", name: "Jil", role: lang === "de" ? "Produkt & Content" : "Product & Content" },
    { init: "IA", color: "#8E7BAD", name: "Ifrah", role: lang === "de" ? "UI/UX Design" : "UI/UX Design" },
    { init: "ST", color: "#c06b8a", name: "Tooba", role: lang === "de" ? "Technologie & KI" : "Technology & AI" },
  ];
  return (
    <div style={{ position: "relative", width: 340, height: 360 }}>
      {/* background card */}
      <div style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.05)", borderRadius: 28, border: "1px solid rgba(255,255,255,0.1)", backdropFilter: "blur(8px)" }} />
      {/* who we are label */}
      <div style={{ position: "absolute", top: 24, left: 24, right: 24 }}>
        <p style={{ fontSize: 11, letterSpacing: 3, color: C.pale, textTransform: "uppercase", marginBottom: 8 }}>{lang === "de" ? "Wer wir sind" : "Who we are"}</p>
        <div style={{ width: 40, height: 2, background: C.blush, borderRadius: 2 }} />
      </div>
      {/* avatar row */}
      <div style={{ position: "absolute", top: 80, left: 24, right: 24, display: "flex", gap: 12, justifyContent: "center" }}>
        {members.map((m, i) => (
          <motion.div key={i}
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3 + i * 0.4, repeat: Infinity, delay: i * 0.5, ease: "easeInOut" }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Champ', sans-serif", fontSize: 16, color: "white", border: "2px solid rgba(255,255,255,0.15)", boxShadow: "0 8px 20px rgba(0,0,0,0.3)" }}>{m.init}</div>
            <div style={{ textAlign: "center" }}>
              <div style={{ color: "white", fontSize: 11, fontWeight: 600 }}>{m.name}</div>
              <div style={{ color: "rgba(255,255,255,0.45)", fontSize: 9, marginTop: 2, letterSpacing: 0.5 }}>{m.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
      {/* bottom quote card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        style={{ position: "absolute", bottom: 24, left: 24, right: 24, background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "16px 18px", border: "1px solid rgba(255,255,255,0.1)" }}>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: 12.5, lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>
          {lang === "de"
            ? '"Insides macht Sexualbildung ehrlich, zugänglich und relevant für Gen Z."'
            : '"Insides makes sex education honest, accessible and relevant for Gen Z."'}
        </p>
        <p style={{ color: C.blush, fontSize: 11, marginTop: 8 }}>— Sarah M., COO</p>
      </motion.div>
    </div>
  );
}

// ── FEATURES TAB SECTION ──────────────────────────────────
function FeaturesTabSection({ t, lang }) {
  const [active, setActive] = useState(0);
  const tabs = [
    {
      key: "video", label: lang === "de" ? "🎬 Serien schauen" : "🎬 Watch Series",
      title: t.features.f1t, desc: t.features.f1d,
      mockup: <VideoMockup lang={lang} />,
      color: C.midnight, accent: C.blush,
    },
    {
      key: "community", label: lang === "de" ? "💬 Community" : "💬 Community",
      title: t.features.f2t, desc: t.features.f2d,
      mockup: <CommunityMockup lang={lang} />,
      color: C.evergreen, accent: C.pale,
    },
    {
      key: "coach", label: lang === "de" ? "🤖 KI-Coach" : "🤖 AI Coach",
      title: t.features.f3t, desc: t.features.f3d,
      mockup: <PhoneMockup lang={lang} />,
      color: C.citrus, accent: C.violet,
    },
  ];
  const tab = tabs[active];
  return (
    <div>
      {/* Tab pills */}
      <div style={{ display: "flex", gap: 10, marginBottom: 48, flexWrap: "wrap", justifyContent: "center" }}>
        {tabs.map((tb, i) => (
          <button key={i} onClick={() => setActive(i)}
            style={{
              padding: "10px 22px", borderRadius: 50, border: "1.5px solid",
              borderColor: active === i ? tb.color : "rgba(38,103,187,0.2)",
              background: active === i ? tb.color : "white",
              color: active === i ? "white" : "#555",
              fontSize: 14, fontWeight: active === i ? 600 : 400,
              cursor: "pointer", fontFamily: "'Alecrim', sans-serif",
              transition: "all 0.2s",
            }}>
            {tb.label}
          </button>
        ))}
      </div>
      {/* Content */}
      <AnimatePresence mode="wait">
        <motion.div key={active}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
            gap: 48,
            alignItems: "center",
            background: "white",
            borderRadius: 28,
            padding: "48px 40px",
            border: "1.5px solid rgba(228,183,200,0.25)",
            boxShadow: "0 20px 60px rgba(38,103,187,0.07)",
          }}>
          {/* Left — text */}
          <div>
            <div style={{ width: 44, height: 4, borderRadius: 2, background: tab.accent || tab.color, marginBottom: 24 }} />
            <h3 style={{ fontFamily: "'Champ', sans-serif", fontSize: "clamp(24px,3vw,36px)", color: C.midnight, marginBottom: 16, lineHeight: 1.2 }}>{tab.title}</h3>
            <p style={{ color: "#666", fontSize: 16, lineHeight: 1.8, marginBottom: 28 }}>{tab.desc}</p>
            {/* feature bullets */}
            {[
              active === 0
                ? [lang === "de" ? "Realistische Darstellungen ohne Klischees" : "Realistic depictions without clichés",
                   lang === "de" ? "Kurze, serielle Episodenformate" : "Short, serialized episode formats",
                   lang === "de" ? "Von Experten geprüfte Inhalte" : "Expert-reviewed content"]
                : active === 1
                ? [lang === "de" ? "Vollständig anonym — keine Klarnamen" : "Fully anonymous — no real names",
                   lang === "de" ? "Moderierte, sichere Umgebung" : "Moderated, safe environment",
                   lang === "de" ? "Gleichgesinnte finden & austauschen" : "Find peers & exchange experiences"]
                : [lang === "de" ? "Evidenzbasierte Antworten (BZgA, WHO)" : "Evidence-based answers (BZgA, WHO)",
                   lang === "de" ? "Rund um die Uhr erreichbar" : "Available 24/7",
                   lang === "de" ? "Krisenweiterleitung zu Fachstellen" : "Crisis routing to professional services"]
            ][0].map((point, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: tab.accent || tab.color, flexShrink: 0 }} />
                <span style={{ fontSize: 14.5, color: "#555" }}>{point}</span>
              </div>
            ))}
          </div>
          {/* Right — mockup */}
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 340 }}>
            {tab.mockup}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}





// ── FAQ ITEM ──────────────────────────────────────────────
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div onClick={() => setOpen(!open)} style={{ borderBottom: "1.5px solid rgba(228,183,200,0.35)", cursor: "pointer" }}>
      <div style={{ padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
        <span style={{ fontSize: 16, fontWeight: 500, color: "#2a2a2a" }}>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }}
          style={{ width: 28, height: 28, borderRadius: "50%", background: open ? C.violet : C.blush, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "white", fontSize: 13 }}>▾</motion.div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
            <p style={{ paddingBottom: 18, color: "#666", fontSize: 15, lineHeight: 1.7 }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── SECTION HEADER ────────────────────────────────────────
function SectionHeader({ label, headline, sub, labelColor = C.violet, headlineColor = C.midnight, dark = false }) {
  return (
    <FadeIn>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <p style={{ fontSize: 12, letterSpacing: 3, color: labelColor, textTransform: "uppercase", marginBottom: 16 }}>{label}</p>
        <h2 style={{ fontFamily: "'Champ', sans-serif", fontSize: "clamp(30px,5vw,52px)", color: headlineColor, lineHeight: 1.1, marginBottom: sub ? 16 : 0 }}>{headline}</h2>
        {sub && <p style={{ color: dark ? "rgba(255,255,255,0.65)" : "#777", fontSize: 17, maxWidth: 460, margin: "0 auto" }}>{sub}</p>}
      </div>
    </FadeIn>
  );
}

// ── MAIN APP ──────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("de");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const SHEET_URL = "https://script.google.com/macros/s/AKfycbxi9vDzMRSk_GbxGjrbQrxfJdfIQO1WOdHX9D7Ls0b1tha19TTnBwIqVCSVR5RN3tLY/exec";

  const submitToSheet = async () => {
    if (!name.trim()) { setFormError(lang === "de" ? "Bitte Name eingeben" : "Please enter your name"); return; }
    if (!email.trim() || !email.includes("@") || !email.includes(".")) { setFormError(lang === "de" ? "Bitte gültige E-Mail eingeben" : "Please enter a valid email"); return; }
    if (!userType) { setFormError(lang === "de" ? "Bitte Typ auswählen" : "Please select your type"); return; }
    
    setFormError("");
    setLoading(true);
    
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, type: userType })
      });
      setSubmitted(true);
    } catch (err) {
      setFormError(lang === "de" ? "Fehler — bitte erneut versuchen" : "Error — please try again");
    }
    setLoading(false);
  };
  const [menuOpen, setMenuOpen] = useState(false);
  const t = T[lang];

  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const navItems = ["features", "about", "faq", "contact"];

  return (
    <div style={{ fontFamily: "'Alecrim', sans-serif", background: C.cream, color: "#2a2a2a", overflowX: "hidden" }}>
      {/* Brand fonts loaded from src/fonts.css */}

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 200, background: "rgba(253,248,244,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(228,183,200,0.25)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", height: 64, padding: "0 24px", gap: 8 }}>
          <div style={{ marginRight: "auto", cursor: "pointer" }} onClick={() => scrollTo("hero")}>
            <img src="/INSIDES_Full-Logo_Midnight-Blue.png" alt="Insides" style={{ height: 38, width: "auto", display: "block" }} />
          </div>
          <div style={{ display: "flex", gap: 2 }} className="desk-nav">
            {navItems.map(n => (
              <button key={n} onClick={() => scrollTo(n)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: "#555", padding: "8px 12px", borderRadius: 8, fontFamily: "'Alecrim', sans-serif" }}>
                {t.nav[n]}
              </button>
            ))}
          </div>
          <button onClick={() => setLang(l => l === "de" ? "en" : "de")} style={{ background: "white", border: "1.5px solid " + C.blush, borderRadius: 50, padding: "6px 14px", fontSize: 13, cursor: "pointer", fontFamily: "'Alecrim', sans-serif", color: C.midnight, fontWeight: 500 }}>
            {t.langBtn}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="hamburger" style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, padding: 4, display: "none" }}>☰</button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} style={{ overflow: "hidden", borderTop: "1px solid rgba(228,183,200,0.25)", background: "rgba(253,248,244,0.97)" }}>
              {navItems.map(n => (
                <button key={n} onClick={() => scrollTo(n)} style={{ display: "block", width: "100%", background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#2a2a2a", padding: "14px 24px", textAlign: "left", fontFamily: "'Alecrim', sans-serif" }}>
                  {t.nav[n]}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", padding: "80px 24px 40px", textAlign: "center" }}>
        <Blob style={{ width: 500, height: 500, top: -100, left: -150 }} color={C.blush} delay={0} />
        <Blob style={{ width: 350, height: 350, bottom: 0, right: -80 }} color={C.violet} delay={3} />
        <Blob style={{ width: 220, height: 220, top: "45%", left: "8%" }} color={C.citrus} delay={1.5} />

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          style={{ display: "inline-flex", alignItems: "center", gap: 10, background: C.midnight, color: "white", borderRadius: 50, padding: "7px 18px", fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 20, position: "relative", zIndex: 2 }}>
          <motion.div animate={{ scale: [1, 0.6, 1], opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 8, height: 8, borderRadius: "50%", background: C.pale }} />
          {t.hero.badge}
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontFamily: "'Champ', sans-serif", fontSize: "clamp(36px,6vw,72px)", color: C.midnight, lineHeight: 1, letterSpacing: -1, position: "relative", zIndex: 2, marginBottom: 16 }}>
          {t.hero.h1}<br /><em style={{ color: C.violet }}>{t.hero.h2}</em><br />{t.hero.h3}
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
          style={{ fontSize: "clamp(13px,1.8vw,16px)", color: "#666", maxWidth: 800, lineHeight: 1.6, position: "relative", zIndex: 2, marginBottom: 24 }}>
          {t.hero.sub}
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
          style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 2 }}>
          <p style={{ fontSize: 12, color: "#999", marginBottom: 12 }}>{t.hero.emailLabel}</p>
          {!submitted ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Name field */}
              <input
                value={name} onChange={e => setName(e.target.value)}
                placeholder={lang === "de" ? "Dein Name" : "Your name"}
                style={{ width: "100%", padding: "11px 18px", border: "1.5px solid rgba(228,183,200,0.4)", borderRadius: 50, outline: "none", fontFamily: "'Alecrim', sans-serif", fontSize: 14, background: "white", boxSizing: "border-box" }}
              />
              {/* Email field */}
              <input
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder={t.hero.emailPlaceholder}
                style={{ width: "100%", padding: "11px 18px", border: "1.5px solid rgba(228,183,200,0.4)", borderRadius: 50, outline: "none", fontFamily: "'Alecrim', sans-serif", fontSize: 14, background: "white", boxSizing: "border-box" }}
              />
              {/* Type selector */}
              <select
                value={userType} onChange={e => setUserType(e.target.value)}
                style={{ width: "100%", padding: "11px 18px", border: "1.5px solid rgba(228,183,200,0.4)", borderRadius: 50, outline: "none", fontFamily: "'Alecrim', sans-serif", fontSize: 14, background: "white", boxSizing: "border-box", color: userType ? "#2a2a2a" : "#999", appearance: "none", cursor: "pointer" }}
              >
                <option value="" disabled>{lang === "de" ? "Ich bin..." : "I am..."}</option>
                <option value="Student / Gen Z">{lang === "de" ? "👩‍🎓 Schüler*in / Gen Z" : "👩‍🎓 Student / Gen Z"}</option>
                <option value="School / Teacher">{lang === "de" ? "🏫 Lehrkraft / Schule" : "🏫 Teacher / School"}</option>
                <option value="Parent">{lang === "de" ? "👪 Elternteil" : "👪 Parent"}</option>
                <option value="Investor">{lang === "de" ? "💼 Investor*in" : "💼 Investor"}</option>
                <option value="Other">{lang === "de" ? "✨ Sonstiges" : "✨ Other"}</option>
              </select>
              {/* Error message */}
              {formError && (
                <p style={{ color: "#c0392b", fontSize: 13, margin: 0, paddingLeft: 8 }}>{formError}</p>
              )}
              {/* Submit button */}
              <button onClick={submitToSheet} disabled={loading}
                style={{ width: "100%", padding: "12px 20px", background: loading ? "#aaa" : C.midnight, color: "white", border: "none", borderRadius: 50, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'Alecrim', sans-serif", fontSize: 14, fontWeight: 600, transition: "background .2s" }}>
                {loading ? (lang === "de" ? "Wird gesendet..." : "Sending...") : t.hero.emailBtn}
              </button>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              style={{ color: C.evergreen, fontSize: 15, padding: 20, background: "rgba(37,124,66,0.08)", borderRadius: 20, textAlign: "center" }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>🎉</div>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>{t.hero.emailSuccess}</p>
              <p style={{ fontSize: 13, color: "#888" }}>{lang === "de" ? "Wir melden uns bald!" : "We will be in touch soon!"}</p>
            </motion.div>
          )}
        </motion.div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          style={{ position: "absolute", bottom: 32, fontSize: 20, color: C.blush, zIndex: 2 }}>↓</motion.div>
      </section>
      {/* Trust Banner */}
      <section id="trusted" className="trust-banner">
        <div className="trust-banner__container">
          <p className="trust-banner__label">
            {lang === "de"
              ? "Wissenschaftlich fundiert. Mit Expert:innen entwickelt"
              : "Science-based. Trusted by educators."}
          </p>
          <div className="trust-banner__logos">
            <img
              src="/Logo_Hochschule_Kempten.svg.png"
              alt="Hochschule Kempten"
              className="trust-banner__logo"
            />
            <img
              src="/EXIST logo-exist.jpg"
              alt="EXIST"
              className="trust-banner__logo trust-banner__logo--medium"
            />
            <img
              src="/allgau digital.jpg"
              alt="Allgäu Digital"
              className="trust-banner__logo trust-banner__logo--square"
            />
            <img
              src="/Technische_Hochschule_Augsburg_2025_logo.svg.png"
              alt="TH Augsburg"
              className="trust-banner__logo"
            />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "100px 24px", background: C.midnight }}>
        <div style={{ maxWidth: 1060, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 60, alignItems: "center" }}>
              {/* LEFT — text */}
              <div>
                <p style={{ fontSize: 11, letterSpacing: 3, color: C.pale, textTransform: "uppercase", marginBottom: 14 }}>{t.about.label}</p>
                <h2 style={{ fontFamily: "'Champ', sans-serif", fontSize: "clamp(28px,4vw,44px)", color: "white", lineHeight: 1.15, marginBottom: 20 }}>{t.about.headline}</h2>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.8, marginBottom: 12 }}>{t.about.text1}</p>
                <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 15, lineHeight: 1.8, marginBottom: 12 }}>{t.about.text2}</p>
                <p style={{ color: C.blush, fontSize: 15, lineHeight: 1.8, marginBottom: 32 }}>{t.about.text3}</p>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  {(lang === "de" ? ["WHO-Standards", "DSGVO", "BZgA"] : ["WHO Standards", "GDPR", "BZgA"]).map((tag, i) => (
                    <span key={i} style={{ fontSize: 12, color: C.pale, border: "1px solid rgba(255,255,242,0.25)", borderRadius: 50, padding: "5px 14px", letterSpacing: 1 }}>{tag}</span>
                  ))}
                </div>
              </div>
              {/* RIGHT — team mockup illustration */}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <AboutMockup lang={lang} />
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "100px 24px", background: C.cream }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionHeader label={t.features.label} headline={t.features.headline} sub={t.features.sub} />
          <FeaturesTabSection t={t} lang={lang} />
        </div>
      </section>



      {/* FAQ */}
      <section id="faq" style={{ padding: "100px 24px" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <SectionHeader label={t.faq.label} headline={t.faq.headline} />
          {t.faq.items.map((item, i) => <FaqItem key={i} q={item.q} a={item.a} />)}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 24px", background: C.midnight, textAlign: "center" }}>
        <FadeIn>
          <p style={{ fontSize: 12, letterSpacing: 3, color: C.pale, textTransform: "uppercase", marginBottom: 16 }}>{t.contact.label}</p>
          <h2 style={{ fontFamily: "'Champ', sans-serif", fontSize: "clamp(30px,5vw,52px)", color: "white", marginBottom: 16 }}>{t.contact.headline}</h2>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 17, maxWidth: 420, margin: "0 auto 48px", lineHeight: 1.7 }}>{t.contact.sub}</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: t.contact.email, href: "mailto:Info@insides-official.com", icon: "✉️" },
              { label: t.contact.linkedin, href: "https://www.linkedin.com/company/insides-by-intimate-insights/", icon: "💼" },
            ].map((l, i) => (
              <motion.a key={i} href={l.href} target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.04, background: C.blush, borderColor: C.blush, color: C.midnight }}
                style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.1)", color: "white", borderRadius: 50, padding: "13px 26px", textDecoration: "none", fontSize: 15, border: "1.5px solid rgba(255,255,255,0.15)" }}>
                <span>{l.icon}</span>{l.label}
              </motion.a>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.midnight, borderTop: "1px solid rgba(255,255,255,0.07)", padding: "20px 24px", textAlign: "center", color: "rgba(255,255,255,0.35)", fontSize: 13 }}>
        © 2026 Insides by Intimate Insights — {t.footer}
      </footer>

      <style>{`
        @media(max-width:768px){
          .desk-nav{display:none!important}
          .hamburger{display:block!important}
        }
      `}</style>
    </div>
  );
}