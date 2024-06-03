import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from './uiActionTypes';

export const login = (email, password) => {
  return dispatch({
  type: LOGIN,
  user: { email, password }
});
};

export const logout = () => {
  return dispatch({
  type: LOGOUT
});
};

export const displayNotificationDrawer = () => {
  return dispatch({
  type: DISPLAY_NOTIFICATION_DRAWER
});
};

export const hideNotificationDrawer = () => {
  return dispatch({
  type: HIDE_NOTIFICATION_DRAWER
});
};
