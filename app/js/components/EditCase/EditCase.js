import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as api from "../../apiFetchFunctions";
import { updateCaseImages } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import "./EditCase.scss";


class EditCase extends React.Component  {

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
      casePicsSrc: nextProps.casePicsSrc,
      heroSrc: `/uploads/${nextProps.cases[this.props.match.params.title].caseHeroImg}`
    })
  }

  handleImgChange(event){
    event.persist();
    this.setState({caseImageValues: [...this.state.caseImageValues, event.target.files[0]]})
    this.handleFileChange(event);
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

  handleCase(caseData) {
    api.addCase(caseData)
      .then(response => {
        this.setState({
          cases: [ response, ...this.state.cases ]

        })
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


     this.handleCase(caseData);
  }

  renderCaseImgs(){
    var inputs = this.state.caseImageInputs;

    const newImageInput = `case-image${inputs.length + 1}`;


    this.setState({caseImageInputs: [ ...inputs, newImageInput ]})
  }

  render() {
    if(!this.props.cases[this.props.match.params.title]) {
      return ''
    }
    console.log(this.state);
    const caseItem = this.props.cases[this.props.match.params.title]

    let inputs = this.state.caseImageInputs;
    return (
      <div className="edit-case">

         <h1>Edit Case: {caseItem.title}</h1>

        <form ref="caseForm" name="case-form" id="case-form" method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">

          <input type="hidden" name="case-id" value="" />

          <div className="edit-case__hero-group form-group">
            <label htmlFor="image">Huvudbild</label>
            <input className="form-control-file" ref="image" type="file" name="hero" id="image" accept=".jpg" onChange={this.handleFileChange} />
            <img className="preview-hero" src={this.state.heroSrc} />
          </div>



          <div className="form-group">
            <label htmlFor="title">Projekttitel</label>
            <input className="form-control" ref="title" type="text" name="title" id="title" value={caseItem.title} onChange={this.handleTitleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="description">Beskrivning</label>
            <textarea className="form-control" ref="description" type="text" name="description" id="description" onChange={this.handleDescChange} value={caseItem.description} />
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

const mapStateToProps = state => {
  return {
    cases: state.cases
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateCaseImages}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EditCase)

EditCase.defaultProps = {
  casePicsSrc: [],
  heroSrc: null

}
