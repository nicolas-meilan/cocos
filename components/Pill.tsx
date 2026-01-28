import useStyles from '@/hooks/useStyles';
import { TouchableOpacity, type ViewStyle } from 'react-native';
import Text from './Text';

export type PillType = 'primary' | 'secondary';

export interface PillProps {
  type?: PillType;
  onPress: () => void;
  disabled?: boolean;
  style?: ViewStyle;
  isActive?: boolean;
  children: string;
}

const Pill = ({
  type = 'secondary',
  onPress,
  disabled = false,
  style,
  isActive = false,
  children,
}: PillProps) => {
  const { colors } = useStyles();
  
  const pillStyle: ViewStyle = {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: disabled ? 0.6 : 1,
    ...(isActive && {
      backgroundColor: colors.pill.primary.background,
    }),
    ...(!isActive && type === 'secondary' && {
      backgroundColor: colors.pill.secondary.background,
      borderWidth: 1,
      borderColor: colors.pill.secondary.border,
    }),
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[pillStyle, style]}
      activeOpacity={0.7}>
      <Text
        size="medium"
        style={{
          color: isActive ? colors.pill.primary.text : colors.pill[type].text,
          fontWeight: isActive ? '600' : '500',
        }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

export default Pill;
