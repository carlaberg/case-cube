import styled from 'styled-components';
import { tabletPortrait } from '../../../../styles/breakpoints';

export const Wrapper = styled.div`
  position: relative;
`
export const Image = styled.img`
  width: 100%;
`
export const TextContainer = styled.div`
  background: var(--white);
  padding: var(--gutter-20) 0 0 0;
  position: relative;
  z-index: 1;
  
  @media (min-width: ${ tabletPortrait }) {
    width: 400px;
    float: right;
    margin-right: var(--gutter-40);
    margin-top: -100px;
    padding: var(--gutter-40);
  }
`