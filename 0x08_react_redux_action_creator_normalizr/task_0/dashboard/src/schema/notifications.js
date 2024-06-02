import notificationsData from '../../../../notifications.json';

export function getAllNotificationsByUser(userId) {
  return notificationsData
    .filter(notification => notification.author.id === userId)
    .map(notification => notification.context);
}