import { MARK_AS_READ, SET_TYPE_FILTER } from './notificationActionTypes';

export const markAsRead = (index) => ({
  type: MARK_AS_READ,
  index,
});

export const setNotificationFilter = (filter) => ({
  type: SET_TYPE_FILTER,
  filter,
});

export const boundMarkAsRead = (index) => (dispatch) => dispatch(markAsRead(index));

export const boundSetNotificationFilter = (filter) => (dispatch) => dispatch(setNotificationFilter(filter));
