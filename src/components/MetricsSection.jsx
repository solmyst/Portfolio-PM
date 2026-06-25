import React from 'react';
import FunnelChart from './FunnelChart';
import CountUp from './CountUp';

const MetricsSection = () => {
  return (
    <section id="metrics" className="section-fade w-full" style={{ background: '#f4f5f8', paddingBottom: '80px' }}>
      
      {/* Top Bar (Amplitude Header) */}
      <div 
        className="h-14 flex items-center justify-between px-6 bg-white sticky top-11 z-20"
        style={{ borderBottom: '1px solid #e5e7eb', borderTop: '1px solid #e5e7eb' }}
      >
        <div className="flex items-center gap-2 text-[13px] font-medium" style={{ color: '#374151', fontFamily: "'Inter', sans-serif" }}>
          <span className="cursor-pointer hover:bg-gray-100 p-1 rounded">≡</span>
          <span className="text-gray-400">/</span>
          <span>Analytics</span>
          <span className="text-gray-400">&gt;</span>
          <span>Park+ Motor Insurance</span>
        </div>
        <div className="flex items-center gap-4 text-[13px] font-medium" style={{ color: '#374151' }}>
          <button className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors">Date Range: Jun–Aug 2025 ▾</button>
          <button className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded transition-colors text-blue-600">Share ↗</button>
          <button className="hover:bg-gray-100 px-2 py-1 rounded transition-colors">···</button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-10 font-body">
        
        {/* Row 1: KPI Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'DAU GROWTH', val: 7, suffix: 'x', change: '7x Growth', desc: '2K → 14K' },
            { label: 'SPRINT DURATION', val: 8, suffix: ' wks', change: 'On-time', desc: 'shipped' },
            { label: 'FUNNEL STAGES', val: 3, suffix: '', change: 'Complete', desc: 'built' },
            { label: 'OWNERSHIP', val: 100, suffix: '%', change: 'End-to-end', desc: 'shipped' },
          ].map((kpi, i) => (
            <div 
              key={kpi.label}
              className="bg-white rounded-lg p-5"
              style={{ border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
            >
              <div className="text-[12px] font-semibold text-gray-500 uppercase tracking-wider mb-2">{kpi.label}</div>
              <div className="flex items-end justify-between">
                <div className="text-[32px] font-bold text-gray-900 leading-none">
                  <CountUp end={kpi.val} suffix={kpi.suffix} duration={1200 + i * 200} />
                </div>
                {/* Tiny sparkline stub */}
                <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 24L10 18L20 20L30 12L40 14L50 4L60 0" stroke="#2563eb" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                </svg>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <span className="px-2 py-0.5 rounded-full text-[12px] font-medium bg-green-100 text-green-800">
                  {kpi.change}
                </span>
                <span className="text-[12px] text-gray-500">{kpi.desc}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Row 2: Funnel Chart Area */}
        <div 
          className="bg-white rounded-lg mb-6"
          style={{ border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex flex-wrap items-center justify-between">
            <div>
              <h3 className="text-[15px] font-bold text-gray-900 mb-1">Funnel Analysis</h3>
              <p className="text-[12px] text-gray-500">Motor Insurance Conversion Flow · Jun–Aug 2025</p>
            </div>
            <div className="flex items-center gap-2 text-[13px]">
              <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 font-medium">Conversion ▾</button>
              <button className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50 font-medium">All Users ▾</button>
            </div>
          </div>
          
          {/* Chart Content */}
          <div className="p-6">
            <FunnelChart />
          </div>
        </div>

        {/* Row 3: Insight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: '📱 WhatsApp Engagement', p1: 'Retention flows built', p2: 'Re-engagement rate ↑' },
            { title: '⚡ UI/UX Redesign', p1: 'Quote → Proposal flow', p2: 'Trust signals added' },
            { title: '📞 Outbound Strategy', p1: 'Lead calling spec', p2: 'Infrastructure setup' }
          ].map(insight => (
            <div 
              key={insight.title}
              className="bg-white rounded-lg p-5 hover:border-blue-400 transition-colors cursor-pointer group"
              style={{ border: '1px solid #e5e7eb', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}
            >
              <div className="text-[14px] font-bold text-gray-900 mb-3">{insight.title}</div>
              <hr className="border-gray-200 mb-3" />
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-blue-600 text-xs">●</span>
                <span className="text-[13px] text-gray-700">{insight.p1}</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-blue-600 text-xs">●</span>
                <span className="text-[13px] text-gray-700">{insight.p2}</span>
              </div>
              <div className="text-[13px] font-medium text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
                View Details <span>→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default MetricsSection;
