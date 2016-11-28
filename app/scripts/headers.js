import $ from 'jquery';

import keys from './keys';

export default function() {
  return $(document).ajaxSend((evt, xhr, settings) => {
    if ( settings.url.includes('api.backendless')) {
      // console.log('intercepted');
      xhr.setRequestHeader('application-id', keys.appId);
      xhr.setRequestHeader('secret-key', keys.secret);
      xhr.setRequestHeader('application-type', 'REST');
      // reauth with localStorage if user has navigated away but not logged out
      if (window.localStorage['user-token']) {
        xhr.setRequestHeader('user-token', window.localStorage['user-token']);
      }
    }
  });

}
