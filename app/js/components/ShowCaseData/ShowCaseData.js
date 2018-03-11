import React, { Component } from "react";
import "./ShowCaseData.scss";
import AdminCaseItem from "../AdminCaseItem";

export default class ShowCaseData extends Component {
  constructor(props) {
    super(props);
    this.renderCaseItem = this.renderCaseItem.bind(this);
  }
  renderCaseItem () {
    return (
      this.props.cases.map(item => <AdminCaseItem  key={item._id} caseData={item}/>)
    )
  }

  render() {
    console.log(this.props);
    return (
      <div className="show-case-data">

       <h1>Mina Case</h1>

       {this.props.cases ? this.renderCaseItem() : ""}
      </div>
    )
  }
}
