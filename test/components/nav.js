import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import Nav from '../../app/scripts/components/nav';

describe('nav component', () => {
  let nav;

  beforeEach(() => {
    nav = shallow(<Nav />);
  });

  it('should output a nav element', () => {
    expect(nav).to.have.tagName('nav');
  });

  it('should have a logout click handler, that triggers the user logout method', () => {
    expect(nav.instance().handleLogout).to.be.a('function');
  });

});
