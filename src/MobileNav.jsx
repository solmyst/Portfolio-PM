import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const MobileNav = ({ activeSection, scrollToSection }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuItems = ['About', 'Experience', 'Skills', 'Projects', 'Achievements', 'Contact'];

  return (
    <div className="md:hidden">
      <button 
        onClick={toggleMenu}
        className="text-white p-2"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-gray-900 bg-opacity-95 backdrop-blur-md">
          <div className="flex flex-col p-4">
            {menuItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  scrollToSection(item.toLowerCase());
                  setIsOpen(false);
                }}
                className={`py-3 px-4 text-left hover:bg-gray-800 rounded-lg transition-colors ${
                  activeSection === item.toLowerCase() ? 'text-blue-400 font-semibold' : 'text-gray-300'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;