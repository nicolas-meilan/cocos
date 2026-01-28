import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import Text from '@/components/Text';
import { View } from 'react-native';

export default function MercadoScreen() {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Text size="large" color="primary" i18nKey="market.title" />
      <Text size="medium" color="secondary" style={styles.placeholder} i18nKey="market.comingSoon" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  placeholder: {
    opacity: 0.6,
  },
});
