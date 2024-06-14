import { createSelector } from 'reselect';

export const filterTypeSelected = (state) => state.notifications.filter;

export const getNotifications = (state) => state.notifications.entities.notifications;

export const getUnreadNotifications = createSelector(
  [getNotifications],
  (notifications) => {
    return Object.values(notifications).filter(notification => !notification.isRead);
  }
);
