import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCases } from '../../actions';
import { animationPromise, setAnimationState } from '../../utils/helpers';
import { Transition } from 'react-spring';
import Admin from "../admin-components/Admin";
import ScrollToTop from "../generic-components/ScrollToTop";
import ShowCaseData from "../admin-components/ShowCaseData/ShowCaseData";
import EditCase from "../admin-components/EditCase/EditCase";
import Home from '../public-components/Home';
import Case from '../public-components/Case';
import Header from '../public-components/base-layout/Header';
import Footer from '../public-components/base-layout/Footer';
import * as api from "../../apiFetchFunctions";
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from "react-router-dom";
import { SiteContainer, ContentContainer } from './styles';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchCases();
  }
  
  render() {
    return (
      <Router>
        <Route render={ ({ location }) => (
          <ScrollToTop>
            { console.log(location.pathname)}
            <SiteContainer>
              <Header key={ location.pathname}/>
              <ContentContainer> 
                  <Transition
                    native
                    key={location.key}
                    from={{ opacity: 0, scale: 0 }}
                    enter={{ opacity: 1, scale: 1 }}
                    leave={{ opacity: 0, scale: 0 }}
                  >
                    {style => (
                      <Switch location={ location }>
                        <Route exact path="/" render={props => Home({ ...props, style })} />
                        <Route path="/cases/:slug" render={props => <Case { ...props } />} />
                        <Route exact path="/admin/cases" render={props => <Admin { ...props } />} />
                        <Route path="/admin/cases/edit/:title" render={props => <EditCase { ...props } />} />
                      </Switch>  
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
