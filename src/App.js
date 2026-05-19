import React, { useState, useEffect, useRef } from 'react';
import TopNav from './components/TopNav';

const resumeUrl = "/Anush_Gupta_Software_Engineering_Resume.pdf";

const outline = [
  { id: 'hero', label: 'Anush Gupta v2.0', level: 1 },
  { id: 'about', label: '1. About Me', level: 2 },
  { id: 'summary', label: '2. Executive Summary', level: 2 },
  { id: 'problem', label: '3. Problem Statement', level: 2 },
  { id: 'vision', label: '4. Product Vision', level: 2 },
  { id: 'users', label: '5. Target Users', level: 2 },
  { id: 'how-i-work', label: '6. How I Work', level: 2 },
  { id: 'experience', label: '7. Professional Experience', level: 2 },
  { id: 'projects', label: '8. Side Projects & Concepts', level: 2 },
  { id: 'principles', label: '9. Product Principles', level: 2 },
  { id: 'metrics', label: '10. KPIs & Success Metrics', level: 2 },
  { id: 'roadmap', label: '11. Future Roadmap', level: 2 },
  { id: 'release', label: '12. Release Plan & Contact', level: 2 },
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

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [statsAnimated, setStatsAnimated] = useState(false);
  const [isEditable, setIsEditable] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const statsRef = useRef(null);
  const scrollContainerRef = useRef(null);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      setIsSidebarOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!isEditable) return;
    const allowedKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End', 'PageUp', 'PageDown', 'c', 'v', 'a'];
    const isCmd = e.ctrlKey || e.metaKey;
    if (!allowedKeys.includes(e.key) && !isCmd) e.preventDefault();
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsEditable(window.innerWidth > 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

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
    return () => {
      scrollContainer?.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkMobile);
    };
  }, [statsAnimated]);

  return (
    <div className="bg-[#F0F2F5] h-screen font-ui text-doc-text flex flex-col overflow-hidden">
      <TopNav isEditable={isEditable} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <VerticalRuler />

      <div className={`flex flex-1 overflow-hidden ${isEditable ? 'pt-[104px]' : 'pt-[64px]'} transition-all duration-300`}>
        
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && !isEditable && (
          <div 
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[45] lg:hidden animate-in fade-in duration-300"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Document Sidebar (Styled like Google Doc Tabs) */}
        <div className={`w-[240px] bg-white fixed left-0 ${isEditable ? 'top-[104px]' : 'top-[64px]'} bottom-0 p-4 overflow-y-auto z-50 border-r border-doc-border sidebar transition-all duration-300 
          ${isSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'} lg:translate-x-0 lg:block lg:z-40 ${!isSidebarOpen && 'hidden lg:block'}`}>
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
          {isEditable && <HorizontalRuler />}

          <div id="scroll-container" ref={scrollContainerRef} className="flex-1 overflow-y-auto flex flex-col items-center bg-[#F0F2F5] pt-8 pb-48 scroll-smooth">

            {/* Continuous Document with Visual Page Breaks */}
            <div
              contentEditable={isEditable ? "true" : "false"}
              onKeyDown={handleKeyDown}
              suppressContentEditableWarning={true}
              spellCheck="false"
              className="relative flex flex-col items-center outline-none font-doc"
            >

              {/* PAGE 1 */}
              <div className="document-page relative bg-white shadow-page px-[96px] py-[96px] mb-[12px] flex flex-col">

                <div id="hero" className="mb-6">
                  <h1 className="text-[26pt] font-bold mb-[12px] mt-0 text-[#202124] leading-tight">Anush Gupta v2.0</h1>
                  <table className="prd-header-table w-full border-collapse mb-[24px] table-fixed" contentEditable="false">
                    <tbody className="text-[10pt]">
                      <tr><td className="border border-[#D0D0D0] p-2.5 font-bold w-[180px] bg-gray-50/50">Product Name</td><td className="border border-[#D0D0D0] p-2.5 font-bold">Anush Gupta</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-2.5 font-bold bg-gray-50/50">Category</td><td className="border border-[#D0D0D0] p-2.5">Product Manager / TPM</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-2.5 font-bold bg-gray-50/50">Current Version</td><td className="border border-[#D0D0D0] p-2.5">v2.0</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-2.5 font-bold bg-gray-50/50">Currently</td><td className="border border-[#D0D0D0] p-2.5">Final-year B.Tech student (graduating Apr 2027). Open to PM internships and new-grad PM roles.</td></tr>
                      <tr><td className="border border-[#D0D0D0] p-2.5 font-bold bg-gray-50/50">Document Owner</td><td className="border border-[#D0D0D0] p-2.5 text-doc-link underline truncate">anushgupta105@gmail.com</td></tr>
                    </tbody>
                  </table>
                </div>

                <div id="about" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">1. About Me</h2>
                  <p className="text-[10pt] leading-relaxed">I am Anush Gupta, a final-year B.Tech student graduating in April 2027. I'm actively looking for Product Manager internships and new-grad PM roles where I can roll up my sleeves and build. I'm incredibly proud of my work at Park+, where I owned conversion initiatives from raw database analysis to shipped WhatsApp features, and I love taking raw ideas and turning them into working products.</p>
                </div>

                <div id="summary" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">2. Executive Summary</h2>
                  <p className="text-[10pt] leading-relaxed">Most teams struggle to find Product Managers who can balance execution, technical understanding, growth thinking, and ownership simultaneously.</p>
                  <p className="text-[10pt] leading-relaxed"><strong>The Solution (Anush):</strong> A technically driven Product Manager optimized for 0→1 product execution, fast iteration cycles, ambiguity handling, and growth-focused product thinking. Designed to convert unclear ideas into structured plans and scalable systems.</p>
                </div>

                <div id="problem" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">3. Problem Statement</h2>
                  <p className="text-[10pt] leading-relaxed">Modern startups move fast, but many PMs:</p>
                  <ul className="list-disc ml-8 space-y-1 text-[10pt]">
                    <li>Depend heavily on engineering for technical clarity</li>
                    <li>Lack execution ownership</li>
                    <li>Optimize for documentation instead of shipping</li>
                    <li>Fail to balance business goals with user experience</li>
                  </ul>
                  <p className="mt-4 text-[10pt] leading-relaxed"><strong>The Gap:</strong> Teams need PMs who move fast under uncertainty and collaborate deeply with engineering without hand-holding.</p>
                </div>

                <div id="vision" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">4. Product Vision</h2>
                  <p className="text-[10pt] leading-relaxed">Build products that solve real user problems, scale efficiently, feel intuitive, and combine strong UX with business impact. Contributing to AI-native products and developer tooling ecosystems.</p>
                </div>

                <div id="users" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">5. Target Users</h2>
                  <ul className="list-disc ml-8 space-y-2 text-[10pt]">
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

                <div id="how-i-work" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">6. How I Work</h2>
                  <ul className="list-disc ml-8 space-y-3 text-[10pt]">
                    <li><strong>Writing PRDs that ship.</strong> I write specs that engineers can implement without coming back for clarification. At Park+ I wrote multiple PRDs across the Motor Insurance vertical.</li>
                    <li><strong>Reading funnels and acting on them.</strong> I'm comfortable in Metabase and SQL. The Park+ funnel redesign came from spotting drop-off patterns and proposing specific fixes.</li>
                    <li><strong>Working closely with engineering.</strong> I lead daily stand-ups, sit with developers when they're stuck, and have enough technical literacy (Python, OOP, DBMS from my B.Tech) to understand trade-offs.</li>
                    <li><strong>Talking to users.</strong> I run feedback calls before I write specs. The WhatsApp re-engagement at Park+ came from spotting a specific user behaviour pattern.</li>
                  </ul>
                </div>

                <div id="experience" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[12px]">7. Professional Experience</h2>
                  
                  <div className="border border-[#D0D0D0] rounded-lg p-5 bg-white shadow-sm mb-4">
                    <div className="flex justify-between items-start mb-3 flex-wrap gap-2">
                      <div>
                        <h3 className="text-[15px] font-bold text-[#202124]">Product Intern — Park+</h3>
                        <p className="text-[10pt] text-google-blue font-medium mt-0.5">Growth & Insurance Vertical</p>
                      </div>
                      <span className="text-[9pt] font-semibold text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full">Jun 2025 – Aug 2025 (8 Weeks)</span>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Objective</h4>
                      <p className="text-[10pt] text-[#202124] leading-relaxed">Drive conversion optimization and acquisition growth in the high-impact Motor Insurance vertical by identifying and fixing severe drop-off stages in the acquisition funnel.</p>
                    </div>

                    <div className="mb-4">
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1">Actions Taken</h4>
                      <ul className="list-disc ml-5 space-y-1.5 text-[10pt] text-[#202124] leading-relaxed">
                        <li><strong>Funnel Analysis & Form Redesign:</strong> Audited user drop-off trends in Metabase & SQL. Simplified the complex multi-step Quote → Proposal flow into a streamlined single-page form, reducing user cognitive friction.</li>
                        <li><strong>WhatsApp Re-engagement:</strong> Designed and deployed trigger-based WhatsApp notification flows that automatically reached out to users who abandoned their quotes, providing a direct one-click checkout link.</li>
                        <li><strong>Internal Sales Dashboard:</strong> Collaborated cross-functionally to spec and ship an internal dashboard for sales support agents, enabling them to easily capture off-funnel sales and resolve quote inquiries.</li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-400 mb-1.5">Impact Delivered</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-blue-50/50 border border-blue-100 rounded text-center">
                          <div className="text-[16pt] font-bold text-google-blue">7x Growth</div>
                          <div className="text-[8.5pt] text-gray-600 mt-0.5">Daily Active Users (2K → 14K)</div>
                        </div>
                        <div className="p-3 bg-green-50/50 border border-green-100 rounded text-center">
                          <div className="text-[16pt] font-bold text-google-green">10x Growth</div>
                          <div className="text-[8.5pt] text-gray-600 mt-0.5">Daily Policies Sold (5 → 60)</div>
                        </div>
                        <div className="p-3 bg-red-50/50 border border-red-100 rounded text-center">
                          <div className="text-[16pt] font-bold text-google-red">3 Features</div>
                          <div className="text-[8.5pt] text-gray-600 mt-0.5">Shipped End-to-End</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-auto pt-8 text-gray-400 text-[10pt] flex justify-between select-none" contentEditable="false">
                  <span>Page 2 of 3</span>
                  <span>Anush Gupta v2.0</span>
                </div>
              </div>

              {/* PAGE 3 */}
              <div className="document-page relative bg-white shadow-page px-[96px] py-[96px] mb-[12px] flex flex-col">

                <div id="projects" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[12px]">8. Side Projects & Concepts</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-[14px] font-bold mb-1 text-[#202124]">8.1 Trip Helper <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full ml-1.5 uppercase font-ui">Concept</span></h3>
                      <p className="text-[10pt] leading-relaxed text-[#202124]">A route planner that returns tolls, fuel estimates, food stops, and total trip budget for a given start and destination.</p>
                      <p className="text-[9.5pt] italic text-[#5F6368] mt-1 font-medium"><strong>Product Question:</strong> How do you make trip planning feel less like research?</p>
                    </div>

                    <div>
                      <h3 className="text-[14px] font-bold mb-1 text-[#202124]">8.2 AI DevOps Knowledge Agent <span className="text-[10px] font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full ml-1.5 uppercase font-ui">Concept</span></h3>
                      <p className="text-[10pt] leading-relaxed text-[#202124]">An onboarding assistant that helps new engineers navigate internal documentation faster.</p>
                      <p className="text-[9.5pt] italic text-[#5F6368] mt-1 font-medium"><strong>Product Question:</strong> Where exactly does new-hire ramp-up break down, and which of those breaks can an LLM actually fix?</p>
                    </div>

                    <div>
                      <h3 className="text-[14px] font-bold mb-1 text-[#202124]">8.3 Park+ Phonebook <span className="text-[10px] font-semibold text-google-blue bg-blue-50 px-2 py-0.5 rounded-full ml-1.5 uppercase font-ui">Shipped Contribution</span></h3>
                      <p className="text-[10pt] leading-relaxed text-[#202124]">A contact synchronization and directory search feature within the core Park+ mobile app. Shipped contact sync backend in Java to allow seamless lookup of community phone numbers, bridging the trust and connectivity gap between vehicle owners and parking operators.</p>
                    </div>
                  </div>
                </div>

                <div id="principles" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">9. Product Principles</h2>
                  <div className="text-[10pt] italic font-medium bg-gray-50 p-3.5 border-l-4 border-google-blue rounded-r text-gray-700 leading-relaxed">
                    "I'd rather ship a 70% solution this week and learn from real users than a 95% solution next quarter."
                  </div>
                </div>

                <div id="metrics" className="mb-[32px]" ref={statsRef}>
                  <h2 className="text-[18px] font-bold mb-[8px]">10. KPIs & Success Metrics</h2>
                  <ul className="space-y-3.5 mt-2">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-google-blue flex-shrink-0"></div>
                      <div className="text-[10pt] font-medium text-[#202124]"><strong className="stat-counter text-google-blue text-[11pt]" data-target="7" data-suffix="x">0x</strong> Growth in Daily Active Users (2K → 14K) in 8 weeks</div>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-google-red flex-shrink-0"></div>
                      <div className="text-[10pt] font-medium text-[#202124]"><strong className="stat-counter text-google-red text-[11pt]" data-target="10" data-suffix="x">0x</strong> Growth in daily policies sold (5 → 60)</div>
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-google-green flex-shrink-0"></div>
                      <div className="text-[10pt] font-medium text-[#202124]"><strong className="stat-counter text-google-green text-[11pt]" data-target="3" data-suffix="">0</strong> Features shipped end-to-end, including WhatsApp re-engagement and an internal sales dashboard</div>
                    </li>
                  </ul>
                </div>

                <div id="roadmap" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">11. Future Roadmap</h2>
                  <p className="text-[10pt] leading-relaxed">Scale PM expertise in AI-first ecosystems and lead products with significant DAU/MAU scale. Long-term focus on category-defining tech products.</p>
                </div>

                <div id="release" className="mb-[32px]">
                  <h2 className="text-[18px] font-bold mb-[8px]">12. Release Plan & Contact</h2>
                  <div className="flex flex-wrap gap-2.5 mt-4" contentEditable="false">
                    <button onClick={() => window.location.href = 'mailto:anushgupta105@gmail.com'} className="flex items-center gap-2 bg-google-blue text-white px-5 py-2 rounded-full font-bold text-[10pt] shadow-sm hover:bg-google-blue-hover transition-colors">Email Me</button>
                    <button onClick={() => window.open(resumeUrl, '_blank')} className="flex items-center gap-2 bg-white border border-[#D0D0D0] text-[#202124] px-5 py-2 rounded-full font-bold text-[10pt] shadow-sm hover:bg-gray-50 transition-colors">Resume</button>
                    <button onClick={() => window.open('https://www.linkedin.com/in/anush-gupta105/', '_blank')} className="flex items-center gap-2 bg-white border border-[#D0D0D0] text-[#202124] px-5 py-2 rounded-full font-bold text-[10pt] shadow-sm hover:bg-gray-50 transition-colors">LinkedIn</button>
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
