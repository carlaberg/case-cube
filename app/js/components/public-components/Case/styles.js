import styled from 'styled-components';
import { animated } from 'react-spring';

export const CaseWrapper = styled(animated.div)`
  width: 100%;
  top: 0;
  left: 0;
  transform-origin: top;
`

export const ExpandingCircle = styled.div`
  border-radius: 50%;
  position: fixed;
  bottom: -100vw;
  right: -100vw;
  height: 200vw;
  width: 200vw;
  transform: scale(0);
  background-color: black;
  transform-origin: center;
  z-index: 2;
  transition: transform 1s var(--ease-out-expo), background-color 1s var(--ease-out-expo);
  opacity: 0;
`
export const CaseContent =  styled(animated.div)`
  position: relative;
  z-index: 2;
`

export const CaseNavigation = styled.div`
  display: flex; 
  justify-content: space-between;
`