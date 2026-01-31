import EmptyList from '@/components/EmptyList';
import Header from '@/components/Header';
import InstrumentsItem, { ITEM_SIZE } from '@/components/InstrumentItem';
import Screen from '@/components/Screen';
import SingleLineLayout from '@/components/skeleton/SingleLineLayout';
import SkeletonList from '@/components/skeleton/SkeletonList';
import { Spacer } from '@/components/Spacer';
import TextInput from '@/components/TextInput';
import { InstrumentType } from '@/hooks/useInstruments';
import useSearch, { QUERY_LENGTH } from '@/hooks/useSearch';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
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


const Search = () => {
  const { t } = useTranslation();
  const [searchValue, setSearchValue] = useState('');

  const {
    searchData,
    isSearchLoading,
    refetchSearch,
    debouncedQuery,
  } = useSearch(searchValue);

  const voidSearch = debouncedQuery?.length < QUERY_LENGTH;

  const emptyList = useMemo(() => {
    if (voidSearch) return <EmptyList text="search.emptyList" iconName="search"/>;

    return <EmptyList text="common.emptyList" iconName="pan-tool"/>;
  }, [voidSearch]);

  return (
    <Screen>
      <Header hasBack />
      <Spacer size={16} />
      <TextInput
        placeholder={t('search.placeholder')}
        rightIcon="search"
        returnKeyType="search"
        onChangeText={setSearchValue}
        onSubmitEditing={refetchSearch}
        onPressRightIcon={refetchSearch}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <SkeletonList
          isLoading={isSearchLoading && !searchData?.length}
          quantity={3}
          Layout={SingleLineLayout}
        >
          <FlatList
            data={searchData}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            getItemLayout={getItemLayout}
            scrollEnabled={false}
            ListEmptyComponent={emptyList}
          />
        </SkeletonList>
      </ScrollView>
    </Screen >
  );
};

export default Search;
