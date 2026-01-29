import { TANKSTANK_DEFAULT_OPTIONS } from '@/api/constants';
import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import Api from '../api/Api';
import { Instruments } from '../api/endpoints/cocosChallengeEndpoints';
import { useInAppNotification } from './useInAppNotification';

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

  const isInstrumentsLoading = isLoading || isRefetching;
  const isInstrumentsError = isError || isRefetchError;

  useEffect(() => {
    if (!isInstrumentsLoading && isInstrumentsError) notifyError('error.default');
  }, [isInstrumentsLoading, isInstrumentsError, notifyError]);

  return {
    instrumentsData: data,
    isInstrumentsLoading,
    isInstrumentsError,
    refetchInstruments: refetch
  };
};

export default useInstruments;
