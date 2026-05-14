import { useState } from 'react';

const columns = [
  {
    id: 'backlog',
    label: 'BACKLOG',
    color: '#6b7280',
    cards: [
      { id: 'AG-010', title: 'System Design', sub: 'Fundamentals', priority: 'P2', tag: 'Skill', detail: 'Learning system design patterns for PM technical fluency.' },
      { id: 'AG-011', title: 'PM Frameworks', sub: 'Deep Dive', priority: 'P2', tag: 'Learn', detail: 'Studying RICE, ICE, Kano, Jobs-to-be-Done frameworks.' },
    ],
  },
  {
    id: 'inprogress',
    label: 'IN PROGRESS',
    color: '#f59e0b',
    cards: [
      { id: 'AG-007', title: 'DevOps & Docker', sub: 'Fundamentals', priority: 'P1', tag: 'Learn', detail: 'Building technical PM skills — containers, CI/CD pipelines, deployment basics.' },
      { id: 'AG-008', title: 'LLMs & LangChain', sub: 'AI Integration', priority: 'P1', tag: 'Learn', detail: 'Exploring AI product integration — prompt engineering, RAG, LangChain workflows.' },
    ],
  },
  {
    id: 'review',
    label: 'REVIEW',
    color: '#7c3aed',
    cards: [],
  },
  {
    id: 'done',
    label: 'DONE',
    color: '#22c55e',
    cards: [
      {
        id: 'AG-001',
        title: 'Park+ Internship',
        sub: 'Motor Insurance PM',
        priority: 'P0',
        tag: 'Growth: 180%',
        tagColor: '#22c55e',
        metric: '180% ↑',
        chips: ['Funnel', 'WhatsApp', 'Strategy', 'UI/UX'],
        detail: 'Product Intern at Park+ (Jun–Aug 2025). Scaled Motor Insurance from early stage to 180% user growth in 8 weeks. Owned funnel redesign, WhatsApp engagement flows, and outbound feature readiness.',
        date: 'Jun–Aug 2025',
        done: true,
      },
      {
        id: 'AG-002',
        title: 'JECRC University',
        sub: 'B.Tech CSE',
        priority: 'P1',
        tag: 'Active',
        tagColor: '#4f6ef7',
        detail: 'Bachelor of Technology in Computer Science. Building technical foundation alongside PM skills.',
        done: true,
      },
    ],
  },
];

const priorityColor = { P0: '#ef4444', P1: '#f59e0b', P2: '#4f6ef7' };

const KanbanCard = ({ card, colColor }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div
        className="rounded p-3 cursor-pointer transition-all duration-200 select-none"
        style={{
          background: '#1c1f27',
          border: `1px solid #252830`,
        }}
        onClick={() => setExpanded(true)}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = colColor + '66';
          e.currentTarget.style.transform = 'scale(1.02)';
          e.currentTarget.style.boxShadow = `0 0 12px ${colColor}22`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#252830';
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        {/* Ticket ID + done badge */}
        <div className="flex items-center justify-between mb-2">
          <span
            className="text-xs"
            style={{ color: '#4f6ef7', fontFamily: 'JetBrains Mono, monospace', fontSize: '10px' }}
          >
            {card.id}
          </span>
          {card.done && (
            <span style={{ color: '#22c55e', fontSize: '12px' }}>✅</span>
          )}
        </div>

        {/* Title */}
        <p className="text-sm font-semibold mb-1" style={{ color: '#e8eaf0', fontFamily: 'DM Sans, sans-serif' }}>
          {card.title}
        </p>
        <p className="text-xs mb-3" style={{ color: '#6b7280', fontFamily: 'DM Sans, sans-serif' }}>
          {card.sub}
        </p>

        {/* Metric if present */}
        {card.metric && (
          <p className="text-lg font-bold mb-2" style={{ color: '#22c55e', fontFamily: 'JetBrains Mono, monospace' }}>
            {card.metric}
          </p>
        )}

        {/* Chips */}
        {card.chips && (
          <div className="flex flex-wrap gap-1 mb-2">
            {card.chips.map((c) => (
              <span
                key={c}
                className="px-2 py-0.5 rounded text-xs"
                style={{ background: '#252830', color: '#9ca3af', fontFamily: 'JetBrains Mono, monospace', fontSize: '9px' }}
              >
                {c}
              </span>
            ))}
          </div>
        )}

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-1">
          <span
            className="px-2 py-0.5 rounded text-xs font-bold"
            style={{
              background: priorityColor[card.priority] + '22',
              color: priorityColor[card.priority],
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '9px',
            }}
          >
            {card.priority}
          </span>
          <span
            className="px-2 py-0.5 rounded text-xs"
            style={{
              background: (card.tagColor || '#6b7280') + '22',
              color: card.tagColor || '#6b7280',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '9px',
            }}
          >
            {card.tag}
          </span>
        </div>
      </div>

      {/* Modal */}
      {expanded && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setExpanded(false)}
        >
          <div
            className="w-full max-w-md rounded-lg p-6"
            style={{ background: '#14161b', border: '1px solid #252830' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <span
                className="text-xs"
                style={{ color: '#4f6ef7', fontFamily: 'JetBrains Mono, monospace' }}
              >
                {card.id}
              </span>
              <button
                onClick={() => setExpanded(false)}
                className="text-xs px-2 py-1 rounded"
                style={{ color: '#6b7280', background: '#1c1f27', fontFamily: 'JetBrains Mono, monospace' }}
              >
                ESC
              </button>
            </div>
            <h3 className="text-lg font-bold mb-1" style={{ color: '#e8eaf0', fontFamily: 'DM Sans, sans-serif' }}>
              {card.title}
            </h3>
            <p className="text-sm mb-4" style={{ color: '#6b7280' }}>{card.sub}</p>
            {card.date && (
              <p className="text-xs mb-3" style={{ color: '#9ca3af', fontFamily: 'JetBrains Mono, monospace' }}>
                📅 {card.date}
              </p>
            )}
            <p className="text-sm leading-relaxed mb-4" style={{ color: '#9ca3af', fontFamily: 'DM Sans, sans-serif' }}>
              {card.detail}
            </p>
            <div className="flex items-center gap-2">
              <span
                className="px-2 py-1 rounded text-xs font-bold"
                style={{ background: priorityColor[card.priority] + '22', color: priorityColor[card.priority], fontFamily: 'JetBrains Mono, monospace' }}
              >
                {card.priority}
              </span>
              <span
                className="px-2 py-1 rounded text-xs"
                style={{ background: (card.tagColor || '#6b7280') + '22', color: card.tagColor || '#6b7280', fontFamily: 'JetBrains Mono, monospace' }}
              >
                {card.tag}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const KanbanBoard = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
    {columns.map((col) => (
      <div key={col.id} className="flex flex-col gap-3">
        {/* Column header */}
        <div
          className="flex items-center justify-between px-3 py-2 rounded"
          style={{ background: '#14161b', border: '1px solid #252830' }}
        >
          <span
            className="text-xs font-bold"
            style={{ color: col.color, fontFamily: 'JetBrains Mono, monospace', fontSize: '10px', letterSpacing: '0.08em' }}
          >
            {col.label}
          </span>
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center text-xs"
            style={{ background: col.color + '22', color: col.color, fontFamily: 'JetBrains Mono, monospace', fontSize: '10px' }}
          >
            {col.cards.length}
          </span>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-2">
          {col.cards.length === 0 ? (
            <div
              className="rounded p-4 text-center"
              style={{ border: '1px dashed #252830' }}
            >
              <span className="text-xs" style={{ color: '#252830', fontFamily: 'JetBrains Mono, monospace' }}>
                empty
              </span>
            </div>
          ) : (
            col.cards.map((card) => (
              <KanbanCard key={card.id} card={card} colColor={col.color} />
            ))
          )}
        </div>
      </div>
    ))}
  </div>
);

export default KanbanBoard;
