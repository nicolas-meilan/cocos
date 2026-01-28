import { Colors } from '@/constants/theme';
import { useAppTheme } from '@/contexts/ThemeContext';

export function useTheme(
  props: { light?: string; dark?: string },
  colorName: 'background' | 'tint' | 'icon' | 'tabIconDefault' | 'tabIconSelected'
) {
  const { theme } = useAppTheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName] as string;
  }
}
