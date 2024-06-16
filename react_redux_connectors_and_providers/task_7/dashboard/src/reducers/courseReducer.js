import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from '../actions/courseActionTypes';
import { Map } from 'immutable';

const initialState = Map();

function courseReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_COURSE_SUCCESS:
      return state.merge(action.data.map(course => [course.id, Map({ ...course, isSelected: false })]));
    case SELECT_COURSE:
      return state.setIn([action.index, 'isSelected'], true);
    case UNSELECT_COURSE:
      return state.setIn([action.index, 'isSelected'], false);
    default:
      return state;
  }
}

export default courseReducer;
