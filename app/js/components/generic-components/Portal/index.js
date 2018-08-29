import React, { Component } from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal');

class Portal extends Component {
  render() {
    return ReactDOM.createPortal(
      this.props.children,
      modalRoot
    )
  }
}

export default Portal;