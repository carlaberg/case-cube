import React from 'react';
import { FooterWrapper, GitHub, CopyRight } from './styles';
import { withRouter } from 'react-router-dom';

const Footer = props => {
  return (
      <FooterWrapper page={props.location.pathname}>
          <GitHub href="https://github.com/carlaberg">GitHub</GitHub>
          <CopyRight>Carl Åberg 2018</CopyRight>
      </FooterWrapper>
  )
}

export default withRouter(Footer);