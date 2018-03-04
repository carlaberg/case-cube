import React, { Component } from 'react';
import AddCase from "../AddCase";
import ShowCaseData from "../ShowCaseData";
import "./Admin.scss";
import UpdateCase from "../UpdateCase";
import UpdateCase2 from "../UpdateCase2";

class Admin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      heroSrc: "",
      casePicsSrc: []
    }

    this.setCasePicsSrc = this.setCasePicsSrc.bind(this);
  }

  setCasePicsSrc(id, url) {

    if(id.startsWith("case-image")) {

      const item = this.state.casePicsSrc.findIndex(pic => pic.id === id);
      // console.log(item);
      if(item === -1){
        this.setState({
          casePicsSrc: [
            ...this.state.casePicsSrc,
            { id, url }
          ]
        })
      } else {
        this.setState({
          casePicsSrc: [
            ...this.state.casePicsSrc.slice(0, item),
            Object.assign({}, this.state.casePicsSrc[item], { url }),
            ...this.state.casePicsSrc.slice(item+1)
          ]
        })

      }


    } else {

      this.setState({
        heroSrc: url
      })
    }




  }

  render() {
    // console.log(this.props);
    return (
      <div className="container admin">
        <div className="row">
          <div className="col-6">
            <ShowCaseData {...this.props} />
          </div>
          <div className="col-6">

            {this.props.isSelected !== null ? <UpdateCase2 heroSrc={this.state.heroSrc} setCasePicsSrc={this.setCasePicsSrc} caseData={this.props.isSelected} {...this.props} /> : <AddCase setCasePicsSrc={this.setCasePicsSrc} casePicsSrc={this.state.casePicsSrc} heroSrc={this.state.heroSrc} handleCase={this.props.handleCase} />}
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
