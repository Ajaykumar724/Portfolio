import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('vscode-dark');

  const set = (name) => setTheme(name);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: set }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}

export default ThemeContext;
