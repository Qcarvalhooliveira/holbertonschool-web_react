import React from 'react';
import { shallow } from 'enzyme';
import { Footer } from './Footer'; 
import { StyleSheetTestUtils } from 'aphrodite';

describe('Footer', () => {
  beforeAll(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterAll(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('renders without crashing', () => {
    const wrapper = shallow(<Footer isLoggedIn={false} />);
    expect(wrapper.exists()).toBe(true);
  });

  it('does not display the Contact link when logged out', () => {
    const wrapper = shallow(<Footer isLoggedIn={false} />);
    expect(wrapper.find('a[href="/contact"]').length).toBe(0);
  });

  it('displays the Contact link when logged in', () => {
    const wrapper = shallow(<Footer isLoggedIn={true} />);
    expect(wrapper.find('a[href="/contact"]').length).toBe(1);
  });
});
