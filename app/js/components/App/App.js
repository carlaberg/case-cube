import React from "react";

import Admin from "../Admin";
import SingleCase from "../SingleCase/SingleCase";
import ShowCaseData from "../ShowCaseData/ShowCaseData";
import * as api from "../../apiFetchFunctions";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

export default class App extends React.Component {
constructor(props){
  super(props);
  this.state = {
      cases: [],
      isSelected: null
  }

  this.selectCase = this.selectCase.bind(this);
  this.handleCase = this.handleCase.bind(this);
}

componentDidMount() {
  api.getCases()
    .then(response => {
      this.setState({cases: response.reverse()})
    })
}

  selectCase(caseObject) {

    this.setState({isSelected: caseObject});
  }

  handleCase(caseData) {
    api.addCase(caseData)
      .then(response => {
        this.setState({
          cases: [ response, ...this.state.cases ]

        })
      })
  }
  updateCase(caseData) {
    console.log(caseData);
    // api.updateCase(caseData)
    //   .then(response => {
    //     this.setState({
    //       cases: [ response, ...this.state.cases ]
    //
    //     })
    //   })
  }

  render() {
    // console.log(this.state.cases);
    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" render={props => <ShowCaseData caseData={this.state.cases} {...props} />} />
            <Route exact path="/admin" render={props => <Admin isSelected={this.state.isSelected} selectCase={this.selectCase} cases={this.state.cases} handleCase={this.handleCase} {...props} />} />
            <Route path="/:title" render={props => <SingleCase caseData={this.state.cases} {...props} />} />
          </Switch>
        </div>
      </Router>



    )
  }
}
