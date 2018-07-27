import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCases } from '../../../actions';
import AddCase from "../AddCase";
import ShowCaseData from "../ShowCaseData";
import "./Admin.scss";

class Admin extends Component {
  componentDidMount() {
    this.props.fetchCases();
  }
  
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

const mapStateToProps = state => {
  return { cases: state.cases };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchCases }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)

