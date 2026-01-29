import { useInAppNotificationContext } from '@/contexts/InAppNotificationContext';
import { useTranslation } from 'react-i18next';

export const useInAppNotification = () => {
  const { t, i18n } = useTranslation();
  const { dispatchError, dispatchSuccess } = useInAppNotificationContext();

  const notifyError = (text: string) => {
    const message = i18n.exists(text) ? t(text) : text;
    dispatchError(t(message));
  };

  const notifySuccess = (text: string) => {
    const message = i18n.exists(text) ? t(text) : text;
    dispatchSuccess(message);
  };

  return { notifyError, notifySuccess };
};
