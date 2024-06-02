import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';
import { dispatch } from 'redux';

export const selectCourse = (index) => dispatch({
  type: SELECT_COURSE,
  index,
});

export const unSelectCourse = (index) => dispatch({
  type: UNSELECT_COURSE,
  index,
});
