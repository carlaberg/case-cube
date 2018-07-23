import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCases } from '../../actions';
import Admin from "../Admin";
import ShowCaseData from "../ShowCaseData/ShowCaseData";
import EditCase from "../EditCase/EditCase";
import Home from '../Home';
import Case from '../Case';
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
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/cases/:title" render={props => <Case cases={this.props.cases} {...props} />} />
            <Route exact path="/admin/cases" render={props => <Admin cases={this.props.cases} {...props} />} />
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
