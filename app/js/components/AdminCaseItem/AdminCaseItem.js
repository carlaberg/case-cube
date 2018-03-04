import React, { Component } from 'react';

class AdminCaseItem extends Component {
  constructor(props){
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  onClick() {
    this.props.onClick(this.props.caseData);
  }

  render() {

    return (
      <div>
        <h3 onClick={this.onClick}>{this.props.caseData.title}</h3>
      </div>
    );
  }

}

export default AdminCaseItem;
