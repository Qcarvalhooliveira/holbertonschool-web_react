import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { Map } from 'immutable';
import CourseList from './CourseList';
import CourseListRow from './CourseListRow';
import { StyleSheetTestUtils } from 'aphrodite';
import * as actions from '../actions/courseActionCreators';
import { FETCH_COURSE_SUCCESS } from '../actions/courseActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('CourseList', () => {
  let store;

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  beforeEach(() => {
    store = mockStore(Map({
      courses: Map()
    }));
    store.dispatch = jest.fn();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );
  });

  it('renders correctly with empty listCourses', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CourseList listCourses={[]} />
      </Provider>
    );
    expect(wrapper.find(CourseListRow).someWhere(n => n.text() === 'No course available yet')).toBe(true);
    expect(wrapper.find(CourseListRow).length).toBe(3);
  });

  it('renders correctly if listCourses is not passed', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );
    expect(wrapper.find(CourseListRow).someWhere(n => n.text() === 'No course available yet')).toBe(true);
    expect(wrapper.find(CourseListRow).length).toBe(3);
  });

  const listCourses = [
    { id: 1, name: 'ES6', credit: 60 },
    { id: 2, name: 'Webpack', credit: 20 },
    { id: 3, name: 'React', credit: 40 }
  ];

  it('renders the correct number of CourseListRows, including headers', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CourseList listCourses={listCourses} />
      </Provider>
    );
    expect(wrapper.find(CourseListRow).length).toBe(3); });

  it('dispatches fetchCourses when the component is mounted', async () => {
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

    const wrapper = mount(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    await new Promise(resolve => setTimeout(resolve, 0));

    expect(store.getActions()).toEqual(expectedActions);
  });

  it('dispatches selectCourse and unSelectCourse when onChangeRow is called', () => {
    const wrapper = mount(
      <Provider store={store}>
        <CourseList />
      </Provider>
    );

    const courseListInstance = wrapper.find(CourseList).childAt(0).instance();
    courseListInstance.onChangeRow('1', true);
    expect(store.dispatch).toHaveBeenCalledWith(actions.selectCourse('1'));

    courseListInstance.onChangeRow('1', false);
    expect(store.dispatch).toHaveBeenCalledWith(actions.unSelectCourse('1'));
  });
});
