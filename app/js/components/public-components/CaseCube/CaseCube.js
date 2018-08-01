import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CanvasWrapper } from './styles';
import cube from './cube';

class CaseCube extends Component {
  componentDidMount() {
    cube(this.caseCube, this.props.history);
  }

  render() {
    return (
        <CanvasWrapper innerRef={caseCube => this.caseCube = caseCube} className="case-cube"></CanvasWrapper>
    )
  }
}

export default withRouter(CaseCube);
