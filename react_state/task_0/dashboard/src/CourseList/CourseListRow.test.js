import React from 'react';
import { shallow } from 'enzyme';
import CourseListRow from './CourseListRow';
import { StyleSheetTestUtils } from 'aphrodite';

describe('CourseListRow', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders one cell with colspan=2 when isHeader is true and textSecondCell is null', () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="Test" />);
    expect(wrapper.find('th').prop('colSpan')).toBe('2');
    expect(wrapper.find('tr').hasClass('headerRow')).toBe(false);
  });

  it('renders two cells when isHeader is true and textSecondCell is present', () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="Test" textSecondCell="Second" />);
    expect(wrapper.find('th').length).toBe(2);
    expect(wrapper.find('tr').hasClass('headerRow')).toBe(false);
  });

  it('renders correctly two td elements within a tr element when isHeader is false', () => {
    const wrapper = shallow(<CourseListRow isHeader={false} textFirstCell="Test" textSecondCell="Second" />);
    expect(wrapper.find('td').length).toBe(2);
    expect(wrapper.find('tr').hasClass('row')).toBe(false);
  });

  it('applies the correct styles based on isHeader prop', () => {
    const wrapperHeader = shallow(<CourseListRow isHeader={true} textFirstCell="Header" />);
    const wrapperRow = shallow(<CourseListRow isHeader={false} textFirstCell="Row" />);
    expect(wrapperHeader.find('tr').hasClass('headerRow')).toBe(false);
    expect(wrapperRow.find('tr').hasClass('row')).toBe(false);
  });
});
