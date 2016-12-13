import React from 'react';

import NumberInput from './numberInput';
import ActiveTimer from './activeTimer';
import FailedTravelOption from './failedTravelOption';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      location: '',
      timeConstraint: 0,
      transitDataResponse: {},
      timers: []
    };
  },
  render() {
    let timers = null;
    timers = this.state.timers.map((timer, i) => {
      if (this.state.timeConstraint - timer.timerValue > 0) {
        return <ActiveTimer key={ timer.objectId } timer={ timer } timeConstraint={ this.state.timeConstraint } mobilityTemplate={ true } />;
      } else {
        return <FailedTravelOption key={ timer.objectId } timer= { timer } timeConstraint={ this.state.timeConstraint } />;
      }
    });
    return (
      <div className="mobility-timer-search">
        <form className="get-locations" onSubmit={this.handleSubmit}>
        <input type="text"
          ref="currentLocation"
          className="new-form-input origin"
          id="first-name"
          placeholder="Your Location" />
        <button className="locator-button"
          onClick={ this.getCurrentLocation }>
          <i className="fa fa-compass" aria-hidden="true"></i>
        </button>
        <input type="text"
          ref="newLocation"
          className="new-form-input destination"
          id="last-name"
          placeholder="Destination (Full address)" />
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
        <h3>How long until you have to be there?</h3>
        <input
          type="text"
          className="hours timevalue"
          ref="hours"
          placeholder="Hours" />
        <input
          type="text"
          className="minutes timevalue"
          ref="minutes"
          placeholder="Minutes" />
        <input type="submit" id="submit" value="Calculate Timers" />
        </form>
      { timers }
      </div>
    );
  },
  handleSubmit(e) {
    e.preventDefault();
    let transitData = {};
    if (this.state.location) {
      //conditional statement that allows either a geoLocated browswer location, or a ref based input
      transitData.currentLocation = this.state.location;
    } else {
      transitData.currentLocation = this.refs.currentLocation.value;
    }
    transitData.destinations = this.refs.newLocation.value;
    transitData.transit_modes = this.getTransitMethods();
    store.user.getTraveltime(transitData)
    .then((transitDataResponse) => {
      // this promise verifies that the api call to googles distance API was succesful and that there is now a timer value to calculate against
      let timeConstraint = Number(this.refs.minutes.value) + (Number(this.refs.hours.value) * 60);
      this.setState({
        timeConstraint,
        transitDataResponse
      });
      store.timers.createTransitTimers(this.state)
      .then((timers) => {
        //this promise verifies that the data was successfully added to backendless so that it can be used in the future
        console.log('all data saved!');
        this.setState({ timers });
      })
      .catch(() => {
        alert('Error, please try to create timers again.');
      });
    })
    .catch(() => {
      alert('Data not retreived from Google API, please try again.');
    });
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
});
