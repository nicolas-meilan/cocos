import { useInAppNotificationContext } from '@/contexts/InAppNotificationContext';
import { useTranslation } from 'react-i18next';

export const useInAppNotification = () => {
  const { t, i18n } = useTranslation();
  const { dispatchError, dispatchSuccess, dispatchWarning } = useInAppNotificationContext();

  const notifyError = (text: string, time?: number) => {
    const message = i18n.exists(text) ? t(text) : text;
    dispatchError(t(message), time);
  };

  const notifySuccess = (text: string, time?: number) => {
    const message = i18n.exists(text) ? t(text) : text;
    dispatchSuccess(message, time);
  };

  const notifyWarning = (text: string, time?: number) => {
    const message = i18n.exists(text) ? t(text) : text;
    dispatchWarning(message, time);
  };

  return { notifyError, notifySuccess, notifyWarning };
};
