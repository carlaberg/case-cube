import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Case.scss';

class Case extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      case: props.cases ? props.cases[this.props.match.params.title] : ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.cases) {
      console.log(nextProps.cases[nextProps.match.params.title]);
    }

    this.setState({
      case: nextProps.cases[nextProps.match.params.title]
    });
  }
  render() {
    return (
      <div className="case">
        {this.state.case ? this.state.case.title : 'bulle'}
      </div>
    );
  }
}

export default Case;
