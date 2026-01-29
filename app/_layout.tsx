import initializeI18n from '@/locales/i18n';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import InAppNotification from '@/components/InAppNotification';
import { InAppNotificationProvider } from '@/contexts/InAppNotificationContext';
import ThemeProvider, { useAppTheme } from '@/contexts/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

initializeI18n();
const queryClient = new QueryClient();

const RootLayoutContent = () => {
  const { theme } = useAppTheme();

  return (
    <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }} />
      <StatusBar style="auto" />
    </NavigationThemeProvider>
  );
};

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <InAppNotificationProvider>
          <RootLayoutContent />
          <InAppNotification />
        </InAppNotificationProvider>
      </ThemeProvider>
    </QueryClientProvider>

  );
};

export default RootLayout;
