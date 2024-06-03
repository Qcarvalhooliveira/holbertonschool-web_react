import { MARK_AS_READ, SET_TYPE_FILTER } from './notificationActionTypes';

export const markAsRead = (index) => {
  return dispatch({
  type: MARK_AS_READ,
  index,
});
};

export const setNotificationFilter = (filter) => {
  return dispatch({
  type: SET_TYPE_FILTER,
  filter,
});
};
