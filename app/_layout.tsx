import { DarkTheme, DefaultTheme, ThemeProvider as NavigationThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import InAppNotification from '@/components/InAppNotification';
import I18nInitializer from '@/containers/I18nInitializer';
import { InAppNotificationProvider } from '@/contexts/InAppNotificationContext';
import QueryClientProvider from '@/contexts/QueryClient';
import ThemeProvider, { useAppTheme } from '@/contexts/ThemeContext';

const RootLayoutContent = () => {
  const { theme } = useAppTheme();

  return (
    <NavigationThemeProvider value={theme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="(modals)"
          options={{ presentation: 'modal' }}
        />
      </Stack>
      <StatusBar style="auto" />
    </NavigationThemeProvider>
  );
};

const RootLayout = () => {
  return (
    <I18nInitializer>
      <QueryClientProvider>
        <ThemeProvider>
          <InAppNotificationProvider>
            <RootLayoutContent />
            <InAppNotification />
          </InAppNotificationProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </I18nInitializer>
  );
};

export default RootLayout;
