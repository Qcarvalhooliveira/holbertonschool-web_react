import { createSelector } from 'reselect';
import { List } from 'immutable';

export const getCourseEntities = (state) => state.get('courses', List());

export const getCoursesList = createSelector(
  [getCourseEntities],
  (courses) => courses.valueSeq().toList()
);
