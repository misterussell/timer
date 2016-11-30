import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

describe('numberInput component', () => {
  let numberInput;

  beforeEach(() => {
    numberInput = shallow(<NumberInput value={ '12' } measure={ 'test' } callBack={ () => { console.log('test');}}/>);
  });

  it('should output an input field', () => {
    expect(numberInput).to.have.tagName('input');
  });

  
});
