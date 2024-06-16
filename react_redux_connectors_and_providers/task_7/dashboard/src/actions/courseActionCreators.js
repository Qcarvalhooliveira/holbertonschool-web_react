import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from './courseActionTypes';

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

export const setCourses = (data) => ({
  type: FETCH_COURSE_SUCCESS,
  data,
});

export const fetchCourses = () => async (dispatch) => {
  console.log('fetchCourses called');
  try {
    const response = await fetch('/dist/courses.json');
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }

    const data = await response.json();
    dispatch(setCourses(data));
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
};
