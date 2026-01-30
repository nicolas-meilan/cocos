import { PortfolioType } from "@/hooks/usePortfolio";
import useStyles, { ColorsType } from "@/hooks/useStyles";
import { useTranslation } from "react-i18next";
import { View, ViewStyle } from "react-native";
import Icon from "./Icon";
import Text from "./Text";

type PortfolioItemProps = {
  portfolioItem: PortfolioType;
};

type portfolioStyles = {
  item: ViewStyle;
  row: ViewStyle;
  column: ViewStyle;
};

export const ITEM_SIZE = 80;
const createStyles = (colors: ColorsType): portfolioStyles => ({
  item: {
    flex: 1,
    height: ITEM_SIZE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const PortfolioItem = ({ portfolioItem }: PortfolioItemProps) => {
  const { t } = useTranslation();
  const { styles, colors } = useStyles<portfolioStyles>(createStyles);

  if (!portfolioItem.quantity) return null;

  const currency = t('currency');
  const revenue = (portfolioItem.last_price - portfolioItem.avg_cost_price) * portfolioItem.quantity;
  const assetPerf = (revenue / (portfolioItem.avg_cost_price * portfolioItem.quantity)) * 100;

  const revenuePositive = revenue >= 0;
  const assetPerfPositive = assetPerf >= 0;
  const perfIcon = assetPerfPositive ? 'arrow-upward' : 'arrow-downward';

  return (
    <View style={styles.item}>
      <View style={styles.column}>
        <Text>
          {portfolioItem.ticker}
        </Text>
        <Text color="secondary">
          {`${portfolioItem.last_price} ${currency}`}
        </Text>
      </View>
      <View style={[styles.column, { flex: 2, alignItems: 'flex-end' }]}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text>
              {`${portfolioItem.quantity.toFixed(2)} ${portfolioItem.ticker}`}
            </Text>
            <Text style={{ color: revenuePositive ? colors.fallback.success : colors.fallback.error }}>
              {`${revenue.toFixed(2)} ${currency}`}
            </Text>
          </View>
          <View style={[styles.row, { alignItems: 'center' }]}>
            <Text style={{ color: assetPerfPositive ? colors.fallback.success : colors.fallback.error }} size="large">
              {`${assetPerf.toFixed(2)}%`}
            </Text>
            <Icon
              size="large"
              name={perfIcon}
              color={assetPerfPositive ? colors.fallback.success : colors.fallback.error}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default PortfolioItem;
