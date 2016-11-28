import {expect} from 'chai';

import store from '../app/scripts/store';

describe('store', () => {

  it('should be an object', () => {
    expect(store).to.be.an('object');
  });

  it('should have a property of user, that stores functions related to users and their active session', () => {
    expect(store.user).to.be.an('object');
  });

});
