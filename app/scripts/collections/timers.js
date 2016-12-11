import Backbone from 'backbone';

import Timer from '../models/timer';

export default Backbone.Collection.extend({
  model: Timer,
  parse(data) {

    return data.data;
  },
  setupTimer(timerData, name, note) {
    console.log(timerData);
    let timerValue = String(this.calculateTime(timerData.seconds, timerData.minutes, timerData.hours));
    console.log(timerValue);
    return {
      timerValue,
      name,
      note
    };
  },
  calculateTime(seconds, minutes, hours) {
    // as the time measurements are stored as minute values in backendless we will convert all times to minutes reasoning is that these timers will predominently be for increments of time in minutes
    let convertSeconds = seconds / 60;
    let convertHours = hours * 60;
    let total = Number(convertSeconds) + Number(minutes) + Number(convertHours);
    console.log(total);
    return total;
  },
  saveTimer(timerData, name, note) {
    console.log(note);
    let newTimer = this.setupTimer(timerData, name, note);

    let uploadCheck = new Promise((resolve, reject) => {
      let link = null;
      this.create(
        newTimer,
        {
          url: 'https://api.backendless.com/v1/data/Timers',
          success: (response) => {
            let id = response.id;
            link = `timers/${id}`;
            if (link) {
              resolve(link);
            } else {
              link = 'timers';
            }
          },
          error: (response) => {
            console.log(response);
            reject;
          }
        }
      );
    });
    return uploadCheck;
  },
  temporaryTimer(timerData, name, note) {
    console.log(timerData, name, note);
    // this.add();
  },
  loadTimers () {
  if (this.length > 0) {
      console.log('no fetch needed');
      return null;
  }
  // } else {
    let download = new Promise((resolve, reject) => {
      this.fetch({
        // url: 'https://api.backendless.com/v1/data/Timers',
        // url: 'https://api.backendless.com/v1/data/Timers?pageSize=100',
        url: 'https://api.backendless.com/v1/data/Timers?pageSize=100&sortBy=timerValue%20asc',
        success: (response) => {
          // if (this.length < response.totalObjects) {

          // }
          if (response) {
            resolve(response);
          }
        },
        error: (response) => {
          reject(response);
        }
      });
    });
    return download;
    // }
},
createTransitTimers(allData) {
  let timers = [];
  console.log(allData);
  let uploadCheck = new Promise((resolve, reject) => {
    allData.transitDataResponse.transit_modes.forEach((mode, i, arr) => {
      let newTimer = {
        timerValue: String(Math.floor(mode.travelTime)),
        name: mode.mode,
        origin: allData.transitDataResponse.origin ,
        destination: allData.transitDataResponse.destination,
        type: 'mobility'
      };
      console.log(newTimer.timerValue);
        this.create(
          newTimer,
          {
            url: 'https://api.backendless.com/v1/data/Timers',
            success: (response) => {
              console.log(response.toJSON());
              timers.push(response.toJSON())
              if (timers.length === arr.length) {
                resolve(timers);
              }
            },
            error: (response) => {
              console.log(response);
              reject;
            }
          }
        );
    });
  });
  return uploadCheck;
}
});
