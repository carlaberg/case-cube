import styled  from 'styled-components';
import { tabletPortrait, desktop, desktopLarge } from '../../../../../styles/breakpoints';

export const SectionTag = styled.section`
  width: 100%;
  padding: var(--gutter-20);
  background: ${ props => props.theme.backgroundColor };
  color: ${ props => props.theme.textColor };
  display: flex;
  align-items: center;
  
  @media (min-width: ${ tabletPortrait }) {
    min-height: ${ props => props.height };
    padding: ${props => props.padding || 'var(--gutter-40)'};
    padding-bottom: var(--gutter-80);
  }
`

export const CenterVerticallyContainer = styled.div`
  width: 100%;
`

export const SectionHeader = styled.div`
  display: none;
  height: var(--gutter-40);
  
  .left, .right {
    font-family: 'maaxbold';
    font-size: var(--large);
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
  
  &:after {
    display: none;
    
    @media (min-width: ${tabletPortrait}) {
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
`
export const SectionLeft = styled.div`
  display: none;
  margin-right: 40px;
  height: auto;
  flex: auto;
  border-top: 1px solid ${ props => props.theme.hrColor };
  font-family: 'maaxregular';
  font-size: var(--xsmall);
  
  @media (min-width: ${tabletPortrait}) {
    display: block;
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

export const SectionTitle = styled.h2`
  font-family: "maaxbold",cursive;
  font-size: var(--medium);
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-bottom: var(--gutter-40);
  
  @media (min-width: ${ tabletPortrait }) {
    transform: translateY(-3px);
    margin-bottom: var(--gutter-80);
  }
`