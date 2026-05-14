const tools = [
  { name: 'Figma',     level: 'Advanced', pct: 90 },
  { name: 'Jira',      level: 'Advanced', pct: 90 },
  { name: 'Notion',    level: 'Advanced', pct: 88 },
  { name: 'Miro',      level: 'Mid',      pct: 65 },
  { name: 'SQL',       level: 'Mid',      pct: 70 },
  { name: 'Tableau',   level: 'Mid',      pct: 60 },
  { name: 'Excel',     level: 'Advanced', pct: 85 },
  { name: 'Slack',     level: 'Advanced', pct: 95 },
  { name: 'Python',    level: 'Mid',      pct: 55 },
  { name: 'Analytics', level: 'Mid',      pct: 65 },
];

const levelColor = { Advanced: '#22c55e', Mid: '#f59e0b' };

const ToolsGrid = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
    {tools.map((tool) => (
      <div
        key={tool.name}
        className="group flex flex-col gap-2 p-4 rounded transition-all duration-200 cursor-default"
        style={{
          background: '#14161b',
          border: '1px solid #252830',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'rgba(79,110,247,0.5)';
          e.currentTarget.style.boxShadow = '0 0 12px rgba(79,110,247,0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#252830';
          e.currentTarget.style.boxShadow = 'none';
        }}
      >
        <span
          className="text-sm font-semibold"
          style={{ color: '#e8eaf0', fontFamily: 'DM Sans, sans-serif' }}
        >
          {tool.name}
        </span>

        {/* Progress bar */}
        <div
          className="w-full h-1 rounded-full overflow-hidden"
          style={{ background: '#252830' }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${tool.pct}%`,
              background: tool.level === 'Advanced' ? '#22c55e' : '#f59e0b',
            }}
          />
        </div>

        <span
          className="text-xs"
          style={{
            color: levelColor[tool.level],
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
          }}
        >
          {tool.level}
        </span>
      </div>
    ))}
  </div>
);

export default ToolsGrid;
