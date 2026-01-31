import Button from "@/components/Button";
import Header from "@/components/Header";
import Screen from "@/components/Screen";
import { Spacer } from "@/components/Spacer";
import TextInput, { TextInputType } from "@/components/TextInput";
import useCreateOrder, { OrderExecutedStatus, OrderSide, OrderType } from "@/hooks/useCreateOrder";
import { useInAppNotification } from "@/hooks/useInAppNotification";
import usePortfolio from "@/hooks/usePortfolio";
import useStyles, { ColorsType } from "@/hooks/useStyles";
import { Picker } from "@react-native-picker/picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { debounce } from "lodash";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, View, ViewStyle } from "react-native";

type OrdersParams = {
  id: string;
  ticker: string;
  tickerName: string;
  lastPrice: string;
  quantity: string;
};

type OrderStyle = {
  buttonWrapper: ViewStyle;
  button: ViewStyle;
  buyButton: ViewStyle;
  sellButton: ViewStyle;
  unselectedButton: ViewStyle;
  pickerContainer: ViewStyle;
};

const createStyle = (colors: ColorsType): OrderStyle => ({
  buttonWrapper: {
    flexDirection: 'row',
    gap: 8,
  },
  button: {
    flex: 1,
  },
  pickerContainer: {
    borderColor: colors.text.primary,
    borderWidth: 1,
    borderRadius: 8,
  },
  buyButton: {
    backgroundColor: colors.fallback.success,
  },
  sellButton: {
    backgroundColor: colors.fallback.error,
  },
  unselectedButton: {
    backgroundColor: colors.disabled,
  },
});

const NOTIFICATION_TIME = 6000;
const DEBOUNCE_BUTTONS = 500;
const DEBOUNCE_SELECT = 1000;
const DEBOUNCE_CONFIG = {
  leading: true,
  trailing: false,
};

const Order = () => {
  const params = useLocalSearchParams<OrdersParams>();
  const { t } = useTranslation();
  const { styles, colors } = useStyles(createStyle);

  const { portfolioData } = usePortfolio();
  const { createOrderAsync, isCreateOrderLoading } = useCreateOrder();
  const { notifySuccess, notifyError, notifyWarning } = useInAppNotification();
  const router = useRouter();

  const [isBuyOperation, setIsBuyOperation] = useState(true);
  const [orderType, setOrderType] = useState<OrderType>(OrderType.Market);

  const [quantity, setQuantity] = useState('');
  const [quantityError, setQuantityError] = useState<string | undefined>();

  const [limitPrice, setLimitPrice] = useState('');
  const [limitPriceError, setLimitPriceError] = useState<string | undefined>();

  const title = params.tickerName ? `${params.ticker} - ${params.tickerName}` : params.ticker;
  const dispatchNotification = {
    [OrderExecutedStatus.Filled]: notifySuccess,
    [OrderExecutedStatus.Pending]: notifyWarning,
    [OrderExecutedStatus.Rejected]: notifyError,
  }

  const {
    sellDisabled,
    maxQuantity,
  } = useMemo(() => {
    if (Number(params.quantity)) return { sellDisabled: false, maxQuantity: Number(params.quantity) };
    if (!portfolioData?.length) return { sellDisabled: true, maxQuantity: 0 };

    const currentItem = portfolioData.find(
      ({ instrument_id }) => instrument_id.toString() === params.id
    );

    return {
      sellDisabled: !currentItem,
      maxQuantity: currentItem ? currentItem.quantity : 0,
    };
  }, [params.id, params.quantity, portfolioData]);

  const onPressBuy = useCallback(
    debounce(() => setIsBuyOperation(true), DEBOUNCE_BUTTONS, DEBOUNCE_CONFIG),
    []
  );

  const onPressSell = useCallback(
    debounce(() => setIsBuyOperation(false), DEBOUNCE_BUTTONS, DEBOUNCE_CONFIG),
    []
  );

  const onPriceOperationChange = useCallback(
    debounce((value: OrderType) => {
      setOrderType(value);
    }, DEBOUNCE_SELECT),
    []
  );

  const handleQuantityChange = useCallback(
    (text: string) => {
      const onlyNumbers = text.replace(/[^0-9]/g, '');
      setQuantity(onlyNumbers);

      if (quantityError) setQuantityError(undefined);
    },
    [quantityError]
  );

  const validateQuantity = useCallback((): boolean => {
    if (!quantity) {
      setQuantityError('order.quantityRequired');
      return false;
    }

    const value = Number(quantity);

    if (value === 0) {
      setQuantityError('order.quantityZero');
      return false;
    }

    if (!isBuyOperation && value > maxQuantity) {
      setQuantityError('order.quantityExceeded');
      return false;
    }

    return true;
  }, [quantity, maxQuantity, isBuyOperation]);

  const handleLimitPriceChange = useCallback(
    (text: string) => {
      const normalized = text.replace(/,/g, '.');

      if (!/^\d*(\.\d{0,2})?$/.test(normalized)) {
        return;
      }

      setLimitPrice(normalized);

      if (limitPriceError) {
        setLimitPriceError(undefined);
      }
    },
    [limitPriceError]
  );

  const validateLimitPrice = useCallback((): boolean => {
    if (orderType !== OrderType.Limit) return true;

    if (!limitPrice) {
      setLimitPriceError('order.limitPriceRequired');
      return false;
    }

    const value = Number(limitPrice);

    if (!value || value <= 0) {
      setLimitPriceError('order.limitPriceZero');
      return false;
    }

    if (!/^\d+(\.\d{1,2})?$/.test(limitPrice)) {
      setLimitPriceError('order.limitPriceInvalid');
      return false;
    }

    return true;
  }, [orderType, limitPrice]);

  const onPressContinue = useCallback(debounce(async () => {
    const isQuantityValid = validateQuantity();
    const isLimitValid = validateLimitPrice();

    if (!isQuantityValid || !isLimitValid) return;

    try {
      const response = await createOrderAsync({
        instrument_id: params.id,
        side: isBuyOperation ? OrderSide.Buy : OrderSide.Sell,
        type: orderType,
        quantity: quantity,
        ...(orderType === OrderType.Limit ? { price: limitPrice } : {}),
      });

      dispatchNotification[response.status](t(`order.executed.${response.status}`, { id: response.id }), NOTIFICATION_TIME);
      if (response.status !== OrderExecutedStatus.Rejected) router.back();
    } catch {}
  }, DEBOUNCE_BUTTONS, DEBOUNCE_CONFIG), [
    validateQuantity,
    validateLimitPrice,
    quantity,
    limitPrice,
    isBuyOperation,
    orderType,
    params.id,
  ]);

  return (
    <Screen>
      <Header title={title} hasClose />
      <Spacer size={24} />
      <View style={styles.buttonWrapper}>
        <Button
          style={[
            styles.button,
            styles.buyButton,
            !isBuyOperation ? styles.unselectedButton : {},
          ]}
          i18nKey="order.buy"
          onPress={onPressBuy}
        />
        <Button
          style={[
            styles.button,
            styles.sellButton,
            isBuyOperation ? styles.unselectedButton : {},
          ]}
          disabled={sellDisabled}
          i18nKey="order.sell"
          onPress={onPressSell}
        />
      </View>
      <Spacer size={24} />
      <ScrollView>
        <View style={styles.pickerContainer}>
          <Picker
            mode="dropdown"
            selectedValue={orderType}
            style={{ color: colors.text.primary }}
            dropdownIconColor={colors.text.primary}
            onValueChange={onPriceOperationChange}
          >
            <Picker.Item label={t('order.marketValue')} value={OrderType.Market} />
            <Picker.Item label={t('order.limitValue')} value={OrderType.Limit} />
          </Picker>
        </View>
        <Spacer size={24} />
        <TextInput
          placeholder="0"
          label={isBuyOperation ? "order.quantity" : `${t('order.quantity')} - ${maxQuantity}`}
          value={quantity}
          onChangeText={handleQuantityChange}
          keyboardType="number-pad"
          type={TextInputType.NUMBER}
          error={!!quantityError}
          errorMessage={quantityError}
        />
        {orderType === OrderType.Limit && (
          <>
            <Spacer size={24} />
            <TextInput
              placeholder={Number(params.lastPrice).toFixed(2)}
              label="order.limitValue"
              rightLabel="currency"
              value={limitPrice}
              onChangeText={handleLimitPriceChange}
              keyboardType="decimal-pad"
              type={TextInputType.NUMBER}
              error={!!limitPriceError}
              errorMessage={limitPriceError}
            />
          </>
        )}
      </ScrollView>
      <Spacer fill />
      <Button
        i18nKey="common.continue"
        onPress={onPressContinue}
        loading={isCreateOrderLoading}
      />
      <Spacer size={16} />
    </Screen>
  );
};

export default Order;
