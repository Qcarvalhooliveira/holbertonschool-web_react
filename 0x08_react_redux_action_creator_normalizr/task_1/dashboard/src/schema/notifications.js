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
  const notifications = Object.values(normalizedData.entities.notifications);
  return notifications.filter(notification => notification.author === userId)
                      .map(notification => normalizedData.entities.messages[notification.context]);
}
