import Backbone from 'backbone';

import store from '../store';

export default Backbone.Model.extend({
  idAttribute: 'objectId',
  defaults: {
    timerValue: '',
    name: '',
    note: '',
    notificationSound: 'templebell'
  },
  computeMeasure(count) {
    // this function will calculate the remaining time for the current count value
    let seconds = Math.floor((count / 1000) % 60);
    let minutes = Math.floor(((count/1000)/60) % 60);
    let hours = Math.floor(count/(1000*60*60) % 24);
    return {
        seconds,
        minutes,
        hours
      };
  },
  completeTimer(notification) {
    console.log();
    this.playNotification(notification);
    alert('Times up!');
  },
  playNotification(notification) {
    let audio = new Audio(`../../assets/sounds/${notification}.mp3`);
    audio.play();
  }
});
