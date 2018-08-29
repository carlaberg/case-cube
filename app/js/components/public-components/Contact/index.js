import React from 'react';
import InfoList from '../InfoList';
import info from './info';
import themes from './themes';
import { ThemeProvider } from 'styled-components';
import { ContactWrapper } from './styles';

const Contact = ({ theme }) => {
  return (
    <ThemeProvider theme={ themes[ theme ]}>
      <ContactWrapper>
        <InfoList info={ info } theme='light' />
      </ContactWrapper>
    </ThemeProvider>  
  )
}

export default Contact;