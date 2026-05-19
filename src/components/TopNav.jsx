import React, { useState, useEffect } from 'react';

const TopNav = ({ isEditable = true, onMenuClick }) => {
  const [docName, setDocName] = useState('Anush_Gupta_PRD_v2.0');
  const [isStarred, setIsStarred] = useState(false);
  const [saveStatus, setSaveStatus] = useState('All changes saved in Drive');
  const [showShareModal, setShowShareModal] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [shareEmail, setShareEmail] = useState('');

  const resumeUrl = "/Anush_Gupta_Software_Engineering_Resume.pdf";

  const [activeFormats, setActiveFormats] = useState({
    bold: false,
    italic: false,
    underline: false
  });

  useEffect(() => {
    setSaveStatus('Saving...');
    const timer = setTimeout(() => {
      setSaveStatus('All changes saved in Drive');
    }, 800);
    return () => clearTimeout(timer);
  }, [docName]);

  const execCommand = (command, value = null) => {
    if (!isEditable) return;
    document.execCommand(command, false, value);
    if (['bold', 'italic', 'underline'].includes(command)) {
      setActiveFormats(prev => ({ ...prev, [command]: !prev[command] }));
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://dev.anushgupta.tech');
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2000);
  };

  const handleShare = (e) => {
    e.preventDefault();
    if (shareEmail) {
      alert(`PRD shared with ${shareEmail}!`);
      setShareEmail('');
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-[60] bg-doc-surface flex flex-col font-ui select-none docs-header">

        {/* Header Row */}
        <div className="flex items-center justify-between px-2 h-[64px] border-b border-doc-border">
          <div className="flex items-center gap-1">
            {!isEditable && (
              <button 
                onClick={onMenuClick}
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors ml-1"
              >
                <span className="material-symbols-outlined text-[24px]">menu</span>
              </button>
            )}

            <div className="w-10 h-10 flex items-center justify-center rounded cursor-pointer hover:bg-gray-100 transition-colors ml-1" onClick={() => window.location.reload()}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.5 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V7.5L14.5 2Z" fill="#4285F4" />
                <path d="M14 2V8H20L14 2Z" fill="#1565C0" />
                <path d="M8 13H16V15H8V13Z" fill="#FFFFFF" />
                <path d="M8 17H16V19H8V17Z" fill="#FFFFFF" />
                <path d="M8 9H12V11H8V9Z" fill="#FFFFFF" />
              </svg>
            </div>

            <div className="flex flex-col justify-center h-full pt-[2px]">
              <div className="flex items-center gap-1 ml-1">
                <input
                  type="text"
                  value={docName}
                  onChange={(e) => setDocName(e.target.value)}
                  readOnly={!isEditable}
                  className={`text-[18px] text-doc-text bg-transparent outline-none border border-transparent hover:border-gray-300 focus:border-doc-blue rounded px-1 min-w-[200px] h-[24px] ${docName === 'Anush_Gupta_PRD_v2.0' && isEditable ? 'typing-cursor' : ''}`}
                />
                <span className="material-symbols-outlined text-[20px] cursor-pointer" style={{ color: isStarred ? '#FBBC04' : '#5F6368' }} onClick={() => setIsStarred(!isStarred)}>{isStarred ? 'star' : 'star_border'}</span>
                <span className="material-symbols-outlined text-[20px] text-doc-text-secondary cursor-pointer hover:bg-gray-100 p-0.5 rounded ml-1" title="Move">drive_file_move</span>
                <span className="material-symbols-outlined text-[20px] text-doc-text-secondary cursor-pointer hover:bg-gray-100 p-0.5 rounded ml-1" title="See document status">cloud_done</span>
              </div>

              <div className={`items-center text-[14px] text-doc-text mt-[2px] ${!isEditable ? 'hidden' : 'flex'}`}>
                {['File', 'Edit', 'View', 'Insert', 'Format', 'Tools', 'Extensions', 'Help'].map(menu => (
                  <div key={menu} className="px-2 py-[2px] rounded hover:bg-gray-100 cursor-pointer">{menu}</div>
                ))}
                <span className="text-[13px] text-doc-text-secondary ml-4 italic truncate max-w-[200px]">{saveStatus}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pr-2">
            <div className="flex items-center gap-1 text-doc-text-secondary">
              <button className="material-symbols-outlined text-[24px] hover:bg-gray-100 p-2 rounded-full transition-colors" title="Open comment history">comment</button>
              <button className="material-symbols-outlined text-[24px] hover:bg-gray-100 p-2 rounded-full transition-colors" title="Join a call here">videocam</button>
            </div>

            <button onClick={() => setShowShareModal(true)} className="flex items-center gap-2 bg-google-blue hover:bg-google-blue-hover text-white px-6 py-2 rounded-full font-medium text-[14px] transition-colors h-[36px]">
              <span className="material-symbols-outlined text-[18px]">lock</span> Share
            </button>

            <div className="relative">
              <div
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="w-[40px] h-[40px] rounded-full bg-[#A8C7FA] flex items-center justify-center text-[#0B57D0] text-[15px] font-medium border-2 border-transparent hover:border-gray-200 cursor-pointer transition-colors ml-1 shadow-sm"
              >
                AG
              </div>

              {showProfileMenu && (
                <>
                  <div className="fixed inset-0 z-[80]" onClick={() => setShowProfileMenu(false)}></div>
                  <div className="absolute right-0 mt-2 w-[300px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-[100] overflow-hidden py-6 px-2 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex flex-col items-center mb-6">
                      <div className="w-[80px] h-[80px] rounded-full bg-[#A8C7FA] flex items-center justify-center text-[#0B57D0] text-[32px] font-medium mb-2">AG</div>
                      <div className="text-[18px] font-medium text-[#202124]">Anush Gupta</div>
                      <div className="text-[14px] text-[#5F6368]">anushgupta105@gmail.com</div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <button
                        onClick={() => window.open('https://www.linkedin.com/in/anush-gupta105/', '_blank')}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                      >
                        <span className="material-symbols-outlined text-google-blue">person_outline</span>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-medium text-[#202124]">View LinkedIn</span>
                          <span className="text-[12px] text-[#5F6368]">Professional network & contact</span>
                        </div>
                      </button>
                      <button
                        onClick={() => window.open(resumeUrl, '_blank')}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                      >
                        <span className="material-symbols-outlined text-google-red">description</span>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-medium text-[#202124]">Download Resume</span>
                          <span className="text-[12px] text-[#5F6368]">Official Document Link</span>
                        </div>
                      </button>
                      <button
                        onClick={() => window.location.href = 'mailto:anushgupta105@gmail.com'}
                        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-50 rounded-xl transition-colors text-left"
                      >
                        <span className="material-symbols-outlined text-google-green">mail</span>
                        <div className="flex flex-col">
                          <span className="text-[14px] font-medium text-[#202124]">Hire Anush</span>
                          <span className="text-[12px] text-[#5F6368]">Send a direct inquiry</span>
                        </div>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Toolbar Row */}
        <div className={`flex items-center px-4 h-[40px] bg-doc-toolbar text-doc-text overflow-x-auto whitespace-nowrap toolbar shadow-sm border-b border-doc-border ${!isEditable ? 'hidden' : 'flex'}`}>
          <div className="flex items-center gap-0.5 pr-2 mr-2 border-r border-doc-border-medium h-[20px]">
            <button onClick={() => execCommand('undo')} className="w-[28px] h-[28px] flex items-center justify-center hover:bg-black/5 rounded"><span className="material-symbols-outlined text-[20px]">undo</span></button>
            <button onClick={() => execCommand('redo')} className="w-[28px] h-[28px] flex items-center justify-center hover:bg-black/5 rounded"><span className="material-symbols-outlined text-[20px]">redo</span></button>
            <button className="w-[28px] h-[28px] flex items-center justify-center hover:bg-black/5 rounded" onClick={() => window.print()}><span className="material-symbols-outlined text-[20px]">print</span></button>
          </div>
          <div className="flex items-center gap-0.5 pr-2 mr-2 border-r border-doc-border-medium h-[20px]">
            <button className="flex items-center justify-between px-2 h-[28px] hover:bg-black/5 rounded w-[60px] border border-transparent">
              <span className="text-[14px]">100%</span>
              <span className="text-[10px]">▼</span>
            </button>
          </div>
          <div className="flex items-center gap-0.5 pr-2 mr-2 border-r border-doc-border-medium h-[20px]">
            <button className="flex items-center justify-between px-2 h-[28px] hover:bg-black/5 rounded w-[90px] border border-transparent">
              <span className="text-[14px]">Normal text</span>
              <span className="text-[10px]">▼</span>
            </button>
          </div>
          <div className="flex items-center gap-0.5 pr-2 mr-2 border-r border-doc-border-medium h-[20px]">
            <button className="flex items-center justify-between px-2 h-[28px] hover:bg-black/5 rounded w-[70px] font-doc border border-transparent">
              <span className="text-[14px]">Arial</span>
              <span className="text-[10px]">▼</span>
            </button>
          </div>
          <div className="flex items-center gap-0.5 pr-2 mr-2 border-r border-doc-border-medium h-[20px]">
            <button className="w-[28px] h-[28px] flex items-center justify-center hover:bg-black/5 rounded"><span className="material-symbols-outlined text-[20px]">remove</span></button>
            <div className="w-[32px] h-[28px] border border-gray-300 rounded bg-white text-[14px] flex items-center justify-center">11</div>
            <button className="w-[28px] h-[28px] flex items-center justify-center hover:bg-black/5 rounded"><span className="material-symbols-outlined text-[20px]">add</span></button>
          </div>
          <div className="flex items-center gap-0.5 pr-2 mr-2 border-r border-doc-border-medium h-[20px]">
            <button onClick={() => execCommand('bold')} className={`w-[28px] h-[28px] flex items-center justify-center rounded ${activeFormats.bold ? 'bg-google-blue-light text-google-blue' : 'hover:bg-black/5'}`}><span className="material-symbols-outlined text-[20px] font-bold">format_bold</span></button>
            <button onClick={() => execCommand('italic')} className={`w-[28px] h-[28px] flex items-center justify-center rounded ${activeFormats.italic ? 'bg-google-blue-light text-google-blue' : 'hover:bg-black/5'}`}><span className="material-symbols-outlined text-[20px]">format_italic</span></button>
            <button onClick={() => execCommand('underline')} className={`w-[28px] h-[28px] flex items-center justify-center rounded ${activeFormats.underline ? 'bg-google-blue-light text-google-blue' : 'hover:bg-black/5'}`}><span className="material-symbols-outlined text-[20px]">format_underlined</span></button>
          </div>
          <div className="flex items-center gap-0.5 pr-2 mr-2 border-r border-doc-border-medium h-[20px]">
            <button className="w-[28px] h-[28px] flex items-center justify-center hover:bg-black/5 rounded"><span className="material-symbols-outlined text-[20px]">link</span></button>
            <button className="w-[28px] h-[28px] flex items-center justify-center hover:bg-black/5 rounded"><span className="material-symbols-outlined text-[20px]">add_comment</span></button>
          </div>
          <div className="ml-auto flex items-center">
            <button className="flex items-center justify-between px-3 h-[28px] hover:bg-black/5 rounded border border-transparent">
              <span className="material-symbols-outlined text-[18px] mr-2">edit</span>
              <span className="text-[14px]">Editing</span>
              <span className="text-[10px] ml-2">▼</span>
            </button>
          </div>
        </div>
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black/50 z-[200] flex items-center justify-center font-ui" onClick={() => setShowShareModal(false)}>
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-[500px] overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-center mb-4 text-[#202124]">
                <h2 className="text-[22px]">Share "{docName}"</h2>
                <button onClick={() => setShowShareModal(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"><span className="material-symbols-outlined">close</span></button>
              </div>
              <form onSubmit={handleShare} className="mb-6">
                <div className="flex gap-2">
                  <input type="email" placeholder="Add people and groups" value={shareEmail} onChange={(e) => setShareEmail(e.target.value)} className="flex-1 border border-gray-300 rounded h-[48px] px-4 outline-none focus:border-google-blue focus:border-2 text-[14px]" />
                  <button type="submit" className="bg-google-blue hover:bg-google-blue-hover text-white px-4 rounded h-[48px] font-medium text-[14px]">Share</button>
                </div>
              </form>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
              <button onClick={handleCopyLink} className="flex items-center gap-2 border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-full text-[14px] font-medium text-google-blue transition-colors">
                <span className="material-symbols-outlined text-[18px]">{linkCopied ? 'check' : 'link'}</span> {linkCopied ? 'Link copied!' : 'Copy link'}
              </button>
              <button onClick={() => setShowShareModal(false)} className="bg-google-blue hover:bg-google-blue-hover text-white px-6 py-2 rounded-full text-[14px] font-medium transition-colors">Done</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TopNav;
