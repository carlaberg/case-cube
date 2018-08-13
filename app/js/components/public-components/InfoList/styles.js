import styled from 'styled-components';
import { tabletPortrait } from '../../../../styles/breakpoints';

export const List = styled.div`

`

export const ListItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  @media (min-width: ${ tabletPortrait }) {
    flex-direction: row;
  }
`

export const Category = styled.div`
  font-family: "maaxbold";
  font-size:  var(--small);
  letter-spacing: 4px;
  
  @media (min-width: ${ tabletPortrait }) {
    width: 200px;
    display: inline-block;
    flex-shrink: 0;
  }
`

export const ListEntry = styled.div`
  font-family: "maaxregular";
  font-size:  var(--xsmall);
  letter-spacing: 2px;
  
  @media (min-width: ${ tabletPortrait }) {
    width: auto;
    display: inline-block;
  }
`

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background: ${ props => props.theme.hrColor };
  width: var(--gutter-40);
  margin-left: 0;
`