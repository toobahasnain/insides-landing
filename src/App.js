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
      h1: "Zuschauen. Lernen. Erleben", h2: "Realistische Intimität",
      sub: "Streame realistische Storys über Liebe, Beziehungen und Sexualität. Lerne aus den Erfahrungen anderer und teile deine eigenen.",
      emailLabel: "Sei unter den Ersten, wenn wir starten",
      emailPlaceholder: "deine@email.de", emailBtn: "Benachrichtigen",
      emailSuccess: "Du bist dabei! Wir melden uns bald. 🎉",
    },
    about: {
      label: "Wir bieten", headline: "Gesunde mediale Vorbilder für Beziehungen und Sexualität",
      text1: "Digitale Lebenswelten prägen, wie Jugendliche und junge Erwachsene über Sexualität, Beziehungen und den eigenen Körper denken. Wo klassische Sexualaufklärung nicht ausreichen, werden Social Media und pornografische Inhalte zu wichtigen Informationsquellen – oft verbunden mit Fehlinformationen, unrealistischen Darstellungen und problematischen Vorbildern.",
      text2: "Insides schafft einen gesundheitsförderlichen Gegenentwurf. Wir verbinden wissenschaftlich fundiertes Wissen mit realitätsnahen narrativen Serien. Die Serien machen respektvolle Beziehungen, Konsens, Kommunikation und sexuelle Selbstbestimmung erlebbar. Eine anonyme Community und ein persönlicher KI-Coach bieten jungen Menschen zusätzlich Raum für Fragen, Austausch und Reflexion.",
      text3: "Entwickelt wird Insides von einem interdisziplinären Team und in Zusammenarbeit mit jungen Menschen, Schulen und Einrichtungen der Jugendhilfe.",
    },
    features: {
      label: "Was wir bauen", headline: "Bildung trifft Unterhaltung", sub: "Zwei Wege, über Sexualität und Beziehung zu lernen.",
      f1t: "Narrative Bildungsserien", f1d: "Realistische, nachvollziehbare Geschichten über Beziehungen und Intimität — in Formaten, die Junge Menschen wirklich schaut. Keine trockene Theorie, sondern echtes Leben.",
      f2t: "Anonyme Community", f2d: "Teile und tausche Erfahrungen mit Gleichaltrigen — vollständig anonym und ohne Urteile. Ein sicherer Raum für echte Gespräche.",
    },
    team: {
      label: "Das Team", headline: "Drei Gründerinnen. Eine Vision.",
      intro: "Wir sind Mütter, Frauen und Töchter. Unsere Kinder wachsen in einer Welt auf, in der sie Antworten auf sensible Fragen oft zuerst im Netz finden. Wir wollen, dass sie stattdessen in einer Welt groß werden, die sie gut begleitet und in der sie frei mit uns über alles sprechen können.",
      motivation: "Unsere Kinder sind unsere größte Motivation. Wir hören nicht auf, bis jeder junge Mensch Zugang zu guter, ehrlicher Aufklärung hat.",
      profiles: [
        { name: "Anne", role: "Mitgründerin, Bildung, Inhalte und Strategie. Mutter von zwei Kindern.", quote: "„Als ich schwanger war, habe ich mich gefragt, wie meine Tochter einmal etwas über Körper und Nähe lernen wird. Diese Frage ist mein Antrieb.“" },
        { name: "Jil", role: "Mitgründerin, Education, Content und Strategy. Mutter von drei Kindern.", quote: "„Kinder fragen, und sie verdienen gute Antworten. Als Mutter von drei Kindern will ich, dass sie diese Antworten von uns bekommen, nicht aus dem Netz.“" },
        { name: "Ifrah & Tooba", role: "Ifrah, CTO; Tooba, Design, Research und Technologie.", quote: "„Wir entwickeln Technologie, die jungen Menschen Orientierung gibt, bevor falsche Bilder es tun.“" },
      ],
      advisorsLabel: "Beratende",
      advisors: "Prof. Dr. Schmid, Prof. Mayer & Prof. Brysch",
    },
    faq: {
      label: "Häufige Fragen", headline: "FAQ",
      items: [
        { q: "Für wen ist Insides?", a: "Insides richtet sich an Gen Z, die nach ehrlicher, nachvollziehbarer Sexualaufklärung suchen — sowie an Schulen und Lehrkräfte, die ansprechende, evidenzbasierte Inhalte für ihren Unterricht wünschen." },
        { q: "Sind die Inhalte für Jugendliche geeignet?", a: "Absolut. Alle Inhalte sind evidenzbasiert, jugendschutzkonform und werden in Übereinstimmung mit den WHO-Standards für Sexualaufklärung entwickelt." },
        { q: "Wann startet Insides?", a: "Wir befinden uns derzeit in der Entwicklungsphase und arbeiten eng mit Partnerschulen in Bayern zusammen. Melde dich oben an, um als Erste informiert zu werden!" },
        { q: "Können Schulen Insides nutzen?", a: "Ja! Wir bieten spezielle Schullizenzmodelle mit lehrplankonformen Inhalten, einem Stundenplaner und Klassenzimmer-Tools. Kontaktiere uns für mehr Informationen." },
        { q: "Wie schützt Insides meine Daten?", a: "Das Anmeldeformular verarbeitet deinen Namen, deine E-Mail-Adresse und deine Nutzergruppe über Google Apps Script und eine Google-Tabelle. Weitere Informationen findest du unter Datenschutz im Footer." },
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
      h1: "Watch. Learn. Enjoy", h2: "Realistic Intimacy",
      sub: "Stream realistic stories about love, relationships and sexuality. Learn from other people’s experiences and share your own.",
      emailLabel: "Be the first to know when we launch",
      emailPlaceholder: "your@email.com", emailBtn: "Notify me",
      emailSuccess: "You're on the list! We'll be in touch soon. 🎉",
    },
    about: {
      label: "We Offer", headline: "Healthy role models in the media for relationships and sexuality",
      text1: "Digital environments shape the way teenagers and young adults think about sexuality, relationships and their own bodies. Where traditional sex education falls short, social media and pornographic content become key sources of information – often accompanied by misinformation, unrealistic portrayals and problematic role models.",
      text2: "Insides offers a health-promoting alternative. We combine scientifically sound knowledge with realistic narrative series. The series bring to life respectful relationships, consensus, communication and sexual self-determination. An anonymous community and a personal AI coach also provide young people with a space for asking questions, sharing experiences and reflecting.",
      text3: "Insides is being developed by an interdisciplinary team in collaboration with young people, schools and youth support organisations.",
    },
    features: {
      label: "What we're building", headline: "Education meets entertainment", sub: "Two ways to experience real sex education",
      f1t: "Narrative Educational Series", f1d: "Realistic, relatable stories about relationships and intimacy — told in formats young people actually watches. No dry theory, just real life.",
      f2t: "Anonymous Community", f2d: "Share and exchange experiences with peers — fully anonymously and without judgment. A safe space for real conversations.",
    },
    team: {
      label: "The Team", headline: "Three founders. One vision.",
      intro: "We are mothers, women, and daughters. Our children are growing up in a world where they often find answers to sensitive questions online first. We want them instead to grow up in a world that supports them and where they can talk to us freely about anything.",
      motivation: "Our children are our greatest motivation. We won't stop until every young person has access to good, honest sex education.",
      profiles: [
        { name: "Anne", role: "Co-founder, Education, Content and Strategy. Mother of two.", quote: "“When I was pregnant, I wondered how my daughter would one day learn about bodies and intimacy. That question drives me.”" },
        { name: "Jil", role: "Co-founder, Education, Content and Strategy. Mother of three.", quote: "“Children ask questions, and they deserve good answers. As a mother of three, I want them to get those answers from us, not the internet.”" },
        { name: "Ifrah & Tooba", role: "Ifrah, CTO; Tooba, Design, Research and Technology.", quote: "We are developing technology that gives young people guidance before false images do." },
      ],
      advisorsLabel: "Advisors",
      advisors: "Prof. Dr. Schmid, Prof. Mayer & Prof. Brysch",
    },
    faq: {
      label: "Common Questions", headline: "FAQ",
      items: [
        { q: "Who is Insides for?", a: "Insides is for Gen Z individuals looking for honest, relatable sex education — and for schools & teachers who want engaging, evidence-based content for their classrooms." },
        { q: "Is the content safe for young people?", a: "Absolutely. All content is evidence-based, youth-protection compliant, and developed in alignment with WHO standards for sexuality education." },
        { q: "When does Insides launch?", a: "We are currently in the development phase, working closely with partner schools in Bavaria. Sign up above to be the first to know!" },
        { q: "Can schools use Insides?", a: "Yes! We offer dedicated school licenses with curriculum-aligned content, a lesson builder and classroom tools. Reach out to us to learn more." },
        { q: "How does Insides protect my data?", a: "The sign-up form processes your name, email address and user group through Google Apps Script and a Google Sheet. Further information is available under Privacy in the footer." },
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

const LEGAL_CONTENT = {
  de: {
    imprint: {
      title: "Impressum",
      intro: "Angaben gemäß § 5 DDG:",
      sections: [
        { title: "Diensteanbieter", paragraphs: [
          "Insides by Intimate Insights (GbR / Vorgründungsphase)",
          "Vertreten durch die Gesellschafterinnen:",
          "Anne-Maria Miller-Hermann",
          "Jil Clausen",
          "Ifrah Asif",
        ] },
        { title: "Ladungsfähige Anschrift", paragraphs: [
          "Insides by Intimate Insights",
          "c/o StartUp Center der Hochschule Kempten",
          "Rottachstraße 11",
          "87435 Kempten (Allgäu), Deutschland",
        ] },
        { title: "Kontakt", paragraphs: [
          "E-Mail: info@insides-official.com",
          "Telefon: +49 179 6865673",
        ] },
        { title: "Registereintrag", paragraphs: ["Nicht im Handelsregister eingetragen (Vorgründungsphase / GbR)."] },
        { title: "Umsatzsteuer-ID", paragraphs: ["Nicht vorhanden (Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG bisher nicht erteilt)."] },
        { title: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV", paragraphs: [
          "Ifrah Asif",
          "Narzissenstraße 4",
          "86179 Augsburg",
        ] },
        { title: "EU-Streitschlichtung & Verbraucherstreitbeilegung", paragraphs: [
          "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/",
          "Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
        ] },
        { title: "Design und technische Umsetzung", paragraphs: [
          "Ifrah Asif",
          "E-Mail: ifrahasif30@gmail.com",
          { text: "Web: https://ifrahasif.framer.website/", href: "https://ifrahasif.framer.website/" },
        ] },
        { title: "Bildnachweise / Urheberrecht", paragraphs: [
          "Die auf dieser Website verwendeten Bilder, Grafiken und Texte sind eigene Materialien von Insides bzw. urheberrechtlich geschützt.",
          "Inhalte wurden teilweise unter Zuhilfenahme generativer KI-Systeme erstellt und anschließend redaktionell geprüft.",
        ] },
      ],
    },
    dataProtection: {
      title: "Datenschutzerklärung",
      intro: "Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen personenbezogenen Daten passiert, wenn du diese Website besuchst. Personenbezogene Daten sind alle Daten, mit denen du persönlich identifiziert werden kannst.",
      sections: [
        { title: "1. Datenschutz auf einen Blick", paragraphs: [
          "Allgemeine Hinweise: Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit deinen personenbezogenen Daten passiert, wenn du diese Website besuchst. Personenbezogene Daten sind alle Daten, mit denen du persönlich identifiziert werden kannst.",
          "Verantwortliche Stelle: Insides by Intimate Insights (GbR / Vorgründungsphase), vertreten durch Anne-Maria Miller-Hermann, Jil Clausen und Ifrah Asif, c/o StartUp Center der Hochschule Kempten, Rottachstraße 11, 87435 Kempten (Allgäu), Deutschland, E-Mail: info@insides-official.com, Telefon: +49 179 6865673.",
        ] },
        { title: "2. Hosting und Bereitstellung der Website", paragraphs: [
          "Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich insbesondere um IP-Adressen, Meta- und Kommunikationsdaten sowie Webseitenzugriffe handeln.",
          "Hoster: [z. B. Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA / oder Framer B.V.]",
          "Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einer sicheren, schnellen und fehlerfreien Bereitstellung unseres Onlineangebots).",
          "Datenübermittlung in Drittstaaten: Soweit Daten außerhalb der EU/des EWR verarbeitet werden, erfolgt dies auf Grundlage von Standardvertragsklauseln (SCC) der EU-Kommission sowie des EU-U.S. Data Privacy Frameworks.",
        ] },
        { title: "3. Datenerfassung auf dieser Website", paragraphs: [
          "Waitlist-/Voranmelde-Formular („Sei unter den Ersten, wenn wir starten“): Wenn du dich über unser Formular für Updates und den Start von Insides anmeldest, erheben wir folgende Daten: • Deine E-Mail-Adresse • Dein Vor- und Nachname (falls angegeben) • Deine ausgewählte Nutzergruppe (z. B. Schüler*in, Lehrkraft, Elternteil, Investor*in).",
          "Zweck der Verarbeitung: Kontaktaufnahme, Information über den Start der Plattform sowie interessenspezifische Vorbereitung unseres Angebots.",
          "Rechtsgrundlage: Deine freiwillige Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO.",
          "Widerruf: Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft formlos per E-Mail an info@insides-official.com widerrufen.",
          "Speicherdauer: Wir speichern deine Angaben, bis du deine Einwilligung widerrufst oder der Zweck für die Datenerhebung (z. B. Launch-Benachrichtigung) erfüllt ist.",
          "Nutzung von Google Apps Script & Google Tabellen: Die im Formular eingegebenen Daten werden automatisiert mittels Google Apps Script an eine geschützte Tabelle in Google Drive (Google Workspace, bereitgestellt von Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland) übermittelt und dort gespeichert.",
          "Der Zugriff ist streng auf die Projektgründerinnen beschränkt. Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO bzw. Standardvertragsklauseln (SCC) für eventuelle Datenübertragungen an Muttergesellschaften in den USA.",
          "Kontaktaufnahme per E-Mail oder Telefon: Wenn du uns per E-Mail oder Telefon kontaktierst, wird deine Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten zum Zwecke der Bearbeitung deines Anliegens gespeichert und verarbeitet (Art. 6 Abs. 1 lit. b DSGVO zur Durchführung vorvertraglicher Maßnahmen bzw. Art. 6 Abs. 1 lit. f DSGVO bei berechtigtem Interesse an einer effektiven Bearbeitung).",
        ] },
        { title: "4. Deine Rechte als betroffene Person", paragraphs: [
          "Du hast im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf Auskunft über deine gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der Verarbeitung (Art. 15 DSGVO).",
          "Du hast das Recht auf Berichtigung unrichtiger Daten oder Vervollständigung (Art. 16 DSGVO).",
          "Du hast das Recht auf Löschung deiner bei uns gespeicherten Daten („Recht auf Vergessenwerden“, Art. 17 DSGVO).",
          "Du hast das Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO).",
          "Du hast das Recht auf Datenübertragbarkeit in einem gängigen, maschinenlesbaren Format (Art. 20 DSGVO).",
          "Du hast das Recht auf Widerruf deiner Einwilligung mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO).",
          "Du hast ein Widerspruchsrecht gegen die Verarbeitung bei berechtigtem Interesse (Art. 21 DSGVO).",
          "Wende dich dazu jederzeit formlos an: info@insides-official.com.",
        ] },
        { title: "Beschwerderecht bei der zuständigen Aufsichtsbehörde", paragraphs: [
          "Im Falle von datenschutzrechtlichen Verstößen steht dir ein Beschwerderecht bei einer zuständigen Aufsichtsbehörde zu. Da der Sitz des Startup Centers in Bayern liegt, ist die primär zuständige Landesbehörde:",
          "Bayerisches Landesamt für Datenschutzaufsicht (BayLDA)",
          "Promenade 18",
          "91522 Ansbach",
          { text: "Web: https://www.lda.bayern.de", href: "https://www.lda.bayern.de" },
        ] },
      ],
    },
    disclaimer: {
      title: "Haftungsausschluss",
      intro: "Die folgenden Hinweise sind allgemeine Informationen und ersetzen keine individuelle Rechtsberatung.",
      sections: [
        { title: "1. Warnhinweis zu Inhalten (Keine medizinische oder psychologische Beratung)", paragraphs: ["Die Inhalte dieser Website wurden mit größtmöglicher Sorgfalt erstellt. Sie dienen ausschließlich Informations-, Bildungs- und Aufklärungszwecken und stellen ausdrücklich keine medizinische, therapeutische, psychologische oder rechtliche Beratung dar. Die dargebotenen Informationen können und sollen eine individuelle Diagnose, Beratung oder Behandlung durch qualifizierte Fachkräfte (z. B. Ärzt*innen, Psychotherapeut*innen oder anerkannte Beratungsstellen) keinesfalls ersetzen."] },
        { title: "2. Haftung für eigene Inhalte", paragraphs: ["Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach den §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen."] },
        { title: "3. Haftung für externe Links", paragraphs: ["Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen."] },
        { title: "4. Urheberrecht und Nutzungsrechte", paragraphs: ["Die durch die Seitenbetreiberinnen erstellten Inhalte, Texte, Grafiken und Medien auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der vorherigen schriftlichen Zustimmung der jeweiligen Rechteinhaberinnen. Soweit Inhalte teilweise mit Unterstützung generativer KI-Systeme erstellt wurden, unterliegen sie unserer redaktionellen Prüfung und Bearbeitung.", "Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Abgebildete Marken, Logos und Kennzeichen von Hochschulen, Förderprogrammen oder anderen Kooperationspartnern verbleiben im ausschließlichen Eigentum der jeweiligen Rechteinhaber. Solltest du trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen."] },
      ],
    },
    cookies: {
      title: "Cookies und ähnliche Technologien",
      intro: "Unsere Website setzt selbst keine Cookies zu Analyse-, Marketing- oder Werbezwecken ein. Wir verwenden keine Tracking-Pixel, keine Werbenetzwerke und keine profilbildenden Analysetools (wie z. B. Google Analytics oder Meta Pixel). Ein aktiver Cookie-Einwilligungsbanner ist daher derzeit nicht erforderlich.",
      sections: [
        { title: "1. Grundsatz: Keine Tracking- oder Werbe-Cookies", paragraphs: ["Unsere Website setzt selbst keine Cookies zu Analyse-, Marketing- oder Werbezwecken ein. Wir verwenden keine Tracking-Pixel, keine Werbenetzwerke und keine profilbildenden Analysetools (wie z. B. Google Analytics oder Meta Pixel). Ein aktiver Cookie-Einwilligungsbanner ist daher derzeit nicht erforderlich."] },
        { title: "2. Technisch notwendige Datenverarbeitung & Hosting", paragraphs: ["Beim Aufrufen unserer Website können durch den Hosting-Dienstleister technisch notwendige Daten verarbeitet oder temporäre Session-Cookies bzw. Server-Logfiles erstellt werden, um die fehlerfreie und sichere Auslieferung der Seiten zu gewährleisten.", "Rechtsgrundlage: § 25 Abs. 2 Nr. 2 TDDDG (technisch unbedingt erforderlich für die Bereitstellung des vom Nutzer ausdrücklich gewünschten Telemediendienstes) sowie Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem stabilen und sicheren Webseitenbetrieb)."] },
        { title: "3. Anmeldeformular (Google Apps Script & Google Tabellen)", paragraphs: ["Beim Absenden des Voranmelde-Formulars („Sei unter den Ersten, wenn wir starten“) werden deine eingegebenen Angaben direkt über eine Programmierschnittstelle (Google Apps Script API) an eine geschützte Tabelle in Google Drive übermittelt.", "Hierbei werden keine Drittanbieter-Tracking-Cookies auf deinem Endgerät gespeichert.", "Die Übertragung der Formulardaten erfolgt verschlüsselt (HTTPS) und ausschließlich zweckgebunden auf Grundlage deiner freiwilligen Einwilligung gemäß Art. 6 Abs. 1 lit. a DSGVO."] },
        { title: "4. Künftige Änderungen & Einwilligungspflicht", paragraphs: ["Sollten wir in Zukunft optionale Analyse-, Marketing-Tools oder Drittanbieter-Medien (wie z. B. eingebettete Videoplayer mit Cookie-Setzung) integrieren, werden wir vor deren Aktivierung ein datenschutzkonformes Einwilligungs-Management (Cookie-Banner nach Art. 6 Abs. 1 lit. a DSGVO i. V. m. § 25 Abs. 1 TDDDG) einbinden."] },
      ],
    },
  },
  en: {
    imprint: {
      title: "Imprint",
      intro: "Information in accordance with § 5 DDG:",
      sections: [
        { title: "Service provider", paragraphs: [
          "Insides by Intimate Insights (GbR / pre-formation phase)",
          "Represented by the partners:",
          "Anne-Maria Miller-Hermann",
          "Jil Clausen",
          "Ifrah Asif",
        ] },
        { title: "Service address", paragraphs: [
          "Insides by Intimate Insights",
          "c/o StartUp Center of the Kempten University of Applied Sciences",
          "Rottachstraße 11",
          "87435 Kempten (Allgäu), Germany",
        ] },
        { title: "Contact", paragraphs: [
          "Email: info@insides-official.com",
          "Phone: +49 179 6865673",
        ] },
        { title: "Registration", paragraphs: ["Not entered in the commercial register (pre-formation phase / GbR)."] },
        { title: "VAT ID", paragraphs: ["Not available (VAT identification number under § 27a of the German VAT Act has not yet been issued)."] },
        { title: "Responsible for content pursuant to § 18 para. 2 MStV", paragraphs: [
          "Ifrah Asif",
          "Narzissenstraße 4",
          "86179 Augsburg",
        ] },
        { title: "EU dispute resolution & consumer arbitration", paragraphs: [
          "The European Commission provides a platform for online dispute resolution (ODR): https://ec.europa.eu/consumers/odr/",
          "Our email address can be found above in the imprint. We are not willing or obliged to participate in dispute resolution proceedings before a consumer arbitration body.",
        ] },
        { title: "Design and technical implementation", paragraphs: [
          "Ifrah Asif",
          "Email: ifrahasif30@gmail.com",
          { text: "Web: https://ifrahasif.framer.website/", href: "https://ifrahasif.framer.website/" },
        ] },
        { title: "Image credits / copyright", paragraphs: [
          "Images, graphics and text used on this website are Insides’ own materials or protected by copyright.",
          "Some content was created with the assistance of generative AI systems and then reviewed editorially.",
        ] },
      ],
    },
    dataProtection: {
      title: "Privacy policy",
      intro: "The following information gives a simple overview of what happens to your personal data when you visit this website. Personal data means any data by which you can be personally identified.",
      sections: [
        { title: "1. Privacy at a glance", paragraphs: [
          "General information: The following information provides a simple overview of what happens to your personal data when you visit this website. Personal data means any data by which you can be personally identified.",
          "Controller: Insides by Intimate Insights (GbR / pre-formation phase), represented by Anne-Maria Miller-Hermann, Jil Clausen and Ifrah Asif, c/o StartUp Center of the Kempten University of Applied Sciences, Rottachstraße 11, 87435 Kempten (Allgäu), Germany, email: info@insides-official.com, phone: +49 179 6865673.",
        ] },
        { title: "2. Hosting and provision of the website", paragraphs: [
          "This website is hosted externally. The personal data collected on this website is stored on the hoster's servers. This may include IP addresses, meta and communication data, and website access information.",
          "Host: [e.g. Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA / or Framer B.V.]",
          "Legal basis: Art. 6(1)(f) GDPR (legitimate interest in a secure, fast and error-free provision of our online offering).",
          "Data transfer to third countries: Where data is processed outside the EU/EEA, this is done on the basis of standard contractual clauses (SCCs) of the EU Commission and the EU-U.S. Data Privacy Framework.",
        ] },
        { title: "3. Data collection on this website", paragraphs: [
          "Waitlist / early registration form (“Be the first to know when we launch”): When you register for updates and the launch of Insides via our form, we collect the following data: • Your email address • Your first and last name (if provided) • Your selected user group (e.g. student, teacher, parent, investor).",
          "Purpose of processing: Contacting you, informing you about the launch of the platform and preparing our offering based on interest.",
          "Legal basis: Your voluntary consent in accordance with Art. 6(1)(a) GDPR.",
          "Withdrawal: You can revoke your consent at any time with effect for the future by email to info@insides-official.com.",
          "Retention period: We store your information until you revoke your consent or the purpose of the data collection has been fulfilled (for example, launch notification).",
          "Use of Google Apps Script & Google Sheets: The data entered in the form is automatically transmitted via Google Apps Script to a protected table in Google Drive (Google Workspace, provided by Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Ireland) and stored there.",
          "Access is restricted to the founding team. A contract for commissioned processing (AVV) in accordance with Art. 28 GDPR and/or standard contractual clauses (SCCs) exists with the provider for any transfers to parent companies in the US.",
          "Contact via email or telephone: If you contact us by email or telephone, your request, including any personal data arising from it, will be stored and processed for the purpose of handling your request (Art. 6(1)(b) GDPR for the performance of pre-contractual measures or Art. 6(1)(f) GDPR for legitimate interest in an effective handling of inquiries).",
        ] },
        { title: "4. Your rights as a data subject", paragraphs: [
          "You have the right, under the applicable legal provisions, to request information about the personal data we store about you, its origin and recipients, and the purpose of processing (Art. 15 GDPR).",
          "You have the right to correct inaccurate data or complete it (Art. 16 GDPR).",
          "You have the right to delete personal data stored by us (“right to be forgotten”, Art. 17 GDPR).",
          "You have the right to restrict processing (Art. 18 GDPR).",
          "You have the right to data portability in a common, machine-readable format (Art. 20 GDPR).",
          "You have the right to withdraw your consent at any time with effect for the future (Art. 7(3) GDPR).",
          "You have the right to object to processing based on legitimate interests (Art. 21 GDPR).",
          "Please contact us at any time: info@insides-official.com.",
        ] },
        { title: "Right to lodge a complaint with the competent supervisory authority", paragraphs: [
          "If there are data protection violations, you have the right to lodge a complaint with a competent supervisory authority. Since the Startup Center is based in Bavaria, the primary competent authority is:",
          "Bavarian State Office for Data Protection Supervision (BayLDA)",
          "Promenade 18",
          "91522 Ansbach",
          { text: "Web: https://www.lda.bayern.de", href: "https://www.lda.bayern.de" },
        ] },
      ],
    },
    disclaimer: {
      title: "Disclaimer",
      intro: "The following information is general in nature and is not a substitute for individual legal advice.",
      sections: [
        { title: "1. Warning regarding content (not medical or psychological advice)", paragraphs: ["The content on this website has been created with the greatest possible care. It is intended solely for informational, educational and awareness purposes and expressly does not constitute medical, therapeutic, psychological or legal advice. The information provided cannot and should not replace an individual diagnosis, consultation or treatment by qualified professionals (for example physicians, psychotherapists, or recognized advisory services)."] },
        { title: "2. Liability for own content", paragraphs: ["As a service provider, we are responsible for our own content on these pages in accordance with § 7(1) of the German Digital Services Act (DDG) under the general laws. However, according to §§ 8 to 10 DDG, we as service providers are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that suggest unlawful activity. Our obligations to remove or block the use of information under general law remain unaffected. Liability in this regard is only possible from the point at which a concrete legal violation is known. If we become aware of such violations, we will remove the content immediately."] },
        { title: "3. Liability for external links", paragraphs: ["Our website contains links to external websites of third parties over which we have no influence. We therefore cannot assume any responsibility for these external contents. The respective provider or operator of the linked pages is always responsible for the content of those pages. The linked pages were checked for possible legal violations at the time of linking. No unlawful content was apparent at the time of linking. However, permanent monitoring of the linked websites is not reasonable without concrete evidence of a violation. If we become aware of legal violations, we will remove such links immediately."] },
        { title: "4. Copyright and usage rights", paragraphs: ["The content, texts, graphics and media created by the site operators are subject to German copyright law. Reproduction, editing, distribution and any form of use beyond the limits of copyright require the prior written consent of the respective rights holders. Where content was created in part with the assistance of generative AI systems, it remains subject to our editorial review and editing.", "Where content on this page was not created by the operator, third-party copyrights are respected. In particular, third-party content is clearly identified as such. Depicted brands, logos and marks of universities, funding programmes or other cooperation partners remain the exclusive property of their respective rights holders. If you nevertheless become aware of a copyright infringement, we ask that you inform us. If we become aware of a violation, we will remove such content immediately."] },
      ],
    },
    cookies: {
      title: "Cookies and similar technologies",
      intro: "Our website itself does not set cookies for analysis, marketing or advertising purposes. We do not use tracking pixels, ad networks or profiling analytics tools (such as Google Analytics or Meta Pixel). An active cookie consent banner is therefore currently not required.",
      sections: [
        { title: "1. Principle: no tracking or advertising cookies", paragraphs: ["Our website itself does not set cookies for analysis, marketing or advertising purposes. We do not use tracking pixels, ad networks or profiling analytics tools (such as Google Analytics or Meta Pixel). An active cookie consent banner is therefore currently not required."] },
        { title: "2. Technically necessary data processing and hosting", paragraphs: ["When you access our website, the hosting provider may process technically necessary data or create temporary session cookies or server log files to ensure the pages are delivered correctly and securely.", "Legal basis: § 25(2)(2) TDDDG (technically necessary for the provision of the telemedia service explicitly requested by the user) and Art. 6(1)(f) GDPR (legitimate interest in stable and secure website operation)."] },
        { title: "3. Sign-up form (Google Apps Script & Google Sheets)", paragraphs: ["When you submit the early registration form (“Be the first to know when we launch”), the information you enter is transmitted directly via an application programming interface (Google Apps Script API) to a protected table in Google Drive.", "No third-party tracking cookies are stored on your device in this process.", "The transfer of form data is encrypted (HTTPS) and used solely for the stated purpose, based on your voluntary consent in accordance with Art. 6(1)(a) GDPR."] },
        { title: "4. Future changes and consent requirement", paragraphs: ["If we integrate optional analytics, marketing tools or third-party media in the future (for example embedded video players that set cookies), we will implement a privacy-compliant consent management solution (cookie banner under Art. 6(1)(a) GDPR in conjunction with § 25(1) TDDDG) before activating them."] },
      ],
    },
  },
};

function LegalDialog({ page, lang, onClose }) {
  const content = LEGAL_CONTENT[lang][page];

  useEffect(() => {
    const handleKeyDown = event => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      role="presentation"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose();
      }}
      style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(12,28,48,0.68)", padding: "24px 16px", display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <section role="dialog" aria-modal="true" aria-labelledby="legal-dialog-title"
        style={{ width: "100%", maxWidth: 760, maxHeight: "min(86vh, 900px)", overflowY: "auto", background: C.cream, borderRadius: 20, padding: "clamp(24px,5vw,48px)", boxSizing: "border-box", position: "relative" }}>
        <button type="button" onClick={onClose} aria-label={lang === "de" ? "Schließen" : "Close"}
          style={{ position: "absolute", right: 20, top: 20, border: 0, borderRadius: "50%", width: 40, height: 40, cursor: "pointer", background: "white", color: C.midnight, fontSize: 22 }}>×</button>
        <p style={{ color: C.violet, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 12px" }}>
          {lang === "de" ? "Insides · Rechtliches" : "Insides · Legal"}
        </p>
        <h2 id="legal-dialog-title" style={{ fontFamily: "'Champ', sans-serif", color: C.midnight, fontSize: "clamp(30px,5vw,44px)", margin: "0 48px 14px 0" }}>{content.title}</h2>
        <p style={{ color: "#555", fontSize: 15, lineHeight: 1.75, marginBottom: 28 }}>{content.intro}</p>
        {content.sections.map(section => (
          <section key={section.title} style={{ marginBottom: 24 }}>
            <h3 style={{ color: C.midnight, fontSize: 18, margin: "0 0 8px" }}>{section.title}</h3>
            {section.paragraphs.map((paragraph, index) => (
              <p key={typeof paragraph === "string" ? paragraph : `${section.title}-${index}`} style={{ color: "#555", fontSize: 14, lineHeight: 1.75, margin: "0 0 8px" }}>
                {typeof paragraph === "string" ? paragraph : <><a href={paragraph.href} style={{ color: C.midnight }}>{paragraph.text}</a></>}
              </p>
            ))}
          </section>
        ))}
        <button type="button" onClick={onClose}
          style={{ marginTop: 4, padding: "11px 22px", background: C.midnight, color: "white", border: 0, borderRadius: 50, cursor: "pointer", fontFamily: "'Alecrim', sans-serif" }}>
          {lang === "de" ? "Zurück zur Website" : "Back to website"}
        </button>
      </section>
    </div>
  );
}

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
// AboutMockup component removed — mockup intentionally omitted from About section

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

const teamImages = [
  { src: "/Jil%20and%20Anne.jpeg", alt: { de: "Jil und Anne", en: "Jil and Anne" } },
  { src: "/Rocketeer%20Festival%20selfie.jpeg", alt: { de: "Anne, Ifrah und Tooba beim Rocketeer Festival", en: "Anne, Ifrah and Tooba at Rocketeer Festival" } },
  { src: "/Rocketeer%20Festival%20grp%20pic.jpeg", alt: { de: "Das Insides-Team beim Rocketeer Festival", en: "The Insides team at Rocketeer Festival" } },
  { src: "/KANU%20Event%20Pitchdeck10.jpeg", alt: { de: "Das Team bei einer Veranstaltung von KANU", en: "The team at a KANU event" } },
  { src: "/KANU%20Event%20Pitchdeck7.jpeg", alt: { de: "Das Insides-Team präsentiert sein Projekt", en: "The Insides team presenting its project" } },
  { src: "/jill.jpeg", alt: { de: "Jil bei einer Präsentation", en: "Jil giving a presentation" } },
  { src: "/KANU%20Anne%20Certificate.png", alt: { de: "Anne bei einer Preisverleihung", en: "Anne at an award event" } },
  { src: "/Jil%20Pregnancy%20pic.png", alt: { de: "Jil und Anne in der Natur", en: "Jil and Anne outdoors" } },
  { src: "/KANU-Event%20-%20Pitch%20(3).png", alt: { de: "Das Team stellt Insides bei einer Veranstaltung vor", en: "The team presenting Insides at an event" } },
];

function TeamSection({ t, lang }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide(current => (current + 1) % teamImages.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [isPaused]);

  const moveSlide = direction => {
    setActiveSlide(current => (current + direction + teamImages.length) % teamImages.length);
  };
  const getSlideOffset = index => {
    let offset = index - activeSlide;
    if (offset > teamImages.length / 2) offset -= teamImages.length;
    if (offset < -teamImages.length / 2) offset += teamImages.length;
    return offset;
  };

  return (
    <section id="team" style={{ padding: "100px 24px", background: "white" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <p style={{ fontSize: 12, letterSpacing: 3, color: C.violet, textTransform: "uppercase", marginBottom: 16 }}>{t.team.label}</p>
            <h2 style={{ fontFamily: "'Champ', sans-serif", fontSize: "clamp(30px,5vw,52px)", color: C.midnight, lineHeight: 1.1, margin: 0 }}>{t.team.headline}</h2>
          </div>
          <div style={{ maxWidth: 2400, margin: "0 auto 48px", textAlign: "center" }}>
            <p style={{ color: "#555", fontSize: 17, lineHeight: 1.8, margin: "0 auto 20px", maxWidth: 2400 }}>{t.team.intro}</p>
            <p style={{ color: C.midnight, fontSize: 17, fontWeight: 600, lineHeight: 1.8, margin: "0 auto", maxWidth: 2400 }}>{t.team.motivation}</p>
          </div>
        </FadeIn>

        <FadeIn>
          <div
            role="region"
            aria-roledescription="carousel"
            aria-label={lang === "de" ? "Bilder des Insides-Teams" : "Insides team photos"}
            style={{ maxWidth: 912, margin: "0 auto 56px" }}
          >
            <div style={{ position: "relative", height: "clamp(280px, 52vw, 500px)", overflow: "hidden", borderRadius: 20 }}>
              {teamImages.map((image, index) => {
                const offset = getSlideOffset(index);
                if (Math.abs(offset) > 1) return null;
                const isActive = offset === 0;
                return (
                  <motion.button
                    key={image.src}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    aria-label={image.alt[lang]}
                    aria-current={isActive ? "true" : undefined}
                    initial={false}
                    animate={{
                      x: `${offset * 87}%`,
                      scale: isActive ? 1 : 0.82,
                      opacity: isActive ? 1 : 0.55,
                      filter: isActive ? "blur(0px)" : "blur(4px)",
                    }}
                    transition={{ duration: 0.55, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      top: "5%",
                      left: "14%",
                      width: "72%",
                      height: "90%",
                      padding: 0,
                      overflow: "hidden",
                      border: 0,
                      borderRadius: 20,
                      background: C.cream,
                      boxShadow: isActive ? "0 16px 40px rgba(38,103,187,0.2)" : "none",
                      cursor: isActive ? "default" : "pointer",
                      zIndex: isActive ? 2 : 1,
                    }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt[lang]}
                      style={{ display: "block", width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  </motion.button>
                );
              })}
              <button
                type="button"
                onClick={() => moveSlide(-1)}
                aria-label={lang === "de" ? "Vorheriges Bild" : "Previous image"}
                style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, border: "none", borderRadius: "50%", background: "rgba(255,255,255,0.9)", color: C.midnight, fontSize: 24, cursor: "pointer", zIndex: 1 }}
              >‹</button>
              <button
                type="button"
                onClick={() => moveSlide(1)}
                aria-label={lang === "de" ? "Nächstes Bild" : "Next image"}
                style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", width: 44, height: 44, border: "none", borderRadius: "50%", background: "rgba(255,255,255,0.9)", color: C.midnight, fontSize: 24, cursor: "pointer", zIndex: 1 }}
              >›</button>
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 12, flexWrap: "wrap", marginTop: 16 }}>
              {teamImages.map((image, index) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={lang === "de" ? `Bild ${index + 1} von ${teamImages.length}` : `Slide ${index + 1} of ${teamImages.length}`}
                  aria-current={activeSlide === index ? "true" : undefined}
                  style={{ width: 10, height: 10, padding: 0, border: "none", borderRadius: "50%", background: activeSlide === index ? C.midnight : "rgba(38,103,187,0.25)", cursor: "pointer" }}
                />
              ))}
              <button
                type="button"
                onClick={() => setIsPaused(paused => !paused)}
                style={{ border: "none", background: "none", color: C.midnight, fontSize: 13, cursor: "pointer", fontFamily: "'Alecrim', sans-serif" }}
              >
                {isPaused
                  ? (lang === "de" ? "Diashow fortsetzen" : "Play slideshow")
                  : (lang === "de" ? "Diashow pausieren" : "Pause slideshow")}
              </button>
            </div>
          </div>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 20 }}>
          {t.team.profiles.map((profile, index) => (
            <FadeIn key={profile.name} delay={index * 0.1}>
              <article style={{ height: "100%", boxSizing: "border-box", padding: 28, borderRadius: 20, background: C.cream, border: "1px solid rgba(38,103,187,0.08)" }}>
                <h3 style={{ fontFamily: "'Champ', sans-serif", color: C.midnight, fontSize: 27, margin: "0 0 10px" }}>{profile.name}</h3>
                <p style={{ color: C.evergreen, fontSize: 14, fontWeight: 600, lineHeight: 1.6, margin: "0 0 16px" }}>{profile.role}</p>
                <p style={{ color: "#555", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{profile.quote}</p>
              </article>
            </FadeIn>
          ))}
        </div>
        <FadeIn>
          <div style={{ textAlign: "center", marginTop: 48 }}>
            <h3 style={{ fontFamily: "'Champ', sans-serif", color: C.midnight, fontSize: 24, margin: "0 0 10px" }}>{t.team.advisorsLabel}</h3>
            <p style={{ color: "#666", fontSize: 16, margin: 0 }}>{t.team.advisors}</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ── MAIN APP ──────────────────────────────────────────────
export default function App() {
  const [lang, setLang] = useState("de");
  const [legalPage, setLegalPage] = useState(null);
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
          <p style={{ color: "#777", fontSize: 12, lineHeight: 1.6, margin: "12px 8px 0" }}>
            {lang === "de" ? "Informationen zur Verarbeitung deiner Daten: " : "How we process your information: "}
            <button type="button" onClick={() => setLegalPage("dataProtection")}
              style={{ background: "none", border: 0, padding: 0, color: C.midnight, cursor: "pointer", textDecoration: "underline", font: "inherit" }}>
              {lang === "de" ? "Datenschutzerklärung" : "Privacy policy"}
            </button>
          </p>
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
                {/* Audience Cards (adapted from provided Tailwind markup) */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="audience-grid"
                >
                  {/* Card 1 */}
                  <motion.div whileHover={{ y: -6 }} style={{ background: C.pale, color: "black", padding: 28, borderRadius: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.blush, marginBottom: 8 }}>{lang === "de" ? "Für Junge Menschen" : "For Young People"}</div>
                      <h3 style={{ fontSize: 28, fontWeight: 900, margin: "0 0 12px", lineHeight: 1.05 }}>{lang === "de" ? <>Echter Talk.<br />Ohne Urteil.</> : <>Real talk.<br />No judgement.</>}</h3>
                      <p style={{ color: "rgb(66, 54, 32)", fontSize: 14, lineHeight: 1.6 }}>{lang === "de" ? "Fragen zu Beziehungen, Identität, Konsens oder Lust? Schluss mit toxischen Social-Media-Trends und unrealistischen Erwartungen. Insides bietet dir einen vollständig anonymen, moderierten Raum – mit nachvollziehbaren Charakteren, Peer-Austausch und privater KI-Begleitung." : "Questions about relationships, identity, consent or desire? Say goodbye to toxic social-media trends and unrealistic expectations. Insides offers a fully anonymous, moderated space — realistic characters, peer exchange and a private AI companion."}</p>
                    </div>
                    <a href="/genz" style={{ marginTop: 18, color: C.blush, fontWeight: 700, textDecoration: "none" }}>{lang === "de" ? "Zur Plattform →" : "Visit platform →"}</a>
                  </motion.div>

                  {/* Card 2 */}
                  <motion.div whileHover={{ y: -6 }} style={{ background: "rgba(255,255,255,0.06)", color: "white", padding: 28, borderRadius: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.blush, marginBottom: 8 }}>{lang === "de" ? "Für Eltern" : "For Parents"}</div>
                      <h3 style={{ fontSize: 24, fontWeight: 900, margin: "0 0 12px", lineHeight: 1.05 }}>{lang === "de" ? "Dein Verbündeter in einer hyperdigitalen Welt." : "Your ally in a hyper-digital world."}</h3>
                      <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 14, lineHeight: 1.6 }}>{lang === "de" ? "Kinder und Jugendliche haben heutzutage, lange bevor sie diese einordnen können, Zugang zu den unterschiedlichsten digitalen Inhalten. Online fehlen bisher jedoch sichere und fundierte Inhalte. Insides bietet so ein Angebot, um Jugendliche in der Entwicklung ihrer Beziehungskompetenz zu begleiten." : "Children and young people today encounter a wide range of digital content long before they can contextualize it. There is a lack of safe, evidence-based audiovisual content online. Insides offers resources to support young people in developing relationship skills and exploring their sexuality safely."}</p>
                    </div>
                    <a href="/parents" style={{ marginTop: 18, color: C.blush, fontWeight: 700, textDecoration: "none" }}>{lang === "de" ? "Wie wir Kinder schützen →" : "How we protect children →"}</a>
                  </motion.div>

                  {/* Card 3 */}
                  <motion.div whileHover={{ y: -6 }} style={{ background: C.evergreen, color: "white", padding: 28, borderRadius: 24, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{lang === "de" ? "Für Schulen & Lehrkräfte" : "For Schools & Educators"}</div>
                      <h3 style={{ fontSize: 24, fontWeight: 900, margin: "0 0 12px", lineHeight: 1.05 }}>{lang === "de" ? "Moderne Medienkompetenz für deinen Unterricht." : "Modern media literacy for your classroom."}</h3>
                      <p style={{ color: "rgba(255,255,255,0.9)", fontSize: 14, lineHeight: 1.6 }}>{lang === "de" ? "Sexualkundeunterricht ist ein wichtiger Zugang für Jugendliche zu Wissen über Sexualität. Wir helfen Lehrkräften, ihre Schüler:innen wirklich zu erreichen. Insides ist dein digitaler pädagogischer Assistent." : "Sex education is an important channel for young people to learn about sexuality. We support teachers in reaching students effectively — Insides acts as your digital pedagogical assistant."}</p>
                    </div>
                    <a href="/educators" style={{ marginTop: 18, color: "white", fontWeight: 700, textDecoration: "underline" }}>{lang === "de" ? "Demo für Institutionen anfragen →" : "Request an institutional demo →"}</a>
                  </motion.div>

                  {/* Card 4 */}
                  <motion.div whileHover={{ y: -6 }} style={{ background: "white", color: C.midnight, padding: 28, borderRadius: 24, display: "flex", flexDirection: "column", justifyContent: "space-between", border: "1px solid rgba(38,103,187,0.06)" }}>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase", color: C.midnight, marginBottom: 8 }}>{lang === "de" ? "Für Investor:innen" : "For Investors"}</div>
                      <h3 style={{ fontSize: 24, fontWeight: 900, margin: "0 0 12px", lineHeight: 1.05 }}>{lang === "de" ? "Skalierbare Wirkung an der Schnittstelle von EdTech & Digital Health." : "Scalable impact at the intersection of EdTech & Digital Health."}</h3>
                      <p style={{ color: "#333", fontSize: 14, lineHeight: 1.6 }}>{lang === "de" ? "„Insides“ befasst sich mit einem gravierenden, systemischen Marktversagen zwischen privaten Online-Recherchen und der institutionellen Bildung. Unser SaaS-Modell sorgt für margenstarkes Wachstum und trägt zur Lösung eines globalen Public-Health-Problems bei." : "Insides addresses a major systemic market failure between private online research and institutional education. Our layered SaaS model delivers margin-strong growth while contributing to a global public-health solution."}</p>
                    </div>
                    <a href="/investors" style={{ marginTop: 18, color: C.midnight, fontWeight: 700, textDecoration: "none" }}>{lang === "de" ? "Investor Relations →" : "Investor relations →"}</a>
                  </motion.div>
                </motion.div>
              </div>
              {/* RIGHT — team mockup illustration removed */}
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

      <TeamSection t={t} lang={lang} />

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
              { label: t.contact.linkedin, href: "https://www.linkedin.com/company/insides-by-intimate-insights/", icon: "linkedin" },
              { label: "@insides_official", href: "https://www.instagram.com/insides_official/", icon: "instagram" },
              { label: "@insides_fuer_eltern", href: "https://www.instagram.com/insides_fuer_eltern/", icon: "instagram" },
            ].map((l, i) => (
              <motion.a key={i} href={l.href} target="_blank" rel="noreferrer"
                whileHover={{ scale: 1.04, background: C.blush, borderColor: C.blush, color: C.midnight }}
                style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.1)", color: "white", borderRadius: 50, padding: "13px 26px", textDecoration: "none", fontSize: 15, border: "1.5px solid rgba(255,255,255,0.15)" }}>
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", lineHeight: 0 }}>
                  {l.icon === "linkedin" ? (
                    <svg aria-hidden="true" viewBox="0 0 24 24" style={{ display: "block", width: 18, height: 18, fill: "#0A66C2" }}>
                      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.44-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12Zm1.78 13.02H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.44c.98 0 1.79-.77 1.79-1.72V1.72C24 .77 23.19 0 22.21 0h.01Z" />
                    </svg>
                  ) : l.icon === "instagram" ? (
                    <svg aria-hidden="true" viewBox="0 0 24 24" style={{ display: "block", width: 18, height: 18, fill: "none", stroke: `url(#instagram-gradient-${i})`, strokeWidth: 2 }}>
                      <defs>
                        <linearGradient id={`instagram-gradient-${i}`} x1="0%" y1="100%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#FFDC80" />
                          <stop offset="50%" stopColor="#F56040" />
                          <stop offset="100%" stopColor="#C13584" />
                        </linearGradient>
                      </defs>
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="18" cy="6" r="1" style={{ fill: "#C13584", stroke: "none" }} />
                    </svg>
                  ) : l.icon}
                </span>
                {l.label}
              </motion.a>
            ))}
          </div>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 14, lineHeight: 1.8, margin: "24px 0 0" }}>
            {lang === "de" ? "Oder ruf uns einfach an unter " : "Or simply call us on "}
            <a href="tel:+491796865673" style={{ color: "white", textDecoration: "underline", textUnderlineOffset: 3 }}>+49 179 6865673</a>
            {lang === "de" ? " oder schreib uns eine E-Mail an " : " or email us at "}
            <a href="mailto:info@insides-official.com" style={{ color: "white", textDecoration: "underline", textUnderlineOffset: 3 }}>info@insides-official.com</a>
          </p>
        </FadeIn>
      </section>

      {/* FOOTER */}
      <footer style={{ background: C.midnight, borderTop: "1px solid rgba(255,255,255,0.07)", padding: "24px", textAlign: "center", color: "rgba(255,255,255,0.65)", fontSize: 13 }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px 22px", marginBottom: 16 }}>
          {[
            { id: "imprint", label: lang === "de" ? "Impressum" : "Imprint" },
            { id: "dataProtection", label: lang === "de" ? "Datenschutz" : "Privacy" },
            { id: "disclaimer", label: lang === "de" ? "Haftungsausschluss" : "Disclaimer" },
            { id: "cookies", label: lang === "de" ? "Cookies" : "Cookies" },
          ].map(item => (
            <button key={item.id} type="button" onClick={() => setLegalPage(item.id)}
              style={{ background: "none", border: 0, color: "white", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 3, fontFamily: "'Alecrim', sans-serif", fontSize: 13 }}>
              {item.label}
            </button>
          ))}
        </div>
        <div>© 2026 Insides by Intimate Insights — {t.footer}</div>
      </footer>

      <style>{`
        @media(max-width:768px){
          .desk-nav{display:none!important}
          .hamburger{display:block!important}
        }
        .audience-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;margin-top:24px}
        @media(max-width:768px){
          .audience-grid{grid-template-columns:1fr}
        }
      `}</style>
      {legalPage && <LegalDialog page={legalPage} lang={lang} onClose={() => setLegalPage(null)} />}
    </div>
  );
}