import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import * as api from '../../apiFetchFunctions';
import { updateHero, updateCase } from '../../actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import './EditCase.scss';

class EditCase extends React.Component {
  constructor(props) {
    super(props);



    this.state = {
      currentCase: props.cases[props.match.params.title] || "",
      title: props.cases[props.match.params.title] ? props.cases[props.match.params.title].title : "",
      description: props.cases[props.match.params.title] ? props.cases[props.match.params.title].description : "",
      picCount: 0
      // casePics: [],
      // hero: {
      //   src: props.cases
      //     ? props.cases[props.match.params.title].caseHeroImg
      //     : ''
      // }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.addFilePicker = this.addFilePicker.bind(this);
    this.handleDescChange = this.handleDescChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    const currentCase = nextProps.cases[nextProps.match.params.title];

    this.setState({
      title: currentCase.title,
      description: currentCase.description,
      currentCase,
      picCount: currentCase.casePics.length
    })



    // const { title, description, casePics, caseHeroImg } = nextProps.cases[
    //   nextProps.match.params.title
    // ];
    // this.setState({
    //   title,
    //   description,
    //   picCount: casePics.length,
    //   casePics: casePics,
    //   hero: {
    //     src: caseHeroImg
    //   }
    // });
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
    // this.setState(prevState => {
    //   const picNumber = prevState.picCount > 0 ? prevState.picCount + 1 : 1;
    //   return {
    //
    //     casePics: [...prevState.casePics, { id: picNumber }],
    //     picCount: picNumber
    //   };
    // });
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
    // this.setState({
    //   hero: {
    //     src: b64Url,
    //     fileData
    //   }
    // });
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
    //   return {
    //     ...prevState,
    //     casePics: [...itemsBefore, { id, src: b64Url, fileData }, ...itemsAfter]
    //   }
    // });
  }

  handleSubmit(event) {
    // event.preventDefault();
    // console.log(event.target);
    // const { hero, casePics } = this.state;
    //
    // const caseData = {
    //   caseId: this.props.cases[this.props.match.params.title].caseId,
    //   title: this.refs.title.value,
    //   caseHeroImg: hero,
    //   casePics,
    //   description: this.refs.description.value
    // };
    //
    // this.props.updateCase(caseData);
    //
    //
    //
    //


    event.preventDefault();

    const { currentCase } = this.state;
    this.props.updateCase(currentCase);
  }

  handleTitleChange(e) {
    // this.setState({
    //   title: e.target.value
    // });

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
    if (!this.props.cases[this.props.match.params.title]) {
      return '';
    }
    const { casePics } = this.state.currentCase;
    const caseItem = this.props.cases[this.props.match.params.title];

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
            <img className="preview-hero" src={this.state.currentCase.caseHeroImg.src} />
          </div>
          <button className="btn btn-success" type="submit">
            Save Hero
          </button>
        </form>

        <form
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
              ref="title"
              type="text"
              name="title"
              id="title"
              value={this.state.currentCase.title}
              onChange={this.handleTitleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Beskrivning</label>
            <textarea
              className="form-control"
              ref="description"
              type="text"
              name="description"
              id="description"
              onChange={this.handleDescChange}
              value={this.state.currentCase.description}
            />
          </div>

          <h4>Showcasebilder</h4>

          {casePics.length > 0
            ? casePics.map((pic, index) => {
                return (
                  <div key={index} className="form-group">
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
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cases: state.cases
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ updateHero, updateCase }, dispatch);
};
export default connect(mapStateToProps, mapDispatchToProps)(EditCase);
