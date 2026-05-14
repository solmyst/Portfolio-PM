import React, { useState, useEffect, useRef } from 'react';
import TopNav from './components/TopNav';

const resumeUrl = "https://drive.google.com/file/d/1PntDE7PYeHvqNEJol-5Q2ub0VzHsmsWz/view?usp=drive_link";

const outline = [
  { id: 'hero', label: 'Anush Gupta v2.0', level: 1 },
  { id: 'summary', label: '1. Executive Summary', level: 2 },
  { id: 'problem', label: '2. Problem Statement', level: 2 },
  { id: 'vision', label: '3. Product Vision', level: 2 },
  { id: 'users', label: '4. Target Users', level: 2 },
  { id: 'capabilities', label: '5. Core Capabilities', level: 2 },
  { id: 'experience', label: '6. Professional Experience', level: 2 },
  { id: 'architecture', label: '7. Product Architecture', level: 2 },
  { id: 'projects', label: '8. Side Projects', level: 2 },
  { id: 'principles', label: '9. Product Principles', level: 2 },
  { id: 'metrics', label: '10. KPIs & Success Metrics', level: 2 },
  { id: 'roadmap', label: '11. Future Roadmap', level: 2 },
  { id: 'release', label: '12. Release Plan', level: 2 },
  { id: 'notes', label: '13. Final Release Notes', level: 2 },
];

// Ruler Components
const HorizontalRuler = () => {
  const ticks = [];
  const pageWidth = 816;
  const inches = 7;
  for (let i = 0; i <= inches * 8; i++) {
    const isMajor = i % 8 === 0;
    const isMid = i % 4 === 0;
    ticks.push(
      <div key={i} className={`ruler-tick ${isMajor ? 'major' : isMid ? 'mid' : ''}`} style={{ width: `${(pageWidth - 192) / (inches * 8)}px` }}>
        {isMajor && i > 0 && <span className="ruler-label">{i / 8}</span>}
      </div>
    );
  }
  return (
    <div className="w-full bg-[#f8f9fa] border-b border-doc-border flex justify-center sticky top-0 z-30 h-[40px] select-none">
      <div className="w-[816px] h-full flex items-end relative bg-white border-x border-doc-border shadow-sm">
        <div className="absolute left-0 top-0 bottom-0 bg-[#e8eaed] w-[96px] opacity-30"></div>
        <div className="absolute right-0 top-0 bottom-0 bg-[#e8eaed] w-[96px] opacity-30"></div>
        <div className="flex items-end w-full px-[96px] h-full">{ticks}</div>
        <div className="margin-indicator" style={{ left: '96px' }}></div>
        <div className="indent-indicator" style={{ left: '96px' }}></div>
        <div className="margin-indicator" style={{ left: 'calc(100% - 96px)' }}></div>
      </div>
    </div>
  );
};

const VerticalRuler = () => {
  const ticks = [];
  for (let i = 0; i < 100; i++) {
    const isMajor = i % 8 === 0;
    ticks.push(<div key={i} className={`v-ruler-tick ${isMajor ? 'major' : ''}`}></div>);
  }
  return (
    <div className="fixed left-[240px] top-[144px] bottom-0 w-[16px] bg-[#f8f9fa] border-r border-doc-border z-20 hidden xl:flex flex-col items-center pt-8 select-none">
      {ticks}
    </div>
  );
};

// Comment Component
const CommentCard = ({ id, avatarText, avatarBg, name, time, text, topOffset, resolveComment, isResolved, replyText }) => {
  if (isResolved) return null;
  return (
    <div className="absolute right-[-310px] w-[270px] bg-white border border-doc-border rounded-[8px] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.15)] font-ui text-[13px] z-[40] select-none animate-in" style={{ top: topOffset }} contentEditable="false">
      <div className="flex items-center gap-2 mb-2">
        <div className="w-[32px] h-[32px] rounded-full text-white text-[11px] font-medium flex items-center justify-center flex-shrink-0" style={{ backgroundColor: avatarBg }}>{avatarText}</div>
        <div className="flex flex-col">
          <span className="font-bold text-[#202124]">{name}</span>
          <span className="text-[#5F6368] text-[11px]">{time}</span>
        </div>
      </div>
      <p className="text-[#202124] leading-relaxed mb-3">{text}</p>
      {replyText && (
        <div className="mt-2 mb-4 pl-3 border-l-2 border-google-blue bg-blue-50/50 py-1 rounded-r">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-[18px] h-[18px] rounded-full bg-[#A8C7FA] text-[#0B57D0] text-[8px] font-medium flex items-center justify-center">AG</div>
            <span className="font-bold text-[#202124] text-[10px]">Anush Gupta</span>
          </div>
          <p className="text-[#202124] text-[10px] leading-relaxed italic">"{replyText}"</p>
        </div>
      )}
      <div className="flex gap-2">
        <button className="flex-1 bg-google-blue hover:bg-google-blue-hover text-white font-medium py-1.5 rounded-full transition-colors text-[11px]" onClick={() => window.location.href='mailto:anushgupta105@gmail.com'}>Reply</button>
        <button className="flex-1 border border-doc-border hover:bg-gray-50 text-[#202124] font-medium py-1.5 rounded-full transition-colors text-[11px]" onClick={() => resolveComment(id)}>Resolve</button>
      </div>
    </div>
  );
};

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [resolvedComments, setResolvedComments] = useState({});
  const [statsAnimated, setStatsAnimated] = useState(false);
  
  const statsRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const resolveComment = (id) => setResolvedComments(prev => ({ ...prev, [id]: true }));

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
    }
  };

  const handleKeyDown = (e) => {
    const allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown', 'c', 'v', 'a'];
    const isCmd = e.ctrlKey || e.metaKey;
    if (!allowedKeys.includes(e.key) && !isCmd) e.preventDefault();
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const handleScroll = () => {
      let currentActive = outline[0].id;
      for (const item of outline) {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) currentActive = item.id;
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
            const suffix = counter.getAttribute('data-suffix') || '';
            let current = 0;
            const duration = 1500;
            const start = performance.now();
            const update = (time) => {
              const elapsed = time - start;
              const progress = Math.min(elapsed / duration, 1);
              current = Math.round(progress * target);
              counter.textContent = current + suffix;
              if (progress < 1) requestAnimationFrame(update);
            };
            requestAnimationFrame(update);
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
      <VerticalRuler />
      
      <div className="flex flex-1 overflow-hidden pt-[104px]">
        
        {/* Document Sidebar (Styled like Google Doc Tabs) */}
        <div className="w-[240px] bg-white fixed left-0 top-[104px] bottom-0 p-4 overflow-y-auto hidden lg:block z-40 border-r border-doc-border sidebar">
          <div className="flex items-center justify-between mb-6">
            <span className="text-[14px] font-medium text-[#202124]">Document tabs</span>
            <span className="material-symbols-outlined text-[18px] text-[#5f6368] cursor-pointer">add</span>
          </div>
          <div className="bg-[#EAF1FC] text-google-blue rounded-lg p-3 flex items-center gap-3 mb-4 cursor-pointer">
            <span className="material-symbols-outlined text-[20px]">description</span>
            <span className="text-[14px] font-medium">Tab 1</span>
          </div>
          <div className="pl-4 border-l border-gray-200 ml-2">
            <div className="text-[11px] font-bold text-[#5f6368] mb-4 uppercase tracking-wider">Sections</div>
            <div className="flex flex-col gap-1">
              {outline.map(item => (
                <div 
                  key={item.id}
                  className={`cursor-pointer text-[13px] py-1.5 transition-colors ${activeSection === item.id ? 'text-google-blue font-bold' : 'text-[#5f6368] hover:text-[#202124]'}`}
                  onClick={() => scrollTo(item.id)}
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden lg:ml-[240px]">
          <HorizontalRuler />

          <div id="scroll-container" ref={scrollContainerRef} className="flex-1 overflow-y-auto flex flex-col items-center bg-[#F0F2F5] pt-8 pb-48 scroll-smooth">
            
            {/* Continuous Document with Visual Page Breaks */}
            <div 
              contentEditable="true"
              onKeyDown={handleKeyDown}
              suppressContentEditableWarning={true}
              spellCheck="false"
              className="relative flex flex-col items-center outline-none font-doc"
            >
              
              {/* PAGE 1 */}
              <div className="document-page relative bg-white shadow-page px-[96px] py-[96px] mb-[12px] flex flex-col">
                <div contentEditable="false" className="absolute top-0 right-0 left-0 h-0 z-[45]">
                  <CommentCard id="1" avatarText="HR" avatarBg="#34A853" name="Head of Product" time="2 days ago" text="Whoever built this website understands product." topOffset="80px" isResolved={resolvedComments["1"]} resolveComment={resolveComment} />
                  <CommentCard id="2" avatarText="VK" avatarBg="#4285F4" name="Hiring Manager" time="Yesterday" text="Production Ready status is a bold move. I like it." topOffset="220px" isResolved={resolvedComments["2"]} resolveComment={resolveComment} />
                </div>

                <div id="hero" className="mb-6">
                  <h1 className="text-[26pt] font-bold mb-[12px] mt-0 text-[#202124] leading-tight">Anush Gupta v2.0</h1>
                  <table className="prd-header-table w-full border-collapse mb-[24px] table-fixed" contentEditable="false">
                    <tbody className="text-[10pt]">
                      <tr><td className="border border-[#D0D0D0] p-2.5 font-bold w-[180px] bg-gray-50/50">Product Name</td><td className="border border-[#D0D0D0] p-2.5 font-bold">Anush Gupta</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-2.5 font-bold bg-gray-50/50">Category</td><td className="border border-[#D0D0D0] p-2.5">Product Manager / TPM</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-2.5 font-bold bg-gray-50/50">Current Version</td><td className="border border-[#D0D0D0] p-2.5">v2.0</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-2.5 font-bold bg-gray-50/50">Deployment Status</td><td className="border border-[#D0D0D0] p-2.5 font-bold text-google-green">🟢 Production Ready</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-2.5 font-bold bg-gray-50/50">Market Focus</td><td className="border border-[#D0D0D0] p-2.5">Startups, AI-First Companies</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-2.5 font-bold bg-gray-50/50">Document Owner</td><td className="border border-[#D0D0D0] p-2.5 text-doc-link underline truncate">anushgupta105@gmail.com</td></tr>
                    </tbody>
                  </table>
                </div>

                <div id="summary" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">1. Executive Summary</h2>
                  <p>Most teams struggle to find Product Managers who can balance execution, technical understanding, growth thinking, and ownership simultaneously.</p>
                  <p><strong>The Solution (Anush):</strong> A technically driven Product Manager optimized for 0→1 product execution, fast iteration cycles, ambiguity handling, and growth-focused product thinking. Designed to convert unclear ideas into structured plans and scalable systems.</p>
                </div>

                <div id="problem" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">2. Problem Statement</h2>
                  <p>Modern startups move fast, but many PMs:</p>
                  <ul className="list-disc ml-8 space-y-1">
                    <li>Depend heavily on engineering for technical clarity</li>
                    <li>Lack execution ownership</li>
                    <li>Optimize for documentation instead of shipping</li>
                    <li>Fail to balance business goals with user experience</li>
                  </ul>
                  <p className="mt-4"><strong>The Gap:</strong> Teams need PMs who move fast under uncertainty and collaborate deeply with engineering without hand-holding.</p>
                </div>

                <div id="vision" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">3. Product Vision</h2>
                  <p>Build products that solve real user problems, scale efficiently, feel intuitive, and combine strong UX with business impact. Contributing to AI-native products and developer tooling ecosystems.</p>
                </div>

                <div id="users" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">4. Target Users</h2>
                  <ul className="list-disc ml-8 space-y-2">
                    <li><strong>Startup Founders:</strong> Need high ownership with minimal supervision.</li>
                    <li><strong>Hiring Managers:</strong> Looking for execution-oriented product thinkers.</li>
                    <li><strong>Engineering Teams:</strong> Require technically aware PMs who reduce ambiguity.</li>
                  </ul>
                </div>
                <div className="mt-auto pt-8 text-gray-400 text-[10pt] flex justify-between select-none" contentEditable="false">
                  <span>Page 1 of 3</span>
                  <span>Anush Gupta v2.0</span>
                </div>
              </div>

              {/* PAGE 2 */}
              <div className="document-page relative bg-white shadow-page px-[96px] py-[96px] mb-[12px] flex flex-col">
                <div contentEditable="false" className="absolute top-0 right-0 left-0 h-0 z-[45]">
                  <CommentCard id="3" avatarText="SA" avatarBg="#FBBC04" name="Founder" time="1h ago" text="LLMs + SQL + Figma. Exactly what we need." topOffset="120px" isResolved={resolvedComments["3"]} resolveComment={resolveComment} />
                  <CommentCard id="4" avatarText="PM" avatarBg="#9C27B0" name="Senior PM" time="3h ago" text="180% growth? That's the internship metric we want." topOffset="450px" isResolved={resolvedComments["4"]} resolveComment={resolveComment} replyText="Calculated against 0 MAU baseline within 8 weeks." />
                </div>

                <div id="capabilities" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">5. Core Capabilities</h2>
                  <h3 className="text-[14px] font-bold mb-2">5.1 Product Execution Engine</h3>
                  <p className="text-[10pt] mb-3"><strong>Outcomes:</strong> Faster execution cycles, reduced communication gaps, and improved development clarity.</p>
                  <table className="prd-header-table w-full border-collapse mb-4 table-fixed" contentEditable="false">
                    <tbody className="text-[10pt]">
                      <tr><td className="border border-[#D0D0D0] p-2 font-bold w-1/3 bg-gray-50/50">Strategy</td><td className="border border-[#D0D0D0] p-2">PRD Writing, Roadmapping, GTM, Competitive Analysis</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-2 font-bold bg-gray-50/50">User Flow</td><td className="border border-[#D0D0D0] p-2">Interviews, Journey Mapping, Usability Testing</td></tr>
                    </tbody>
                  </table>

                  <h3 className="text-[14px] font-bold mb-2">5.2 Technical Integration Layer</h3>
                  <p className="text-[10pt] mb-3">Allows efficient collaboration with developers and improves feasibility analysis during planning.</p>
                  <table className="prd-header-table w-full border-collapse mb-4 table-fixed" contentEditable="false">
                    <tbody className="text-[10pt]">
                      <tr><td className="border border-[#D0D0D0] p-2 font-bold w-1/3 bg-gray-50/50">Tech Stack</td><td className="border border-[#D0D0D0] p-2">Python, Java, Spring Boot, SQL, Docker, APIs</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-2 font-bold bg-gray-50/50">Modern AI</td><td className="border border-[#D0D0D0] p-2">LLMs/LangChain, Vector DBs, Prompt Engineering</td></tr>
                    </tbody>
                  </table>
                </div>

                <div id="experience" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">6. Professional Experience</h2>
                  <div id="parkplus" className="mb-4">
                    <h3 className="text-[14px] font-bold mb-1">Product Intern — Park+</h3>
                    <p className="italic text-[#5f6368] mb-2 text-[10pt]">Jun 2025 – Aug 2025 | Growth & Insurance</p>
                    <ul className="list-disc ml-8 space-y-1">
                      <li>Optimized Quote → Proposal funnel experience to drive conversion.</li>
                      <li>Improved trust signals and UX clarity for Motor Insurance initiatives.</li>
                      <li>Collaborated cross-functionally with Design, Growth, and Engineering.</li>
                    </ul>
                  </div>
                </div>

                <div id="architecture" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">7. Product Architecture</h2>
                  <table className="prd-header-table w-full border-collapse table-fixed" contentEditable="false">
                    <tbody className="text-[10pt]">
                      <tr><td className="border border-[#D0D0D0] p-2 font-bold bg-gray-50/50 w-1/3">Thinking Engine</td><td className="border border-[#D0D0D0] p-2">Converts ambiguous ideas into structured execution</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-2 font-bold bg-gray-50/50">Technical Layer</td><td className="border border-[#D0D0D0] p-2">Bridges product and engineering communication</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-2 font-bold bg-gray-50/50">Growth System</td><td className="border border-[#D0D0D0] p-2">Optimizes funnel performance and KPI tracking</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-2 font-bold bg-gray-50/50">UX Decision Layer</td><td className="border border-[#D0D0D0] p-2">Focuses on intuitive and frictionless journeys</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-auto pt-8 text-gray-400 text-[10pt] flex justify-between select-none" contentEditable="false">
                  <span>Page 2 of 3</span>
                  <span>Anush Gupta v2.0</span>
                </div>
              </div>

              {/* PAGE 3 */}
              <div className="document-page relative bg-white shadow-page px-[96px] py-[96px] mb-[12px] flex flex-col">
                <div contentEditable="false" className="absolute top-0 right-0 left-0 h-0 z-[45]">
                  <CommentCard id="5" avatarText="HR" avatarBg="#34A853" name="Recruiter" time="Today" text="Brilliant PRD format. Let's schedule an interview." topOffset="650px" isResolved={resolvedComments["5"]} resolveComment={resolveComment} />
                </div>

                <div id="projects" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">8. Side Projects</h2>
                  <h3 className="text-[14px] font-bold mb-1">8.1 Trip Helper</h3>
                  <p className="text-[10pt] mb-1">Route optimization and trip-cost calculation (Fuel, Tolls, Maps).</p>
                  <p className="text-[10pt] italic text-[#5F6368] mb-3">Stack: Spring Boot • APIs • SQL • Maps Integration</p>
                  
                  <h3 className="text-[14px] font-bold mb-1">8.2 AI DevOps Knowledge Agent</h3>
                  <p className="text-[10pt] mb-1">AI-powered documentation system reducing onboarding friction.</p>
                  <p className="text-[10pt] italic text-[#5F6368] mb-3">Stack: LLMs • LangChain • Python • Vector DBs</p>
                </div>

                <div id="principles" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">9. Product Principles</h2>
                  <p className="text-[10pt] mb-2 font-medium">Ship fast. Iterate continuously. Prioritize clarity. Focus on impact.</p>
                </div>

                <div id="metrics" className="mb-[32px]" ref={statsRef}>
                  <h2 className="text-[18px] font-bold mb-[8px]">10. KPIs & Success Metrics</h2>
                  <ul className="space-y-2 mt-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-google-blue"></div>
                      <div className="text-[10pt] font-medium"><strong className="stat-counter" data-target="180" data-suffix="%">0%</strong> User Growth Impact</div>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-google-red"></div>
                      <div className="text-[10pt] font-medium"><strong className="stat-counter" data-target="8" data-suffix=" Weeks">0 Weeks</strong> Sprint Execution Window</div>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-google-green"></div>
                      <div className="text-[10pt] font-medium"><strong className="stat-counter" data-target="100" data-suffix="%">0%</strong> Feature Ownership</div>
                    </li>
                  </ul>
                </div>

                <div id="roadmap" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">11. Future Roadmap</h2>
                  <p className="text-[10pt]">Scale PM expertise in AI-first ecosystems and lead products with significant DAU/MAU scale. Long-term focus on category-defining tech products.</p>
                </div>

                <div id="release" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">12. Release Plan & Contact</h2>
                  <div className="flex flex-wrap gap-2.5 mt-4" contentEditable="false">
                    <button onClick={() => window.location.href='mailto:anushgupta105@gmail.com'} className="flex items-center gap-2 bg-google-blue text-white px-5 py-2 rounded-full font-bold text-[10pt] shadow-sm hover:bg-google-blue-hover transition-colors">Email Me</button>
                    <button onClick={() => window.open(resumeUrl, '_blank')} className="flex items-center gap-2 bg-white border border-[#D0D0D0] text-[#202124] px-5 py-2 rounded-full font-bold text-[10pt] shadow-sm hover:bg-gray-50 transition-colors">Resume</button>
                    <button onClick={() => window.open('https://linkedin.com/in/anush-gupta105', '_blank')} className="flex items-center gap-2 bg-white border border-[#D0D0D0] text-[#202124] px-5 py-2 rounded-full font-bold text-[10pt] shadow-sm hover:bg-gray-50 transition-colors">LinkedIn</button>
                  </div>
                </div>

                <div id="notes" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">13. Final Release Notes</h2>
                  <p className="text-[10pt] italic">Anush Gupta v2.0 is optimized for startup environments, fast execution cycles, and high-ownership roles.</p>
                  <p className="text-[10pt] mt-2 font-bold text-google-green">Build status: ✅ Stable | ✅ Ready for Deployment</p>
                </div>

                <div className="mt-auto pt-8 text-gray-400 text-[10pt] flex justify-between select-none" contentEditable="false">
                  <span>Page 3 of 3</span>
                  <span>Anush Gupta v2.0</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
