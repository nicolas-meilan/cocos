import { TANKSTANK_DEFAULT_OPTIONS } from '@/api/constants';
import { useQuery } from '@tanstack/react-query';
import Api from '../api/Api';
import { Instruments } from '../api/endpoints/cocosChallengeEndpoints';

export type InstrumentType = {
  id: number;
  ticker: string;
  name: string;
  type: string;
  last_price: number;
  close_price: number;
};

const queryKey = 'instruments';

const queryFn = async () => {
  const response = await Api<InstrumentType[]>(Instruments.url, { method: Instruments.method });
  return response.data;
};

const useInstruments = () => {
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
    instrumentsData: data,
    isInstrumentsLoading: isLoading || isRefetching,
    isInstrumentsError: isError || isRefetchError,
    refetchInstruments: refetch
  };
};

export default useInstruments;
