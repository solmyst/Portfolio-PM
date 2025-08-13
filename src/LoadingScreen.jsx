// Loading screen is now integrated into the main App component
// This file is no longer needed but kept for compatibility

import React from 'react';

const LoadingScreen = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
        <p className="text-white text-xl font-semibold">Loading Experience...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
