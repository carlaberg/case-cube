import React, { Component } from 'react';
import AddCase from "../AddCase";
import ShowCaseData from "../ShowCaseData";
import "./Admin.scss";

class Admin extends Component {
  render() {
    return (
      <div className="container admin">
        <div className="row">
          <div className="col-6">
            <ShowCaseData cases={this.props.cases} />
          </div>
          <div className="col-6">
            <AddCase {...this.props} />
          </div>
        </div>
      </div>
    );
  }
}

Admin.defaultProps = {
  isSelected: null
}

export default Admin;
