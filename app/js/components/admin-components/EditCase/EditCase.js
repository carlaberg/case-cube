import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as api from '../../../apiFetchFunctions';
import { updateHero, updateCase, deleteCase } from '../../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { findItemToUpdate } from "../../../utils/helpers";
import './EditCase.scss';
import CaseInfo from '../CaseInfo/CaseInfo';

class EditCase extends React.Component {
  constructor(props) {
    super(props);

    const { cases } = props.cases;

    this.state = {
      currentCase: cases ? cases[props.match.params.title] : "",
      picCount: cases ? cases[props.match.params.title].casePics.length : "",
      infoCount: cases ? cases[props.match.params.title].caseInfo.length : "",
      message: '',
      messageType: '',
      videoChanged: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.addFilePicker = this.addFilePicker.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCaseImageCaption = this.handleCaseImageCaption.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const currentCase = nextProps.cases.cases[nextProps.match.params.title];

    this.setState({
      currentCase,
      picCount: currentCase.casePics.length,
      infoCount: currentCase.caseInfo.length,
      message: nextProps.cases.msg,
      messageType: nextProps.cases.msgType,
    })
  }


// For case images
  addFilePicker(event) {
    this.setState(prevState => {
      const picNumber = prevState.picCount > 0 ? prevState.picCount + 1 : 1;
      return {
        currentCase: {
          ...prevState.currentCase,
          casePics: [...prevState.currentCase.casePics, { id: picNumber }]
        },
        picCount: picNumber
      };
    });
  }
  
// For case info
  addCaseInfo() {
    this.setState(prevState => {
      const infoNumber = prevState.infoCount > 0 ? prevState.infoCount + 1 : 1;
      return {
        currentCase: {
          ...prevState.currentCase,
          caseInfo: [...prevState.currentCase.caseInfo, { id: infoNumber }]
        },
        infoCount: infoNumber
      };
    });
  }

  handleFileChange(event) {
    event.persist();

    const name = event.target.getAttribute('name');
    const id = parseInt(event.target.getAttribute('id'));

    const file = event.target.files[0];

    const reader = new FileReader();

    const url = reader.readAsDataURL(file);

    reader.onloadend = function(e) {
      if (name === 'hero-image') {
        this.updateHero(reader.result, file);
      } else if (name === 'case-image') {
        this.updateCaseImgs(id, reader.result, file);
      } else {
        this.updateVideo(file);
      }
    }.bind(this);
    
  }
  
  updateVideo(fileData) {
    this.setState(prevState => {
      return {
        ...prevState,
        currentCase: {
          ...prevState.currentCase,
          caseVideo: {fileData}
        },
        videoChanged: true
      }
    });
  }

  updateHero(b64Url, fileData) {
    this.setState(prevState => {
      return {
        ...prevState,
        currentCase: {
          ...prevState.currentCase,
          caseHeroImg: {
            src: b64Url,
            fileData
          }
        }
      }
    });
  }

  updateCaseImgs(id, b64Url, fileData) {
    const { casePics } = this.state.currentCase;

    const itemToModify = casePics.findIndex(pic => pic.id === id);
    const itemsBefore = casePics.slice(0, itemToModify);
    const itemsAfter = casePics.slice(itemToModify + 1);

      this.setState(prevState => {
        return {
          ...prevState,
          currentCase: {
            ...prevState.currentCase,
            casePics: [...itemsBefore, { id, src: b64Url, fileData }, ...itemsAfter]
          }
        }
      });
  }
  
  handleCaseImageCaption(e) {
    const { casePics } = this.state.currentCase;
    const id = parseInt(e.target.getAttribute('id'));
  
    const itemToModify = casePics.findIndex(pic => pic.id === id);
    const itemsBefore = casePics.slice(0, itemToModify);
    const itemsAfter = casePics.slice(itemToModify + 1) 
    
    this.setState({
        currentCase: {
          ...this.state.currentCase,
          casePics: [
            ...itemsBefore,
            { ...casePics[itemToModify], caption: e.target.value },
            ...itemsAfter
          ]
        }
      });
  }
  
  handleInfoChange(e) {
    const { currentCase, currentCase: { caseInfo }} = this.state;
    const items = findItemToUpdate(parseInt(e.target.getAttribute("id")), caseInfo);
    
    const key = e.target.name.split('-').pop();
    
    this.setState({
      currentCase: {
        ...currentCase,
        caseInfo: [
          ...items.itemsBefore,
          { ...caseInfo[items.itemToModify], [key]: e.target.value },
          ...items.itemsAfter
        ]
      }
    });  
  }

  deleteImg(e, id) {
    const { currentCase, currentCase: { casePics } } = this.state;

    const itemToModify = casePics.findIndex(pic => pic.id === id);
    const itemsBefore = casePics.slice(0, itemToModify);
    const itemsAfter = casePics.slice(itemToModify + 1);

    const newPics = [...itemsBefore, ...itemsAfter];

    const picsNewId = newPics.map((pic, index) => {
      return {
        ...pic,
        id: index + 1
      }
    })

    this.setState(prevState => {
      return {
        ...prevState,
        currentCase: {
          ...prevState.currentCase,
          casePics: picsNewId
        },
        picCount: picsNewId.length
      }
    });
  }

  handleSubmit(event) {
    const { currentCase } = this.state;

    const casePicsValid = currentCase.casePics.filter(pic => pic.src === undefined);

    event.preventDefault();
    if(!this.title.validity.valid ||
      !this.description.validity.valid ||
      !currentCase.caseHeroImg.src ||
      casePicsValid.length > 0) {
      this.setState({
        messageType: 'danger',
        message: 'Please fill in the form'
      })

    } else {
      this.props.updateCase(currentCase);
      this.setState({
        message: ""
      })
    }

  }

  handleInputChange(e) {
    const name = e.target.name;
    this.setState({
      ...this.state,
      currentCase: {
        ...this.state.currentCase,
        caseHeroImg: {...this.state.currentCase.caseHeroImg, caption: name === 'hero-caption' ? e.target.value : this.state.currentCase.caseHeroImg.caption},
        title: name === 'title' ? e.target.value : this.state.currentCase.title,
        description: name === 'description' ? e.target.value : this.state.currentCase.description,
        order: name === 'order' ? e.target.value : this.state.currentCase.order
      }
    });
  }

  render() {
    if (!this.props.cases.cases) {
      return '';
    }
    const { currentCase, currentCase: { casePics, caseInfo } } = this.state
    const caseItem = this.props.cases.cases[this.props.match.params.title];

    return (
      <div className="edit-case">
        <h1>Edit Case: {caseItem.title}</h1>
        <Link to="/admin/cases">
          <button className="btn btn-success" type="submit">
            Tillbaka
          </button>
        </Link>
        
        <form
          noValidate
          ref="caseForm"
          name="case-form"
          id="case-form"
          method="POST"
          onSubmit={this.handleSubmit}
          encType="multipart/form-data"
        >

          <div className="edit-case__hero-group form-group">
            <label htmlFor="image">Huvudbild</label>
            <input
              className="form-control-file"
              ref="image"
              type="file"
              name="hero-image"
              id="image"
              accept=".jpg"
              onChange={this.handleFileChange}
            />
            <label htmlFor="hero-caption">Hero caption</label>
            <input className="form-control" ref="heroCaption" type="text" name="hero-caption" id="hero-caption" value={currentCase.caseHeroImg && currentCase.caseHeroImg.caption} onChange={this.handleInputChange} required/>
            <img className="preview-hero" src={currentCase.caseHeroImg && currentCase.caseHeroImg.src} />
          </div>

          <div className="form-group">
            <label htmlFor="title">Projekttitel</label>
            <input
              className="form-control"
              ref={title => this.title = title}
              type="text"
              name="title"
              id="title"
              value={this.state.currentCase.title}
              onChange={this.handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Beskrivning</label>
            <textarea
              className="form-control"
              ref={description => this.description = description}
              type="text"
              name="description"
              id="description"
              onChange={this.handleInputChange}
              value={this.state.currentCase.description}
              required
            />
          </div>
          
          <div className="edit-case__hero-group form-group">
            <label htmlFor="image">Video</label>
            <input
              className="form-control-file"
              ref="video"
              type="file"
              name="video"
              id="video"
              accept=".mp4"
              onChange={this.handleFileChange}
            />
            
            {!this.state.videoChanged &&
              <video width="320" height="240" controls>
                <source src={currentCase.caseVideo && currentCase.caseVideo.src} type="video/mp4"/>
              </video>}
          </div>
          
          <div className="form-group">
            <label htmlFor="order">Order</label>
            <input className="form-control" ref="order" type="number" name="order" id="order" value={this.state.currentCase.order} onChange={this.handleInputChange}/>
          </div>
          
          <h4>Case info</h4>

          {caseInfo.length > 0 ? caseInfo.map((item, index) => {
            return <CaseInfo key={index} index={index} changeHandler={e => this.handleInfoChange(e)} caseInfoData={ item }/> }) : ""}
            
          <div className="form-group">
            <button type="button" className="btn btn-danger" onClick={() => this.addCaseInfo()}>Lägg till</button>
          </div> 

          <h4>Showcasebilder</h4>

          {casePics.length > 0
            ? casePics.map((pic, index) => {
                return (
                  <div key={index} className="form-group">
                    <button className="btn btn-danger" type="button" id="delete-image" onClick={e => this.deleteImg(e, index + 1)}>Delete image</button>
                    <input
                      className="form-control-file"
                      type="file"
                      id={index + 1}
                      name="case-image"
                      onChange={this.handleFileChange}
                    />
                    <label htmlFor="case-image-caption">Case image caption</label>
                    <input className="form-control" ref={`caseImageCaption${index + 1}`} type="text" name="case-image-caption" id={index + 1} value={casePics[index].caption} onChange={this.handleCaseImageCaption} required/>
                    {casePics[index].src ? (
                      <img src={casePics[index].src} className="preview-hero" />
                    ) : (
                      ''
                    )}
                  </div>
                );
              })
            : ''}

          <div className="form-group">
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.addFilePicker}
            >
              Lägg till
            </button>
          </div>

          <button className="btn btn-success" type="submit">
            Save
          </button>
          <button type="button" className="btn btn-danger" onClick={() => {
            this.props.deleteCase(this.state.currentCase.caseId, () => {
              this.props.history.push('/admin/cases');
            })
          }}>Delete case</button>
          {this.state.message && <div className={`message${this.state.messageType && ' message--' + this.state.messageType}`}>
              {this.state.message}
              <div className="message__close" onClick={() => { this.setState({message: ""})}}>+</div>
            </div>
          }
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {

  return { cases: state.cases }
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateHero, updateCase, deleteCase }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(EditCase);
