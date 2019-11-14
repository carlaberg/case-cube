import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { CanvasWrapper } from './styles';

class CaseCube extends Component {
  constructor(props) {
    super(props);
    
  }
  
  componentDidMount() {
    import(/* webpackChunkName: "cube" */ './cube')
      .then(({ default: cube }) => {
        this.cube = cube(this.caseCube, this.props.history);
        this.cube.init();
        this.cube.addListeners();
      })
  }
  
  componentWillUnmount() {
    this.cube.removeListeners();
  }

  render() {
    return (
        <CanvasWrapper ref={caseCube => this.caseCube = caseCube} className="case-cube"></CanvasWrapper>
    )
  }
}

export default withRouter(CaseCube);
