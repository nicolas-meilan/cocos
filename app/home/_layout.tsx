import { Slot, usePathname, useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';

import Header from '@/components/Header';
import Pill from '@/components/Pill';
import Screen from '@/components/Screen';
import Text from '@/components/Text';
import useStyles, { type ColorsType, type Theme } from '@/hooks/useStyles';
import { debounce } from 'lodash';
import { useCallback } from 'react';
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

const TABS_DEBOUNCE = 500;
const TABS_DEBOUNCE_CONFIG = {
  leading: true,
  trailing: false,
};

const Home = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const balance = 15250.50;

  const { styles } = useStyles(createHomeStyles);

  const isPortfolioTab = pathname.endsWith(`/${Tabs.Portfolio}`);
  const isMarketTab = pathname.endsWith(`/${Tabs.Market}`);

  const goToPortfolio = useCallback(debounce(() => {
    router.push(`/home/${Tabs.Portfolio}`);
  }, TABS_DEBOUNCE, TABS_DEBOUNCE_CONFIG), []);

  const goToMarket = useCallback(debounce(() => {
    router.push(`/home/${Tabs.Market}`);
  }, TABS_DEBOUNCE, TABS_DEBOUNCE_CONFIG), []);

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
        <Text size="small" style={styles.currency} i18nKey='currency' />
      </View>
      <View style={styles.tabContainer}>
        <Pill
          isActive={isPortfolioTab}
          onPress={goToPortfolio}>
          {t('home.portfolio')}
        </Pill>
        <Pill
          isActive={isMarketTab}
          onPress={goToMarket}>
          {t('home.market')}
        </Pill>
      </View>
      <Slot />
    </Screen>
  );
};

export default Home;