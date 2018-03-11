import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AdminCaseItem extends Component {

  render() {
    console.log(this.props);
    if(!this.props.caseData) {
      return ""
    }
    const { title, caseId } = this.props.caseData
    console.log(title, caseId);

    return (
      <div>
        <Link to={`/admin/cases/edit/${caseId}`}><h3>{title}</h3></Link>
      </div>
    );
  }

}

export default AdminCaseItem;
