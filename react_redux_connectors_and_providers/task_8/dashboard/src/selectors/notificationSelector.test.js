import { fromJS } from 'immutable';
import { filterTypeSelected, getNotifications, getUnreadNotificationsByType } from './notificationSelector';

describe('Notification Selectors', () => {
  const state = fromJS({
    notifications: {
      filter: 'DEFAULT',
      notifications: {
        "1": { id: "1", type: 'default', isRead: true, value: "Notification 1" },
        "2": { id: "2", type: 'urgent', isRead: false, value: "Notification 2" },
        "3": { id: "3", type: 'default', isRead: false, value: "Notification 3" },
        "4": { id: "4", type: 'urgent', isRead: false, value: "Notification 4" },
      },
    },
  });

  test('filterTypeSelected works as expected', () => {
    const filter = filterTypeSelected(state);
    expect(filter).toEqual('DEFAULT');
  });

  test('getNotifications returns a list of the notifications within the reducer', () => {
    const notifications = getNotifications(state);
    expect(notifications.toJS()).toEqual(state.getIn(['notifications', 'notifications']).toJS());
  });

  test('getUnreadNotificationsByType returns all unread notifications when filter is DEFAULT', () => {
    const unreadNotifications = getUnreadNotificationsByType(state);
    const expectedUnread = [
      { id: "2", type: 'urgent', isRead: false, value: "Notification 2" },
      { id: "3", type: 'default', isRead: false, value: "Notification 3" },
      { id: "4", type: 'urgent', isRead: false, value: "Notification 4" },
    ];
    expect(unreadNotifications).toEqual(expectedUnread);
  });

  test('getUnreadNotificationsByType returns all unread urgent notifications when filter is URGENT', () => {
    const urgentState = state.setIn(['notifications', 'filter'], 'URGENT');
    const unreadNotifications = getUnreadNotificationsByType(urgentState);
    const expectedUnread = [
      { id: "2", type: 'urgent', isRead: false, value: "Notification 2" },
      { id: "4", type: 'urgent', isRead: false, value: "Notification 4" },
    ];
    expect(unreadNotifications).toEqual(expectedUnread);
  });
});
