import { LOGIN, LOGOUT, DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER } from './uiActionTypes';
import { dispatch } from 'redux';

export const login = (email, password) => dispatch({
  type: LOGIN,
  user: { email, password }
});

export const logout = () => dispatch({
  type: LOGOUT
});

export const displayNotificationDrawer = () => dispatch({
  type: DISPLAY_NOTIFICATION_DRAWER
});

export const hideNotificationDrawer = () => dispatch({
  type: HIDE_NOTIFICATION_DRAWER
});
