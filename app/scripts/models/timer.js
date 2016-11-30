import Backbone from 'backbone';

import store from '../store';

export default Backbone.Model.extend({
  idAttribute: 'objectId',
  defaults: {
    timerValue: '',
    title: '',
    note: ''
  },
  urlRoot: 'http://api.backendless.com/v1/data/Templates',
  setupTimer(timerData, title, note) {
    console.log(timerData, title, note);
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
  saveTimer(timerData) {
    this.setupTimer(timerData);
  }
});
