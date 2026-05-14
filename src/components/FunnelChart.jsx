import { useEffect, useRef, useState } from 'react';

const stages = [
  { label: 'QUOTE REQUESTS', pct: 100, color: '#4f6ef7' },
  { label: 'PROPOSALS',      pct: 62,  color: '#7c3aed' },
  { label: 'PURCHASES',      pct: 38,  color: '#22c55e' },
];

const FunnelChart = () => {
  const ref = useRef(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col gap-2 w-full max-w-lg mx-auto">
      {stages.map((stage, i) => (
        <div key={stage.label} className="flex flex-col gap-1">
          <div className="flex items-center justify-between">
            <span
              className="text-xs"
              style={{ color: '#9ca3af', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px' }}
            >
              {stage.label}
            </span>
            <span
              className="text-xs font-bold"
              style={{ color: stage.color, fontFamily: 'JetBrains Mono, monospace' }}
            >
              {stage.pct}%
            </span>
          </div>
          <div
            className="h-8 rounded flex items-center overflow-hidden"
            style={{ background: '#1c1f27', border: '1px solid #252830' }}
          >
            <div
              className="h-full rounded flex items-center px-3 transition-all duration-1000"
              style={{
                width: animated ? `${stage.pct}%` : '0%',
                background: stage.color,
                transitionDelay: `${i * 200}ms`,
                opacity: 0.85,
              }}
            />
          </div>
        </div>
      ))}
      <p
        className="text-center text-xs mt-3"
        style={{ color: '#22c55e', fontFamily: 'JetBrains Mono, monospace' }}
      >
        Result: 180% growth across all funnel stages
      </p>
    </div>
  );
};

export default FunnelChart;
