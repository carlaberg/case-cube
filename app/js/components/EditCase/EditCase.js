import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import * as api from "../../apiFetchFunctions";
import { updateHero, updateCase } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import "./EditCase.scss";

class EditCase extends React.Component  {

  constructor(props) {
    super(props);

    this.state = {
      title: "",
      description: "",
      picCount: 0,
      casePics: [],
      hero: {}
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleSubmitHero = this.handleSubmitHero.bind(this);
    // this.handleImgChange = this.handleImgChange.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.addFilePicker = this.addFilePicker.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    // this.renderCaseImgs = this.renderCaseImgs.bind(this);
  }
  
  componentWillReceiveProps(nextProps){
    const { title, description, casePics, caseHeroImg} = nextProps.cases[nextProps.match.params.title];
    this.setState({
      title,
      description,
      picCount: casePics.length,
      casePics: casePics,
      hero: {
        src: caseHeroImg
      }
    })
  }

  addFilePicker(event) {

    this.setState( prevState => {
      const picNumber = prevState.picCount > 0 ? prevState.picCount + 1 : 1;
      return {
        casePics: [
          ...prevState.casePics, {id: picNumber}
        ],
        picCount: picNumber
      }
    });

  }

  handleFileChange(event){
    event.persist();

    const name = event.target.getAttribute("name");
    const id = parseInt(event.target.getAttribute("id"));

    const file = event.target.files[0];

    const reader = new FileReader();

    const url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      if(name === 'hero-image') {
        this.updateHero(reader.result, file);
      } else {
        this.updateCaseImgs(id, reader.result, file);
      }
    }.bind(this)
  }

  updateHero(b64Url, fileData) {
    this.setState({
      hero: {
        src: b64Url,
        fileData
      }
    })
  }

  updateCaseImgs(id, b64Url, fileData) {

    const { casePics } = this.state;

    const itemToModify = casePics.findIndex(pic => pic.id === id);
    const itemsBefore = casePics.slice(0, itemToModify);
    const itemsAfter = casePics.slice(itemToModify + 1)

    this.setState({
        casePics: [
          ...itemsBefore,
          { id, src: b64Url, fileData },
          ...itemsAfter
        ]
      });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);
    const { hero, casePics } = this.state;

     const caseData = {
       caseId: this.props.cases[this.props.match.params.title].caseId,
       title: this.refs.title.value,
       caseHeroImg: hero,
       casePics,
       description: this.refs.description.value
     }

     this.props.updateCase(caseData);
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    })
  }

  handleDescChange(e) {
    this.setState({
      description: e.target.value
    })
  }



  // handleImgChange(event){
  //   event.persist();
  //   this.setState({caseImageValues: [...this.state.caseImageValues, event.target.files[0]]})
  //   this.handleFileChange(event);
  // }

  // setCasePicsSrc(id, url) {
  //   if(id.startsWith("case-image")) {
  //
  //     const item = this.state.casePicsSrc.findIndex(pic => pic.id === id);
  //     if(item === -1){
  //       this.setState({
  //         casePicsSrc: [
  //           ...this.state.casePicsSrc,
  //           { id, url }
  //         ]
  //       })
  //     } else {
  //       this.setState({
  //         casePicsSrc: [
  //           ...this.state.casePicsSrc.slice(0, item),
  //           Object.assign({}, this.state.casePicsSrc[item], { url }),
  //           ...this.state.casePicsSrc.slice(item+1)
  //         ]
  //       })
  //     }
  //   } else {
  //     this.setState({
  //       heroSrc: url
  //     })
  //   }
  //
  // }

  // handleFileChange(event){
  //   event.persist();
  //   const name = event.target.getAttribute("name");
  //   const file = event.target.files[0];
  //
  //   const reader = new FileReader();
  //
  //   const url = reader.readAsDataURL(file);
  //
  //   reader.onloadend = function (e) {
  //       this.setCasePicsSrc(name, reader.result);
  //   }.bind(this)
  // }
  //
  // handleSubmit(event) {
  //   event.preventDefault();
  //
  //   const casePics = this.state.caseImageValues
  //
  //    const caseData = {
  //      title: this.refs.title.value,
  //      caseHeroImg,
  //      casePics,
  //      description: this.refs.description.value
  //    }
  //
  // }
  //
  // handleSubmitHero(event) {
  //     event.preventDefault();
  //     const hero = this.refs.image.files[0] || false;
  //     const id = this.props.cases[this.props.match.params.title].caseId
  //
  //     if (hero) {
  //         this.props.updateHero(id, hero);
  //     } else {
  //         console.log('you hant changed the hero');
  //     }
  // }
  //
  // renderCaseImgs(inputField){
  //   const { casePics } = this.state;
  //
  //
  //   casePics.forEach(item => {
  //     if (itemId === item.id) {
  //       return <img src={item.src} className="preview-hero" />
  //     }
  //   })
    // var inputs = this.state.caseImageInputs;
    // const newImageInput = `case-image${inputs.length + 1}`;
    // this.setState({caseImageInputs: [ ...inputs, newImageInput ]})
  // }

  render() {
    console.log(this.props);
    console.log(this.state);
    if(!this.props.cases[this.props.match.params.title]) {
      return ''
    }
    const { casePics } = this.state;
    const caseItem = this.props.cases[this.props.match.params.title]
    //
    // let inputs = this.state.caseImageInputs;
    return (
      <div className="edit-case">

         <h1>Edit Case: {caseItem.title}</h1>

     <form ref="heroForm" name="hero-form" id="hero-form" method="POST" onSubmit={this.handleSubmitHero} encType="multipart/form-data">
          <div className="edit-case__hero-group form-group">
            <label htmlFor="image">Huvudbild</label>
            <input className="form-control-file" ref="image" type="file" name="hero-image" id="image" accept=".jpg" onChange={this.handleFileChange} />
            <img className="preview-hero" src={this.state.hero.src} />
          </div>
          <button className="btn btn-success" type="submit">Save Hero</button>
     </form>

      <form ref="caseForm" name="case-form" id="case-form" method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">

          <div className="form-group">
            <label htmlFor="title">Projekttitel</label>
            <input className="form-control" ref="title" type="text" name="title" id="title" value={this.state.title} onChange={this.handleTitleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="description">Beskrivning</label>
            <textarea className="form-control" ref="description" type="text" name="description" id="description" onChange={this.handleDescChange} value={this.state.description} />
          </div>

          <h4>Showcasebilder</h4>

          {casePics.length > 0 ? casePics.map((pic, index) => {
            return (
              <div key={index} className="form-group">
                <input
                  className="form-control-file"
                  type="file"
                  id={index + 1}
                  name="case-image"
                  onChange={this.handleFileChange} />
                  {casePics[index].src ? <img src={casePics[index].src} className="preview-hero" /> : ""}
              </div>
            )

              }) : ""}


          <div className="form-group">
            <button type="button" className="btn btn-danger" onClick={this.addFilePicker}>Lägg till</button>
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
  return bindActionCreators({ updateHero, updateCase }, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(EditCase)
