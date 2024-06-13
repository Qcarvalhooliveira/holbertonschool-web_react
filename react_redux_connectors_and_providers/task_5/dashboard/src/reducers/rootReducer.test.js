import { Map, List } from 'immutable';
import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('should return the initial state', () => {
    const initialState = rootReducer(undefined, {});
    const expectedState = Map({
      courses: Map(),
      notifications: Map({
        filter: 'DEFAULT',
        notifications: Map(),
      }),
      ui: Map({
        isNotificationDrawerVisible: false,
        isUserLoggedIn: false,
        user: Map({
          isLoggedIn: false,
          email: '',
        }),
      }),
    });
    expect(initialState.toJS()).toEqual(expectedState.toJS());
  });
});
