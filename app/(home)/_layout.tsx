import { Slot, usePathname, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import Header from '@/components/Header';
import Pill from '@/components/Pill';
import Screen from '@/components/Screen';
import TotalBalance from '@/components/TotalBalance';
import useStyles from '@/hooks/useStyles';
import { debounce } from 'lodash';
import { useCallback } from 'react';
import { View } from 'react-native';

enum Tabs {
  Portfolio = 'portfolio',
  Market = 'market',
}

const createHomeStyles = () => ({
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

const TABS_DEBOUNCE = 500;
const TABS_DEBOUNCE_CONFIG = {
  leading: true,
  trailing: false,
};

const Home = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const { styles } = useStyles(createHomeStyles);

  const isPortfolioTab = pathname.endsWith(`/${Tabs.Portfolio}`);
  const isMarketTab = pathname.endsWith(`/${Tabs.Market}`);

  const goToPortfolio = useCallback(debounce(() => {
    router.push(`/${Tabs.Portfolio}`);
  }, TABS_DEBOUNCE, TABS_DEBOUNCE_CONFIG), []);

  const goToMarket = useCallback(debounce(() => {
    router.push(`/${Tabs.Market}`);
  }, TABS_DEBOUNCE, TABS_DEBOUNCE_CONFIG), []);

  const goToConfiguration = useCallback(debounce(() => {
    router.push('/configuration');
  }, TABS_DEBOUNCE, TABS_DEBOUNCE_CONFIG), []);

  return (
    <Screen>
      <Header
        title="app.name"
        leftIcon="account-circle"
        rightIcon="search"
        onPressLeftIcon={goToConfiguration}
      />
      <TotalBalance />
      <View style={styles.tabContainer}>
        <Pill
          isActive={isPortfolioTab}
          onPress={goToPortfolio}>
          {t('portfolio.title')}
        </Pill>
        <Pill
          isActive={isMarketTab}
          onPress={goToMarket}>
          {t('market.title')}
        </Pill>
      </View>
      <Slot />
    </Screen>
  );
};

export default Home;
