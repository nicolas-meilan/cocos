import Text from '@/components/Text';
import usePortfolio from '@/hooks/usePortfolio';
import React from 'react';
import { View } from 'react-native';

const Portfolio = () => {
  const { portfolioData, isPortfolioLoading } = usePortfolio();
  // console.log('Portfolio Data:', portfolioData);

  return (
    <View>
      <Text size="medium" color="primary" i18nKey="portfolio.title" />
      <Text size="small" i18nKey="home.yourInvestments" />
    </View>
  )
};

export default Portfolio;
