import React from 'react';

import NumberInput from './numberInput';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      location: '',
      timerValue: 0,
      transitDataResponse: {}
    };
  },
  render() {
    return (
      <form className="get-locations" onSubmit={this.handleSubmit}>
        <input type="text"
          ref="currentLocation"
          className="new-form-input"
          id="first-name"
          placeholder="Your Location" />
        <button className="locator-button"
          onClick={ this.getCurrentLocation }>
          Get Current Location
        </button>
        <input type="text"
          ref="newLocation"
          className="new-form-input"
          id="last-name"
          placeholder="Where do you need to be?" />
        <h3>What mobility options do you have?</h3>
        <input
          type="checkbox"
          ref="walking"
          id="method-walk"
          className="travel-method"
          value="walk" />
        <label htmlFor="method-walk">Walk</label>
        <input type="checkbox"
          ref="bicycling"
          id="method-bike"
          className="travel-method"
          value="bike" />
        <label htmlFor="method-bike">Bike</label>
        <input type="checkbox"
          ref="driving"
          id="method-drive"
          className="travel-method"
          value="drive" />
        <label htmlFor="method-drive">Drive</label>
        <h3>When do you have to be there?</h3>
        <input
          type="text"
          className="hours timevalue"
          ref="hours" />
        <input
          type="text"
          className="minutes timevalue"
          ref="minutes"/>
        <input type="submit" id="submit" value="Calculate Time" />
      </form>
    );
  },
  handleSubmit(e) {
    e.preventDefault();
    let transitData = {};
    if (this.state.location) {
      transitData.currentLocation = this.state.location;
    } else {
      transitData.currentLocation = this.refs.currentLocation.value;
    }
    transitData.destinations = this.refs.newLocation.value;
    transitData.transit_modes = this.getTransitMethods();
    store.user.getTraveltime(transitData)
    .then((transitDataResponse) => {
      let timerValue = Number(this.refs.minutes.value) + (Number(this.refs.hours.value) * 60);
      this.setState({
        timerValue,
        transitDataResponse
      });
      store.timers.createTransitTimers(this.state)
      .then(() => {
        console.log('all data saved!');
        console.log(store.timers);
      });
    })
    .catch(() => {
      alert('not retreived');
    });
  },
  handleTime(measure, value) {
    var state={};
    state[measure] = value;
    this.setState(state);
  },
  getCurrentLocation(e) {
    e.preventDefault();
    store.user.translateCurrentLocation()
    .then((positionData) => {
      this.setState({ location: positionData });
      this.refs.currentLocation.value = 'Current Location';
    })
    .catch(() => {
      console.log('data not retrieved');
    });
  },
  getTransitMethods() {
    let transitMethods = ['walking', 'bicycling', 'driving'];
    return transitMethods.filter((method) => {
      if (this.refs[method].checked) {
        return method;
      }
    });
  },
  renderTimers() {
    console.log('this will show the timers on the same screen');
  }
});
