import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ButtonWrapper, ButtonText } from './styles';
import themes from './themes';

const Button = ({ text, theme }) => (
  <ThemeProvider theme={ themes[ theme ] }>
    <ButtonWrapper>
      <ButtonText>{ text }</ButtonText>
    </ButtonWrapper>    
  </ThemeProvider>
)

Button.defaultProps = {
  theme: "light"
}

export default Button;