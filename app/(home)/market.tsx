import EmptyList from '@/components/EmptyList';
import InstrumentsItem, { ITEM_SIZE } from '@/components/InstrumentItem';
import SingleLineLayout from '@/components/skeleton/SingleLineLayout';
import SkeletonList from '@/components/skeleton/SkeletonList';
import useInstruments, { InstrumentType } from '@/hooks/useInstruments';
import usePull2Refresh from '@/hooks/usePull2Refresh';
import React, { useMemo } from 'react';
import { FlatList, ScrollView } from 'react-native';

const renderItem = ({ item }: { item: InstrumentType }) => (
  <InstrumentsItem instrumentItem={item} />
);

const keyExtractor = (item: InstrumentType, index: number) => `${item.id.toString()}-${index}`;

const getItemLayout = (_: any, index: number) => ({
  length: ITEM_SIZE,
  offset: ITEM_SIZE * index,
  index,
});

const Markets = () => {
  const { instrumentsData, isInstrumentsLoading, refetchInstruments } = useInstruments();

  const refreshControl = usePull2Refresh({
    fetch: refetchInstruments,
    loading: isInstrumentsLoading,
  });

  const emptyList = useMemo(() => <EmptyList text="common.emptyList" iconName="pan-tool"/>, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} refreshControl={refreshControl}>
      <SkeletonList
        isLoading={isInstrumentsLoading && !instrumentsData?.length}
        quantity={8}
        Layout={SingleLineLayout}
      >
        <FlatList
          data={instrumentsData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          scrollEnabled={false}
          ListEmptyComponent={emptyList}
        />
      </SkeletonList>
    </ScrollView>
  )
};

export default Markets;
