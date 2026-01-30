import useStyles from '@/hooks/useStyles';
import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import Icon from './Icon';
import { Spacer } from './Spacer';
import Text from './Text';

type EmptyListStyles = {
  container: ViewStyle;
  text: TextStyle;
};

const createStyles = (): EmptyListStyles => ({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 16,
    textAlign: 'center',
  },
});

type EmptyListProps = {
  text: string;
  iconName: string;
};

const EmptyList = ({
  text,
  iconName,
}: EmptyListProps) => {
  const { styles } = useStyles(createStyles);

  return (
    <>
      <Spacer size={52} />
      <View style={styles.container}>
        <Icon name={iconName} customSize={42} type="secondary" />
        <Text style={styles.text} i18nKey={text} />
      </View>
    </>
  );
};

export default EmptyList;
