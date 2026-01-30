import initializeI18n from '@/locales/i18n';
import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import InAppNotification from '@/components/InAppNotification';
import { InAppNotificationProvider } from '@/contexts/InAppNotificationContext';
import QueryClientProvider from '@/contexts/QueryClient';
import ThemeProvider, { useAppTheme } from '@/contexts/ThemeContext';

initializeI18n();

const RootLayoutContent = () => {
  const { theme } = useAppTheme();

  return (
    <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(modals)"
          options={{ presentation: 'transparentModal' }}
        />
      </Stack>
      <StatusBar style="auto" />
    </NavigationThemeProvider>
  );
};

const RootLayout = () => {
  return (
    <QueryClientProvider>
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
