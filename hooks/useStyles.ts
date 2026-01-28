import { Colors, type ColorsType } from '@/constants/theme';
import type { Theme } from '@/contexts/ThemeContext';
import { useAppTheme } from '@/contexts/ThemeContext';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

export type { Theme } from '@/contexts/ThemeContext';
export type { ColorsType };

const useStyles = <T extends {}>(
  styleFn?: (colors: ColorsType, theme: Theme) => T
): { colors: ColorsType; styles: T } => {
  const { theme } = useAppTheme();
  const colors = useMemo(() => Colors[theme], [theme]);
  const styles = useMemo(() => {
    if (styleFn) {
      return StyleSheet.create(styleFn(colors, theme));
    }

    return {} as T;
  }, [theme, colors])

  return {
    colors,
    styles,
  };
};

export default useStyles;
