import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
`

export const InnerWrapper = styled.div`
  height: auto;
  overflow: hidden;
  transition: height var(--expo-out-medium);
  background: white;
  
  @media (min-width: ${ props => props.collapsableAt }) {
    height: ${props => props.isOpen ? props.contentHeight + "px" : props.initialHeight + "px"};
  }
`

export const ContentContainer = styled.div``

export const Toggler = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(calc(50% - 5px));
  height: 40px;
  width: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--black);
  color: var(--white);
  font-family: 'maaxregular';
  font-size: 20px;
  box-shadow: 0px 0px 40px 20px rgba(255,255,255,1);
  
  span {
    margin-top: -1px;
    margin-left: 1px;
    transform: ${ props => props.isOpen ? "rotate(405deg)" : "rotate(0)" };
    transition: transform var(--expo-out-medium);
  }
`

export const Gradient = styled.div`
  display: none;
  height: var(--gutter-40);
  width: 400px;
  background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,0.75) 15%,rgba(255,255,255,1) 100%);
  position: absolute;
  bottom: 0;
  transform: ${props => props.isOpen ? 'translateX(-40px) translateY(50px)' : 'translateX(-40px)'}; 
  z-index: 0;
  transition: transform var(--expo-out-medium);
  
  @media (min-width: ${ props => props.collapsableAt }) {
    display: block;
  }
`