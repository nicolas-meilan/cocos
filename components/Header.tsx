import { TouchableOpacity, View } from 'react-native';

import Icon from '@/components/Icon';
import { ColorsType } from '@/constants/theme';
import useStyles, { type Theme } from '@/hooks/useStyles';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import Text from './Text';

interface HeaderProps {
  title?: string;
  leftIcon?: string;
  rightIcon?: string;
  hasBack?: boolean;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
}

export const createHeaderStyles = (colors: ColorsType, theme: Theme) => ({
  header: {
    flexDirection: 'row' as const,
    justifyContent: 'space-between' as const,
    alignItems: 'center' as const,
  },
  headerLeft: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    gap: 12,
  },
  title: {
    fontWeight: '600' as const,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
});

export type HeaderStyles = ReturnType<typeof createHeaderStyles>;

const Header = ({
  title,
  leftIcon,
  rightIcon,
  hasBack = false,
  onPressLeftIcon,
  onPressRightIcon,
}: HeaderProps) => {
  const { styles, colors } = useStyles(createHeaderStyles);
  const router = useRouter();

  const handlePressBack = useCallback(() => {
    router.back();
  }, [router]);

  return (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        {hasBack && (
          <TouchableOpacity onPress={handlePressBack} style={styles.backButton}>
            <Icon size={24} name="arrow-back" color={colors.tint} />
          </TouchableOpacity>
        )}
        {leftIcon && (
          <TouchableOpacity onPress={onPressLeftIcon}>
            <Icon size={28} name={leftIcon} color={colors.tint} />
          </TouchableOpacity>
        )}
        <Text size="large" color="primary" style={styles.title} i18nKey={title} />
      </View>
      {rightIcon && (
        <TouchableOpacity onPress={onPressRightIcon}>
          <Icon size={28} name={rightIcon} color={colors.tint} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Header;
