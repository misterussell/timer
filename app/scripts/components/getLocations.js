import React from 'react';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      position: ''
    };
  },
  render() {
    return (
      <form className="get-locations" onSubmit={this.handleSubmit}>
        <input type="text" ref="currentLocation" className="new-form-input" id="first-name" placeholder="Your Location" />
        <button className="locator-button" onClick={ this.getCurrentPosition }>Get Current Location</button>
        <input type="text" ref="newLocation" className="new-form-input" id="last-name" placeholder="Where do you need to be?" />
        <input type="checkbox" ref="walking" id="method-walk" className="travel-method" value="walk" /> <label htmlFor="method-walk">Walk</label>
        <input type="checkbox" ref="bicycling" id="method-bike" className="travel-method" value="bike" /> <label htmlFor="method-bike">Bike</label>
        <input type="checkbox" ref="bus" id="method-bus" className="travel-method" value="bus" /> <label htmlFor="method-bus">Bus</label>
        <input type="checkbox" ref="driving" id="method-drive" className="travel-method" value="drive" /> <label htmlFor="method-drive">Drive</label>
        <input type="submit" id="submit" value="Get Distance" />
      </form>
    );
  },
  handleSubmit(e) {
    e.preventDefault();
    let transitData = {};
    if (this.state.position) {
      transitData.currentLocation = this.state.position;
    } else {
      transitData.currentLocation = this.refs.currentLocation.value;
    }
    transitData.destinations = this.refs.newLocation.value;
    transitData.travelMethods = this.getTransitMethods();
    store.user.getTraveltime(transitData);
  },
  getCurrentPosition(e) {
    e.preventDefault();
    store.user.translateCurrentLocation()
    .then((position) => {
      this.setState({ position });
      this.refs.currentLocation.value = 'Current Location';
    })
    .catch(() => {
      console.log('data not retrieved');
    });
  },
  getTransitMethods() {
    let transitMethods = ['walking', 'bicycling', 'bus', 'driving'];
    return transitMethods.filter((method) => {
      if (this.refs[method].checked) {
        return method;
      }
    });
  }
});
