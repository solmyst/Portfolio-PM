import React from 'react';

const AboutSection = () => {
  return (
    <section id="about" className="section-fade w-full relative" style={{ background: '#191919', paddingBottom: '120px' }}>
      {/* Cover Image Area */}
      <div 
        className="w-full" 
        style={{ 
          height: '200px', 
          background: 'linear-gradient(135deg, #2a1f3d, #1a2535)',
        }}
      />

      {/* Main Content Container */}
      <div className="max-w-[720px] mx-auto px-6" style={{ marginTop: '-40px' }}>
        
        {/* Page Icon & Title */}
        <div className="mb-8">
          <div className="text-[64px] leading-none mb-4" style={{ filter: 'drop-shadow(0 4px 12px rgba(0,0,0,0.15))' }}>📄</div>
          <h1 
            className="leading-tight"
            style={{ 
              fontFamily: "'Segoe UI', Georgia, serif", 
              fontSize: '40px', 
              fontWeight: 700, 
              color: '#e8e8e6' 
            }}
          >
            Product Requirements Document
          </h1>
        </div>

        {/* Property Block */}
        <div className="flex flex-col gap-1 mb-8">
          {[
            { icon: '👤', name: 'Owner', val: 'Anush Gupta' },
            { icon: '✅', name: 'Status', val: '● Open to Work' },
            { icon: '🏷️', name: 'Type', val: 'Product Manager' },
            { icon: '📅', name: 'Last Edited', val: 'May 2026' },
            { icon: '🔗', name: 'GitHub', val: 'github.com/solmyst' },
            { icon: '📧', name: 'Email', val: 'anushgupta105@gmail.com' },
          ].map((prop) => (
            <div 
              key={prop.name}
              className="flex items-center py-1.5 px-2 -mx-2 rounded transition-colors hover:bg-white/5"
            >
              <div className="w-[160px] flex items-center gap-2 flex-shrink-0 text-[13px]" style={{ color: '#737373' }}>
                <span className="text-[16px] leading-none w-5 text-center">{prop.icon}</span>
                {prop.name}
              </div>
              <div className="text-[13px] font-medium" style={{ color: prop.name === 'Status' ? '#4ade80' : '#e8e8e6' }}>
                {prop.val}
              </div>
            </div>
          ))}
        </div>

        {/* Divider */}
        <hr style={{ border: 'none', borderTop: '1px solid #2d2d2d', margin: '24px 0' }} />

        {/* Body Content - Callout Blocks */}
        <div className="flex flex-col gap-4 mb-8">
          {[
            { icon: '💡', title: 'Objective', text: 'Turn ambiguity into shipped product. Fast. I thrive in the chaos before clarity arrives.' },
            { icon: '🎯', title: 'Problem Statement', text: 'Most PMs wait for clarity before acting. I act to find clarity. I turn a 3-bullet Notion doc into a shipped feature.' },
            { icon: '🔍', title: 'User Persona', text: 'You need someone who ships, not someone who plans to ship. You need someone who owns the full loop: research → design → ship → measure.' }
          ].map((callout) => (
            <div 
              key={callout.title}
              className="flex items-start gap-3 p-4 rounded"
              style={{ background: '#2a2a2a' }}
            >
              <div className="text-[24px] leading-none mt-0.5">{callout.icon}</div>
              <div className="flex flex-col gap-1">
                <div className="font-semibold text-[14px]" style={{ color: '#e8e8e6' }}>{callout.title}</div>
                <div className="text-[14px] leading-relaxed" style={{ color: '#e8e8e6' }}>{callout.text}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Toggle Blocks */}
        <div className="flex flex-col gap-2">
          {[
            { title: 'Key Behaviors', content: ['Owns the full loop', 'Writes PRDs that devs actually read', 'Asks "what does success look like" before writing code'] },
            { title: 'Ideal Environment', content: ['Early stage startup', 'High autonomy', 'Fast shipping cadence'] },
            { title: 'What I\'m NOT looking for', content: ['Endless meetings', 'Over-engineered processes', 'Bureaucracy'] }
          ].map((toggle) => (
            <details key={toggle.title} className="group cursor-pointer">
              <summary className="flex items-center gap-2 py-1 px-2 -mx-2 rounded hover:bg-white/5 list-none text-[14px] font-medium" style={{ color: '#e8e8e6' }}>
                <span className="transition-transform duration-200 group-open:rotate-90 text-[10px]" style={{ color: '#737373' }}>▶</span>
                {toggle.title}
              </summary>
              <div className="pl-6 py-2 flex flex-col gap-1 text-[14px]" style={{ color: '#e8e8e6' }}>
                {toggle.content.map(item => (
                  <div key={item} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: '#e8e8e6' }} />
                    {item}
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
