import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';

export const selectCourse = (index) => {
  return dispatch({
  type: SELECT_COURSE,
  index,
});
};

export const unSelectCourse = (index) => {
  return dispatch({
  type: UNSELECT_COURSE,
  index,
});
};
