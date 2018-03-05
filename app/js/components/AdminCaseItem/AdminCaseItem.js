import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminCaseItem extends Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.onClick(this.props.caseData);
  }

  render() {
    console.log(this.props);
    const { title, caseId } = this.props.caseData

    return (
      <div>
        <Link to={`/admin/cases/edit/${caseId}`}><h3 onClick={this.onClick}>{title}</h3></Link>
      </div>
    );
  }

}

export default AdminCaseItem;
