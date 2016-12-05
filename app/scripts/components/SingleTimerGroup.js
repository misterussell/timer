import React from 'react';

import store from '../store';

export default React.createClass({
  getInitialState() {
    return {
      timers: {}
    };
  },
  componentWillMount () {
    let timers = store.timers.toJSON().filter((group) => {
      if (this.props.params.group.includes(group.templateName)) {
        return true;
      }
    });
    this.setState({timers});
  },
  componentDidMount() {

  },
  render() {
    return <div>This box will contain 5 timers</div> ;
  }
});
