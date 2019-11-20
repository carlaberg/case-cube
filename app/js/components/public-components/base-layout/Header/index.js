import React, { Component, Fragment } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Wrapper, Menu, MenuItem, MenuItemLink, HeaderLink } from './styles';
import { Spring } from 'react-spring';
import { logout } from '../../../../actions'
import Icon from '../../../generic-components/Icon';
import Toggle from '../../../generic-components/Toggle';
import Modal from '../../../generic-components/Modal';
import Contact from '../../../public-components/Contact';

class Header extends Component {
    state = { mounted: false }
  
    componentDidMount() {
      this.setState({
        mounted: true
      })
    }
    
    render() {
      const { mounted } = this.state
      const { history } = this.props
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
                    <MenuItem><MenuItemLink to="/resume">Resume</MenuItemLink></MenuItem>
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
                    {history.location.pathname.startsWith('/admin') && <MenuItem onClick={() => logout(() => history.push('/'))}>Log out</MenuItem>}
                  </ul>
                </Menu>
              </Wrapper>
            )}
          </Spring>
        )
    }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: (callback) => {
      dispatch(login(callback))
    }
  }
}

export default compose(
  withRouter,
  connect(null, mapDispatchToProps)
)(Header)