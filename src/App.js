import React, { useState, useEffect, useRef } from 'react';
import TopNav from './components/TopNav';

const resumeUrl = "https://drive.google.com/file/d/1PntDE7PYeHvqNEJol-5Q2ub0VzHsmsWz/view?usp=drive_link";

// Ruler Component
const Ruler = () => {
  const ticks = [];
  const pageWidth = 816;
  const inches = 7;
  for (let i = 0; i <= inches * 8; i++) {
    const isMajor = i % 8 === 0;
    const isMid = i % 4 === 0;
    ticks.push(
      <div 
        key={i} 
        className={`ruler-tick ${isMajor ? 'major' : isMid ? 'mid' : ''}`} 
        style={{ width: `${(pageWidth - 192) / (inches * 8)}px` }}
      >
        {isMajor && i > 0 && <span className="ruler-label">{i / 8}</span>}
      </div>
    );
  }

  return (
    <div className="w-full bg-[#f8f9fa] border-b border-doc-border flex justify-center sticky top-0 z-30 docs-ruler-container h-[48px]">
      <div className="w-[816px] h-full flex items-end relative bg-white border-x border-doc-border shadow-sm">
        <div className="absolute left-0 top-0 bottom-0 bg-[#e8eaed] w-[96px] opacity-30"></div>
        <div className="absolute right-0 top-0 bottom-0 bg-[#e8eaed] w-[96px] opacity-30"></div>
        <div className="flex items-end w-full px-[96px] h-full">
          {ticks}
        </div>
        <div className="margin-indicator" style={{ left: '96px' }}></div>
        <div className="indent-indicator" style={{ left: '96px' }}></div>
        <div className="margin-indicator" style={{ left: 'calc(100% - 96px)' }}></div>
      </div>
    </div>
  );
};

// Reusable Comment Card Component
const CommentCard = ({ id, avatarText, avatarBg, name, time, text, topOffset, resolveComment, isResolved, replyText }) => {
  if (isResolved) return null;
  return (
    <div className="absolute right-[-320px] w-[280px] bg-white border border-doc-border rounded-[8px] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.15)] font-ui text-[13px] z-[40] select-none animate-in" style={{ top: topOffset }} contentEditable="false">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-[32px] h-[32px] rounded-full text-white text-[12px] font-medium flex items-center justify-center flex-shrink-0" style={{ backgroundColor: avatarBg }}>
          {avatarText}
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-[#202124]">{name}</span>
          <span className="text-[#5F6368] text-[12px]">{time}</span>
        </div>
      </div>
      <p className="text-[#202124] leading-relaxed mb-4">{text}</p>
      {replyText && (
        <div className="mt-2 mb-4 pl-3 border-l-2 border-google-blue bg-blue-50/50 py-1 rounded-r">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-[20px] h-[20px] rounded-full bg-[#A8C7FA] text-[#0B57D0] text-[9px] font-medium flex items-center justify-center">AG</div>
            <span className="font-bold text-[#202124] text-[11px]">Anush Gupta</span>
          </div>
          <p className="text-[#202124] text-[11px] leading-relaxed italic">"{replyText}"</p>
        </div>
      )}
      <div className="flex gap-2">
        <button className="flex-1 bg-google-blue hover:bg-google-blue-hover text-white font-medium py-1.5 rounded-full transition-colors text-[12px]" onClick={() => window.location.href='mailto:anushgupta105@gmail.com'}>
          Reply
        </button>
        <button className="flex-1 border border-doc-border hover:bg-gray-50 text-[#202124] font-medium py-1.5 rounded-full transition-colors text-[12px]" onClick={() => resolveComment(id)}>
          Resolve
        </button>
      </div>
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [resolvedComments, setResolvedComments] = useState({});
  const [selectedUX, setSelectedUX] = useState(null);
  const [statsAnimated, setStatsAnimated] = useState(false);
  
  const statsRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const resolveComment = (id) => {
    setResolvedComments(prev => ({ ...prev, [id]: true }));
  };

  const outline = [
    { id: 'hero', label: 'PRD: Anush Gupta', level: 1 },
    { id: 'executive-summary', label: '1. Executive Summary', level: 2 },
    { id: 'personas', label: '2. Target Audience', level: 2 },
    { id: 'capabilities', label: '3. Core Capabilities', level: 2 },
    { id: 'parkplus', label: '3.1 Motor Insurance Engine', level: 3 },
    { id: 'education', label: '3.2 Technical Foundation', level: 3 },
    { id: 'ux-designs', label: '4. UX & Product Designs', level: 2 },
    { id: 'requirements', label: '5. Functional Requirements', level: 2 },
    { id: 'metrics', label: '6. Success Metrics', level: 2 },
    { id: 'release', label: '7. Release Plan & Contact', level: 2 },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  const animateCounter = (el, target, suffix = '') => {
    const duration = 1500;
    const start = performance.now();
    const update = (time) => {
      const elapsed = time - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  };

  const handleKeyDown = (e) => {
    const allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown', 'c', 'v', 'a'];
    const isCmd = e.ctrlKey || e.metaKey;
    if (!allowedKeys.includes(e.key) && !isCmd) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const handleScroll = () => {
      const scrollPosition = scrollContainer?.scrollTop || 0;
      
      let currentActive = outline[0].id;
      for (const item of outline) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            currentActive = item.id;
          }
        }
      }
      setActiveSection(currentActive);

      if (!statsAnimated && statsRef.current) {
        const rect = statsRef.current.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          setStatsAnimated(true);
          const counters = statsRef.current.querySelectorAll('.stat-counter');
          counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const suffix = counter.getAttribute('data-suffix');
            animateCounter(counter, target, suffix);
          });
        }
      }
    };
    scrollContainer?.addEventListener('scroll', handleScroll);
    return () => scrollContainer?.removeEventListener('scroll', handleScroll);
  }, [statsAnimated]);

  return (
    <div className="bg-[#F0F2F5] h-screen font-ui text-doc-text flex flex-col overflow-hidden">
      <TopNav />
      
      <div className="flex flex-1 overflow-hidden pt-[104px]">
        
        {/* Document Outline (Sidebar) */}
        <div className="w-[260px] bg-doc-surface fixed left-0 top-[104px] bottom-0 p-6 overflow-y-auto hidden lg:block z-40 border-r border-doc-border sidebar shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
          <div className="text-[11px] font-bold text-[#444746] mb-6 uppercase tracking-[1px] opacity-70">Document Outline</div>
          <div className="flex flex-col gap-1">
            {outline.map(item => {
              const isActive = activeSection === item.id;
              return (
                <div 
                  key={item.id}
                  className={`cursor-pointer rounded-r-full py-2 transition-all duration-200 group ${item.level === 3 ? 'text-[12px]' : 'text-[13px]'} ${item.level === 1 ? 'font-bold' : 'font-medium'} ${
                    isActive ? 'text-google-blue bg-[#EAF1FC] border-l-[3px] border-google-blue pl-[15px]' : 'text-[#444746] hover:bg-[#F1F3F4] border-l-[3px] border-transparent pl-[17px]'
                  }`}
                  style={{ paddingLeft: item.level === 3 ? '35px' : '' }}
                  onClick={() => scrollTo(item.id)}
                >
                  <span className={`${isActive ? 'translate-x-1' : 'group-hover:translate-x-1'} inline-block transition-transform`}>
                    {item.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Main Document Area */}
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-[260px]">
          
          <Ruler />

          <div 
            id="scroll-container" 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto flex flex-col items-center bg-[#F0F2F5] pt-12 pb-48 scroll-smooth"
          >
            
            {/* PAGE 1 */}
            <div 
              contentEditable="true"
              onKeyDown={handleKeyDown}
              suppressContentEditableWarning={true}
              spellCheck="false"
              className="document-page relative flex flex-col bg-white w-full max-w-[816px] min-h-[1056px] shadow-[0_1px_3px_1px_rgba(60,64,67,.15)] outline-none font-doc px-[96px] py-[96px] mb-8 break-words overflow-hidden"
            >
              <div contentEditable="false" className="absolute top-0 right-0 left-0 h-0 z-[45]">
                <CommentCard id="1" avatarText="HR" avatarBg="#34A853" name="Head of Product" time="2 days ago" text="Whoever built this website understands product. Already sent to our CTO." topOffset="80px" isResolved={resolvedComments["1"]} resolveComment={resolveComment} />
                <CommentCard id="2" avatarText="VK" avatarBg="#4285F4" name="Hiring Manager" time="Yesterday" text="Ready for Deployment. Someone hire this person." topOffset="220px" isResolved={resolvedComments["2"]} resolveComment={resolveComment} />
              </div>

              <div className="text-[#202124] max-w-full">
                <div id="hero" className="mb-8">
                  <h1 className="text-[26pt] font-bold mb-[16px] mt-0 text-[#202124] leading-tight">
                    <span className={`comment-anchor ${!resolvedComments["1"] ? 'active' : ''}`}>Product Requirements Document</span>
                  </h1>
                  <table className="prd-header-table w-full border-collapse mb-[32px] table-fixed" contentEditable="false">
                    <tbody>
                      <tr><td className="border border-[#D0D0D0] p-3 font-bold w-[220px] bg-gray-50/50 text-[11pt]">Product Name</td><td className="border border-[#D0D0D0] p-3 text-google-blue font-bold tracking-tight text-[11pt]">Anush Gupta</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-3 font-bold bg-gray-50/50 text-[11pt]">Status</td><td className="border border-[#D0D0D0] p-3 font-bold text-[11pt]"><span className="w-2 h-2 rounded-full bg-google-green inline-block mr-2 animate-pulse"></span><span className={`comment-anchor ${!resolvedComments["2"] ? 'active' : ''}`}>Ready for Deployment</span></td></tr>
                      <tr><td className="border border-[#D0D0D0] p-3 font-bold bg-gray-50/50 text-[11pt]">Document Owner</td><td className="border border-[#D0D0D0] p-3 text-doc-link underline text-[11pt] truncate">anushgupta105@gmail.com</td></tr>
                      <tr>
                        <td className="border border-[#D0D0D0] p-3 font-bold bg-gray-50/50 text-[11pt]">Resources</td>
                        <td className="border border-[#D0D0D0] p-3">
                          <button onClick={() => window.open(resumeUrl, '_blank')} className="bg-google-blue hover:bg-google-blue-hover text-white px-4 py-1.5 rounded-md font-medium text-[11px] flex items-center gap-2 shadow-sm">
                            <span className="material-symbols-outlined text-[16px]">description</span> View Resume
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <hr className="border-t-[1.5px] border-black opacity-80 mb-12" />

                <div id="executive-summary" className="mb-[48px]">
                  <h2 className="text-[18px] font-bold mb-[12px] border-b border-gray-300 pb-1">1. Executive Summary & Problem Statement</h2>
                  <p><strong>The Problem:</strong> Most Product Managers wait for perfect clarity before acting.founders need builders who can operate in chaos.</p>
                  <p><strong>The Solution (Anush):</strong> A highly adaptable Product Manager engineered to turn ambiguity into shipped product. "Anush" is designed to take half-formed ideas and turn them into scalable features.</p>
                </div>

                <div id="personas" className="mb-[48px]">
                  <h2 className="text-[18px] font-bold mb-[12px] border-b border-gray-300 pb-1">2. Target Audience (User Personas)</h2>
                  <ul className="list-disc ml-8 space-y-2">
                    <li><strong>Startup Founders:</strong> Seeking a PM who owns the full loop without requiring hand-holding.</li>
                    <li><strong>Hiring Managers:</strong> Needing a teammate who writes PRDs that developers actually read.</li>
                  </ul>
                </div>

                <div id="capabilities" className="mb-[48px]">
                  <h2 className="text-[18px] font-bold mb-[12px] border-b border-gray-300 pb-1">3. Core Capabilities (Experience)</h2>
                  <div id="parkplus" className="mb-8">
                    <h3 className="text-[14px] font-bold mb-2 mt-4">3.1 Motor Insurance Growth Engine</h3>
                    <p className="italic text-[#5f6368] mb-3 text-[11pt]">Role: Product Intern @ Park+ (Jun–Aug 2025)</p>
                    <ul className="list-disc ml-8 space-y-1">
                      <li><strong>Feature:</strong> Scaled Motor Insurance to <span className="bg-[#fff2cc] font-bold px-1.5 rounded">180% user growth</span> in an 8-week sprint.</li>
                      <li><strong>UX Overhaul:</strong> Owned funnel redesign, optimizing Quote → Proposal UI to increase conversion through strategic trust signals.</li>
                    </ul>
                  </div>

                  <div id="education" className="mb-8">
                    <h3 className="text-[14px] font-bold mb-2 mt-4">3.2 Technical Foundation Framework</h3>
                    <p className="italic text-[#5f6368] mb-3 text-[11pt]">Environment: JECRC University (2023–2027)</p>
                    <ul className="list-disc ml-8 space-y-1">
                      <li><strong>Degree:</strong> B.Tech in Computer Science. Fluency allows for seamless communication with engineering teams.</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-8 text-gray-400 text-[10pt] flex justify-between select-none" contentEditable="false">
                <span>Page 1 of 2</span>
                <span>Anush Gupta — PRD Portfolio</span>
              </div>
            </div>

            {/* PAGE 2 */}
            <div 
              contentEditable="true"
              onKeyDown={handleKeyDown}
              suppressContentEditableWarning={true}
              spellCheck="false"
              className="document-page relative flex flex-col bg-white w-full max-w-[816px] min-h-[1056px] shadow-[0_1px_3px_1px_rgba(60,64,67,.15)] outline-none font-doc px-[96px] py-[96px] break-words overflow-hidden"
            >
              <div contentEditable="false" className="absolute top-0 right-0 left-0 h-0 z-[45]">
                <CommentCard id="3" avatarText="SA" avatarBg="#FBBC04" name="Founder" time="1h ago" text="LLMs + SQL + Figma. Exactly what we need." topOffset="80px" isResolved={resolvedComments["3"]} resolveComment={resolveComment} />
                <CommentCard id="4" avatarText="PM" avatarBg="#9C27B0" name="Senior PM" time="3h ago" text="180% growth? Brilliant." topOffset="450px" isResolved={resolvedComments["4"]} resolveComment={resolveComment} replyText="Calculated against 0-baseline within 8 weeks." />
                <CommentCard id="5" avatarText="HR" avatarBg="#34A853" name="Recruiter" time="Today" text="Brilliant PRD format. Let's schedule an interview." topOffset="750px" isResolved={resolvedComments["5"]} resolveComment={resolveComment} />
              </div>

              <div className="text-[#202124] max-w-full">
                <div id="ux-designs" className="mb-[48px]">
                  <h2 className="text-[18px] font-bold mb-[12px] border-b border-gray-300 pb-1">4. UX & Product Designs</h2>
                  <p>Click on wireframes below to expand high-fidelity UX mockups.</p>
                  <div className="grid grid-cols-2 gap-6 mt-8 mb-6" contentEditable="false">
                    <div className="group border-2 border-dashed border-[#D0D0D0] hover:border-google-blue hover:bg-blue-50/50 cursor-pointer h-[150px] flex flex-col items-center justify-center transition-all rounded-xl" onClick={() => setSelectedUX('Funnel Flow')}>
                      <span className="text-3xl mb-2 grayscale group-hover:grayscale-0 transition-all">📈</span>
                      <span className="text-[13px] font-bold text-[#5F6368] group-hover:text-google-blue underline">View Park+ Funnel Flow</span>
                    </div>
                    <div className="group border-2 border-dashed border-[#D0D0D0] hover:border-google-blue hover:bg-blue-50/50 cursor-pointer h-[150px] flex flex-col items-center justify-center transition-all rounded-xl" onClick={() => setSelectedUX('WhatsApp Flow')}>
                      <span className="text-3xl mb-2 grayscale group-hover:grayscale-0 transition-all">💬</span>
                      <span className="text-[13px] font-bold text-[#5F6368] group-hover:text-google-blue underline">View WhatsApp Flow</span>
                    </div>
                  </div>
                </div>

                <div id="requirements" className="mb-[48px]">
                  <h2 className="text-[18px] font-bold mb-[12px] border-b border-gray-300 pb-1">5. Functional Requirements (Skills & Toolkit)</h2>
                  <table className="prd-header-table w-full border-collapse mt-4 table-fixed" contentEditable="false">
                    <thead>
                      <tr><th className="border border-[#D0D0D0] p-3 bg-gray-50 text-left font-bold text-[13px] w-1/3">Category</th><th className="border border-[#D0D0D0] p-3 bg-gray-50 text-left font-bold text-[13px]">Tools & Competencies</th></tr>
                    </thead>
                    <tbody className="text-[13px]">
                      <tr><td className="border border-[#D0D0D0] p-3 font-bold bg-gray-50/50">Product Strategy</td><td className="border border-[#D0D0D0] p-3">Roadmapping, PRD Writing, GTM Strategy</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-3 font-bold bg-gray-50/50">Data & Analytics</td><td className="border border-[#D0D0D0] p-3">SQL, Amplitude, Mixpanel, A/B Testing</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-3 font-bold bg-gray-50/50">Technical</td><td className="border border-[#D0D0D0] p-3">APIs, LLMs/LangChain, React, Python</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-3 font-bold bg-gray-50/50"><span className={`comment-anchor ${!resolvedComments["3"] ? 'active' : ''}`}>Software Stack</span></td><td className="border border-[#D0D0D0] p-3">Figma, Jira, Notion, Linear, Miro</td></tr>
                    </tbody>
                  </table>
                </div>

                <div id="metrics" className="mb-[48px]" ref={statsRef}>
                  <h2 className="text-[18px] font-bold mb-[12px] border-b border-gray-300 pb-1">6. Success Metrics (KPIs tracked)</h2>
                  <ul className="space-y-3 mt-4">
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-google-blue"></div>
                      <div><strong className="stat-counter font-bold text-google-blue text-lg" data-target="180" data-suffix="%">0%</strong> User Growth achieved (Park+ Internship)</div>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-google-red"></div>
                      <div><strong className="stat-counter font-bold text-google-red text-lg" data-target="8" data-suffix=" Weeks">0 Weeks</strong> Sprint Duration consistently met</div>
                    </li>
                  </ul>
                </div>

                <div id="release" className="mb-[48px]">
                  <h2 className="text-[18px] font-bold mb-[12px] border-b border-gray-300 pb-1">7. Release Plan & Contact</h2>
                  <div className="flex flex-wrap gap-4 mt-6" contentEditable="false">
                    <button onClick={() => window.location.href='mailto:anushgupta105@gmail.com'} className="flex items-center gap-2 bg-google-blue text-white px-6 py-2.5 rounded-full font-bold shadow-md">
                      <span className="material-symbols-outlined">mail</span> Email Me
                    </button>
                    <button onClick={() => window.open(resumeUrl, '_blank')} className="flex items-center gap-2 bg-white border border-[#D0D0D0] text-[#202124] px-6 py-2.5 rounded-full font-bold shadow-sm">
                      <span className="material-symbols-outlined text-google-red">description</span> Resume
                    </button>
                  </div>
                </div>
              </div>
              <div className="mt-auto pt-8 text-gray-400 text-[10pt] flex justify-between select-none" contentEditable="false">
                <span>Page 2 of 2</span>
                <span>Anush Gupta — PM Portfolio v1.0.4</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedUX && (
        <div className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-8 font-ui backdrop-blur-sm" onClick={() => setSelectedUX(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-5xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4 text-[#202124]">
              <h3 className="text-[20px] font-bold">{selectedUX}</h3>
              <button onClick={() => setSelectedUX(null)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-500 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="w-full h-[600px] bg-[#F8F9FA] border border-gray-200 flex items-center justify-center text-gray-400 rounded-xl">🎨 Figma Interactive Embed for {selectedUX}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
