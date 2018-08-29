import styled from 'styled-components';

export const ContactWrapper = styled.div`
  padding: var(--gutter-40);
  background: ${ props => props.theme.backgroundColor };
  color: ${ props => props.theme.textColor };
  
  hr {
    background: ${ props => props.theme.hrColor }
  }
`