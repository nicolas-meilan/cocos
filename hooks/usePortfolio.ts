import { TANKSTANK_DEFAULT_OPTIONS } from '@/api/constants';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Api from '../api/Api';
import { Portfolio } from '../api/endpoints/cocosChallengeEndpoints';
import { useInAppNotification } from './useInAppNotification';


export type PortfolioType = {
  instrument_id: number;
  ticker: string;
  quantity: number;
  last_price: number;
  close_price: number;
  avg_cost_price: number;
};

const queryKey = 'portfolio';

const queryFn = async () => {
  const response = await Api<PortfolioType[]>(Portfolio.url, { method: Portfolio.method });
  return response.data;
};

const usePortfolio = () => {
  const { notifyError } = useInAppNotification();

  const {
      data,
      isLoading,
      isRefetchError,
      isRefetching,
      isError,
      refetch,
    } = useQuery({
    queryKey: [queryKey],
    queryFn,
    ...TANKSTANK_DEFAULT_OPTIONS,
  });

  const isPortfolioLoading = isLoading || isRefetching;
  const isPortfolioError = isError || isRefetchError;

  useEffect(() => {
    if (!isPortfolioLoading && isPortfolioError) notifyError('error.default');
  }, [isPortfolioLoading, isPortfolioError]);

  return {
    portfolioData: data,
    isPortfolioLoading,
    isPortfolioError,
    refetchPortfolio: refetch
  };
};

export default usePortfolio;
