import React, { Component, Fragment } from 'react';
import { Wrapper, Menu, MenuItem, MenuItemLink, HeaderLink } from './styles';
import { Spring } from 'react-spring';
import Icon from '../../../generic-components/Icon';
import Toggle from '../../../generic-components/Toggle';
import Modal from '../../../generic-components/Modal';
import Contact from '../../../public-components/Contact';
import Resume from '../../../public-components/Resume';

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
                <Menu>
                  <ul>
                    <Toggle>
                      {({ on, toggle }) => {
                        return (
                          <Fragment>
                            <MenuItem onClick={ toggle }>Resume</MenuItem>
                            <Modal toggle={ toggle } on={ on }>
                              {() => (
                                <Resume />
                              )}
                            </Modal>
                          </Fragment>
                        )
                      }}
                    </Toggle>
                    <Toggle>
                      {({ on, toggle }) => {
                        return (
                          <Fragment>
                            <MenuItem onClick={ toggle }>Contact</MenuItem>
                            <Modal toggle={ toggle } on={ on }>
                              {() => (
                                <Contact theme="light" />
                              )}
                            </Modal>
                          </Fragment>
                        )
                      }}
                    </Toggle>
                  </ul>
                </Menu>
              </Wrapper>  
            )}
          </Spring>
        )
    }
}

export default Header;