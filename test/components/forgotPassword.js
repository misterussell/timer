import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import ForgotPassword from '../../app/scripts/components/forgotPassword';

describe('forgotPassword component', () => {
  let forgotPassword;

  beforeEach(() => {
    forgotPassword = shallow(<ForgotPassword />);
  });

  it('should output a form', () => {
    expect(forgotPassword).to.have.tagName('form')
  });

  it('should have a message state that defaults to null', () => {
    expect(forgotPassword.state.message).to.equal(null);
  });
  
});
