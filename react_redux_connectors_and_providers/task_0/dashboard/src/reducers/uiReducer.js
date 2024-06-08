import { createSlice } from '@reduxjs/toolkit';
import { Map } from 'immutable';


const initialState = Map({
  isNotificationDrawerVisible: false,
  isUserLoggedIn: false,
  user: {},
});


const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    displayNotificationDrawer(state) {
      return state.set('isNotificationDrawerVisible', true);
    },
    hideNotificationDrawer(state) {
      return state.set('isNotificationDrawerVisible', false);
    },
    loginSuccess(state, action) {
      return state.set('isUserLoggedIn', true).set('user', action.payload);
    },
    loginFailure(state) {
      return state.set('isUserLoggedIn', false).set('user', {});
    },
    logout(state) {
      return state.set('isUserLoggedIn', false).set('user', {});
    },
  },
});


export const {
  displayNotificationDrawer,
  hideNotificationDrawer,
  loginSuccess,
  loginFailure,
  logout,
} = uiSlice.actions;


export default uiSlice.reducer;
