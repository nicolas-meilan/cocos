import { useQuery } from '@tanstack/react-query';
import Api from '../api/Api';
import { Orders } from '../api/endpoints/cocosChallengeEndpoints';

const queryKey = 'orders';

// TODO POST
const useOrders = () => {
  const {
    data,
    isLoading,
    isRefetchError,
    isRefetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: async () => {
      const response = await Api(Orders.url, { method: Orders.method });
      return response.data;
    },
  });

  return {
    ordersData: data,
    isOrdersLoading: isLoading || isRefetching,
    isOrdersError: isError || isRefetchError,
    refetchOrders: refetch
  };
};

export default useOrders;
