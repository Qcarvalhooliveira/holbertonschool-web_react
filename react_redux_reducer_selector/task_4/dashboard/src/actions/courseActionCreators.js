import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';

export const selectCourse = (index) => ({
  type: SELECT_COURSE,
  index,
});

export const unSelectCourse = (index) => ({
  type: UNSELECT_COURSE,
  index,
});

export const boundSelectCourse = (index) => (dispatch) => dispatch(selectCourse(index));

export const boundUnSelectCourse = (index) => (dispatch) => dispatch(unSelectCourse(index));
