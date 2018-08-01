import styled from 'styled-components';
import { animated } from 'react-spring';

export const ModalWrapper = styled(animated.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9998;
`

export const Overlay= styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.8);
`

export const ModalContent = styled(animated.div)`
  position: relative;
  max-width: 60vw;
  max-height: 80vh; 
  overflow: hidden;
  z-index: 9999;
`