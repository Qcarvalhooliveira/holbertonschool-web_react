import React from 'react';
import { shallow } from 'enzyme';
import NotificationItem from './NotificationItem';
import { StyleSheetTestUtils } from 'aphrodite';

describe('NotificationItem', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    shallow(<NotificationItem type="default" value="test" />);
  });

  it('renders correct html for type and value', () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);
    expect(wrapper.find('li').prop('data-priority')).toEqual('default');
    expect(wrapper.text()).toEqual('test');
  });

  it('renders correct html with dangerouslySetInnerHTML', () => {
    const htmlContent = { __html: '<u>test</u>' };
    const wrapper = shallow(<NotificationItem html={htmlContent} type="default" />);
    expect(wrapper.html()).toContain('<u>test</u>');
  });

  it('calls markAsRead with the right ID when clicked', () => {
    const markAsReadSpy = jest.fn();
    const wrapper = shallow(<NotificationItem type="default" value="test" id={123} markAsRead={markAsReadSpy} />);
    wrapper.find('li').simulate('click');
    expect(markAsReadSpy).toHaveBeenCalledWith(123);
  });

  it('applies the correct style for default type', () => {
    const wrapper = shallow(<NotificationItem type="default" value="test" />);
    expect(wrapper.find('[data-testid="defaultItem"]').exists()).toBe(true);
  });

  it('applies the correct style for urgent type', () => {
    const wrapper = shallow(<NotificationItem type="urgent" value="test" />);
    expect(wrapper.find('[data-testid="urgentItem"]').exists()).toBe(true);
  });
});
