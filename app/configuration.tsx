import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Switch, TextStyle, View, ViewStyle } from 'react-native';

import Header from '@/components/Header';
import Screen from '@/components/Screen';
import Text from '@/components/Text';
import { useAppTheme } from '@/contexts/ThemeContext';
import useStyles, { type ColorsType, type Theme } from '@/hooks/useStyles';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';

type ConfigurationStylesType = {
  container: ViewStyle;
  settingContainer: ViewStyle;
  settingLabel: TextStyle;
  pickerContainer: ViewStyle;
  switchContainer: ViewStyle;
  switch: ViewStyle;
};

export const createConfigurationStyles = (colors: ColorsType, theme: Theme): ConfigurationStylesType => ({
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
  pickerContainer: {
    borderColor: colors.text.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  switchContainer: {
    flexDirection: 'row',
    borderColor: colors.text.primary,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 12,
    padding: 8,
  },
  switch: {
    width: 45,
  },
});

export type ConfigurationStyles = ReturnType<typeof createConfigurationStyles>;

const ConfigurationScreen = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const { theme, setTheme } = useAppTheme();
  const { styles, colors } = useStyles(createConfigurationStyles);

  const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<boolean>(theme === 'dark');

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
  };

  const handleThemeChange = (isEnabled: boolean) => {
    setIsDarkModeEnabled(isEnabled);
    setTheme(isEnabled ? 'dark' : 'light');
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
        <View style={styles.pickerContainer}>
          <Picker
            mode="dropdown"
            selectedValue={selectedLanguage}
            style={{ color: colors.text.primary }}
            dropdownIconColor={colors.text.primary}
            onValueChange={(itemValue) => handleLanguageChange(itemValue)}
          >
            <Picker.Item label={i18n.t('configuration.english')} value="en" />
            <Picker.Item label={i18n.t('configuration.spanish')} value="es" />
          </Picker>
        </View>
      </View>
      <View style={styles.settingContainer}>
        <View style={styles.switchContainer}>
          <Switch
            trackColor={{ false: colors.background.secondary, true: colors.background.secondary }}
            thumbColor={colors.fallback.info}
            ios_backgroundColor={colors.background.secondary}
            onValueChange={handleThemeChange}
            value={isDarkModeEnabled}
            style={styles.switch}
          />
          <Text size="medium" color="primary" i18nKey="configuration.dark" />
        </View>
      </View>
    </Screen>
  );
};

export default ConfigurationScreen;
