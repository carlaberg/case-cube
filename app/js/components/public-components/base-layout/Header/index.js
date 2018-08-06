import React, { Component } from 'react';
import { Wrapper, ContactLabel, HeaderLink } from './styles';
import { Spring } from 'react-spring';
import Icon from '../../../generic-components/Icon';

class Header extends Component {
    state = { mounted: false }
  
    componentDidMount() {
      this.setState({
        mounted: true
      })
    }
    
    render() {
      const { mounted } = this.state;
        return (
          <Spring
            native
            from={{ y: -100 }}
            to={{ y: mounted ? 0 : -100 }}
            config={{ tension: 1, friction: 10 }}
          >
            { ({ y }) => (
              <Wrapper 
                style={{
                  transform: y.interpolate( y => `translate3d(0px, ${y}px, 0px)`)
                }}
              >
                <HeaderLink to="/"><Icon name="cube" /></HeaderLink>
                <ContactLabel>Contact</ContactLabel>
              </Wrapper>  
            )}
          </Spring>
        )
    }
}

export default Header;