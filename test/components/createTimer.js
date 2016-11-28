import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import CreateTimer from '../../app/scripts/components/createTimer';

describe('createTimer component', () => {
  let createTimer;

  beforeEach(() => {
    createTimer = shallow(<CreateTimer />);
  });

  it('should output a div', () => {
    expect(createTimer).to.have.tagName('form');
  });

});
