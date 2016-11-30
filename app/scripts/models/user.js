import $ from 'jquery';
import Backbone from 'backbone';
import { browserHistory } from 'react-router';

export default Backbone.Model.extend({
  initialize() {
    if (window.localStorage['user-token']) {
			this.set({auth: true, 'user-token': window.localStorage['user-token']});
      browserHistory.push('/createTimer');
		}
  },
  idAttribute: '_id',
  defaults: {
    auth: false,
    defaultTimers: false,
    pwReset: null
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
          this.set({auth: true});
          browserHistory.push('timers');
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
        browserHistory.push('login');
			}
		});
  },
  newPassword(email) {
    $.ajax({
      url: `https://api.backendless.com/v1/users/restorepassword/ + ${email}`,
      method: 'GET',
      success: () => {
        console.log('New Password Sent');
        this.set({pwReset: `A temporary password has been sent to ${email}.`});
      },
      error: (response) => {
        console.log(response.responseJSON.code);
        if (response.responseJSON.code === 3020) {
          this.set({pwReset: `I\'m sorry, that email was not found in our system.`});
          console.log(this.get('pwReset'));
        }
      }
    });
  }
});
