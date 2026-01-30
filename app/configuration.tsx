import { useTranslation } from 'react-i18next';
import { Switch, View, ViewStyle } from 'react-native';

import Header from '@/components/Header';
import Screen from '@/components/Screen';
import { Spacer } from '@/components/Spacer';
import Text from '@/components/Text';
import { useAppTheme } from '@/contexts/ThemeContext';
import useStyles, { type ColorsType, type Theme } from '@/hooks/useStyles';
import { Picker } from '@react-native-picker/picker';
import { debounce } from 'lodash';
import { useCallback, useState } from 'react';

type ConfigurationStylesType = {
  pickerContainer: ViewStyle;
  switchContainer: ViewStyle;
  switch: ViewStyle;
};

export const createConfigurationStyles = (colors: ColorsType, theme: Theme): ConfigurationStylesType => ({
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

const DEBOUNCE = 500;
const DEBOUNCE_CONFIG = {
  leading: true,
  trailing: false,
};

const ConfigurationScreen = () => {
  const { i18n } = useTranslation();
  const { theme, setTheme } = useAppTheme();
  const { styles, colors } = useStyles(createConfigurationStyles);

  const [selectedLanguage, setSelectedLanguage] = useState<string>(i18n.language);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState<boolean>(theme === 'dark');

  const handleLanguageChange = useCallback(debounce((language: string) => {
    i18n.changeLanguage(language);
    setSelectedLanguage(language);
  }, DEBOUNCE, DEBOUNCE_CONFIG), []);

  const handleThemeChange = useCallback(debounce((isEnabled: boolean) => {
    setIsDarkModeEnabled(isEnabled);
    setTheme(isEnabled ? 'dark' : 'light');
  }, DEBOUNCE, DEBOUNCE_CONFIG), []);

  return (
    <Screen>
      <Header
        hasBack
        title="configuration.title"
      />
      <Spacer size={24} />
      <View>
        <Text size="medium" color="primary" i18nKey="configuration.language" />
        <Spacer size={16} />
        <View style={styles.pickerContainer}>
          <Picker
            mode="dropdown"
            selectedValue={selectedLanguage}
            style={{ color: colors.text.primary }}
            dropdownIconColor={colors.text.primary}
            onValueChange={handleLanguageChange}
          >
            <Picker.Item label={i18n.t('configuration.english')} value="en" />
            <Picker.Item label={i18n.t('configuration.spanish')} value="es" />
          </Picker>
        </View>
      </View>
      <View>
        <Spacer size={24} />
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
