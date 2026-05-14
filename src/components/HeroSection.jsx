import React from 'react';
import { ArrowRight, Download } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="section-fade w-full h-screen relative flex" style={{ background: '#0f1117' }}>
      {/* Background Texture */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(91,66,240,0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(34,211,238,0.04) 0%, transparent 50%)',
        }}
      />

      {/* Left Sidebar (Linear style) */}
      <div 
        className="w-[240px] flex-shrink-0 flex flex-col h-full hidden md:flex relative z-10"
        style={{ background: '#0d0e14', borderRight: '1px solid #1e2028' }}
      >
        <div className="p-4 pt-6">
          <div className="flex items-center gap-2 mb-6 px-2">
            <div className="w-4 h-4 rounded-sm flex items-center justify-center text-[8px] font-bold text-white bg-pm-accent">
              ▣
            </div>
            <span className="font-mono text-xs font-bold text-pm-text">AG-PORTFOLIO</span>
          </div>

          <div className="flex flex-col gap-1 mb-6">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded bg-[#1a1c24] text-white cursor-pointer transition-colors">
              <span className="text-[10px] text-pm-muted-2">○</span>
              <span className="text-[13px]">My Issues</span>
            </div>
            {['Active', 'Backlog', 'All Issues'].map(item => (
              <div key={item} className="flex items-center gap-2 px-2 py-1.5 rounded text-pm-muted-1 hover:bg-[#1a1c24] hover:text-white cursor-pointer transition-colors">
                <span className="text-[10px] opacity-50">○</span>
                <span className="text-[13px]">{item}</span>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <div className="px-2 mb-2 text-[10px] uppercase font-semibold text-pm-muted-2">Views</div>
            <div className="flex flex-col gap-1">
              {['My Projects', 'Roadmap'].map(item => (
                <div key={item} className="flex items-center gap-2 px-2 py-1.5 rounded text-pm-muted-1 hover:bg-[#1a1c24] hover:text-white cursor-pointer transition-colors">
                  <span className="text-[10px] opacity-50">○</span>
                  <span className="text-[13px]">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="px-2 mb-2 text-[10px] uppercase font-semibold text-pm-muted-2">Teams</div>
            <div className="flex items-center justify-between px-2 py-1.5 rounded text-pm-muted-1 hover:bg-[#1a1c24] hover:text-white cursor-pointer transition-colors">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pm-green" />
                <span className="text-[13px]">Anush Gupta</span>
              </div>
              <span className="opacity-50">···</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative z-10 overflow-y-auto">
        {/* Top Bar */}
        <div 
          className="h-11 flex-shrink-0 flex items-center justify-between px-6"
          style={{ borderBottom: '1px solid #1e2028' }}
        >
          <div className="text-sm font-semibold text-white">My Issues</div>
          <div className="flex items-center gap-3">
            <button className="text-xs text-pm-muted-2 hover:text-white transition-colors">Filters ▾</button>
            <button className="text-xs text-pm-muted-2 hover:text-white transition-colors">Display ▾</button>
          </div>
        </div>

        {/* Issue List Area */}
        <div className="p-6 md:p-10 max-w-4xl">
          <div 
            className="rounded overflow-hidden transition-all hover:border-pm-border-2"
            style={{ border: '1px solid #1e2028', background: '#14161b' }}
          >
            {/* Issue Header */}
            <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #1e2028' }}>
              <div className="flex items-center gap-3">
                <span className="text-[10px] opacity-50">○</span>
                <span className="font-mono text-[11px] text-[#5b66f0]">AG-001</span>
                <span className="text-[15px] font-medium text-[#e2e4eb]">ANUSH GUPTA — PRODUCT MANAGER</span>
              </div>
              <span className="text-xs text-pm-muted-2">In Progress</span>
            </div>

            {/* Issue Body */}
            <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="grid grid-cols-[100px_1fr] gap-4 mb-6 text-[13px]">
                  <div className="text-pm-muted-1">Title:</div>
                  <div className="text-[#e2e4eb]">Shipping products that move the needle</div>
                  
                  <div className="text-pm-muted-1">Status:</div>
                  <div className="flex items-center gap-2 text-[#e2e4eb]">
                    <span className="w-2 h-2 rounded-full bg-pm-amber"></span> In Progress
                  </div>
                  
                  <div className="text-pm-muted-1">Priority:</div>
                  <div className="text-[#e2e4eb]">↑ Urgent</div>
                  
                  <div className="text-pm-muted-1">Label:</div>
                  <div className="flex gap-2">
                    {['Growth', 'Startup', 'PM'].map(label => (
                      <span key={label} className="px-2 py-0.5 rounded-full text-[11px] bg-[#1e2028] text-pm-muted-2" style={{ border: '1px solid #2e3140' }}>
                        {label}
                      </span>
                    ))}
                  </div>
                  
                  <div className="text-pm-muted-1">Assignee:</div>
                  <div className="flex items-center gap-2 text-[#e2e4eb]">
                    <div className="w-4 h-4 rounded-full bg-pm-accent flex items-center justify-center text-[8px] font-bold text-white">AG</div>
                    Anush Gupta
                  </div>
                </div>

                <div className="mb-8">
                  <div className="text-pm-muted-1 text-[13px] mb-2">Description:</div>
                  <p className="text-[13px] text-[#6b7280] leading-relaxed">
                    I thrive in productive chaos. Give me a half-formed idea, a broken Figma flow, or a 3-bullet Notion doc — I'll turn it into something shipped and measured.
                  </p>
                </div>

                <div className="flex items-center gap-4 pt-6" style={{ borderTop: '1px solid #1e2028' }}>
                  <button onClick={() => window.open('https://drive.google.com/file/d/18zozP6xXi940m8i99zVl4RNjaY051mlD/view?usp=sharing', '_blank')} className="text-[12px] text-pm-muted-2 hover:text-[#e2e4eb] transition-colors flex items-center gap-1">
                    View Resume ↗
                  </button>
                  <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-[12px] text-[#5b66f0] hover:text-[#7b8ef8] transition-colors flex items-center gap-1">
                    Start Conversation →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stat Cluster (Bottom Right) */}
        <div className="absolute bottom-8 right-8 w-64 rounded" style={{ background: '#14161b', border: '1px solid #1e2028' }}>
          {[
            { icon: '🏢', label: 'Park+ Motor Insurance' },
            { icon: '📈', label: '180% User Growth' },
            { icon: '⏱', label: '8-Week Sprint' },
          ].map((stat, i, arr) => (
            <div 
              key={stat.label} 
              className="flex items-center gap-3 px-4 py-3"
              style={{ borderBottom: i < arr.length - 1 ? '1px solid #1e2028' : 'none' }}
            >
              <span className="text-[14px]">{stat.icon}</span>
              <span className="text-[13px] text-[#e2e4eb]">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
