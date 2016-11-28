import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import Register from '../../app/scripts/components/register';

describe('register component', () => {
  let register;

  beforeEach(() => {
    register = shallow(<Register />);
  });

  it('should output a form element', () => {
    expect(register).to.have.tagName('form');
  });

  it('should have a submit handler, that triggers the user register method', () => {
    expect(register.instance().handleSubmit).to.be.a('function');
  });

});
