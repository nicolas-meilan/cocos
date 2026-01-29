import React, { createContext, ReactNode, useContext, useRef, useState } from 'react';

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
}

export type Notification = {
  message: string;
  type: NotificationType;
  visible: boolean;
};

export type InAppNotificationContextType = {
  notification: Notification | null;
  dispatchSuccess: (message: string) => void;
  dispatchError: (message: string) => void;
};

export const IN_APP_NOTIFICATION_TIME = 4000;

const InAppNotificationContext = createContext<InAppNotificationContextType | undefined>(undefined);

export const InAppNotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const dispatch = (message: string, type: NotificationType) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setNotification({ message, type, visible: true });

    timeoutRef.current = setTimeout(() => {
      setNotification(null);
      timeoutRef.current = null;
    }, IN_APP_NOTIFICATION_TIME);
  };

  const dispatchSuccess = (message: string) => dispatch(message, NotificationType.SUCCESS);
  const dispatchError = (message: string) => dispatch(message, NotificationType.ERROR);

  return (
    <InAppNotificationContext.Provider value={{ notification, dispatchSuccess, dispatchError }}>
      {children}
    </InAppNotificationContext.Provider>
  );
};

export const useInAppNotificationContext = (): InAppNotificationContextType => {
  const context = useContext(InAppNotificationContext);
  if (!context) throw new Error('useInAppNotificationContext must be used within InAppNotificationProvider');
  return context;
};
