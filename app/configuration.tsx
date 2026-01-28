import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/contexts/ThemeContext';

export default function ConfigurationScreen() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const { theme, setTheme } = useAppTheme();
  const tintColor = Colors[theme].tint;

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const handleThemeChange = (mode: 'light' | 'dark') => {
    setTheme(mode);
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ThemedView style={styles.container}>
        <ThemedText type="title">{t('configuration.title')}</ThemedText>
        
        <View style={styles.settingContainer}>
          <ThemedText type="subtitle" style={styles.settingLabel}>
            {t('configuration.language')}
          </ThemedText>
          
          <View style={styles.languageButtons}>
            <Pressable
              style={[
                styles.languageButton,
                i18n.language === 'en' && { 
                  backgroundColor: tintColor,
                  borderColor: tintColor,
                },
              ]}
              onPress={() => handleLanguageChange('en')}>
              <ThemedText
                style={[
                  styles.languageButtonText,
                  i18n.language === 'en' && { color: '#fff' },
                ]}>
                English
              </ThemedText>
            </Pressable>

            <Pressable
              style={[
                styles.languageButton,
                i18n.language === 'es' && { 
                  backgroundColor: tintColor,
                  borderColor: tintColor,
                },
              ]}
              onPress={() => handleLanguageChange('es')}>
              <ThemedText
                style={[
                  styles.languageButtonText,
                  i18n.language === 'es' && { color: '#fff' },
                ]}>
                Español
              </ThemedText>
            </Pressable>
          </View>
        </View>

        <View style={styles.settingContainer}>
          <ThemedText type="subtitle" style={styles.settingLabel}>
            Tema
          </ThemedText>
          
          <View style={styles.themeButtons}>
            <Pressable
              style={[
                styles.themeButton,
                theme === 'light' && { 
                  backgroundColor: tintColor,
                  borderColor: tintColor,
                },
              ]}
              onPress={() => handleThemeChange('light')}>
              <ThemedText
                style={[
                  styles.themeButtonText,
                  theme === 'light' && { color: '#fff' },
                ]}>
                ☀️ Light
              </ThemedText>
            </Pressable>

            <Pressable
              style={[
                styles.themeButton,
                theme === 'dark' && { 
                  backgroundColor: tintColor,
                  borderColor: tintColor,
                },
              ]}
              onPress={() => handleThemeChange('dark')}>
              <ThemedText
                style={[
                  styles.themeButtonText,
                  theme === 'dark' && { color: '#fff' },
                ]}>
                🌙 Dark
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  settingContainer: {
    marginTop: 24,
  },
  settingLabel: {
    marginBottom: 16,
  },
  languageButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  languageButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
  },
  languageButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  themeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  themeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  themeButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
});
