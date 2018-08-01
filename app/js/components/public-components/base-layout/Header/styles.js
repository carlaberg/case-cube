import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Wrapper = styled.header`
  padding: var(--gutter-20) var(--horizontal-padding);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1;
  flex-shrink: 0;
  letter-spacing: 1.4px;
  
  svg {
    width: 100%;
    height: 100%;
  }
`

export const ContactLabel = styled.span`
  display: inline-block;
  text-transform: uppercase;
  font-size: var(--xsmall);
  font-family: 'maaxregular';
  color: var(--black);
`

export const HeaderLink = styled(Link)`
  display: block;
  width: 40px;
  
`