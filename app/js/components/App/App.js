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
  constructor(props){
    super(props);
    this.state = {
        cases: [],
        isSelected: null
    }
  }

  componentDidMount() {
    this.props.fetchCases();

    api.getCases()
      .then(response => {
        this.setState({cases: response.reverse()})
      })
  }

  render() {
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={props => <ShowCaseData caseData={this.state.cases} {...props} />} />
            <Route exact path="/admin/cases" render={props => <Admin cases={this.state.cases} {...props} />} />
            <Route path="/admin/cases/edit/:title" render={props => <EditCase {...props} />} />
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchCases}, dispatch);
}

export default connect(null, mapDispatchToProps)(App)
