import usePortfolio from "@/hooks/usePortfolio";
import useStyles from "@/hooks/useStyles";
import { useMemo } from "react";
import { TextStyle, ViewStyle } from "react-native";
import SingleLineLayout from "./skeleton/SingleLineLayout";
import Skeleton from "./skeleton/Skeleton";
import { Spacer } from "./Spacer";
import Text from "./Text";

type TotalBalanceStyles = {
  skeleton: ViewStyle;
  balanceText: TextStyle;
  currency: TextStyle;
};

const creteStyle = (): TotalBalanceStyles => ({
  skeleton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceText: {
    fontSize: 42,
    fontWeight: 'bold',
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
    <>
      <Spacer size={32} />
      <Skeleton
        isLoading={!portfolioData && isPortfolioLoading && !isPortfolioError}
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
      <Spacer size={32} />
    </>
  )
};

export default TotalBalance;
