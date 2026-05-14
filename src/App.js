import { useState, useEffect, useRef } from 'react';
import { Download, ArrowRight } from 'lucide-react';
import './App.css';
import CountUp from './components/CountUp';
import TopNav from './components/TopNav';
import TextType from './components/TextType';
import FunnelChart from './components/FunnelChart';
import KanbanBoard from './components/KanbanBoard';
import OKRPanel from './components/OKRPanel';
import ToolsGrid from './components/ToolsGrid';

/* ─── Loading Screen ─────────────────────────────────────── */
const FULL_NAME = 'ANUSH GUPTA';
const LETTERS = FULL_NAME.split('');

const LoadingScreen = ({ onComplete }) => {
  const [revealedCount, setRevealedCount] = useState(0);
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    // Reveal one letter every 350ms
    const timers = LETTERS.map((_, i) =>
      setTimeout(() => setRevealedCount(i + 1), i * 350 + 400)
    );

    // Progress bar fills over ~4s
    const iv = setInterval(() => {
      setProgress((p) => {
        const next = p + Math.random() * 3 + 1.5;
        return next >= 100 ? 100 : next;
      });
    }, 120);

    // Hard deadline: always complete after 5.5s no matter what
    const deadline = setTimeout(() => {
      if (!doneRef.current) {
        doneRef.current = true;
        onComplete();
      }
    }, 5500);

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(iv);
      clearTimeout(deadline);
    };
  }, [onComplete]);

  // Complete as soon as progress hits 100 AND all letters shown
  useEffect(() => {
    if (progress >= 100 && revealedCount >= LETTERS.length && !doneRef.current) {
      doneRef.current = true;
      setTimeout(onComplete, 600);
    }
  }, [progress, revealedCount, onComplete]);

  const messages = [
    '🔮 Summoning magic...',
    '✨ Conjuring letters...',
    '🌟 Weaving spells...',
    '⚡ Revealing identity...',
    '🎭 Crafting presence...',
    '🎪 Almost complete...',
    '🎉 Welcome to my realm!',
  ];
  const msgIdx = Math.min(Math.floor(progress / (100 / messages.length)), messages.length - 1);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50"
      style={{ background: '#0d0e11' }}
    >
      {/* Wizard figure */}
      <div className="mb-8 relative">
        <div className="scene">
          <div className="wizard">
            <div className="body" />
            <div className="right-arm"><div className="right-hand" /></div>
            <div className="left-arm"><div className="left-hand" /></div>
            <div className="head">
              <div className="beard" />
              <div className="face"><div className="adds" /></div>
              <div className="hat">
                <div className="hat-of-the-hat" />
                <div className="four-point-star --first" />
                <div className="four-point-star --second" />
                <div className="four-point-star --third" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Letter reveal */}
      <div className="flex items-center justify-center mb-4" style={{ minHeight: 72 }}>
        {LETTERS.map((letter, i) => (
          i < revealedCount ? (
            <span
              key={i}
              className="letter-drop"
              style={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 800,
                fontSize: 'clamp(32px, 7vw, 64px)',
                marginRight: letter === ' ' ? '0.4em' : '0.04em',
                background: i % 3 === 0
                  ? 'linear-gradient(135deg,#4f6ef7,#06b6d4)'
                  : i % 3 === 1
                  ? 'linear-gradient(135deg,#7c3aed,#ec4899)'
                  : 'linear-gradient(135deg,#22c55e,#06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {letter}
            </span>
          ) : null
        ))}
      </div>

      {/* Status */}
      <p
        className="mb-6 text-sm"
        style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace' }}
      >
        {messages[msgIdx]}
      </p>

      {/* Progress bar */}
      <div
        className="w-64 h-1 rounded-full overflow-hidden"
        style={{ background: '#1c1f27' }}
      >
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            background: 'linear-gradient(90deg,#4f6ef7,#7c3aed)',
          }}
        />
      </div>
      <p
        className="mt-2 text-xs"
        style={{ color: '#252830', fontFamily: 'JetBrains Mono, monospace' }}
      >
        {Math.round(progress)}%
      </p>
    </div>
  );
};

/* ─── Section fade hook ──────────────────────────────────── */
const useFadeIn = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add('visible'); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
};

/* ─── Section label ──────────────────────────────────────── */
const SectionLabel = ({ ticket, title, sub }) => (
  <div className="mb-10">
    <div className="flex items-center gap-3 mb-3">
      <span
        className="text-xs px-2 py-1 rounded"
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          color: '#4f6ef7',
          background: 'rgba(79,110,247,0.1)',
          border: '1px solid rgba(79,110,247,0.3)',
        }}
      >
        {ticket}
      </span>
      <span
        className="text-xs px-2 py-1 rounded"
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          color: '#22c55e',
          background: 'rgba(34,197,94,0.1)',
          border: '1px solid rgba(34,197,94,0.3)',
        }}
      >
        ● ACTIVE
      </span>
    </div>
    <h2
      className="font-display mb-2"
      style={{ fontSize: 'clamp(28px,4vw,40px)', color: '#e8eaf0', fontFamily: 'Syne, sans-serif', fontWeight: 800 }}
    >
      {title}
    </h2>
    {sub && (
      <p style={{ color: '#6b7280', fontFamily: 'DM Sans, sans-serif', fontSize: 15 }}>{sub}</p>
    )}
  </div>
);

/* ─── Divider ────────────────────────────────────────────── */
const Divider = () => (
  <div className="w-full h-px" style={{ background: '#252830' }} />
);

/* ─── Contact Form ───────────────────────────────────────── */
const ContactForm = () => {
  const [form, setForm] = useState({ title: '', email: '', message: '' });
  const [priority, setPriority] = useState('P1');
  const [submitted, setSubmitted] = useState(false);
  const [ticketId] = useState(() => Math.floor(100 + Math.random() * 900));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.email) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div
        className="rounded-lg p-6 text-center"
        style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.3)' }}
      >
        <p className="text-lg font-bold mb-2" style={{ color: '#22c55e', fontFamily: 'JetBrains Mono, monospace' }}>
          ✅ Ticket created: AG-INBOX-{ticketId}
        </p>
        <p className="text-sm" style={{ color: '#9ca3af', fontFamily: 'DM Sans, sans-serif' }}>
          Thanks! I'll get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg p-6"
      style={{ background: '#14161b', border: '1px solid #252830' }}
    >
      <div className="flex items-center justify-between mb-5 pb-4" style={{ borderBottom: '1px solid #252830' }}>
        <span className="text-sm font-semibold" style={{ color: '#e8eaf0', fontFamily: 'DM Sans, sans-serif' }}>New Message</span>
        <span className="text-xs" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace' }}>AG-INBOX</span>
      </div>

      <div className="flex flex-col gap-4 mb-5">
        <div>
          <label className="block text-xs mb-1" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace' }}>Title *</label>
          <input
            type="text"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="What's on your mind?"
            className="w-full px-3 py-2 rounded text-sm outline-none transition-all duration-200"
            style={{ background: '#1c1f27', border: '1px solid #252830', color: '#e8eaf0', fontFamily: 'DM Sans, sans-serif' }}
            onFocus={(e) => { e.target.style.borderColor = 'rgba(79,110,247,0.5)'; }}
            onBlur={(e) => { e.target.style.borderColor = '#252830'; }}
          />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace' }}>Email *</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            className="w-full px-3 py-2 rounded text-sm outline-none transition-all duration-200"
            style={{ background: '#1c1f27', border: '1px solid #252830', color: '#e8eaf0', fontFamily: 'DM Sans, sans-serif' }}
            onFocus={(e) => { e.target.style.borderColor = 'rgba(79,110,247,0.5)'; }}
            onBlur={(e) => { e.target.style.borderColor = '#252830'; }}
          />
        </div>
        <div>
          <label className="block text-xs mb-1" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace' }}>Message</label>
          <textarea
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            placeholder="Tell me about your product challenge..."
            className="w-full px-3 py-2 rounded text-sm outline-none transition-all duration-200 resize-none"
            style={{ background: '#1c1f27', border: '1px solid #252830', color: '#e8eaf0', fontFamily: 'DM Sans, sans-serif' }}
            onFocus={(e) => { e.target.style.borderColor = 'rgba(79,110,247,0.5)'; }}
            onBlur={(e) => { e.target.style.borderColor = '#252830'; }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace' }}>Priority:</span>
          {['P0', 'P1', 'P2'].map((p) => {
            const colors = { P0: '#ef4444', P1: '#f59e0b', P2: '#4f6ef7' };
            const active = priority === p;
            return (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className="px-2 py-1 rounded text-xs transition-all duration-200"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  background: active ? colors[p] + '25' : 'transparent',
                  color: active ? colors[p] : '#6b7280',
                  border: `1px solid ${active ? colors[p] + '60' : '#252830'}`,
                }}
              >
                {p}
              </button>
            );
          })}
        </div>
        <button
          type="submit"
          className="flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold transition-all duration-200"
          style={{ background: '#4f6ef7', color: '#fff', fontFamily: 'JetBrains Mono, monospace' }}
          onMouseEnter={(e) => { e.currentTarget.style.background = '#3b5bdb'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = '#4f6ef7'; }}
        >
          Assign to Anush <ArrowRight size={14} />
        </button>
      </div>
    </form>
  );
};

/* ─── Main App ───────────────────────────────────────────── */
const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  const [copied, setCopied] = useState(null);

  const sections = ['home', 'about', 'metrics', 'experience', 'skills', 'contact'];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sectionsRef = useRef(sections);

  /* Active section detection */
  useEffect(() => {
    const handler = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sectionsRef.current.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionsRef.current[i]);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sectionsRef.current[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  /* Fade refs */
  const heroRef    = useFadeIn();
  const aboutRef   = useFadeIn();
  const metricsRef = useFadeIn();
  const expRef     = useFadeIn();
  const skillsRef  = useFadeIn();
  const contactRef = useFadeIn();

  if (isLoading) return <LoadingScreen onComplete={() => setIsLoading(false)} />;

  return (
    <div style={{ background: '#0d0e11', minHeight: '100vh' }}>
      <TopNav activeSection={activeSection} onNavigate={scrollTo} />

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section id="home" className="section-fade" ref={heroRef}
        style={{ paddingTop: 80, paddingBottom: 80, minHeight: '100vh', display: 'flex', alignItems: 'center' }}
      >
        <div className="w-full max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

            {/* Left — 3 cols */}
            <div className="lg:col-span-3">
              {/* Ticket meta */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                {[
                  { label: 'AG-001', color: '#4f6ef7', bg: 'rgba(79,110,247,0.1)', border: 'rgba(79,110,247,0.3)' },
                  { label: '● IN PROGRESS', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)' },
                  { label: 'Priority: P0', color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)' },
                  { label: 'Sprint: Q2-2026', color: '#6b7280', bg: 'rgba(107,114,128,0.1)', border: 'rgba(107,114,128,0.3)' },
                ].map((tag) => (
                  <span
                    key={tag.label}
                    className="text-xs px-2 py-1 rounded"
                    style={{ fontFamily: 'JetBrains Mono, monospace', color: tag.color, background: tag.bg, border: `1px solid ${tag.border}` }}
                  >
                    {tag.label}
                  </span>
                ))}
              </div>

              {/* Name */}
              <div className="mb-4">
                <div
                  className="hero-name leading-none"
                  style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(52px,8vw,96px)', color: '#e8eaf0', lineHeight: 1 }}
                >
                  ANUSH
                </div>
                <div
                  className="hero-name hero-underline leading-none"
                  style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: 'clamp(52px,8vw,96px)', color: '#e8eaf0', lineHeight: 1 }}
                >
                  GUPTA
                </div>
              </div>

              {/* Terminal line */}
              <div
                className="mb-4 text-sm"
                style={{ fontFamily: 'JetBrains Mono, monospace', color: '#4f6ef7' }}
              >
                {'> '}
                <TextType
                  words={[
                    'product_manager --mode=growth --environment=startup',
                    'shipping ideas since 2024 // currently: open_to_work',
                    'turning half-baked docs into shipped products',
                  ]}
                  typingSpeed={55}
                  deletingSpeed={30}
                  delayBetweenWords={2500}
                  className=""
                />
              </div>

              {/* One-liner */}
              <p className="mb-8 text-base" style={{ color: '#9ca3af', fontFamily: 'DM Sans, sans-serif', maxWidth: 480 }}>
                I turn half-baked Notion docs into shipped products. Give me ambiguity — I'll give you a roadmap.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => scrollTo('about')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold transition-all duration-200"
                  style={{ background: '#4f6ef7', color: '#fff', fontFamily: 'JetBrains Mono, monospace' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#3b5bdb'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#4f6ef7'; }}
                >
                  View PRD <ArrowRight size={14} />
                </button>
                <button
                  onClick={() => window.open('https://drive.google.com/file/d/18zozP6xXi940m8i99zVl4RNjaY051mlD/view?usp=sharing', '_blank')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded text-sm font-semibold transition-all duration-200"
                  style={{ background: 'transparent', color: '#9ca3af', border: '1px solid #252830', fontFamily: 'JetBrains Mono, monospace' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#4f6ef7'; e.currentTarget.style.color = '#4f6ef7'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#252830'; e.currentTarget.style.color = '#9ca3af'; }}
                >
                  Resume <Download size={14} />
                </button>
              </div>
            </div>

            {/* Right — stat panel */}
            <div className="lg:col-span-2">
              <div
                className="rounded-lg p-6"
                style={{ background: '#14161b', border: '1px solid #252830' }}
              >
                <p
                  className="text-xs mb-4 pb-3"
                  style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace', borderBottom: '1px solid #252830' }}
                >
                  PARK+ MOTOR INSURANCE
                </p>

                {/* Big metric */}
                <div className="mb-2">
                  <span
                    style={{
                      fontFamily: 'Syne, sans-serif', fontWeight: 800,
                      fontSize: 'clamp(48px,6vw,72px)',
                      background: 'linear-gradient(135deg,#4f6ef7,#22c55e)',
                      WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    }}
                  >
                    <CountUp end={180} suffix="%" duration={1500} />
                  </span>
                </div>
                <p className="text-sm mb-5" style={{ color: '#9ca3af', fontFamily: 'DM Sans, sans-serif' }}>
                  User Growth
                </p>

                {/* Sprint bar */}
                <div className="mb-5">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace' }}>8 wks sprint</span>
                    <span className="text-xs" style={{ color: '#22c55e', fontFamily: 'JetBrains Mono, monospace' }}>Done ✅</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: '#252830' }}>
                    <div className="h-full rounded-full" style={{ width: '100%', background: 'linear-gradient(90deg,#4f6ef7,#22c55e)' }} />
                  </div>
                </div>

                {/* Mini funnel */}
                <div className="flex flex-col gap-1.5">
                  {[
                    { label: '↑ Quotes',    w: '100%', color: '#4f6ef7' },
                    { label: '↑ Proposals', w: '65%',  color: '#7c3aed' },
                    { label: '↑ Purchases', w: '40%',  color: '#22c55e' },
                  ].map((row) => (
                    <div key={row.label} className="flex items-center gap-2">
                      <div className="h-1.5 rounded-full" style={{ width: row.w, background: row.color, minWidth: 20 }} />
                      <span className="text-xs" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>
                        {row.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── PRD / ABOUT ──────────────────────────────────────── */}
      <section id="about" className="section-fade" ref={aboutRef} style={{ padding: '80px 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel ticket="AG-002" title="Product Requirements Document" sub="Anush Gupta — Personal Brand v1.0" />

          {/* Notion doc header */}
          <div
            className="rounded-lg p-4 mb-8 flex flex-wrap gap-4 items-center"
            style={{ background: '#14161b', border: '1px solid #252830' }}
          >
            <span className="text-sm" style={{ color: '#9ca3af', fontFamily: 'DM Sans, sans-serif' }}>📄 Owner: <strong style={{ color: '#e8eaf0' }}>Anush Gupta</strong></span>
            <span className="text-xs px-2 py-1 rounded" style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)', fontFamily: 'JetBrains Mono, monospace' }}>✅ Approved</span>
            <span className="text-xs" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace' }}>Last edited: May 2026</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Left — PRD content */}
            <div className="flex flex-col gap-6">
              {[
                { color: 'blue',   heading: 'Objective', text: 'Turn ambiguity into shipped product. Fast. Give me a half-formed idea, a broken Figma flow, or a 3-bullet Notion doc — I\'ll turn it into something real.' },
                { color: 'purple', heading: 'Problem Statement', text: 'Most PMs wait for clarity before acting. Anush thrives in the chaos before clarity arrives.' },
                { color: 'green',  heading: 'User Persona (that\'s you)', text: 'You need someone who ships, not someone who plans to ship. Someone who owns the full loop: research → design → ship → measure.' },
                { color: 'amber',  heading: 'Key Behaviors', text: null, bullets: ['Owns the full loop: research → design → ship → measure', 'Writes PRDs that devs actually read', 'Asks "what does success look like" before writing a single line', 'Moves fast, ships fast, learns fast'] },
              ].map((block) => (
                <div
                  key={block.heading}
                  className={`notion-block ${block.color === 'purple' ? 'purple' : block.color === 'green' ? 'green' : block.color === 'amber' ? 'amber' : ''}`}
                >
                  <p className="text-xs mb-2" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {block.heading}
                  </p>
                  {block.text && (
                    <p className="text-sm leading-relaxed" style={{ color: '#9ca3af', fontFamily: 'DM Sans, sans-serif' }}>{block.text}</p>
                  )}
                  {block.bullets && (
                    <ul className="flex flex-col gap-1">
                      {block.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2 text-sm" style={{ color: '#9ca3af', fontFamily: 'DM Sans, sans-serif' }}>
                          <span style={{ color: '#4f6ef7', marginTop: 4 }}>›</span> {b}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>

            {/* Right — Property table */}
            <div>
              <div
                className="rounded-lg overflow-hidden"
                style={{ border: '1px solid #252830' }}
              >
                {[
                  { key: 'Status',       val: '● Open to Work',      valColor: '#22c55e' },
                  { key: 'Role',         val: 'Product Manager',      valColor: '#e8eaf0' },
                  { key: 'Environment',  val: 'Early-stage startup',  valColor: '#e8eaf0' },
                  { key: 'Superpower',   val: 'Ambiguity → Clarity',  valColor: '#4f6ef7' },
                  { key: 'Stack',        val: 'Figma · Jira · SQL · Notion', valColor: '#9ca3af' },
                  { key: 'Location',     val: 'Jaipur, India',        valColor: '#e8eaf0' },
                  { key: 'Availability', val: 'Immediate',            valColor: '#22c55e' },
                ].map((row, i, arr) => (
                  <div
                    key={row.key}
                    className="flex items-center"
                    style={{ borderBottom: i < arr.length - 1 ? '1px solid #252830' : 'none' }}
                  >
                    <div
                      className="px-4 py-3 w-36 flex-shrink-0"
                      style={{ background: '#14161b', borderRight: '1px solid #252830' }}
                    >
                      <span className="text-xs" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace' }}>{row.key}</span>
                    </div>
                    <div className="px-4 py-3 flex-1" style={{ background: '#1c1f27' }}>
                      <span className="text-sm" style={{ color: row.valColor, fontFamily: 'JetBrains Mono, monospace' }}>{row.val}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Trait pills */}
              <div className="flex flex-wrap gap-2 mt-6">
                {[
                  { label: '🎯 Strategic Thinker', color: '#4f6ef7' },
                  { label: '👥 User Advocate',     color: '#7c3aed' },
                  { label: '🏆 Innovation Leader', color: '#22c55e' },
                ].map((pill) => (
                  <span
                    key={pill.label}
                    className="px-3 py-1.5 rounded text-xs font-medium"
                    style={{
                      background: pill.color + '15',
                      color: pill.color,
                      border: `1px solid ${pill.color}40`,
                      fontFamily: 'JetBrains Mono, monospace',
                    }}
                  >
                    {pill.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ── METRICS DASHBOARD ────────────────────────────────── */}
      <section id="metrics" className="section-fade" ref={metricsRef} style={{ padding: '80px 0', background: '#0a0b0e' }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel ticket="AG-003" title="Product Analytics" sub="KPIs from Park+ Motor Insurance Internship" />

          {/* 4 metric cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {[
              { num: 180, suffix: '%', label: 'User Growth',  sub: '↑ vs baseline',  color: '#22c55e' },
              { num: 8,   suffix: ' wks', label: 'Timeline', sub: 'Sprint complete', color: '#4f6ef7' },
              { num: 3,   suffix: '-step', label: 'Funnel',  sub: 'Built & shipped', color: '#7c3aed' },
              { num: 100, suffix: '%',  label: 'Shipped',    sub: 'Full ownership',  color: '#f59e0b' },
            ].map((card) => (
              <div
                key={card.label}
                className="metric-card rounded-lg p-5 transition-all duration-200"
                style={{ background: '#14161b', border: '1px solid #252830' }}
              >
                <div
                  style={{
                    fontFamily: 'Syne, sans-serif', fontWeight: 800,
                    fontSize: 'clamp(28px,3vw,40px)',
                    color: card.color,
                  }}
                >
                  <CountUp end={card.num} suffix={card.suffix} duration={1200} />
                </div>
                <p className="text-sm font-semibold mt-1" style={{ color: '#e8eaf0', fontFamily: 'DM Sans, sans-serif' }}>{card.label}</p>
                <p className="text-xs mt-0.5" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace' }}>{card.sub}</p>
              </div>
            ))}
          </div>

          {/* Funnel chart */}
          <div
            className="rounded-lg p-6 mb-10"
            style={{ background: '#14161b', border: '1px solid #252830' }}
          >
            <p className="text-xs mb-6" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em' }}>
              CONVERSION FUNNEL — PARK+ MOTOR INSURANCE
            </p>
            <FunnelChart />
          </div>

          {/* Epic columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: 'AG-CONV', label: 'EPIC: CONVERSION', color: '#4f6ef7',
                items: ['Funnel redesign', 'Quote → Proposal UI', 'Trust signals'],
              },
              {
                id: 'AG-ENG', label: 'EPIC: ENGAGEMENT', color: '#7c3aed',
                items: ['WhatsApp flows', 'Retention triggers', 'Re-engagement'],
              },
              {
                id: 'AG-SCL', label: 'EPIC: SCALE', color: '#22c55e',
                items: ['Outbound calling', 'Feature readiness', 'Infrastructure'],
              },
            ].map((epic) => (
              <div
                key={epic.id}
                className="rounded-lg p-5"
                style={{ background: '#14161b', border: `1px solid ${epic.color}33` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold" style={{ color: epic.color, fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.08em' }}>
                    {epic.label}
                  </span>
                  <span className="text-xs" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}>{epic.id}</span>
                </div>
                <div className="flex flex-col gap-2 mb-4">
                  {epic.items.map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <span style={{ color: epic.color, fontSize: 10 }}>●</span>
                      <span className="text-sm" style={{ color: '#9ca3af', fontFamily: 'DM Sans, sans-serif' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <span
                  className="text-xs px-2 py-1 rounded"
                  style={{ background: 'rgba(34,197,94,0.1)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.3)', fontFamily: 'JetBrains Mono, monospace' }}
                >
                  ✅ Shipped
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* ── SPRINT BOARD / EXPERIENCE ─────────────────────────── */}
      <section id="experience" className="section-fade" ref={expRef} style={{ padding: '80px 0' }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel ticket="AG-004" title="Active Sprint — Q2 2026" sub="Board: ANUSH-GUPTA-CAREER" />
          <KanbanBoard />
        </div>
      </section>

      <Divider />

      {/* ── ROADMAP / SKILLS ──────────────────────────────────── */}
      <section id="skills" className="section-fade" ref={skillsRef} style={{ padding: '80px 0', background: '#0a0b0e' }}>
        <div className="max-w-6xl mx-auto px-6">
          <SectionLabel ticket="AG-005" title="Product Roadmap — Skills" sub="View: Quarterly  |  Group by: Domain" />

          {/* OKR Panel */}
          <div className="mb-10">
            <p
              className="text-xs mb-4"
              style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em' }}
            >
              Q2 2026 OKRs
            </p>
            <OKRPanel />
          </div>

          {/* Skill timeline — swimlanes */}
          <div
            className="rounded-lg p-6 mb-10 overflow-x-auto"
            style={{ background: '#14161b', border: '1px solid #252830' }}
          >
            <p className="text-xs mb-6" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em' }}>
              SKILL TIMELINE
            </p>
            <div className="flex flex-col gap-4" style={{ minWidth: 560 }}>
              {[
                { domain: 'STRATEGY', color: '#4f6ef7', pills: ['Roadmapping', 'Competitive Analysis', 'Park+ Strategy', '●'] },
                { domain: 'USER',     color: '#7c3aed', pills: ['Interviews', 'Journey Mapping', 'Park+ Research', '●'] },
                { domain: 'ANALYTICS',color: '#22c55e', pills: ['SQL Basics', 'KPI Tracking', 'A/B + Funnels', '●'] },
                { domain: 'TECH',     color: '#f59e0b', pills: ['Spring Boot', 'React', 'Docker', 'LLMs', '●'] },
              ].map((lane) => (
                <div key={lane.domain} className="flex items-center gap-3">
                  <span
                    className="text-xs w-20 flex-shrink-0 text-right"
                    style={{ color: lane.color, fontFamily: 'JetBrains Mono, monospace', fontSize: 10 }}
                  >
                    {lane.domain}
                  </span>
                  <div className="flex items-center gap-2 flex-1">
                    {lane.pills.map((pill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs flex-shrink-0"
                        style={{
                          background: pill === '●' ? lane.color : lane.color + '20',
                          color: pill === '●' ? '#0d0e11' : lane.color,
                          border: `1px solid ${lane.color}40`,
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: 10,
                        }}
                      >
                        {pill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tools grid */}
          <p className="text-xs mb-4" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em' }}>
            TOOLS & TECHNOLOGIES
          </p>
          <ToolsGrid />
        </div>
      </section>

      <Divider />

      {/* ── CONTACT ───────────────────────────────────────────── */}
      <section id="contact" className="section-fade" ref={contactRef} style={{ padding: '80px 0' }}>
        <div className="max-w-4xl mx-auto px-6">
          <SectionLabel ticket="AG-006" title="Let's Build Something" sub="Ready to discuss your next product challenge?" />

          {/* Callout */}
          <div
            className="rounded-lg p-5 mb-8"
            style={{ background: 'rgba(79,110,247,0.08)', border: '1px solid rgba(79,110,247,0.25)' }}
          >
            <p className="text-sm" style={{ color: '#9ca3af', fontFamily: 'DM Sans, sans-serif' }}>
              💡 I'm available for <strong style={{ color: '#e8eaf0' }}>PM roles, internships, and product consulting</strong>. Let's build something worth measuring.
            </p>
          </div>

          {/* Link database */}
          <div
            className="rounded-lg overflow-hidden mb-8"
            style={{ border: '1px solid #252830' }}
          >
            <div
              className="flex items-center px-4 py-2"
              style={{ background: '#14161b', borderBottom: '1px solid #252830' }}
            >
              <span className="text-xs" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em' }}>
                CONTACT DATABASE
              </span>
            </div>
            {[
              { icon: '📧', type: 'Email',    val: 'anushgupta105@gmail.com',                          href: 'mailto:anushgupta105@gmail.com',                                                    copyKey: 'email' },
              { icon: '💼', type: 'LinkedIn', val: 'linkedin.com/in/anush-gupta105',                   href: 'https://www.linkedin.com/in/anush-gupta105/',                                       copyKey: 'linkedin' },
              { icon: '💻', type: 'GitHub',   val: 'github.com/solmyst',                               href: 'https://github.com/solmyst',                                                        copyKey: 'github' },
              { icon: '📄', type: 'Resume',   val: 'Google Drive — View Resume',                       href: 'https://drive.google.com/file/d/18zozP6xXi940m8i99zVl4RNjaY051mlD/view?usp=sharing', copyKey: 'resume' },
            ].map((row, i, arr) => (
              <div
                key={row.type}
                className="flex items-center"
                style={{ borderBottom: i < arr.length - 1 ? '1px solid #252830' : 'none', background: '#1c1f27' }}
              >
                <div className="px-4 py-3 w-28 flex-shrink-0 flex items-center gap-2" style={{ borderRight: '1px solid #252830', background: '#14161b' }}>
                  <span>{row.icon}</span>
                  <span className="text-xs" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace' }}>{row.type}</span>
                </div>
                <div className="px-4 py-3 flex-1">
                  <span className="text-sm" style={{ color: '#9ca3af', fontFamily: 'JetBrains Mono, monospace' }}>{row.val}</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-3 flex-shrink-0">
                  <button
                    onClick={() => copyToClipboard(row.href, row.copyKey)}
                    className="text-xs px-2 py-1 rounded transition-all duration-200"
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      background: copied === row.copyKey ? 'rgba(34,197,94,0.15)' : '#252830',
                      color: copied === row.copyKey ? '#22c55e' : '#6b7280',
                      border: `1px solid ${copied === row.copyKey ? 'rgba(34,197,94,0.4)' : '#252830'}`,
                    }}
                  >
                    {copied === row.copyKey ? 'Copied ✓' : 'Copy'}
                  </button>
                  <a
                    href={row.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2 py-1 rounded transition-all duration-200"
                    style={{ fontFamily: 'JetBrains Mono, monospace', background: '#252830', color: '#6b7280', border: '1px solid #252830', textDecoration: 'none' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#4f6ef7'; e.currentTarget.style.borderColor = 'rgba(79,110,247,0.4)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = '#6b7280'; e.currentTarget.style.borderColor = '#252830'; }}
                  >
                    Open ↗
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Linear-style message form */}
          <ContactForm />
        </div>
      </section>

      <Divider />

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{ background: '#0d0e11', padding: '24px 0', borderTop: '1px solid #252830' }}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-col gap-1">
              <span className="text-xs" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace' }}>
                ANUSH-GUPTA-PORTFOLIO · Space: Personal Brand · Version: 1.0.0
              </span>
              <span className="text-xs" style={{ color: '#252830', fontFamily: 'JetBrains Mono, monospace' }}>
                Built with: React · Designed in: Figma · Tracked in: Jira
              </span>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs" style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace' }}>
                Last edited: May 2026 · Contributors: Anush G.
              </span>
              <span className="text-xs" style={{ color: '#252830', fontFamily: 'JetBrains Mono, monospace' }}>
                © 2026 Anush Gupta · anushgupta105@gmail.com
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
