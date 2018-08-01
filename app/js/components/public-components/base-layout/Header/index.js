import React from 'react';
import { Wrapper, ContactLabel, HeaderLink } from './styles';
import Icon from '../../../generic-components/Icon';

const Header = props => (
    <Wrapper>
        <HeaderLink to="/"><Icon name="cube" /></HeaderLink>
        <ContactLabel>Contact</ContactLabel>
    </Wrapper>
)

export default Header;