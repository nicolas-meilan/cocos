import { useCallback, useEffect, useState } from 'react';
import { RefreshControl } from 'react-native';
import useStyles from './useStyles';

type Pull2RefreshProps = {
  fetch: () => void;
  loading: boolean;
  backgroundColor?: string;
};

const usePull2Refresh = ({ fetch, loading }: Pull2RefreshProps) => {
  const [refreshing, setRefreshing] = useState(false);
  const { colors } = useStyles();

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetch();
  }, [fetch]);

  useEffect(() => {
    if (!loading) setRefreshing(false);
  }, [loading]);

  return (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      colors={[colors.tint]}
      progressBackgroundColor={colors.background.primary}
      tintColor={colors.tint}
    />
  );
};

export default usePull2Refresh;
