import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

export type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (mode: Theme) => void;
}

const THEME_STORAGE_KEY = 'APP_THEME';

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setThemeFromState] = useState<Theme>();
  const systemColorScheme = (useColorScheme() ?? 'light') as Theme;

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeFromState(newTheme);
    return AsyncStorage.setItem(THEME_STORAGE_KEY, newTheme);
  }, []);

  useEffect(() => {
    AsyncStorage.getItem(THEME_STORAGE_KEY).then((storedTheme) => {
      if (!storedTheme) {
        setTheme(systemColorScheme);
        return;
      }

      setThemeFromState(storedTheme as Theme);
    })
  }, []);


  if (!theme) return null;

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
