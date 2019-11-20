import React, { Suspense, lazy } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCases } from '../../actions'
import { Transition } from 'react-spring'
import Admin from "../admin-components/Admin"
import ScrollToTop from "../generic-components/ScrollToTop"
import EditCase from "../admin-components/EditCase/EditCase"
import Home from '../public-components/Home'
import Case from '../public-components/Case'
const Resume = lazy(() => import(/* webpackChunkName: "resume" */'../public-components/Resume'));
import Header from '../public-components/base-layout/Header'
import Footer from '../public-components/base-layout/Footer'
import LoginPage from '../public-components/LoginPage'
import AuthRequired from '../public-components/AuthRequired'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { SiteContainer, ContentContainer } from './styles'

class App extends React.Component {
  componentDidMount() {
    this.props.fetchCases();
  }
  
  render() {

    return (
      <Router>
        <Route render={ ({ location }) => (
          <ScrollToTop>
            <SiteContainer>
              <Header location={location} key={location.pathname}/>
              <ContentContainer> 
                  <Transition
                    native
                    key={location.key}
                    from={{ opacity: 0, scale: 0 }}
                    enter={{ opacity: 1, scale: 1 }}
                    leave={{ opacity: 0, scale: 0 }}
                    config={{ tension: 1, friction: 8 }}
                  >
                    {style => (
                      <Suspense fallback={<div>Loading...</div>}>
                        <Switch location={ location }>
                          <Route exact path="/" render={props => Home({ ...props, style })} />
                          <Route exact path="/resume" component={Resume} />
                          <Route exact path="/login" component={LoginPage} />
                          <Route path="/cases/:slug" render={props => <Case { ...props } />} />
                          <AuthRequired>
                            <Route exact path="/admin/cases" render={props => <Admin { ...props } />} />
                            <Route path="/admin/cases/edit/:title" render={props => <EditCase { ...props } />} />
                          </AuthRequired>
                        </Switch>  
                      </Suspense>
                    )}
              </Transition>  
              </ContentContainer>
              <Footer />
            </SiteContainer>
          </ScrollToTop>
        )} />
      </Router>
    )
  }
}

const mapStateToProps = state => {
  return { cases: state.cases };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchCases }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
