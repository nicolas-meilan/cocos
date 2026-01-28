import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function MercadoScreen() {
  const { t } = useTranslation();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">{t('market.title')}</ThemedText>
      <ThemedText type="default" style={styles.placeholder}>
        {t('market.comingSoon')}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    gap: 16,
  },
  placeholder: {
    opacity: 0.6,
  },
});
