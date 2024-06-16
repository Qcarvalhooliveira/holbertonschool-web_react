import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { selectCourse, unSelectCourse, fetchCourses } from './courseActionCreators';
import { SELECT_COURSE, UNSELECT_COURSE, FETCH_COURSE_SUCCESS } from './courseActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('course actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

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

  it('creates FETCH_COURSE_SUCCESS when fetching courses has been done', async () => {
    fetchMock.getOnce('/dist/courses.json', {
      body: [
        { id: '1', name: 'ES6', credit: 60 },
        { id: '2', name: 'Webpack', credit: 20 },
        { id: '3', name: 'React', credit: 40 }
      ],
      headers: { 'content-type': 'application/json' }
    });

    const expectedActions = [
      {
        type: FETCH_COURSE_SUCCESS,
        data: [
          { id: '1', name: 'ES6', credit: 60 },
          { id: '2', name: 'Webpack', credit: 20 },
          { id: '3', name: 'React', credit: 40 }
        ]
      }
    ];

    const store = mockStore({ courses: {} });

    await store.dispatch(fetchCourses());

    expect(store.getActions()).toEqual(expectedActions);
  });
});
