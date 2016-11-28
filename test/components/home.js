import { expect } from 'chai';
import { shallow } from 'enzyme';
import React from 'react';

import Home from '../../app/scripts/components/home';
import Nav from '../../app/scripts/components/nav';

describe('home component', () => {
  let home;

  beforeEach(() => {
    home = shallow(<Home />);
  });

  it('should output a div', () => {
    expect(home).to.have.tagName('div');
  });

  it('should render a persistent Nav component', () => {
    expect(home).to.have.descendants(<Nav auth={ true } />);
  });

});
