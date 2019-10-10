import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { animated } from 'react-spring';

export const Wrapper = styled(animated.header)`
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

export const Menu = styled.nav``

export const MenuItem = styled.li`
  display: inline-block;
  text-transform: uppercase;
  font-size: var(--xsmall);
  font-family: 'maaxregular';
  color: var(--black);
  cursor: pointer;
  margin-right: 2rem;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    text-decoration: underline;      
  }
`

export const HeaderLink = styled(Link)`
  display: block;
  width: 40px;
`

export const MenuItemLink = styled(Link)`
  color: black;
  text-decoration: none;

  &:hover {
    color: black;
    text-decoration: none;      
  }
`