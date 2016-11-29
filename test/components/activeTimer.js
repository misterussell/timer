import React from 'react';
import { expect } from 'chai';
import sinon from 'sinon';
import { shallow } from 'enzyme';
import { spyOnComponentMethod } from 'sinon-spy-react';

import ActiveTimer from '../../app/scripts/components/activeTimer';

describe('activeTimer component', () => {
  let activeTimer;

  beforeEach(() => {
    activeTimer = shallow(<ActiveTimer />);
  });

});
