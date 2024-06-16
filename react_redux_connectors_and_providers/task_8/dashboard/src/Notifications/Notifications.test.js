import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import configureMockStore from 'redux-mock-store';
import {thunk} from 'redux-thunk';
import { fromJS } from 'immutable';
import { StyleSheetTestUtils } from 'aphrodite';
import NotificationsContainer from './NotificationsContainer';
import NotificationItem from './NotificationItem';
import * as actions from '../actions/notificationActionCreators';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('NotificationsContainer', () => {
  let store;

  const handleDisplayDrawerMock = jest.fn();
  const handleHideDrawerMock = jest.fn();
  const fetchNotificationsMock = jest.fn();
  const markAsReadMock = jest.fn();
  const setNotificationFilterMock = jest.fn();

  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  beforeEach(() => {
    // Utilize fromJS para garantir que o estado seja imutável
    store = mockStore(fromJS({
      notifications: {
        filter: 'DEFAULT',
        notifications: [],
      },
      ui: {
        isNotificationDrawerVisible: false,
      },
    }));
    store.dispatch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('menu item is displayed when displayDrawer is false', () => {
    const wrapper = mount(
      <Provider store={store}>
        <NotificationsContainer
          handleDisplayDrawer={handleDisplayDrawerMock}
          handleHideDrawer={handleHideDrawerMock}
          fetchNotifications={fetchNotificationsMock}
          markAsRead={markAsReadMock}
          setNotificationFilter={setNotificationFilterMock}
        />
      </Provider>
    );
    expect(wrapper.find('[data-testid="menuItem"]').text()).toContain('Your notifications');
    expect(wrapper.find('[data-testid="notifications"]').exists()).toBe(false);
  });

  it('div.Notifications is displayed when displayDrawer is true', () => {
    // Reconfigure o store com displayDrawer como true
    store = mockStore(fromJS({
      notifications: {
        filter: 'DEFAULT',
        notifications: [],
      },
      ui: {
        isNotificationDrawerVisible: true,
      },
    }));
    const wrapper = mount(
      <Provider store={store}>
        <NotificationsContainer
          handleDisplayDrawer={handleDisplayDrawerMock}
          handleHideDrawer={handleHideDrawerMock}
          fetchNotifications={fetchNotificationsMock}
          markAsRead={markAsReadMock}
          setNotificationFilter={setNotificationFilterMock}
        />
      </Provider>
    );
    expect(wrapper.find('[data-testid="notifications"]').exists()).toBe(true);
  });

  describe('with a list of notifications and displayDrawer true', () => {
    const notifications = [
      { id: 1, type: 'default', value: 'New course available', isRead: false },
      { id: 2, type: 'urgent', value: 'New resume available', isRead: false },
      { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' }, isRead: false }
    ];

    beforeEach(() => {
      store = mockStore(fromJS({
        notifications: {
          filter: 'DEFAULT',
          notifications,
        },
        ui: {
          isNotificationDrawerVisible: true,
        },
      }));
    });

    it('renders the correct number of notifications', () => {
      const wrapper = mount(
        <Provider store={store}>
          <NotificationsContainer
            handleDisplayDrawer={handleDisplayDrawerMock}
            handleHideDrawer={handleHideDrawerMock}
            fetchNotifications={fetchNotificationsMock}
            markAsRead={markAsReadMock}
            setNotificationFilter={setNotificationFilterMock}
          />
        </Provider>
      );
      expect(wrapper.find(NotificationItem).length).toBe(notifications.length);
    });

    it('calls handleDisplayDrawer when menu item is clicked', () => {
      store = mockStore(fromJS({
        notifications: {
          filter: 'DEFAULT',
          notifications: [],
        },
        ui: {
          isNotificationDrawerVisible: false,
        },
      }));
      const wrapper = mount(
        <Provider store={store}>
          <NotificationsContainer
            handleDisplayDrawer={handleDisplayDrawerMock}
            handleHideDrawer={handleHideDrawerMock}
            fetchNotifications={fetchNotificationsMock}
            markAsRead={markAsReadMock}
            setNotificationFilter={setNotificationFilterMock}
          />
        </Provider>
      );
      wrapper.find('[data-testid="menuItem"]').simulate('click');
      expect(handleDisplayDrawerMock).toHaveBeenCalled();
    });

    it('calls handleHideDrawer when close button is clicked', () => {
      const wrapper = mount(
        <Provider store={store}>
          <NotificationsContainer
            handleDisplayDrawer={handleDisplayDrawerMock}
            handleHideDrawer={handleHideDrawerMock}
            fetchNotifications={fetchNotificationsMock}
            markAsRead={markAsReadMock}
            setNotificationFilter={setNotificationFilterMock}
          />
        </Provider>
      );
      wrapper.find('button').at(0).simulate('click'); // Assumindo que o botão de fechar é o primeiro botão
      expect(handleHideDrawerMock).toHaveBeenCalled();
    });

    it('calls setNotificationFilter with URGENT when the first filter button is clicked', () => {
      const wrapper = mount(
        <Provider store={store}>
          <NotificationsContainer
            handleDisplayDrawer={handleDisplayDrawerMock}
            handleHideDrawer={handleHideDrawerMock}
            fetchNotifications={fetchNotificationsMock}
            markAsRead={markAsReadMock}
            setNotificationFilter={setNotificationFilterMock}
          />
        </Provider>
      );
      wrapper.find('button').at(1).simulate('click'); // Assumindo que o botão URGENT é o segundo botão
      expect(setNotificationFilterMock).toHaveBeenCalledWith('URGENT');
    });

    it('calls setNotificationFilter with DEFAULT when the second filter button is clicked', () => {
      const wrapper = mount(
        <Provider store={store}>
          <NotificationsContainer
            handleDisplayDrawer={handleDisplayDrawerMock}
            handleHideDrawer={handleHideDrawerMock}
            fetchNotifications={fetchNotificationsMock}
            markAsRead={markAsReadMock}
            setNotificationFilter={setNotificationFilterMock}
          />
        </Provider>
      );
      wrapper.find('button').at(2).simulate('click'); // Assumindo que o botão DEFAULT é o terceiro botão
      expect(setNotificationFilterMock).toHaveBeenCalledWith('DEFAULT');
    });
  });

  it('calls fetchNotifications when component is mounted', () => {
    mount(
      <Provider store={store}>
        <NotificationsContainer
          handleDisplayDrawer={handleDisplayDrawerMock}
          handleHideDrawer={handleHideDrawerMock}
          fetchNotifications={fetchNotificationsMock}
          markAsRead={markAsReadMock}
          setNotificationFilter={setNotificationFilterMock}
        />
      </Provider>
    );
    expect(fetchNotificationsMock).toHaveBeenCalled();
  });
});
