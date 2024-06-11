import { Map } from 'immutable';
import { DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT } from '../actions/uiActionTypes';

const initialState = Map({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: { isLoggedIn: false, email: '' },
});

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_NOTIFICATION_DRAWER:
      return state.set('isNotificationDrawerVisible', true);
    case HIDE_NOTIFICATION_DRAWER:
      return state.set('isNotificationDrawerVisible', false);
    case LOGIN:
      return state.set('user', action.user);
    case LOGIN_SUCCESS:
      return state
        .set('isUserLoggedIn', true)
        .set('user', { isLoggedIn: true, email: action.payload.email });
    case LOGIN_FAILURE:
    case LOGOUT:
      return state
        .set('isUserLoggedIn', false)
        .set('user', null);
    default:
      return state;
  }
}

export default uiReducer;
