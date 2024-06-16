import { fromJS, Map } from 'immutable';
import { filterTypeSelected, getNotifications, getUnreadNotifications } from './notificationSelector';

describe('Notification Selectors', () => {
  const state = fromJS({
    notifications: {
      filter: 'DEFAULT',
      notifications: {
        "1": { id: "1", isRead: true, value: "Notification 1" },
        "2": { id: "2", isRead: false, value: "Notification 2" },
        "3": { id: "3", isRead: false, value: "Notification 3" },
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

  test('getUnreadNotifications returns a list of unread notifications within the reducer', () => {
    const unreadNotifications = getUnreadNotifications(state);
    const expectedUnread = [
      { id: "2", isRead: false, value: "Notification 2" },
      { id: "3", isRead: false, value: "Notification 3" },
    ];
    expect(unreadNotifications).toEqual(expectedUnread);
  });
});
