import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./AddCase.scss";
import * as api from "../../apiFetchFunctions";
import { addCase } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class AddCase extends React.Component  {

  constructor(props) {
    super(props);

    this.state = {
      caseImageInputs: [],
      caseImageValues: [],
      casePicsSrc: [],
      heroSrc: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImgChange = this.handleImgChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.renderCaseImgs = this.renderCaseImgs.bind(this);
  }

  componentWillReceiveProps(nextProps){

    this.setState({
      casePicsSrc: nextProps.casePicsSrc
    })
  }

  handleImgChange(event){
    event.persist();
    this.setState({caseImageValues: [...this.state.caseImageValues, event.target.files[0]]})
    this.handleFileChange(event);
  }

  handleFileChange(event){
    event.persist();

    const name = event.target.getAttribute("name");
    const file = event.target.files[0];

    const reader = new FileReader();

    const url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {

        this.setCasePicsSrc(name, reader.result);

    }.bind(this)
  }

  setCasePicsSrc(id, url) {
    this.setState({
      heroSrc: url
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    const caseHeroImg = this.refs.image.files[0];
    const casePics = this.state.caseImageValues

     const caseData = {
       title: this.refs.title.value,
       caseHeroImg,
       casePics,
       description: this.refs.description.value
     }


     this.props.addCase(caseData);
  }

  renderCaseImgs(){
    var inputs = this.state.caseImageInputs;

    const newImageInput = `case-image${inputs.length + 1}`;


    this.setState({caseImageInputs: [ ...inputs, newImageInput ]})
  }


  render() {
    let inputs = this.state.caseImageInputs;
    return (
      <div className="add-case">

         <h1>Nytt Case</h1>

        <form ref="caseForm" name="case-form" id="case-form" method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">

          <input type="hidden" name="case-id" value="" />

          <div className="form-group">
            <label htmlFor="image">Huvudbild</label>
            <input className="form-control-file" ref="image" type="file" name="avatar" id="image" accept=".jpg" onChange={this.handleFileChange} />
          </div>
          {this.state.heroSrc ? <img className="preview-hero" src={this.state.heroSrc} /> : ""}

          <div className="form-group">
            <label htmlFor="title">Projekttitel</label>
            <input className="form-control" ref="title" type="text" name="title" id="title" />
          </div>

          <div className="form-group">
            <label htmlFor="description">Beskrivning</label>
            <textarea className="form-control" ref="description" type="text" name="description" id="description" />
          </div>

          <h4>Showcasebilder</h4>

          {inputs ? inputs.map((inputField, index) => {
            return (
              <div key={`div${inputField}`} className="form-group">
                <input
                  className="form-control-file"
                  type="file"
                  key={inputField}
                  name={inputField}
                  onChange={this.handleImgChange} />
                  {this.state.casePicsSrc[index] ? <img key={`img${inputField}`} src={this.state.casePicsSrc[index].url} className="preview-hero" /> : ""}
              </div>
            )

              }) : ""}


          <div className="form-group">
            <button type="button" className="btn btn-danger" onClick={this.renderCaseImgs}>Lägg till</button>
          </div>

          <button className="btn btn-success" type="submit">Save</button>
        </form>

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addCase }, dispatch);
}

export default connect(null, mapDispatchToProps)(AddCase)

AddCase.defaultProps = {
  casePicsSrc: [],
  heroSrc: null
}
