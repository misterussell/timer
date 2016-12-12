import React from 'react';

export default React.createClass({
  getInitialState() {
    return {
      playState: null
    };
  },
  componentDidMount() {
    this.setState({ playState: this.props.playState });
  },
  render() {
    let animation = {
      'WebkitAnimation': `filler ${ this.props.timeVal }s ease-in-out ${ this.state.playState }`,
      'MozAnimation': `filler ${ this.props.timeVal }s ease-in-out ${ this.state.playState }`,
      'animation': `filler ${ this.props.timeVal }s ease-in-out ${ this.state.playState }`,
      'content': '',
      'position': 'absolute',
      'background': '#E0E6F1',
      'top': '0',
      'bottom': '0',
      'left': '0',
      'width': '100%'
    };

    return (
      <div className='progress'>
        <div style={ animation }/>
      </div>
    );

  }
});
