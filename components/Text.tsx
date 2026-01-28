// Re-export Text con soporte adicional para i18nKey
import useStyles, { type ColorsType } from '@/hooks/useStyles';
import { useTranslation } from 'react-i18next';
import { Text as BaseText, type TextProps as BaseTextProps } from 'react-native';

export type TextSize = 'small' | 'medium' | 'large';
export type TextColor = 'primary' | 'secondary' | 'inverted';

export type TextProps = BaseTextProps & {
  i18nKey?: string;
  size?: TextSize;
  color?: TextColor;
};

const sizeMap: Record<TextSize, number> = {
  small: 12,
  medium: 16,
  large: 20,
};

const Text = ({ i18nKey, children, size = 'medium', color = 'primary', style, ...rest }: TextProps) => {
  const { t } = useTranslation();
  const { styles } = useStyles((cols: ColorsType) => ({
    container: {
      fontSize: sizeMap[size],
      color: cols.text[color],
    },
  }));

  const mergedStyle = [styles.container, style];

  if (i18nKey) {
    return <BaseText {...rest} style={mergedStyle}>{t(i18nKey)}</BaseText>;
  }

  return <BaseText {...rest} style={mergedStyle}>{children}</BaseText>;
};

export default Text;
