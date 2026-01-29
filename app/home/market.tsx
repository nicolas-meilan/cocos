import Text from '@/components/Text';
import React from 'react';
import { View } from 'react-native';

const Markets = () => {
  return (
    <View>
      <Text size="medium" color="primary" i18nKey="market.title" />
      <Text size="small" i18nKey="home.yourInvestments" />
    </View>
  )
};

export default Markets;

