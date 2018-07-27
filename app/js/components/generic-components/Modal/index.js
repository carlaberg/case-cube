import React, { Component } from 'react';
import { ModalWrapper, Overlay, ModalContent } from './styles';

class Modal extends Component {
  render() {
    const { children, toggle } = this.props;
    return (
      <ModalWrapper onClick={ toggle }>
        <Overlay />
        <ModalContent>
          {children()}
        </ModalContent>
      </ModalWrapper>
    )
  }
}

export default Modal;