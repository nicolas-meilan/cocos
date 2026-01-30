import useStyles from '@/hooks/useStyles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

export type IconSize = 'small' | 'medium' | 'large';
export type IconType = 'primary' | 'secondary' | 'inverted';

const sizeMap: Record<IconSize, number> = {
  small: 12,
  medium: 16,
  large: 20,
};

type IconProps = {
  name: string;
  size?: IconSize | number;
  type?: IconType;
  color?: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  customSize?: number;
};

const Icon = ({
  name,
  size = 'medium',
  type = 'primary',
  color,
  style,
  customSize,
}: IconProps) => {
  const { colors } = useStyles();

  const iconSize = customSize || (typeof size === 'string' ? sizeMap[size] : size);
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
