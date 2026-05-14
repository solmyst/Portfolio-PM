import { useState, useEffect } from 'react';

const sectionLabels = {
  home: 'Hero',
  about: 'PRD',
  metrics: 'Metrics',
  experience: 'Sprint-Board',
  skills: 'Roadmap',
  contact: 'Contact',
};

const TopNav = ({ activeSection, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Main nav bar */}
      <nav
        className="flex items-center justify-between px-6 h-12 transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(13,14,17,0.85)'
            : 'rgba(13,14,17,0.95)',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(79,110,247,0.3)'
            : '1px solid #252830',
        }}
      >
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 flex-shrink-0"
        >
          <div
            className="w-7 h-7 rounded flex items-center justify-center text-white text-xs font-bold"
            style={{ background: '#4f6ef7', fontFamily: 'JetBrains Mono, monospace' }}
          >
            AG
          </div>
          <span
            className="text-xs font-semibold hidden sm:block"
            style={{ color: '#6b7280', fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.08em' }}
          >
            ANUSH-PORTFOLIO
          </span>
        </button>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="px-3 py-1 rounded text-xs transition-all duration-200"
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '0.06em',
                color: activeSection === item.id ? '#4f6ef7' : '#6b7280',
                background: activeSection === item.id ? 'rgba(79,110,247,0.1)' : 'transparent',
                border: activeSection === item.id ? '1px solid rgba(79,110,247,0.3)' : '1px solid transparent',
              }}
            >
              {item.label.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Open to Work */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: '#22c55e' }}
          />
          <span
            className="text-xs hidden sm:block"
            style={{ color: '#22c55e', fontFamily: 'JetBrains Mono, monospace' }}
          >
            Open to Work
          </span>
        </div>
      </nav>

      {/* Breadcrumb strip */}
      <div
        className="flex items-center px-6 h-6 gap-1"
        style={{
          background: '#0d0e11',
          borderBottom: '1px solid #252830',
        }}
      >
        {['Projects', 'AG-PORTFOLIO', 'Current-Sprint', `Viewing: ${sectionLabels[activeSection] || 'Hero'}`].map(
          (crumb, i, arr) => (
            <span key={i} className="flex items-center gap-1">
              <span
                className="text-xs"
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  color: i === arr.length - 1 ? '#4f6ef7' : '#6b7280',
                  fontSize: '10px',
                }}
              >
                {crumb}
              </span>
              {i < arr.length - 1 && (
                <span style={{ color: '#252830', fontSize: '10px' }}>/</span>
              )}
            </span>
          )
        )}
      </div>
    </div>
  );
};

export default TopNav;
