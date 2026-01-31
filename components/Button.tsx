import useStyles from '@/hooks/useStyles';
import { ActivityIndicator, TouchableOpacity, type ViewStyle } from 'react-native';
import Text from './Text';

export type ButtonType = 'primary' | 'secondary' | 'tertiary';

export interface ButtonProps {
  type?: ButtonType;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  i18nKey: string;
  loading?: boolean;
}

const Button = ({
  type = 'primary',
  onPress,
  disabled = false,
  style,
  i18nKey,
  loading = false,
}: ButtonProps) => {
  const { colors } = useStyles();

  const buttonConfig = colors.button[type];
  const buttonDisabled = disabled || loading;
  const buttonStyle: ViewStyle = {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: buttonDisabled ? 0.6 : 1,
    backgroundColor: buttonDisabled ? colors.disabled : buttonConfig.background,
    ...(type === 'secondary' && {
      borderWidth: 1,
      borderColor: buttonConfig.border,
    }),
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={buttonDisabled}
      style={[buttonStyle, style]}
      activeOpacity={0.7}
    >
      {loading && <ActivityIndicator color={colors.text.inverted} size={22} />}
      {!loading && <Text size="medium" color="primary" style={{ color: buttonConfig.text }} i18nKey={i18nKey} />}
    </TouchableOpacity>
  );
};

export default Button;
