
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';
import Api from '../api/Api';
import { Orders } from '../api/endpoints/cocosChallengeEndpoints';
import { useInAppNotification } from './useInAppNotification';

export enum OrderSide {
  Buy = 'BUY',
  Sell = 'SELL'
}
export enum OrderType {
  Market = 'MARKET',
  Limit = 'LIMIT',
}

export enum OrderExecutedStatus {
  Filled = 'FILLED',
  Pending = 'PENDING',
  Rejected = 'REJECTED',
}

export type CreateOrderBody = {
  instrument_id: string;
  side: OrderSide;
  type: OrderType;
  quantity: string;
  price?: string;
};

export type CreateOrderResponse = {
  id: string;
  status: OrderExecutedStatus;
};

const postOrder = async (body: CreateOrderBody) => {
  const response = await Api(Orders.url, {
    method: Orders.method,
    data: body,
  });

  return response.data;
};

const useCreateOrder = () => {
  const { notifyError } = useInAppNotification();

  const onError = useCallback(() => notifyError('error.default'), []);

  const {
    mutate,
    mutateAsync,
    data,
    isPending,
    isError,
    error,
  } = useMutation<CreateOrderResponse, Error, CreateOrderBody>({
    onError,
    mutationFn: postOrder,
  });

  return {
    createOrder: mutate,
    createOrderAsync: mutateAsync,
    orderResult: data,
    isCreateOrderLoading: isPending,
    isCreateOrderError: isError,
    createOrderError: error,
  };
};

export default useCreateOrder;
