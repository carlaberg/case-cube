import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./AddCase.scss";
import { findItemToUpdate } from "../../../utils/helpers";
import * as api from "../../../apiFetchFunctions";
import { addCase } from '../../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import CaseInfo from '../CaseInfo';

class AddCase extends React.Component  {
  constructor(props) {
    super(props);

    this.state = {
      picCount: 0,
      infoCount: 0,
      casePics: [],
      caseInfo: [],
      hero: {},
      message: '',
      messageType: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.handleCaseImageCaption = this.handleCaseImageCaption.bind(this);
    this.addFilePicker = this.addFilePicker.bind(this);
    this.addCaseInfo = this.addCaseInfo.bind(this);
    this.handleInfoChange = this.handleInfoChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      message: nextProps.cases.msg,
      messageType: nextProps.cases.msgType
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
  
  addCaseInfo(event) {

    this.setState( prevState => {
      const caseInfoNumber = prevState.infoCount > 0 ? prevState.infoCount + 1 : 1;
      return {
        caseInfo: [
          ...prevState.caseInfo, {id: caseInfoNumber}
        ],
        infoCount: caseInfoNumber
      }
    });

  }
  
  handleInfoChange(e) {
    const { caseInfo } = this.state;
    const items = findItemToUpdate(parseInt(e.target.getAttribute("id")), caseInfo);
    
    const key = e.target.name.split('-').pop();
    
    this.setState({
        caseInfo: [
          ...items.itemsBefore,
          { ...caseInfo[items.itemToModify], [key]: e.target.value },
          ...items.itemsAfter
        ]
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
    const items = findItemToUpdate(id, casePics);
    this.setState({casePics: [...items.itemsBefore, { id, src: b64Url, fileData }, ...items.itemsAfter]});
  }
  
  handleCaseImageCaption(e) {
    const { casePics } = this.state;
    const items = findItemToUpdate(parseInt(e.target.getAttribute("id")), casePics);
    
    this.setState({
        casePics: [
          ...items.itemsBefore,
          { ...casePics[items.itemToModify], caption: e.target.value },
          ...items.itemsAfter
        ]
      });
  }

  handleSubmit(event) {
    const { hero, casePics, caseInfo } = this.state;

    event.preventDefault();

    const inputs = Array.from(this.caseForm.querySelectorAll('input'));
    const textAreas = Array.from(this.caseForm.querySelectorAll('textarea'));
    const allInputs = [...inputs, ...textAreas];
    const falseYinputs = allInputs.filter(input => !input.validity.valid);

    if(falseYinputs.length > 0) {
      this.setState({
        message: 'Please fill out all the fields in the form.',
        messageType: 'danger'
      })
    } else {
      const caseData = {
        title: this.refs.title.value,
        caseHeroImg: {...hero, caption: this.refs.heroCaption.value},
        caseVideo: this.refs.video.files[0],
        caseInfo,
        casePics,
        description: this.refs.description.value,
        order: parseInt(this.refs.order.value)
      }
      this.props.addCase(caseData);
      this.caseForm.reset();
      this.setState({
        hero: {},
        casePics: []
      })
    }

  }

  render() {
    const { casePics, caseInfo } = this.state;
    return (
      <div className="add-case">

         <h1>Nytt Case</h1>

        <form noValidate ref={caseForm => this.caseForm = caseForm} name="case-form" id="case-form" method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">

          <input type="hidden" name="case-id" value="" />

          <div className="form-group">
            <label htmlFor="image">Huvudbild</label>
            <input className="form-control-file" ref="image" type="file" name="hero-image" id="image" accept=".jpg" onChange={this.handleFileChange} required/>
            <label htmlFor="hero-caption">Hero caption</label>
            <input className="form-control" ref="heroCaption" type="text" name="hero-caption" id="hero-caption" required/>
          </div>
          {this.state.hero.src && <img className="preview-hero" src={this.state.hero.src} />}

          <div className="form-group">
            <label htmlFor="title">Projekttitel</label>
            <input className="form-control" ref="title" type="text" name="title" id="title" required/>
          </div>

          <div className="form-group">
            <label htmlFor="description">Beskrivning</label>
            <textarea className="form-control" ref="description" type="text" name="description" id="description" required />
          </div>
          
          <div className="form-group">
            <label htmlFor="video">Video</label>
            <input className="form-control-file" ref="video" type="file" name="video" id="video" />
          </div>
          
          <div className="form-group">
            <label htmlFor="order">Order</label>
            <input className="form-control" ref="order" type="number" name="order" id="order"/>
          </div>

          <h4>Case info</h4>

          {caseInfo.length > 0 ? caseInfo.map((item, index) => {
            return <CaseInfo key={index} index={index} changeHandler={this.handleInfoChange}/>}) : ""}
            
          <div className="form-group">
            <button type="button" className="btn btn-danger" onClick={this.addCaseInfo}>Lägg till</button>
          </div>  

          <h4>Showcasebilder</h4>

          {casePics.length > 0 ? casePics.map((pic, index) => {
            return (
              <div key={index} className="form-group">
                <input
                  required
                  className="form-control-file"
                  type="file"
                  id={index + 1}
                  name="case-image"
                  onChange={this.handleFileChange} />
                  <label htmlFor="case-image-caption">Case image caption</label>
                  <input className="form-control" ref={`caseImageCaption${index + 1}`} type="text" name="case-image-caption" id={index + 1} onChange={this.handleCaseImageCaption} required/>
                  {casePics[index].src ? <img src={casePics[index].src} className="preview-hero" /> : ""}
              </div>
            )

              }) : ""}


          <div className="form-group">
            <button type="button" className="btn btn-danger" onClick={this.addFilePicker}>Lägg till</button>
          </div>

          <button className="btn btn-success" type="submit">Save</button>
          {this.state.message && <div className={`message${this.state.messageType && ' message--' + this.state.messageType}`}>
              {this.state.message}
              <div className="message__close" onClick={() => { this.setState({message: ""})}}>+</div>
            </div>
          }
        </form>

      </div>
    )
  }
}


const mapStateToProps = state => {
  return { cases: state.cases }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ addCase }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCase)

AddCase.defaultProps = {
  casePicsSrc: [],
  heroSrc: null
}
