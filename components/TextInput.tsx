import React, { useState } from 'react';
import {
  TextInput as RNTextInput,
  TouchableOpacity,
  View,
  type TextInputProps as RNTextInputProps,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { useTranslation } from 'react-i18next';

import { ColorsType } from '@/constants/theme';
import useStyles from '@/hooks/useStyles';

import Icon from './Icon';
import Text from './Text';

export enum TextInputType {
  PASSWORD = 'password',
  NUMBER = 'number',
  TEXT = 'text',
}

export type TextInputProps = RNTextInputProps & {
  label?: string;
  leftIcon?: string;
  rightIcon?: string;
  rightLabel?: string;
  type?: TextInputType;
  error?: boolean;
  borderColor?: string;
  onPressLeftIcon?: () => void;
  onPressRightIcon?: () => void;
  onPress?: () => void;
  errorMessage?: string;
  pressDisabled?: boolean;
};

type TextInputStyle = {
  container: ViewStyle;
  label: TextStyle;
  wrapper: ViewStyle;
  wrapperMultiline: ViewStyle;
  input: TextStyle;
  inputMultiline: TextStyle;
  left: ViewStyle;
  right: ViewStyle;
  error: TextStyle;
};

const createStyles = (colors: ColorsType): TextInputStyle => ({
  container: {
    width: '100%',
  },
  label: {
    marginBottom: 8,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    height: 48,
  },
  wrapperMultiline: {
    height: 96,
    paddingVertical: 16,
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: colors.text.primary,
  },
  inputMultiline: {
    fontSize: 20,
    textAlignVertical: 'top',
  },
  left: {
    marginRight: 16,
  },
  right: {
    marginLeft: 8,
    justifyContent: 'center',
  },
  error: {
    marginTop: 4,
    color: colors.fallback.error,
    fontSize: 12,
  },
});

const TextInput = ({
  label,
  placeholder,
  onFocus,
  onBlur,
  leftIcon,
  rightIcon,
  rightLabel,
  onPressLeftIcon,
  onPressRightIcon,
  style,
  errorMessage,
  multiline,
  onPress,
  borderColor: borderColorProp,
  type = TextInputType.TEXT,
  error = false,
  pressDisabled = false,
  ...props
}: TextInputProps) => {
  const { styles, colors } = useStyles(createStyles);
  const { t } = useTranslation();

  const isPassword = type === TextInputType.PASSWORD;

  const [baseBorderColor, setBaseBorderColor] = useState(colors.text.primary);
  const [showText, setShowText] = useState(!isPassword);

  const borderColor = error
    ? colors.fallback.error
    : borderColorProp || baseBorderColor;

  const handleFocus = (e: any) => {
    onFocus?.(e);
    setBaseBorderColor(colors.text.primary);
  };

  const handleBlur = (e: any) => {
    onBlur?.(e);
    setBaseBorderColor(colors.text.primary);
  };

  const toggleShowText = () => {
    onPressRightIcon?.();
    setShowText(prev => !prev);
  };

  const renderLeft = !!leftIcon;
  const renderRight = !!(rightIcon || isPassword || rightLabel);

  return (
    <TouchableOpacity
      style={[styles.container, (style || {}) as ViewStyle]}
      onPress={onPress}
      disabled={!onPress || pressDisabled}
      activeOpacity={1}
    >
      {!!label && <Text i18nKey={label} style={styles.label} />}
      <View
        style={[
          styles.wrapper,
          multiline && styles.wrapperMultiline,
          { borderColor },
        ]}
      >
        {renderLeft && (
          <View style={styles.left}>
            <TouchableOpacity
              onPress={onPressLeftIcon}
              disabled={!onPressLeftIcon || pressDisabled}
            >
              <Icon name={leftIcon!} size="large" />
            </TouchableOpacity>
          </View>
        )}
        <RNTextInput
          {...props}
          placeholder={placeholder ? t(placeholder) : undefined}
          placeholderTextColor={colors.text.secondary}
          cursorColor={colors.text.primary}
          style={[
            styles.input,
            multiline && styles.inputMultiline,
          ]}
          secureTextEntry={isPassword && !showText}
          multiline={multiline}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {renderRight && (
          <View style={styles.right}>
            {isPassword && (
              <TouchableOpacity
                onPress={toggleShowText}
                disabled={pressDisabled}
              >
                <Icon name={showText ? 'eye-outline' : 'eye-off-outline'} size="large" />
              </TouchableOpacity>
            )}
            {rightLabel && (<Text i18nKey={rightLabel} />)}
            {rightIcon && (
              <TouchableOpacity
                onPress={onPressRightIcon}
                disabled={!onPressRightIcon || pressDisabled}
              >
                <Icon name={rightIcon} size="large" />
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
      {error && !!errorMessage && (
        <Text i18nKey={errorMessage} style={styles.error} />
      )}
    </TouchableOpacity>
  );
};

export default TextInput;
