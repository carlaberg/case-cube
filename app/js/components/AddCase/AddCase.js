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
      picCount: 0,
      casePics: [],
      hero: {},
      message: '',
      messageType: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.addFilePicker = this.addFilePicker.bind(this);
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
    const { hero, casePics } = this.state;
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
        caseHeroImg: hero,
        casePics,
        description: this.refs.description.value
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
    const { casePics } = this.state;
    console.log(this.state);
    console.log(this.props);
    return (
      <div className="add-case">

         <h1>Nytt Case</h1>

        <form noValidate ref={caseForm => this.caseForm = caseForm} name="case-form" id="case-form" method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">

          <input type="hidden" name="case-id" value="" />

          <div className="form-group">
            <label htmlFor="image">Huvudbild</label>
            <input className="form-control-file" ref="image" type="file" name="hero-image" id="image" accept=".jpg" onChange={this.handleFileChange} required/>
          </div>
          {this.state.hero.src && <img className="preview-hero" src={this.state.hero.src} />}

          <div className="form-group">
            <label htmlFor="title">Projekttitel</label>
            <input className="form-control" ref="title" type="text" name="title" id="title" required/>
          </div>

          <div className="form-group">
            <label htmlFor="description">Beskrivning</label>
            <textarea className="form-control" ref="description" type="text" name="description" id="description" required/>
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
