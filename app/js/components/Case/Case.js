import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Case.scss';

class Case extends React.Component {
  render() {
    const _case = (this.props.cases && this.props.cases.cases && this.props.cases.cases[this.props.match.params.title]) || {};
    return (
      <div className="case">
        {_case.title || 'bulle'}
      </div>
    );
  }
}

export default Case;
