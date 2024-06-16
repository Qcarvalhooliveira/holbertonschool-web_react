import { MARK_AS_READ, 
  SET_TYPE_FILTER,
   SET_LOADING_STATE,
    FETCH_NOTIFICATIONS_SUCCESS } from './notificationActionTypes';

export const markAsRead = (index) => ({
  type: MARK_AS_READ,
  index,
});

export const setNotificationFilter = (filter) => ({
  type: SET_TYPE_FILTER,
  filter,
});

export const setLoadingState = (isLoading) => ({
  type: SET_LOADING_STATE,
  isLoading,
});


export const setNotifications = (notifications) => ({
  type: FETCH_NOTIFICATIONS_SUCCESS,
  notifications,
});

export const fetchNotifications = () => async (dispatch) => {

  dispatch(setLoadingState(true));

  try {
  
    const response = await fetch('/dist/notifications.json');
    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    const data = await response.json();

   
    dispatch(setNotifications(data));

  } catch (error) {
    console.error('Error fetching notifications:', error);

  } finally {
  
    dispatch(setLoadingState(false));
  }
};

export const boundMarkAsRead = (index) => (dispatch) => dispatch(markAsRead(index));

export const boundSetNotificationFilter = (filter) => (dispatch) => dispatch(setNotificationFilter(filter));

export const boundSetLoadingState = (isLoading) => (dispatch) => dispatch(setLoadingState(isLoading));

export const boundSetNotifications = (notifications) => (dispatch) => dispatch(setNotifications(notifications));
