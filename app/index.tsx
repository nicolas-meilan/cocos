import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Pressable, StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Icon } from '@/components/Icon';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Colors } from '@/constants/theme';

export default function HomeScreen() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'portfolio' | 'mercado'>('portfolio');
  const router = useRouter();
  const balance = 15250.50;
  const currency = t('currency');
  const colorScheme = useColorScheme();
  const tintColor = Colors[colorScheme ?? 'light'].tint;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <ThemedView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Pressable onPress={() => router.push('/configuration')}>
            <Icon size={28} name="account-circle" color={tintColor} />
          </Pressable>
          <ThemedText type="title" style={styles.appTitle}>
            {t('app.name')}
          </ThemedText>
        </View>
        <Pressable>
          <Icon size={28} name="search" color={tintColor} />
        </Pressable>
      </View>

      {/* Balance Card */}
      <ThemedView style={styles.card}>
        <ThemedText type="default" style={styles.label}>
          {t('home.totalBalance')}
        </ThemedText>
        <ThemedText type="title" style={styles.balanceText}>
          ${balance.toFixed(2)}
        </ThemedText>
        <ThemedText type="default" style={styles.currency}>
          {currency}
        </ThemedText>
      </ThemedView>

      {/* Tabs */}
      <ThemedView style={styles.tabContainer}>
        <Pressable
          style={[
            styles.tabButton,
            activeTab === 'portfolio' && { borderBottomColor: tintColor },
          ]}
          onPress={() => setActiveTab('portfolio')}>
          <ThemedText
            style={[
              styles.tabText,
              activeTab === 'portfolio' && { color: tintColor, fontWeight: '600' },
            ]}>
            {t('home.portfolio')}
          </ThemedText>
        </Pressable>

        <Pressable
          style={[
            styles.tabButton,
            activeTab === 'mercado' && { borderBottomColor: tintColor },
          ]}
          onPress={() => setActiveTab('mercado')}>
          <ThemedText
            style={[
              styles.tabText,
              activeTab === 'mercado' && { color: tintColor, fontWeight: '600' },
            ]}>
            {t('home.market')}
          </ThemedText>
        </Pressable>
      </ThemedView>

      {/* Content */}
      <ThemedView style={styles.contentContainer}>
        {activeTab === 'portfolio' ? (
          <ThemedView style={styles.content}>
            <ThemedText type="subtitle">{t('portfolio.title')}</ThemedText>
            <ThemedText type="default" style={styles.placeholder}>
              {t('home.yourInvestments')}
            </ThemedText>
          </ThemedView>
        ) : (
          <ThemedView style={styles.content}>
            <ThemedText type="subtitle">{t('market.title')}</ThemedText>
            <ThemedText type="default" style={styles.placeholder}>
              {t('home.quotesAndTrends')}
            </ThemedText>
          </ThemedView>
        )}
      </ThemedView>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingTop: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  appTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  card: {
    marginHorizontal: 20,
    marginTop: 24,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    opacity: 0.7,
  },
  balanceText: {
    fontSize: 42,
    fontWeight: 'bold',
  },
  currency: {
    fontSize: 12,
    opacity: 0.6,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabText: {
    fontSize: 16,
    opacity: 0.6,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  content: {
    gap: 12,
  },
  placeholder: {
    opacity: 0.6,
    marginTop: 16,
  },
});
