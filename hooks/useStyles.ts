import { Colors, type ColorsType } from '@/constants/theme';
import type { Theme } from '@/contexts/ThemeContext';
import { useAppTheme } from '@/contexts/ThemeContext';
import { useMemo } from 'react';
import { StyleSheet } from 'react-native';

// Re-export types for centralized access
export type { Theme } from '@/contexts/ThemeContext';
export type { ColorsType };

export function useStyles<T extends {}>(
  styleFn?: (colors: ColorsType, theme: Theme) => T
): { colors: ColorsType; styles: T } {
  const { theme } = useAppTheme();
  const colors = Colors[theme];
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
}
