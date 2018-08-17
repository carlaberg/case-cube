import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CanvasWrapper } from './styles';
import cube from './cube';

class CaseCube extends Component {
  constructor(props) {
    super(props);
    
  }
  
  componentDidMount() {
    this.cube = cube(this.caseCube, this.props.history);
    this.cube.init();
    this.cube.addListeners();
  }
  
  componentWillUnmount() {
    this.cube.removeListeners();
  }

  render() {
    return (
        <CanvasWrapper innerRef={caseCube => this.caseCube = caseCube} className="case-cube"></CanvasWrapper>
    )
  }
}

export default withRouter(CaseCube);
