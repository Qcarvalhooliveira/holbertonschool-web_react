import { createSelector } from 'reselect';
import { Map } from 'immutable';


export const filterTypeSelected = (state) => state.getIn(['notifications', 'filter']);
export const getNotifications = (state) => state.getIn(['notifications', 'notifications'], Map());


export const getUnreadNotificationsByType = createSelector(
  [getNotifications, filterTypeSelected],
  (notifications, filter) => {
    const unreadNotifications = notifications.filter(notification => !notification.get('isRead'));
    if (filter === 'DEFAULT') {
      return unreadNotifications.toList().toJS();
    } else if (filter === 'URGENT') {
      return unreadNotifications.filter(notification => notification.get('type') === 'urgent').toList().toJS();
    }
    return unreadNotifications.toList().toJS(); 
  }
);
