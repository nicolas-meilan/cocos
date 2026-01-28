import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  const balance = 15250.50;
  const currency = 'USD';

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.card}>
        <ThemedText type="default" style={styles.label}>
          Saldo Total
        </ThemedText>
        <ThemedText type="title" style={styles.balanceText}>
          ${balance.toFixed(2)}
        </ThemedText>
        <ThemedText type="default" style={styles.currency}>
          {currency}
        </ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  label: {
    fontSize: 14,
    opacity: 0.7,
  },
  balanceText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 12,
    opacity: 0.6,
  },
});
