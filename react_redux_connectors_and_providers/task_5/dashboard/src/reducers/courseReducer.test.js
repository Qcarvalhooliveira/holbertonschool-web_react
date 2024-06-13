import { Map } from 'immutable';
import courseReducer from './courseReducer';
import { FETCH_COURSE_SUCCESS, SELECT_COURSE } from '../actions/courseActionTypes';

describe('courseReducer', () => {
  it('handles FETCH_COURSE_SUCCESS', () => {
    const action = {
      type: FETCH_COURSE_SUCCESS,
      data: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 },
      ],
    };

    const expectedState = Map({
      1: Map({ id: 1, name: 'ES6', credit: 60, isSelected: false }),
      2: Map({ id: 2, name: 'Webpack', credit: 20, isSelected: false }),
      3: Map({ id: 3, name: 'React', credit: 40, isSelected: false }),
    });

    expect(courseReducer(undefined, action).toJS()).toEqual(expectedState.toJS());
  });

  it('handles SELECT_COURSE', () => {
    const initialState = Map({
      1: Map({ id: 1, name: 'ES6', credit: 60, isSelected: false }),
      2: Map({ id: 2, name: 'Webpack', credit: 20, isSelected: false }),
      3: Map({ id: 3, name: 'React', credit: 40, isSelected: false }),
    });

    const action = {
      type: SELECT_COURSE,
      index: 2,
    };

    const expectedState = initialState.setIn([2, 'isSelected'], true);

    expect(courseReducer(initialState, action).toJS()).toEqual(expectedState.toJS());
  });
});
