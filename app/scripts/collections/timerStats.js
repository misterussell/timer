import $ from 'jquery';
import Backbone from 'backbone';

import timerStat from '../models/timerStat';
import store from '../store';

export default Backbone.Collection.extend({
  model: timerStat,
  parse(data) {
    return data.data;
  },
  saveStat(timerId, timeStat, status) {
    this.verifyStatUpload(timerId)
    .then((verifiedTimer) => {
      if (verifiedTimer) {
        let timeStamps = verifiedTimer[0].timeStamps.concat([{
          ___class: 'timeStamps',
          timeStat,
          status
        }]);
        $.ajax({
          url: `https://api.backendless.com/v1/data/timerStats/${verifiedTimer[0].objectId}`,
          method: 'PUT',
          data: JSON.stringify({ timeStamps }),
          contentType: 'application/JSON',
          success: (response) => {
            console.log('Additional time stamp posted for timer status: ' + status);
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
              timeStat,
              status
            }
          },
          {
          url: 'https://api.backendless.com/v1/data/timerStats',
          success: (response) => {
            console.log('timerStat added to server');
          },
          error: (response) => {
            console.log(response);
          }
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
        // console.log(response, 'retreieved');
      },
      error: (response) => {
        // console.log(response, 'error');
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
},
computeAvgs(status) {
  // get the sums of all the time values and divide by the total numbers
  let numOfTimers = 0;
  let totalTime = this.toJSON().map((timerStat) => {
    return timerStat.timeStamps.filter((timeStamp, i, arr) => {
      return timeStamp.status === status;
    }).map((timeStamp, i, arr) => {
      numOfTimers += 1;
      return timeStamp.timeStat;
    }).reduce((a, b) => {
        return a + b;
      }, 0);
  }).reduce((a, b) => {
    return a + b;
  }, 0);
  let avgTime = totalTime / numOfTimers;
  return {
    averageTime: store.timer.computeMeasure(avgTime),
    numOfTimers
  };
},
avgUserMeasure() {

},
mostUsed() {

},
moseUsedTypes() {

},
freqOrigin() {

},
freqDestination() {

}
});
