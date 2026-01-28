import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';

import Button from '@/components/Button';
import Header from '@/components/Header';
import Screen from '@/components/Screen';
import Text from '@/components/Text';
import { useAppTheme } from '@/contexts/ThemeContext';
import { ColorsType, Theme, useStyles } from '@/hooks/useStyles';

export const createConfigurationStyles = (colors: ColorsType, theme: Theme) => ({
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
    flexDirection: 'row' as const,
    gap: 12,
  },
  themeButtons: {
    flexDirection: 'row' as const,
    gap: 12,
  },
});

export type ConfigurationStyles = ReturnType<typeof createConfigurationStyles>;

export default function ConfigurationScreen() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { theme, setTheme } = useAppTheme();
  const { styles } = useStyles(createConfigurationStyles);


  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const handleThemeChange = (mode: 'light' | 'dark') => {
    setTheme(mode);
  };

  return (
    <Screen style={styles.container}>
      <Header
        titleI18nKey="configuration.title"
        leftIcon="arrow-back"
        hasBack={true}
        onPressLeftIcon={() => router.back()}
      />
      <View style={styles.settingContainer}>
        <Text size="medium" color="primary" style={styles.settingLabel} i18nKey="configuration.language" />

        <View style={styles.languageButtons}>
          <Button
            type={i18n.language === 'en' ? 'primary' : 'secondary'}
            onPress={() => handleLanguageChange('en')}
            style={{ flex: 1 }}>
            {i18n.t('configuration.english')}
          </Button>

          <Button
            type={i18n.language === 'es' ? 'primary' : 'secondary'}
            onPress={() => handleLanguageChange('es')}
            style={{ flex: 1 }}>
            {i18n.t('configuration.spanish')}
          </Button>
        </View>
      </View>

      <View style={styles.settingContainer}>
        <Text size="medium" color="primary" style={styles.settingLabel} i18nKey="configuration.theme" />

        <View style={styles.themeButtons}>
          <Button
            type={theme === 'light' ? 'primary' : 'secondary'}
            onPress={() => handleThemeChange('light')}
            style={{ flex: 1 }}>
            {i18n.t('configuration.light')}
          </Button>

          <Button
            type={theme === 'dark' ? 'primary' : 'secondary'}
            onPress={() => handleThemeChange('dark')}
            style={{ flex: 1 }}>
            {i18n.t('configuration.dark')}
          </Button>
        </View>
      </View>
    </Screen>
  );
}
