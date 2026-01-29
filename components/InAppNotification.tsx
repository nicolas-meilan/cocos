import { NotificationType, useInAppNotificationContext } from '@/contexts/InAppNotificationContext';
import useStyles, { type ColorsType, type Theme } from '@/hooks/useStyles';
import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import Animated, { SlideInDown, SlideOutDown, } from 'react-native-reanimated';
import Text from './Text';

type NotificationStyles = {
  container: ViewStyle;
  notification: ViewStyle;
  boldText: TextStyle;
};

export const createNotificationStyles = (colors: ColorsType, theme: Theme): NotificationStyles => ({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 32,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  notification: {
    borderRadius: 8,
    padding: 16,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

const InAppNotification = () => {
  const { notification } = useInAppNotificationContext();
  const { styles, colors } = useStyles<NotificationStyles>(createNotificationStyles);

  if (!notification?.visible) return null;

  const notificationColor = notification.type === NotificationType.ERROR ? colors.fallback.error : colors.fallback.success;

  return (
    <Animated.View
      style={styles.container}
      entering={SlideInDown}
      exiting={SlideOutDown}
    >
      <View style={[styles.notification, { backgroundColor: notificationColor }]}>
        <Text i18nKey={notification.message} color="inverted" style={styles.boldText} />
      </View>
    </Animated.View >
  );
};

export default InAppNotification;
