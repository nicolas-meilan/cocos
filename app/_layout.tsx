import initializeI18n from '@/locales/i18n';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import ThemeProvider, { useAppTheme } from '@/contexts/ThemeContext';

initializeI18n();

const RootLayoutContent = () => {
  const { theme } = useAppTheme();

  return (
    <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen 
          name="configuration" 
          options={{ 
            headerShown: false,
          }} 
        />
      </Stack>
      <StatusBar style="auto" />
    </NavigationThemeProvider>
  );
};

const RootLayout = () => {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
};

export default RootLayout;
