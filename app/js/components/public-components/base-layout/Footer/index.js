import React from 'react';
import { Footer, FooterContent } from './styles';
import Button from '../base-layout/Footer';
import themes from '../base-layout/themes';

const Footer = props => (
  <Footer>
    <FooterContent>
      <Button text="Previous" />
      <Button text="Next" />
    </FooterContent>
  </Footer>
)

export default Footer;