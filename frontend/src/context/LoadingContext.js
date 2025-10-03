import React, { createContext, useState, useContext } from 'react';

const LoadingContext = createContext();

export const useLoadingContext = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoadingContext must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);

  const finishInitialLoad = () => {
    if (!hasLoadedOnce) {
      setHasLoadedOnce(true);

      // Wait 300ms before starting fade
      setTimeout(() => {
        setOpacity(0);

        // After opacity transition completes (300ms), remove from DOM
        setTimeout(() => {
          setIsVisible(false);
          setIsInitialLoading(false);
        }, 300);
      }, 300);
    }
  };

  return (
    <LoadingContext.Provider
      value={{
        isInitialLoading,
        finishInitialLoad,
        hasLoadedOnce,
      }}
    >
      {children}

      {isVisible && (
        <div
          className="fixed inset-0 bg-black z-50 flex items-center justify-center transition-opacity duration-300"
          style={{ opacity }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white text-xl font-roboto-condensed tracking-wide">
              LOADING
            </span>
          </div>
        </div>
      )}
    </LoadingContext.Provider>
  );
};
