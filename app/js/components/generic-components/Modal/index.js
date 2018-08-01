import React, { Component } from 'react';
import { Transition, config } from 'react-spring';
import { ModalWrapper, Overlay, ModalContent } from './styles';

class Modal extends Component {
  render() {
    const { children, toggle, on } = this.props;
    return (
      <Transition
        native
        key={1}
        from={{ opacity: 0, y: '50px', scale: '0.5' }}
        enter={{ opacity: 1, y: '0px', scale: '1' }}
        leave={{ opacity: 0, y: '50px', scale: '0' }}
        >
          { on && 
            (styles => (
              <ModalWrapper onClick={ toggle } style={{
                 opacity: styles.opacity.interpolate( opacity => opacity )
               }}
               >
                <Overlay />
                <ModalContent style={{
                   opacity: styles.opacity.interpolate( opacity => opacity ),
                   transform: styles.y.interpolate( y => `translate3d(0, ${y}, 0)` )
                 }}
                 config={ config.fast }
                 >
                  {children()}
                </ModalContent>
              </ModalWrapper>
            ))}
      </Transition>
    )
  }
}

export default Modal;