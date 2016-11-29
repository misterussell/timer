import React from 'react';
import { browserHistory } from 'react-router';

import Nav from './nav';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      auth: store.user.get('auth')
    };
  },
  componentDidMount() {
    store.user.on('update change', () => {
      this.setState({auth: store.user.get('auth')});
    });
  },
  render() {
    return (
      <div className='all-content'>
        <Nav auth={ this.state.auth } />
        {this.props.children}
      </div>
    );
  }
});
