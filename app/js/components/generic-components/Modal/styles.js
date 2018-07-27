import styled from 'styled-components';

export const ModalWrapper = styled.div`
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
  background: rgba(255,255,255,0.9);
`

export const ModalContent = styled.div`
  position: relative;
  background: var(--white);
  max-width: 60vw;
  max-height: 80vh; 
  overflow: hidden;
  z-index: 9999;
`