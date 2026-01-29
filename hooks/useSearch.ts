import { TANKSTANK_DEFAULT_OPTIONS } from '@/api/constants';
import { useQuery } from '@tanstack/react-query';
import Api from '../api/Api';
import { Search } from '../api/endpoints/cocosChallengeEndpoints';
import type { InstrumentType } from './useInstruments';

const queryKey = 'search';

// TODO: Add search parameters
const queryFn = async () => {
  const response = await Api<InstrumentType[]>(Search.url, { method: Search.method });
  return response.data;
};

const useSearch = () => {
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
    staleTime: 1 * 60 * 1000, // 1 minute
  });

  return {
    searchData: data,
    isSearchLoading: isLoading || isRefetching,
    isSearchError: isError || isRefetchError,
    refetchSearch: refetch
  };
};

export default useSearch;
