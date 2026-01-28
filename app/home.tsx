import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Header from '@/components/Header';
import Pill from '@/components/Pill';
import Screen from '@/components/Screen';
import Text from '@/components/Text';
import useStyles, { type ColorsType, type Theme } from '@/hooks/useStyles';
import { StyleProp, View, ViewStyle } from 'react-native';

const createHomeStyles = (colors: ColorsType, theme: Theme) => ({
  balance: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 32,
  },
  balanceText: {
    fontSize: 42,
    fontWeight: 'bold' as const,
  },
  currency: {
    fontSize: 12,
    opacity: 0.6,
  },
  tabContainer: {
    flexDirection: 'row' as const,
    paddingVertical: 16,
    gap: 8,
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  content: {
    gap: 12,
  },
  placeholder: {
    opacity: 0.6,
    marginTop: 16,
  },
});

enum Tabs {
  Portfolio = 'portfolio',
  Market = 'market',
}

const Home = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<Tabs>(Tabs.Portfolio);
  const router = useRouter();
  const balance = 15250.50;

  const { styles } = useStyles(createHomeStyles);

  return (
      <Screen>
        <Header
          titleI18nKey="app.name"
          leftIcon="account-circle"
          rightIcon="search"
          onPressLeftIcon={() => router.push('/configuration')}
        />
        <View style={styles.balance as StyleProp<ViewStyle>}>
          <Text size="small" i18nKey="home.totalBalance" />
          <Text style={styles.balanceText}>
            {balance.toFixed(2)}
          </Text>
          <Text size="small" style={styles.currency} i18nKey='currency'/>
        </View>
        <View style={styles.tabContainer}>
          <Pill
            isActive={activeTab === Tabs.Portfolio}
            onPress={() => setActiveTab(Tabs.Portfolio)}>
            {t('home.portfolio')}
          </Pill>

          <Pill
            isActive={activeTab === Tabs.Market}
            onPress={() => setActiveTab(Tabs.Market)}>
            {t('home.market')}
          </Pill>
        </View>
        <View style={styles.contentContainer}>
          {activeTab === 'portfolio' ? (
            <View style={styles.content}>
              <Text size="medium" color="primary" i18nKey="portfolio.title" />
              <Text size="small" style={styles.placeholder} i18nKey="home.yourInvestments" />
            </View>
          ) : (
            <View style={styles.content}>
              <Text size="medium" color="primary" i18nKey="market.title" />
              <Text size="small" style={styles.placeholder} i18nKey="home.quotesAndTrends" />
            </View>
          )}
        </View>
      </Screen>
  );
};

export default Home;
