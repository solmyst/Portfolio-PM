import React, { useEffect, useRef, useState } from 'react';

const stages = [
  { label: 'Quote Request', pct: 100, sub: 'All Users', color: '#2563eb', height: 200 },
  { label: 'Proposal',      pct: 70,  sub: 'Converted', color: '#3b82f6', height: 140, dropoff: '→ 70% continued' },
  { label: 'Purchase',      pct: 40,  sub: 'Purchased', color: '#60a5fa', height: 80, dropoff: '→ 57% continued' },
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
    <div ref={ref} className="flex gap-8 items-end relative" style={{ height: '240px', fontFamily: "'Inter', sans-serif" }}>
      {/* Bars */}
      <div className="flex items-end gap-1 h-[200px]">
        {stages.map((stage, i) => (
          <div key={stage.label} className="flex items-end gap-1 relative group">
            {/* The Bar */}
            <div className="w-24 md:w-32 flex flex-col items-center justify-end relative">
              <div 
                className="w-full transition-all duration-1000 ease-out flex flex-col items-center"
                style={{ 
                  height: animated ? `${stage.height}px` : '0px', 
                  background: stage.color,
                  transitionDelay: `${i * 200}ms`
                }}
              >
                {animated && (
                  <span className="text-white font-bold text-sm mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {stage.pct}%
                  </span>
                )}
              </div>
              <div className="text-center mt-3 absolute -bottom-12 w-full">
                <div className="text-gray-900 font-bold text-[13px]">{stage.pct}%</div>
                <div className="text-gray-500 text-[11px] whitespace-nowrap">{stage.sub}</div>
              </div>
              <div className="absolute -top-6 text-center w-full text-gray-500 text-[11px] font-semibold uppercase tracking-wider whitespace-nowrap">
                {stage.label}
              </div>
            </div>

            {/* Dropoff Arrow */}
            {stage.dropoff && (
              <div className="w-12 md:w-16 flex items-center justify-center mb-8 relative">
                <svg className="w-full" height="2" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 1H100" stroke="#e5e7eb" strokeWidth="2" strokeDasharray="4 4" />
                </svg>
                <div className="absolute text-gray-400 text-[10px] whitespace-nowrap -top-4">
                  {stage.dropoff}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Right Annotation */}
      <div className="hidden md:flex flex-col ml-8 mb-8 pl-8 border-l border-gray-200">
        <div className="text-gray-900 text-sm font-bold mb-1">Overall Conversion: 40%</div>
        <div className="text-green-600 text-xs font-semibold flex items-center gap-1">
          Growth vs baseline: +180% ↑
        </div>
      </div>
    </div>
  );
};

export default FunnelChart;
