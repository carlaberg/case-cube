import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminCaseItem extends Component {

  render() {
    if(!this.props.caseData) {
      return ""
    }
    const { title, caseId } = this.props.caseData

    return (
      <div>
        <Link to={`/admin/cases/edit/${caseId}`}><h3>{title}</h3></Link>
      </div>
    );
  }

}

export default AdminCaseItem;
