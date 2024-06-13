import { selectCourse, unSelectCourse } from './courseActionCreators';
import { SELECT_COURSE, UNSELECT_COURSE } from './courseActionTypes';

test('selectCourse action creator returns the correct action', () => {
  const index = 1;
  const expectedAction = {
    type: SELECT_COURSE,
    index,
  };
  expect(selectCourse(index)).toEqual(expectedAction);
});

test('unSelectCourse action creator returns the correct action', () => {
  const index = 1;
  const expectedAction = {
    type: UNSELECT_COURSE,
    index,
  };
  expect(unSelectCourse(index)).toEqual(expectedAction);
});
