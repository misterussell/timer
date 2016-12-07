import $ from 'jquery';
import Backbone from 'backbone';

import timerStat from '../models/timerStat';
import store from '../store';

export default Backbone.Collection.extend({
  model: timerStat,
  parse(data) {
    return data.data;
  },
  saveStat(timerId, timeStat) {
    this.verifyStatUpload(timerId)
    .then((verifiedTimer) => {
      if (verifiedTimer) {
        console.log('timerStat update initiated');
        let timeStamps = verifiedTimer[0].timeStamps.concat([{
          ___class: 'timeStamps',
          timeStat
        }]);
        $.ajax({
          url: `https://api.backendless.com/v1/data/timerStats/${verifiedTimer[0].objectId}`,
          method: 'PUT',
          data: JSON.stringify({ timeStamps }),
          contentType: 'application/JSON',
          success: (response) => {
            console.log('Additional time stamp posted.');
            console.log(response);
          },
          error: (response) => {
            console.log(response);
          }
        });
      } else {
        console.log('timerStat creation initiated');
        this.create(
          {
            Users: {
              ___class: 'Users',
              objectId: window.localStorage['ownerId']
            },
            Timers: {
              ___class: 'Timers',
              objectId: timerId
            },
            timeStamps: {
              ___class: 'timeStamps',
              timeStat
            }
          },
          {
          url: 'https://api.backendless.com/v1/data/timerStats'
          }
        );
      }
    })
    .catch(() => {
      console.log('Verification failed');
    });
  },
  loadUserStats() {
    this.fetch({
      url: 'https://api.backendless.com/v1/data/timerStats?where=' + escape(`Users.objectId='${store.user.get('ownerId')}'`),
      success: (response) => {
        console.log(response.toJSON());
      },
      error: (response) => {
        console.log(response, 'error');
      }
    });
  },
  verifyStatUpload(timerId) {
    let serverResponseCheck = new Promise ((resolve, reject) => {
      let verifiedTimer = false ;
      this.fetch({
        url: 'https://api.backendless.com/v1/data/timerStats?where=' + escape(`Timers.objectId='${timerId}' AND Users.objectId='${store.user.get('ownerId')}'`),
        success: (response) => {
          if (response.toJSON().length) {
            verifiedTimer = response.toJSON();
            resolve(verifiedTimer);
          } else {
            resolve(verifiedTimer);
          }
        },
        error: (response) => {
          console.log(response, 'error');
          reject;
        },
        remove: false
      });
    });
  return serverResponseCheck;
  }
});
