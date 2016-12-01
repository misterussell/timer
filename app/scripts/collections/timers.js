import Backbone from 'backbone';

import Timer from '../models/timer';

export default Backbone.Collection.extend({
  model: Timer,
  parse(data) {
    return data.data;
  },
  setupTimer(timerData, title, note) {
    let timerValue = this.calculateTime(timerData.seconds, timerData.minutes, timerData.hours);
    return {
      timerValue,
      title,
      note
    };
  },
  calculateTime(seconds, minutes, hours) {
    // as the time measurements are stored as minute values in backendless we will convert all times to minutes reasoning is that these timers will predominently be for increments of time in minutes
    let convertSeconds = seconds / 60;
    let convertHours = Math.floor(hours * 60);
    let total = Number(convertSeconds) + Number(minutes) + Number(convertHours);
    return total;
  },
  saveTimer(timerData, title, note) {
    let newTimer = this.setupTimer(timerData, title, note);
    console.log(newTimer);
    let uploadCheck = new Promise((resolve, reject) => {
      let link = null;
      this.create(
        newTimer,
        {
          url: 'http://api.backendless.com/v1/data/userTimers',
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
  }
});
