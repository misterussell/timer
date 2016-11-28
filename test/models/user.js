import { expect } from 'chai';
import Backbone from 'backbone';

import User from '../../app/scripts/models/user';

describe('user model', () => {
  let user;

  beforeEach(() => {
    user = new User();
  });

  it('should be a Backbone model', () => {
    expect(user).to.be.an.instanceof(Backbone.Model);
  });

  it('should have a register method that adds the new user to the server and logs them in', () => {
    expect(user.register).to.be.a('function');
  });

  it('should have a login method that takes their inputs and generates a new user token', () => {
    expect(user.login).to.be.a('function');
  })

  it('should have a logout method that logs them out of the server and clears their local storage', () => {
    expect(user.logout).to.be.a('function');
  });

  it('should have an authenticated property that defaults to false, allowing the app to keep track of what to display to the user', () => {
    expect(user.get('auth')).to.equal.false;
  });

});
