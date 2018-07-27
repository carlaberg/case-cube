import styled from 'styled-components';

export const ButtonWrapper = styled.button`
   padding: 10px;
   border: 3px solid ${ props => props.theme.borderColor };
`

export const ButtonText = styled.span`
  font-family: 'maaxbold';
  font-size: var(--small);
  color: ${ props => props.theme.textColor }
`