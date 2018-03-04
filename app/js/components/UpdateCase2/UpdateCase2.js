import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./UpdateCase2.scss";
import * as api from "../../apiFetchFunctions";


export default class AddCase extends React.Component  {

  constructor(props) {
    super(props);

    this.state = {
      caseImageInputs: [],
      caseImageValues: [],
      casePicsSrc: [],
      descValue: this.props.caseData.description,
      titleValue: this.props.caseData.title

    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleImgChange = this.handleImgChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.renderCaseImgs = this.renderCaseImgs.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  componentWillReceiveProps(nextProps){

    this.setState({
      casePicsSrc: nextProps.casePicsSrc
    })

    this.renderHero();
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

        this.props.setCasePicsSrc(name, reader.result);

    }.bind(this)



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


     this.props.handleCase(caseData);
  }

  renderCaseImgs(){
    var inputs = this.state.caseImageInputs;

    const newImageInput = `case-image${inputs.length + 1}`;


    this.setState({caseImageInputs: [ ...inputs, newImageInput ]})
  }

  renderHero(){
    console.log(this.props.caseData);
  return this.props.heroSrc ?
  <img className="preview-hero" src={this.props.heroSrc} /> :
  <img className="update-preview-hero" src={require(`../../../uploads/${this.props.caseData.caseHeroImg}`)} />
  }

  handleDescChange(event) {
    this.setState({
      descValue: event.target.value
    })
  }
  handleTitleChange(event) {
    this.setState({
      titleValue: event.target.value
    })
  }
  render() {
    // console.log(this.props);
    let inputs = this.state.caseImageInputs;
    return (
      <div className="add-case">

         <h1>Edit Case: {this.props.caseData.title}</h1>

        <form ref="caseForm" name="case-form" id="case-form" method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">

          <input type="hidden" name="case-id" value="" />

          <div className="form-group">
            <label htmlFor="image">Huvudbild</label>
            <input className="form-control-file" ref="image" type="file" name="avatar" id="image" accept=".jpg" onChange={this.handleFileChange} />
          </div>
          {this.renderHero()}


          <div className="form-group">
            <label htmlFor="title">Projekttitel</label>
            <input className="form-control" ref="title" type="text" name="title" id="title" value={this.state.titleValue} onChange={this.handleTitleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="description">Beskrivning</label>
            <textarea className="form-control" ref="description" type="text" name="description" id="description" onChange={this.handleDescChange} value={this.state.descValue} />
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

AddCase.defaultProps = {
  casePicsSrc: [],
  heroSrc: null

}
