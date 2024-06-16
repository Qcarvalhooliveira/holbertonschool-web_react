import { createSelector } from 'reselect';
import { Map } from 'immutable';

export const filterTypeSelected = (state) => state.getIn(['notifications', 'filter']);

export const getNotifications = (state) => state.getIn(['notifications', 'notifications'], Map());

export const getUnreadNotifications = createSelector(
  [getNotifications],
  (notifications) => {
    return notifications.filter(notification => !notification.get('isRead')).toList().toJS();
  }
);
