import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCases } from '../../actions';
import Admin from "../admin-components/Admin";
import ShowCaseData from "../admin-components/ShowCaseData/ShowCaseData";
import EditCase from "../admin-components/EditCase/EditCase";
import Home from '../public-components/Home';
import Case from '../public-components/Case';
import * as api from "../../apiFetchFunctions";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { SiteContainer } from './styles';

class App extends React.Component {
  componentDidMount() {
    this.props.fetchCases();
  }

  render() {
    return (
      <Router>
        <SiteContainer>
          <Link to="/">Hem</Link>
          <Link to="/admin/cases">Admin</Link>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cases/:title" render={props => <Case {...props} />} />
            <Route exact path="/admin/cases" render={props => <Admin {...props} />} />
            <Route path="/admin/cases/edit/:title" render={props => <EditCase {...props} />} />
          </Switch>
        </SiteContainer>
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
