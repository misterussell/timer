import $ from 'jquery';
import u from 'underscore';
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
            console.log(response);
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
            console.log('found it', response.toJSON());
            verifiedTimer = response.toJSON();
            resolve(verifiedTimer);
          } else {
            console.log('did not find it');
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
computeAvgs(status, value) {
  // get the sums of all the time values and divide by the total numbers
  let numOfTimers = 0, average;
  let totalTime = this.toJSON().map((timerStat) => {
    return timerStat.timeStamps.filter((timeStamp, i, arr) => {
      return timeStamp.status === status;
    }).map((timeStamp, i, arr) => {
      numOfTimers += 1;
      return timeStamp[value];
    }).reduce((a, b) => {
        return a + b;
      }, 0);
  }).reduce((a, b) => {
    return a + b;
  }, 0);
  let avgTime = totalTime / numOfTimers;
  if (value === 'timeStat') {
    average = store.timer.computeMeasure(avgTime);
  } else if (value === 'date') {
    average = 'date to go here';
  }
  return {
    average,
    stat: value,
    numOfTimers
  };
},
mostUsed() {
  console.log(this.toJSON());
  let maxUse = 0, maxUseCase = {};
  this.toJSON().forEach((timerStat) => {
    if (timerStat.timeStamps.length > maxUse) {
      maxUse = timerStat.timeStamps.length;
      maxUseCase = timerStat;
    }
  });
  console.log(maxUseCase);
  let status = ['start', 'paused', 'complete'];
  let useStats = status.map((status) => {
    return maxUseCase.timeStamps.filter((timeStamp) => {
      if (timeStamp.status === status) {
        return timeStamp;
      }
    }).length;
  });
  return {
    name: maxUseCase.Timers.name,
    note: maxUseCase.Timers.note,
    time: maxUseCase.Timers.timerValue,
    start: useStats[0],
    paused: useStats[1],
    complete: useStats[2]
  };
},
moseUsedTypes() {

},
freqOrigin() {
  console.log(this.toJSON());
  let dates = this.toJSON().map((timeStat) => {
    return timeStat.timeStamps.map((timeStamp) => {
      let unix_timeStamp = timeStamp.created;
      let date = new Date(unix_timeStamp);
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      let hours = date.getHours();
      let minutes = '0' + date.getMinutes();
      let seconds = '0' + date.getSeconds();
      let formattedTimeStamp = day + '/' + month + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
      return formattedTimeStamp;
    });
  });
  console.log(dates);
},
freqDestination() {

}
});
