import { NotificationGateway } from '@zetecom/app-core/gateways/NotificationGateway';
import { toast } from 'react-toastify';

export class ToastifyNotificationGateway implements NotificationGateway {
  success = toast.success;

  info = toast.info;

  warning = toast.warning;

  error = toast.error;
}
