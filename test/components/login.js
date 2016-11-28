import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';
import sinon from 'sinon';
import {spyOnComponentMethod} from 'sinon-spy-react';

import Login from '../../app/scripts/components/login';

describe('login component', () => {
  let login, spy;

  beforeEach(() => {
    login = shallow(<Login />);
    spy = sinon.spy();
  });

  it('should output a form element', () => {
    expect(login).to.have.tagName('form');
  });

  it('should have a submit handler, that triggers the user login method', () => {
    expect(login.instance().handleSubmit).to.be.a('function');
  });

  it('should run handleSubmit when the form is submit', () => {
    login.find('.login-signup').simulate('submit', { preventDefault() {} });
    expect(spy.callCount).to.equal(1);

  });

});
