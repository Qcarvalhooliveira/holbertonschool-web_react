import { FETCH_NOTIFICATIONS_SUCCESS, MARK_AS_READ, SET_TYPE_FILTER, SET_LOADING_STATE } from '../actions/notificationActionTypes';
import { Map } from 'immutable';

const initialState = Map({
  notifications: Map(),
  filter: 'DEFAULT',
  isLoading: false,
});

function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_NOTIFICATIONS_SUCCESS:
      return state.mergeDeep({
        notifications: Map(action.notifications.map(notification => [
          notification.id,
          Map({ ...notification, isRead: false })
        ]))
      });
    case MARK_AS_READ:
      return state.setIn(['notifications', action.index, 'isRead'], true);
    case SET_TYPE_FILTER:
      return state.set('filter', action.filter);
    case SET_LOADING_STATE:
      return state.set('isLoading', action.isLoading);
    default:
      return state;
  }
}

export default notificationReducer;
