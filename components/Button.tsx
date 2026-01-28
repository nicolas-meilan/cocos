import { useStyles } from '@/hooks/useStyles';
import { TouchableOpacity, type ViewStyle } from 'react-native';
import Text from './Text';

export type ButtonType = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps {
  type?: ButtonType;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  children: string;
}

const Button = ({
  type = 'primary',
  onPress,
  disabled = false,
  style,
  children,
}: ButtonProps) => {
  const { colors } = useStyles();

  const buttonConfig = colors.button[type];
  const buttonStyle: ViewStyle = {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.6 : 1,
    backgroundColor: buttonConfig.background,
    ...(type === 'secondary' && {
      borderWidth: 1,
      borderColor: buttonConfig.border,
    }),
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[buttonStyle, style]}
      activeOpacity={0.7}>
      <Text size="medium" color="primary" style={{ color: buttonConfig.text }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
