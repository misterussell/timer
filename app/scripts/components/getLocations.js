import React from 'react';

import NumberInput from './numberInput';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      location: '',
      hours: 0,
      minutes: 0,
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
        <NumberInput
          className="hours timevalue"
          measure={ 'hours' }
          value={ this.state.hours }
          callBack={ this.handleTime } />
        <NumberInput
          className="minutes timevalue"
          measure={ 'minutes' }
          value={ this.state.minutes }
          callBack={ this.handleTime } />
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
      let timerValue = Number(this.state.minutes) + (Number(this.state.hours) * 60);
      this.setState({
        timerValue,
        transitDataResponse
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
  }
});
