import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--gutter-20) 0;
  margin: 0 var(--horizontal-padding);
  font-family: 'maaxregular';
  font-size: var(--xxsmall);
  text-transform: uppercase;
  letter-spacing: 1.4px;
  color: var(--light-grey);
  flex-shrink: 0;
  z-index: 1;
  ${ props => props.page !== '/' && 'border-top: 1px solid var(--ultra-light-grey)'};
  
  a, a:hover, a:active, a:visited {
    color: var(--light-grey);
  }
`

export const GitHub = styled.a`
  display: inline-block;
`

export const CopyRight  = styled.span`
  display: inline-block;
`