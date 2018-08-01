import styled from 'styled-components';
import { tabletPortrait, desktop, desktopLarge } from '../../../../styles/breakpoints';

export const Hero = styled.div`
  width: 100%;
  padding: var(--gutter-20);
  padding-top: 0;
  
  @media (min-width: ${ tabletPortrait }) {
    padding: var(--gutter-40);
    padding-top: 0;
  }
  
  .hero__inner {
    display: flex;
    
    &:before {
      margin-right: 20px;
      content: '';
      display: none;
      height: auto;
      flex: var(--left-col);
      font-family: 'maaxregular';
      font-size: var(--xsmall);
      color: var(--black);
      
      @media (min-width: ${ desktop }) {
        display: block;
      }
    }
    
    &:after {
      display: none;
      margin-left: 20px;
      content: '';
      height: 50px;
      flex-basis: var(--right-col);
      
      @media (min-width: ${ desktop }) {
        display: block;
      }
      
      @media (min-width: ${ desktopLarge }) {
        flex-basis: var(--right-col-desktop-large);
      }
    }
  }
  
  .hero__content {
    width: 100%;

    @media (min-width: ${ desktop }) {
      width: 65%;
    }
    
    @media (min-width: ${ desktopLarge }) {
      width: 55%;
    }
  }
  
  .hero__logo {
    width: 40%;
    display: inline-block;
    padding-top: 10px;
    
    svg {
      max-width: 100%;
      height: 15vw;
    }
  }
  
  h1 {
    display: inline-block;
    font-family: 'maaxbold';
    font-size: var(--billboard);
    color: var(--black);
    text-transform: uppercase;
    width: calc(60% - var(--gutter-40));
    vertical-align: top;
    hyphens: auto;
    background: white;
    margin-top: -15%;
    position: relative;
    z-index: 1;
    transform: translateX(var(--gutter-20));
    padding: 20px;
    
    @media (min-width: ${ tabletPortrait }) {
      margin-top: -10%;
      padding: 40px;
      transform: translateX(var(--gutter-40));
    }
}
  }
`

export const Image = styled.div`
  margin-bottom: var(--gutter-20);
`