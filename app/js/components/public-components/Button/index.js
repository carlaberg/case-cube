import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ButtonWrapper, ButtonText } from './styles';
import themes from './themes';

const Button = ({ text, theme, className, onClick }) => (
  <ThemeProvider theme={ themes[ theme ] }>
    <ButtonWrapper className={className} onClick={onClick}>
      <ButtonText>{ text }</ButtonText>
    </ButtonWrapper>    
  </ThemeProvider>
)

Button.defaultProps = {
  theme: "light"
}

export default Button;