import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [currentFranchise, setCurrentFranchise] = useState(null);

  useEffect(() => {
    // Set the data-theme attribute on the document element
    if (currentFranchise) {
      document.documentElement.setAttribute('data-theme', currentFranchise);
    } else {
      // Remove theme attribute instead of defaulting to marvel
      document.documentElement.removeAttribute('data-theme');
    }
  }, [currentFranchise]);

  return (
    <ThemeContext.Provider
      value={{
        setCurrentFranchise,
        currentFranchise,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
