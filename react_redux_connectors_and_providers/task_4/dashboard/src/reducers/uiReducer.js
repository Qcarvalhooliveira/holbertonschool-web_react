// uiReducer.js

import { Map } from 'immutable';
import { DISPLAY_NOTIFICATION_DRAWER, HIDE_NOTIFICATION_DRAWER, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT, LOGIN } from '../actions/uiActionTypes';

const initialState = Map({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: Map({
    isLoggedIn: false,
    email: ''
  }),
});

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case DISPLAY_NOTIFICATION_DRAWER:
      return state.set('isNotificationDrawerVisible', true);
    case HIDE_NOTIFICATION_DRAWER:
      return state.set('isNotificationDrawerVisible', false);
    case LOGIN_SUCCESS:
      return state
        .set('isUserLoggedIn', true)
        .setIn(['user', 'isLoggedIn'], true)
        .setIn(['user', 'email'], action.payload.email);
        case LOGIN:
          return state
            .setIn(['user', 'email'], action.user.email)
            .setIn(['user', 'password'], action.user.password)
            .setIn(['user', 'isLoggedIn'], true); // Adicionando isLoggedIn após login bem-sucedido
        
    case LOGIN_FAILURE:
    case LOGOUT:
      return state
        .set('isUserLoggedIn', false)
        .set('user', Map({
          isLoggedIn: false,
          email: ''
        }));
    default:
      return state;
  }
}

export default uiReducer;
