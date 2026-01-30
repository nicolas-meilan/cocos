import useStyles from '@/hooks/useStyles';
import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import Icon from './Icon';
import Text from './Text';

type EmptyListStyles = {
  container: ViewStyle;
  text: TextStyle;
};

const createStyles = (): EmptyListStyles => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 52,
  },
  text: {
    marginTop: 16,
    textAlign: 'center',
  },
});

const EmptyList = () => {
  const { styles } = useStyles(createStyles);

  return (
    <View style={styles.container}>
      <Icon name="pan-tool" customSize={42} type="secondary" />
      <Text style={styles.text} i18nKey="common.emptyList" />
    </View>
  );
};

export default EmptyList;
