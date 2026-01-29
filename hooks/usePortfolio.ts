import { TANKSTANK_DEFAULT_OPTIONS } from '@/api/constants';
import { useQuery } from '@tanstack/react-query';
import Api from '../api/Api';
import { Portfolio } from '../api/endpoints/cocosChallengeEndpoints';


type PortfolioType = {
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

  return {
    portfolioData: data,
    isPortfolioLoading: isLoading || isRefetching,
    isPortfolioError: isError || isRefetchError,
    refetchPortfolio: refetch
  };
};

export default usePortfolio;
