import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as api from '../../apiFetchFunctions';
import { updateHero, updateCase, deleteCase } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './EditCase.scss';

class EditCase extends React.Component {
  constructor(props) {
    super(props);

    const { cases } = props.cases;

    this.state = {
      currentCase: cases ? cases[props.match.params.title] : "",
      title: cases ? cases[props.match.params.title].title : "",
      description: cases ? cases[props.match.params.title].description : "",
      picCount: cases ? cases[props.match.params.title].casePics.length : "",
      message: '',
      messageType: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.addFilePicker = this.addFilePicker.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    const currentCase = nextProps.cases.cases[nextProps.match.params.title];

    this.setState({
      title: currentCase.title,
      description: currentCase.description,
      currentCase,
      picCount: currentCase.casePics.length,
      message: nextProps.cases.msg,
      messageType: nextProps.cases.msgType,
    })
  }

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
      } else {
        this.updateCaseImgs(id, reader.result, file);
      }
    }.bind(this);
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

  deleteImg(e, id) {
    console.log(id);
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

    console.log(casePicsValid);
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

  handleTitleChange(e) {

    this.setState({
      ...this.state,
      currentCase: {
        ...this.state.currentCase,
        title: e.target.value
      }
    });
  }

  handleDescChange(e) {
    this.setState({
      ...this.state,
      currentCase: {
        ...this.state.currentCase,
        description: e.target.value
      }
    });
  }

  render() {
    console.log(this.props);
    console.log(this.state);
    if (!this.props.cases.cases) {
      return '';
    }
    const { currentCase, currentCase: { casePics } } = this.state
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
          ref="heroForm"
          name="hero-form"
          id="hero-form"
          method="POST"
          onSubmit={this.handleSubmitHero}
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
            <img className="preview-hero" src={currentCase.caseHeroImg && currentCase.caseHeroImg.src} />
          </div>
          <button className="btn btn-success" type="submit">
            Save Hero
          </button>
        </form>

        <form
          noValidate
          ref="caseForm"
          name="case-form"
          id="case-form"
          method="POST"
          onSubmit={this.handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-group">
            <label htmlFor="title">Projekttitel</label>
            <input
              className="form-control"
              ref={title => this.title = title}
              type="text"
              name="title"
              id="title"
              value={this.state.currentCase.title}
              onChange={this.handleTitleChange}
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
              onChange={this.handleDescChange}
              value={this.state.currentCase.description}
              required
            />
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
