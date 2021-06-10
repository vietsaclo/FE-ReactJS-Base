import React, { Component } from 'react';
import { connect } from 'react-redux';

var loadjs = require('loadjs');

class Home extends Component {
  constructor(props) {
    super(props);
    this.dispatch = this.props.dispatch;
  }

  componentWillMount() {
    loadjs('/js/mycustom.js');
  }

  render() {
    return (
      <>
        Hello World!
      </>
    );
  }
}

const mapStateToProps = (state, _ownProps) => {
  return {
    user: state.user.user,
  }
}

export default connect(mapStateToProps)(Home);