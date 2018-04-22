import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import cube from './cube';

class CaseCube extends Component {
  componentDidMount() {
    cube(this.caseCube, this.props.history);
  }

  render() {
    console.log(this.props);
    return <div ref={caseCube => this.caseCube = caseCube} className="case-cube">Case Cube</div>
  }
}

export default withRouter(CaseCube);
