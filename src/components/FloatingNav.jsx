import { useState } from 'react';
import { Home, User, Briefcase, Award, Mail } from 'lucide-react';

const FloatingNav = ({ activeSection, onNavigate }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'skills', label: 'Skills', icon: Award },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fadeInUp">
      {/* Glassmorphism Navigation */}
      <nav className="flex items-center gap-2 px-6 py-4 bg-white/20 backdrop-blur-xl rounded-full border border-white/30 shadow-2xl">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          const isHovered = hoveredItem === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              className={`relative flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white shadow-lg scale-110'
                  : 'text-gray-700 hover:bg-white/30'
              }`}
              style={{
                transitionDelay: `${index * 50}ms`
              }}
            >
              <Icon className={`w-5 h-5 transition-transform duration-300 ${isActive || isHovered ? 'scale-110' : ''}`} />
              
              {/* Label appears on hover or active */}
              <span
                className={`overflow-hidden transition-all duration-300 whitespace-nowrap ${
                  isActive || isHovered ? 'max-w-[100px] opacity-100' : 'max-w-0 opacity-0'
                }`}
              >
                <span className="font-medium text-sm">{item.label}</span>
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-lg animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Floating effect shadow */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-blue-500/20 blur-xl -z-10 rounded-full" />
    </div>
  );
};

export default FloatingNav;
