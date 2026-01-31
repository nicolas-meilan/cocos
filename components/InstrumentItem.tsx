import { InstrumentType } from "@/hooks/useInstruments";
import useStyles from "@/hooks/useStyles";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { TouchableOpacity, View, ViewStyle } from "react-native";
import Icon from "./Icon";
import Text from "./Text";

type InstrumentItemProps = {
  instrumentItem: InstrumentType;
};

type instrumentStyles = {
  item: ViewStyle;
  row: ViewStyle;
  column: ViewStyle;
};

export const ITEM_SIZE = 80;
const createStyles = (): instrumentStyles => ({
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
    alignItems: 'center',
  },
  column: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

const InstrumentItem = ({ instrumentItem }: InstrumentItemProps) => {
  const { styles, colors } = useStyles<instrumentStyles>(createStyles);
  const router = useRouter();

  const instrumentReturn = (instrumentItem.last_price - instrumentItem.close_price) / instrumentItem.close_price * 100;
  const instrumentReturnPositive = instrumentReturn >= 0;
  const instrumentReturnIcon = instrumentReturnPositive ? 'arrow-upward' : 'arrow-downward';

  const goToOrder = useCallback(() => {
    router.push({
      pathname: '/(modals)/order/[id]',
      params: {
        id: instrumentItem.id,
        ticker: instrumentItem.ticker,
        tickerName: instrumentItem.name,
        lastPrice: instrumentItem.last_price,
        quantity: 0,
      }
    });
  }, [instrumentItem]);

  return (
    <TouchableOpacity style={styles.item} onPress={goToOrder}>
      <View style={[styles.column, { flex: 2 }]}>
        <Text>
          {instrumentItem.ticker}
        </Text>
        <Text color="secondary">
          {instrumentItem.name}
        </Text>
      </View>
      <View style={[styles.column, { alignItems: 'flex-end' }]}>
        <Text>
          {`${instrumentItem.last_price.toFixed(2)} ${instrumentItem.ticker}`}
        </Text>
        <View style={styles.row}>
          <Text style={{ color: instrumentReturnPositive ? colors.fallback.success : colors.fallback.error }}>
            {`${instrumentReturn.toFixed(2)}%`}
          </Text>
          <Icon
            name={instrumentReturnIcon}
            color={instrumentReturnPositive ? colors.fallback.success : colors.fallback.error}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default InstrumentItem;
