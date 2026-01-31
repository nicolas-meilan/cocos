import React, { createContext, ReactNode, useContext, useRef, useState } from 'react';

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

export type Notification = {
  message: string;
  type: NotificationType;
  visible: boolean;
};

export type InAppNotificationContextType = {
  notification: Notification | null;
  dispatchSuccess: (message: string, time?: number) => void;
  dispatchError: (message: string, time?: number) => void;
  dispatchWarning: (message: string, time?: number) => void;
};

export const IN_APP_NOTIFICATION_TIME = 4000;

const InAppNotificationContext = createContext<InAppNotificationContextType | undefined>(undefined);

export const InAppNotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const dispatch = (message: string, type: NotificationType, time: number = IN_APP_NOTIFICATION_TIME) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setNotification({ message, type, visible: true });

    timeoutRef.current = setTimeout(() => {
      setNotification(null);
      timeoutRef.current = null;
    }, time);
  };

  const dispatchSuccess = (message: string, time?: number) => dispatch(message, NotificationType.SUCCESS, time);
  const dispatchError = (message: string, time?: number) => dispatch(message, NotificationType.ERROR, time);
  const dispatchWarning = (message: string, time?: number) => dispatch(message, NotificationType.WARNING, time);

  return (
    <InAppNotificationContext.Provider value={{ notification, dispatchSuccess, dispatchError, dispatchWarning }}>
      {children}
    </InAppNotificationContext.Provider>
  );
};

export const useInAppNotificationContext = (): InAppNotificationContextType => {
  const context = useContext(InAppNotificationContext);
  if (!context) throw new Error('useInAppNotificationContext must be used within InAppNotificationProvider');
  return context;
};
