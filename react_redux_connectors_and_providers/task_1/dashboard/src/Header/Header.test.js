import React from 'react';
import { shallow, mount } from 'enzyme';
import Header from './Header';
import { StyleSheetTestUtils } from 'aphrodite';
import AppContext from '../App/AppContext'; 

describe('Header', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const contextValue = {
      user: { isLoggedIn: false, email: '' },
      logOut: jest.fn(),
    };
    mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
  });

  it('renders an img and h1 tags', () => {
    const contextValue = {
      user: { isLoggedIn: false, email: '' },
      logOut: jest.fn(),
    };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('img').length).toEqual(1);
    expect(wrapper.find('h1').length).toEqual(1);
  });

  it('displays welcome message and logout link when user is logged in', () => {
    const contextValue = {
      user: { isLoggedIn: true, email: 'test@example.com' },
      logOut: jest.fn(),
    };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection').length).toEqual(1);
    expect(wrapper.find('#logoutSection').text()).toContain('Welcome test@example.com');
  });

  it('does not display welcome message and logout link when user is not logged in', () => {
    const contextValue = {
      user: { isLoggedIn: false, email: '' },
      logOut: jest.fn(),
    };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection').length).toEqual(0);
  });

  it('does not create the logoutSection with a default context value', () => {
    const contextValue = {
      user: { isLoggedIn: false, email: '' },
      logOut: jest.fn(),
    };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection').length).toEqual(0);
  });

  it('creates the logoutSection with a logged-in user', () => {
    const contextValue = {
      user: { isLoggedIn: true, email: 'test@example.com' },
      logOut: jest.fn(),
    };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection').length).toEqual(1);
    expect(wrapper.find('#logoutSection').text()).toContain('Welcome test@example.com');
  });


  it('calls logOut when the logout link is clicked', () => {
    const logOutSpy = jest.fn();
    const contextValue = {
      user: { isLoggedIn: true, email: 'test@example.com' },
      logOut: logOutSpy,
    };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    wrapper.find('#logoutSection a').simulate('click');
    expect(logOutSpy).toHaveBeenCalled();
  });
});
