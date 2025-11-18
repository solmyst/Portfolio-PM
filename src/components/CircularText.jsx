import React from 'react';

const CircularText = ({ text, radius = 100, fontSize = 16, className = '' }) => {
  const characters = text.split('');
  const angleStep = 360 / characters.length;

  return (
    <div className={`circular-text ${className}`} style={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
      {characters.map((char, index) => {
        const angle = angleStep * index - 90;
        const x = radius + radius * Math.cos((angle * Math.PI) / 180);
        const y = radius + radius * Math.sin((angle * Math.PI) / 180);

        return (
          <span
            key={index}
            style={{
              position: 'absolute',
              left: `${x}px`,
              top: `${y}px`,
              transform: `rotate(${angle + 90}deg)`,
              transformOrigin: 'center',
              fontSize: `${fontSize}px`,
              fontWeight: 'bold',
            }}
          >
            {char}
          </span>
        );
      })}
    </div>
  );
};

export default CircularText;
