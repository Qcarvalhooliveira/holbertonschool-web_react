import React from 'react';
import { shallow } from 'enzyme';
import { Header } from './Header';
import { StyleSheetTestUtils } from 'aphrodite';
import { Map } from 'immutable'; // Importe Map do immutable

describe('Header', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<Header user={Map({ isLoggedIn: false, user: { email: '' } })} />); // Use Map() para criar um objeto imutável
    expect(wrapper.exists()).toBe(true);
  });

  it('renders an img and h1 tags', () => {
    const wrapper = shallow(<Header user={Map({ isLoggedIn: false, user: { email: '' } })} />); // Use Map() para criar um objeto imutável
    expect(wrapper.find('img').length).toEqual(1);
    expect(wrapper.find('h1').length).toEqual(1);
  });

  it('displays welcome message and logout link when user is logged in', () => {
    const wrapper = shallow(<Header user={Map({ isLoggedIn: true, user: { email: 'test@example.com' } })} />); // Use Map() para criar um objeto imutável
    expect(wrapper.find('#logoutSection').length).toEqual(1);
    expect(wrapper.find('#logoutSection').text()).toContain('Welcome test@example.com');
  });

  it('does not display welcome message and logout link when user is not logged in', () => {
    const wrapper = shallow(<Header user={Map({ isLoggedIn: false, user: { email: '' } })} />); // Use Map() para criar um objeto imutável
    expect(wrapper.find('#logoutSection').length).toEqual(0);
  });

  it('does not create the logoutSection with a default context value', () => {
    const wrapper = shallow(<Header user={Map({ isLoggedIn: false, user: { email: '' } })} />); // Use Map() para criar um objeto imutável
    expect(wrapper.find('#logoutSection').length).toEqual(0);
  });

  it('creates the logoutSection with a logged-in user', () => {
    const wrapper = shallow(<Header user={Map({ isLoggedIn: true, user: { email: 'test@example.com' } })} />); // Use Map() para criar um objeto imutável
    expect(wrapper.find('#logoutSection').length).toEqual(1);
    expect(wrapper.find('#logoutSection').text()).toContain('Welcome test@example.com');
  });
});
