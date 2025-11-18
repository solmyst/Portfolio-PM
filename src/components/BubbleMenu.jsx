import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';

const BubbleMenu = ({ items, position = 'bottom-right' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'top-right': 'top-8 right-8',
    'top-left': 'top-8 left-8',
  };

  const getBubblePosition = (index, total) => {
    const angle = (index * (180 / (total - 1))) - 90;
    const radius = 100;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y };
  };

  return (
    <div className={`fixed ${positionClasses[position]} z-50`}>
      {/* Menu items */}
      {isOpen && items.map((item, index) => {
        const { x, y } = getBubblePosition(index, items.length);
        return (
          <button
            key={index}
            onClick={item.onClick}
            className="absolute w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-all duration-300 group"
            style={{
              transform: `translate(${x}px, ${y}px)`,
              animation: `bubbleIn 0.3s ease-out ${index * 0.05}s both`,
            }}
            title={item.label}
          >
            {item.icon}
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {item.label}
            </span>
          </button>
        );
      })}

      {/* Main toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all duration-300 relative z-10"
        aria-label="Toggle menu"
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
          {isOpen ? <X className="w-8 h-8" /> : <Plus className="w-8 h-8" />}
        </div>
      </button>

      <style jsx>{`
        @keyframes bubbleIn {
          from {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          to {
            opacity: 1;
            transform: translate(var(--x), var(--y)) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default BubbleMenu;
