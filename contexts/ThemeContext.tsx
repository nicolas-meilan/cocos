import React, { createContext, ReactNode, useContext, useState } from 'react';
import { useColorScheme } from 'react-native';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (mode: Theme) => void;
}

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const systemColorScheme = (useColorScheme() ?? 'light') as Theme;
  const [theme, setTheme] = useState<Theme>(systemColorScheme);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
