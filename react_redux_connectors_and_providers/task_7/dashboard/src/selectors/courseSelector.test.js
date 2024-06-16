import { fromJS, List, Map } from 'immutable';
import { getCourseEntities, getCoursesList } from './courseSelector';

describe('Course Selectors', () => {
  const state = fromJS({
    courses: {
      "1": { id: "1", name: "Course 1", isSelected: false },
      "2": { id: "2", name: "Course 2", isSelected: false },
      "3": { id: "3", name: "Course 3", isSelected: false },
    },
  });

  test('getCourseEntities returns all course entities', () => {
    const courses = getCourseEntities(state);
    expect(courses.toJS()).toEqual(state.get('courses').toJS());
  });

  test('getCoursesList returns a list of courses', () => {
    const coursesList = getCoursesList(state);
    const expectedCoursesList = List([
      Map({ id: "1", name: "Course 1", isSelected: false }),
      Map({ id: "2", name: "Course 2", isSelected: false }),
      Map({ id: "3", name: "Course 3", isSelected: false }),
    ]);
    expect(coursesList).toEqual(expectedCoursesList);
  });
});
