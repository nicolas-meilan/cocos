import { View, type ViewProps } from 'react-native';

import { ColorsType } from '@/constants/theme';
import useStyles from '@/hooks/useStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

export type ScreenProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

const createStyles = (colors: ColorsType) => ({
  safeArea: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: colors.background.primary,
    padding: 16,
  },
});

const Screen = ({ style, lightColor, darkColor, ...otherProps }: ScreenProps) => {
  const { styles } = useStyles(createStyles);

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={[styles.main, style]} {...otherProps} />
    </SafeAreaView>
  );
};

export default Screen;
