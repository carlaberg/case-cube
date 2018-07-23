import styled from 'styled-components';
import { tabletPortrait, desktop, desktopLarge } from '../../../../styles/breakpoints';

export const SectionTag = styled.section`
  width: 100%;
  padding: var(--gutter-20);
  
  @media (min-width: ${ tabletPortrait }) {
    padding: var(--gutter-40);
  }
`

export const SectionHeader = styled.div`
  display: none;
  
  .left, .right {
    font-family: 'maaxbold';
    font-size: var(--large);
    color: var(--black);
    
  }
  
  .left {
    flex: var(--left-col);
  }
  
  .right {
    display: none;
    flex-basis: var(--right-col);
    
    @media (min-width: ${desktop}) {
      display: block;
    }
    
    @media (min-width: ${ desktopLarge }) {
      flex-basis: var(--right-col-desktop-large);
    }
  }
  
  .center {
    width: 50%;
  }
  
  @media (min-width: ${tabletPortrait}) {
    display: flex;
  }
`

export const SectionInner = styled.div`
  display: flex;
  
  &:before, &:after {
    display: none;
    
    @media (min-width: ${tabletPortrait}) {
      display: block;
    }
  }
  
  &:before {
    margin-right: 40px;
    content: '26/3-2018';
    height: auto;
    flex: auto;
    border-top: 1px solid var(--light-grey);
    font-family: 'maaxregular';
    font-size: var(--xsmall);
    color: var(--black);
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
`

export const SectionContent = styled.div`
  width: 100%;
  
  @media (min-width: ${ tabletPortrait }) {
    width: 80%;
  }
  
  @media (min-width: ${ desktop }) {
    width: 55%;
  }
  
  @media (min-width: ${ desktopLarge }) {
    width: 45%;
  }
  
`