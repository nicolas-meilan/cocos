import { TANKSTANK_DEFAULT_OPTIONS } from '@/api/constants';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';
import Api from '../api/Api';
import { Search } from '../api/endpoints/cocosChallengeEndpoints';
import useDebouncedValue from './useDebouncedValue';
import { useInAppNotification } from './useInAppNotification';
import type { InstrumentType } from './useInstruments';

const QUERY_KEY = 'search';
const SEARCH_DEBOUNCE = 500;
export const QUERY_LENGTH = 3;

const fetchSearch = async (query: string) => {
  if (query.length < QUERY_LENGTH) return [];

  const response = await Api<InstrumentType[]>(Search.url, {
    method: Search.method,
    params: { query: query.toUpperCase() },
  });

  return response.data;
};

const useSearch = (query: string) => {
  const queryClient = useQueryClient();
  const debouncedQuery = useDebouncedValue(query, SEARCH_DEBOUNCE);
  const { notifyError } = useInAppNotification();

  const isValidAutoQuery = debouncedQuery.length >= QUERY_LENGTH;

  const fetchDebounced = useCallback(() => fetchSearch(debouncedQuery), [debouncedQuery]);
  const manualFetch = useCallback(() => fetchSearch(query), [query]);

  const {
    data,
    isLoading,
    isRefetching,
    isError,
    isRefetchError,
  } = useQuery({
    queryKey: [QUERY_KEY, debouncedQuery],
    queryFn: fetchDebounced,
    enabled: isValidAutoQuery,
    ...TANKSTANK_DEFAULT_OPTIONS,
    staleTime: 1 * 60 * 1000,
    placeholderData: keepPreviousData,
  });

  const refetchSearch = async () => {
    if (query.length < QUERY_LENGTH) {
      queryClient.setQueryData([QUERY_KEY, debouncedQuery], []);
      return [];
    }

    return queryClient.fetchQuery({
      queryKey: [QUERY_KEY, query],
      queryFn: manualFetch,
    });
  };

  const isSearchLoading = isValidAutoQuery && (isLoading || isRefetching);
  const isSearchError = isValidAutoQuery && (isError || isRefetchError);

  useEffect(() => {
    if (!isSearchLoading && isSearchError) notifyError('error.default');
  }, [isSearchLoading, isSearchError]);

  return {
    searchData: isValidAutoQuery ? data : [],
    isSearchLoading,
    isSearchError,
    debouncedQuery,
    refetchSearch,
  };
};

export default useSearch;
