import styled from 'styled-components';

export const ButtonWrapper = styled.button`
  padding: 10px;
  border: 3px solid ${ props => props.theme.borderColor };
  min-width: 200px;
  outline: none;
  
  &:focus {
    outline: none;
  }
`

export const ButtonText = styled.span`
  font-family: 'maaxbold';
  font-size: var(--small);
  color: ${ props => props.theme.textColor };
  text-transform: uppercase;
  transform: translateY(1px);
  display: block;
`