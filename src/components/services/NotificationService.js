import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';

let createNotification = (type, msg) => {
        switch (type) {
          case 'info':
            NotificationManager.info(msg, 'Alright!', 1500);
            break;
          case 'success':
            NotificationManager.success(msg, 'Great success!', 1500);
            break;
          case 'warning':
            NotificationManager.warning(msg, 'Ghost Town Activated!', 1500);
            break;
          case 'error':
            NotificationManager.error(msg, 'Oops!', 1500);
           break;
          default:
           break;
        }
};

export default createNotification;