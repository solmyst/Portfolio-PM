import { useEffect, useRef } from 'react';

const LogoLoop = ({ logos, speed = 30 }) => {
  const scrollerRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // Duplicate logos for seamless loop
    const scrollerContent = Array.from(scroller.children);
    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      scroller.appendChild(duplicatedItem);
    });
  }, []);

  return (
    <div className="logo-loop-container overflow-hidden py-8 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50">
      <div
        ref={scrollerRef}
        className="logo-loop-scroller flex gap-12 items-center"
        style={{
          animation: `scroll ${speed}s linear infinite`,
          width: 'max-content',
        }}
      >
        {logos.map((logo, index) => (
          <div
            key={index}
            className="flex items-center justify-center px-6 py-4 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-150 hover:scale-110 min-w-[150px]"
          >
            {typeof logo === 'string' ? (
              <span className="text-2xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                {logo}
              </span>
            ) : (
              logo
            )}
          </div>
        ))}
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default LogoLoop;
