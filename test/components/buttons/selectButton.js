import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { spyOnComponentMethod } from 'sinon-spy-react';

import SelectButton from '../../../app/scripts/components/buttons/selectButton';

describe('Buttons component', () => {
  let button;

  beforeEach(() => {
    button = shallow(<SelectButton
      text={ 'test' }
      callback={ function(e) {
        e.preventDefault();
        console.log('callback Registered');
      }}/>);
  });

  it('should be a button', () => {
    expect(button).to.have.tagName('button');
  });

  it('should have a handleClick method', () => {
    expect(button.instance().handleClick).to.be.a('function');
  });

  it('should trigger the handleClick method when clicked', () => {
    let spy = sinon.spy(button.instance().handleClick);
    button.find('.select').simulate('click', { preventDefault() {} });
    expect(spy.callCount).to.equal(1);
  });


});
