import React from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCases } from '../../actions';

import Admin from "../Admin";
import ShowCaseData from "../ShowCaseData/ShowCaseData";
import EditCase from "../EditCase/EditCase";
import * as api from "../../apiFetchFunctions";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class App extends React.Component {
  componentDidMount() {
    this.props.fetchCases();
  }

  render() {
    console.log(this.props);
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={props => <ShowCaseData caseData={this.props.cases} {...props} />} />
            <Route exact path="/admin/cases" render={props => <Admin cases={this.props.cases} {...props} />} />
            <Route path="/admin/cases/edit/:title" render={props => <EditCase {...props} />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = state => {
  const cases = Object.keys(state.cases).map(item => {
    return state.cases[item]

  })
  
  return {
    cases
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchCases }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
