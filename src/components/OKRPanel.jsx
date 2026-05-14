import { useEffect, useRef, useState } from 'react';

const okrs = [
  {
    objective: 'O1: Become a top 1% early-career PM',
    krs: [
      { label: 'Ship real product with measurable impact',    pct: 100, status: '✅' },
      { label: 'Master data-driven product decisions',         pct: 70,  status: '🔄' },
      { label: 'Build system design foundation',               pct: 40,  status: '🔄' },
    ],
  },
  {
    objective: 'O2: Build a full technical PM toolkit',
    krs: [
      { label: 'SQL + Python for analytics',                  pct: 80,  status: '🔄' },
      { label: 'DevOps / Docker fundamentals',                pct: 30,  status: '🔄' },
      { label: 'LLM / AI product integration',                pct: 40,  status: '🔄' },
    ],
  },
];

const barColor = (pct) => {
  if (pct === 100) return '#22c55e';
  if (pct >= 60)  return '#4f6ef7';
  return '#f59e0b';
};

const OKRPanel = () => {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-6">
      {okrs.map((obj, oi) => (
        <div
          key={oi}
          className="rounded-lg p-5"
          style={{ background: '#14161b', border: '1px solid #252830' }}
        >
          <p
            className="text-sm font-semibold mb-4"
            style={{ color: '#e8eaf0', fontFamily: 'DM Sans, sans-serif' }}
          >
            {obj.objective}
          </p>
          <div className="flex flex-col gap-3">
            {obj.krs.map((kr, ki) => (
              <div key={ki} className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <span
                    className="text-xs"
                    style={{ color: '#9ca3af', fontFamily: 'DM Sans, sans-serif' }}
                  >
                    KR{ki + 1}: {kr.label}
                  </span>
                  <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                    <span
                      className="text-xs font-bold"
                      style={{ color: barColor(kr.pct), fontFamily: 'JetBrains Mono, monospace' }}
                    >
                      {kr.pct}%
                    </span>
                    <span className="text-xs">{kr.status}</span>
                  </div>
                </div>
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: '#252830' }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: animated ? `${kr.pct}%` : '0%',
                      background: barColor(kr.pct),
                      transitionDelay: `${(oi * 3 + ki) * 150}ms`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OKRPanel;
