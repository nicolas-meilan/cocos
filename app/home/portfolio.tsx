import PortfolioItem, { ITEM_SIZE } from '@/components/PortfolioItem';
import SingleLineLayout from '@/components/skeleton/SingleLineLayout';
import SkeletonList from '@/components/skeleton/SkeletonList';
import usePortfolio, { PortfolioType } from '@/hooks/usePortfolio';
import usePull2Refresh from '@/hooks/usePull2Refresh';
import React from 'react';
import { FlatList, ScrollView } from 'react-native';

const renderItem = ({ item }: { item: PortfolioType }) => (
  <PortfolioItem portfolioItem={item} />
);

const keyExtractor = (item: PortfolioType, index: number) => `${item.instrument_id.toString()}-${index}`;

const getItemLayout = (_: any, index: number) => ({
  length: ITEM_SIZE,
  offset: ITEM_SIZE * index,
  index,
});

// TODO MANAGE ERRORS & P2R
const Portfolio = () => {
  const { portfolioData, isPortfolioLoading, refetchPortfolio } = usePortfolio();

  const refreshControl = usePull2Refresh({
    fetch: refetchPortfolio,
    loading: isPortfolioLoading,
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false} refreshControl={refreshControl}>
      <SkeletonList
        isLoading={isPortfolioLoading && !portfolioData?.length}
        quantity={8}
        Layout={SingleLineLayout}
      >
        <FlatList
          data={portfolioData}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          getItemLayout={getItemLayout}
          scrollEnabled={false}
        />
      </SkeletonList>
    </ScrollView>
  )
};

export default Portfolio;
