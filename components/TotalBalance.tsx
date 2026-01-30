import usePortfolio from "@/hooks/usePortfolio";
import useStyles from "@/hooks/useStyles";
import { useMemo } from "react";
import { TextStyle, View, ViewStyle } from "react-native";
import SingleLineLayout from "./skeleton/SingleLineLayout";
import Skeleton from "./skeleton/Skeleton";
import Text from "./Text";

type TotalBalanceStyles = {
  balance: ViewStyle;
  skeleton: ViewStyle;
  balanceText: TextStyle;
  currency: TextStyle;
};

const creteStyle = (): TotalBalanceStyles => ({
  balance: {
    paddingVertical: 32,
  },
  skeleton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceText: {
    fontSize: 42,
    fontWeight: 'bold' as const,
  },
  currency: {
    fontSize: 12,
    opacity: 0.6,
  },
});

const TotalBalance = () => {
  const { styles } = useStyles(creteStyle);
  const { portfolioData, isPortfolioLoading, isPortfolioError } = usePortfolio();

  const balance = useMemo(() => portfolioData
    ?.reduce((acc, item) => acc + item.quantity * item.last_price, 0) || 0, [portfolioData]);

  return (
    <View style={styles.balance}>
      <Skeleton
        isLoading={!portfolioData && !isPortfolioLoading && !isPortfolioError}
        Layout={SingleLineLayout}
        style={styles.skeleton}
        containerHeight={90}
      >
        <Text size="small" i18nKey="home.totalBalance" />
        <Text style={styles.balanceText}>
          {balance.toFixed(2)}
        </Text>
        <Text size="small" style={styles.currency} i18nKey='currency' />
      </Skeleton>
    </View>
  )
};

export default TotalBalance;
