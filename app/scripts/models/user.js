import $ from 'jquery';
import Backbone from 'backbone';
import { browserHistory } from 'react-router';

export default Backbone.Model.extend({
  initialize() {
    if (window.localStorage['user-token']) {
			this.set({auth: true, 'user-token': window.localStorage['user-token']});
      browserHistory.push('/selectTimer');
		}
  },
  idAttribute: '_id',
  defaults: {
    auth: false
  },
  register(firstName, lastName, email, password, confirmPW) {
    if ( password === confirmPW ) {
      let name = firstName + lastName;
      this.save(
        {email, password, name},
        {
          url: 'https://api.backendless.com/v1/users/register',
          success: (response) => {
            console.log('Registration complete.');
            this.login(email, password);
          },
          error: (response) => {
            console.log('User data not saved to server.');
          }
        }
      );
    } else {
      alert('Passwords do not match');
    }
  },
  login(login, password) {
    this.save(
      {login, password},
      {
        url: 'https://api.backendless.com/v1/users/login',
        success: (response) => {
          console.log('Successfuly logged in.');
          window.localStorage.setItem('user-token', response.get('user-token'));
          window.localStorage.setItem('userName', response.get('userName'));
          window.localStorage.setItem('ownerId', response.get('ownerId'));
          this.set({authenticated: true});
          browserHistory.push('selectTimer');
        },
        error: function(response) {
          alert('Log in not successful. Please try again.');
        }
    });
  },
  logout() {
    $.ajax({
			url: 'https://api.backendless.com/v1/users/logout',
			success: () => {
				this.clear();
				window.localStorage.clear();
        this.set({authenticated: false});
			}
		});
  }
});
