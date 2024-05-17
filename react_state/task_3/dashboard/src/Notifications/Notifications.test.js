import React from 'react';
import { shallow } from 'enzyme';
import { Notifications } from './Notifications';
import NotificationItem from './NotificationItem';
import { StyleSheetTestUtils } from 'aphrodite';

describe('Notifications', () => {
  const handleDisplayDrawerMock = jest.fn();
  const handleHideDrawerMock = jest.fn();

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('menu item is displayed when displayDrawer is false', () => {
    const wrapper = shallow(<Notifications displayDrawer={false} listNotifications={[]} handleDisplayDrawer={handleDisplayDrawerMock} handleHideDrawer={handleHideDrawerMock} />);
    expect(wrapper.find('[data-testid="menuItem"]').text()).toContain('Your notifications');
    expect(wrapper.find('[data-testid="notifications"]').exists()).toBe(false);
  });

  it('div.Notifications is displayed when displayDrawer is true', () => {
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} handleDisplayDrawer={handleDisplayDrawerMock} handleHideDrawer={handleHideDrawerMock} />);
    expect(wrapper.find('[data-testid="notifications"]').exists()).toBe(true);
  });

  describe('with a list of notifications and displayDrawer true', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available' },
      { id: 2, type: 'urgent', value: 'New resume available' },
      { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } }
    ];

    it('renders the correct number of notifications', () => {
      const wrapper = shallow(
        <Notifications
          displayDrawer={true}
          listNotifications={notifications}
          handleDisplayDrawer={handleDisplayDrawerMock}
          handleHideDrawer={handleHideDrawerMock}
        />
      );
      expect(wrapper.find(NotificationItem).length).toBe(notifications.length);
    });

    it('calls handleDisplayDrawer when menu item is clicked', () => {
      const wrapper = shallow(<Notifications displayDrawer={false} listNotifications={[]} handleDisplayDrawer={handleDisplayDrawerMock} handleHideDrawer={handleHideDrawerMock} />);
      wrapper.find('[data-testid="menuItem"]').simulate('click');
      expect(handleDisplayDrawerMock).toHaveBeenCalled();
    });

    it('calls handleHideDrawer when close button is clicked', () => {
      const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={[]} handleDisplayDrawer={handleDisplayDrawerMock} handleHideDrawer={handleHideDrawerMock} />);
      wrapper.find('button').simulate('click');
      expect(handleHideDrawerMock).toHaveBeenCalled();
    });
  });
});
