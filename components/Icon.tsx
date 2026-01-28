import useStyles from '@/hooks/useStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

export type IconSize = 'small' | 'medium' | 'large';
export type IconType = 'primary' | 'secondary' | 'inverted';

const sizeMap: Record<IconSize, number> = {
  small: 12,
  medium: 16,
  large: 20,
};

const Icon = ({
  name,
  size = 'medium',
  type = 'primary',
  color,
  style,
  weight,
}: {
  name: string;
  size?: IconSize | number;
  type?: IconType;
  color?: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) => {
  const { colors } = useStyles();

  const iconSize = typeof size === 'string' ? sizeMap[size] : size;

  const iconColor = color || colors.text[type];

  return (
    <MaterialIcons
      color={iconColor}
      size={iconSize}
      name={name as ComponentProps<typeof MaterialIcons>['name']}
      style={style}
    />
  );
};

export default Icon;
