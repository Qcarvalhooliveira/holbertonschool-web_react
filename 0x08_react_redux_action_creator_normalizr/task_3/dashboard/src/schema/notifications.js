import { normalize, schema } from 'normalizr';
import notificationsData from '../../../../notifications.json';

const user = new schema.Entity('users');

const message = new schema.Entity('messages', {}, { idAttribute: 'guid' });

const notification = new schema.Entity('notifications', {
  author: user,
  context: message
});

const normalizedData = normalize(notificationsData, [notification]);

export { normalizedData, getAllNotificationsByUser };

function getAllNotificationsByUser(userId) {
  const notificationsByUser = [];
  const { notifications, messages } = normalizedData.entities;

  for (const notificationId in notifications) {
    const notification = notifications[notificationId];
    if (notification.author === userId) {
      notificationsByUser.push(messages[notification.context]);
    }
  }

  return notificationsByUser;
}
