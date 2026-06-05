import React from 'react';
import { useTheme } from '../hooks/useTheme';
import { ThemeContext } from './themeContextValue';

export const ThemeProvider = ({ children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
