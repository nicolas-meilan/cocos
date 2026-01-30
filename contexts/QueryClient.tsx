import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister';
import { QueryClient } from '@tanstack/react-query';
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client';
import { JSX } from 'react';
import { TANKSTANK_DEFAULT_OPTIONS } from '../api/constants';


const TANKSTANK_STORAGE_KEY = 'TANKSTANK_STORAGE_KEY';
const asyncStoragePersister = createAsyncStoragePersister({
  storage: AsyncStorage,
  key: TANKSTANK_STORAGE_KEY,
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: TANKSTANK_DEFAULT_OPTIONS,
  },
});

type QueryClientProviderProps = {
  children: JSX.Element;
};

const QueryClientProvider = ({ children }: QueryClientProviderProps) => (
  <PersistQueryClientProvider
    client={queryClient}
    persistOptions={{ persister: asyncStoragePersister }}
  >
    {children}
  </PersistQueryClientProvider>
)

export default QueryClientProvider;
