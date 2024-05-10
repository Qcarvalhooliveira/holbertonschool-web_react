import React from 'react';
import { shallow } from 'enzyme';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection';

describe('BodySectionWithMarginBottom', () => {
  it('renders BodySection correctly with the passed props', () => {
    const wrapper = shallow(
      <BodySectionWithMarginBottom title="test title">
        <p>test children node</p>
      </BodySectionWithMarginBottom>
    );

    expect(wrapper.find(BodySection).exists()).toBe(true);

    const bodySectionProps = wrapper.find(BodySection).props();
    expect(bodySectionProps.title).toBe("test title");
    expect(bodySectionProps.children.type).toBe('p');
    expect(bodySectionProps.children.props.children).toBe('test children node');
  });
});
