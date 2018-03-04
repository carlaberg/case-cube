import React, { Component } from 'react';
import "./UpdateCase.scss";



class UpdateCase extends Component {

  render() {

    return (
      <div className="update-case">

         <h1>Ändra Case</h1>
         {this.props.caseData.title}
        <form ref="caseForm" name="case-form" id="case-form" method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">

           <input type="hidden" name="case-id" value="" />

          <div className="form-group">
            <label htmlFor="image">Huvudbild</label>
            <input className="form-control-file" ref="image" type="file" name="avatar" id="image" accept=".jpg" />
          </div>
          <img className="update-preview-hero" src={require(`../../../uploads/${this.props.caseData.caseHeroImg}`)} />

          <div className="form-group">
            <label htmlFor="title">Projekttitel</label>
            <input className="form-control" value={this.props.caseData.title} ref="title" type="text" name="title" id="title" />
          </div>

          <div className="form-group">
            <label htmlFor="description">Beskrivning</label>
            <textarea className="form-control" value={this.props.caseData.description} ref="description" type="text" name="description" id="description" />
          </div>

           <h4>Showcasebilder</h4>
           
{/*
          <div className="form-group">
            <button type="button" className="btn btn-danger" onClick={this.renderCaseImgs}>Lägg till</button>
          </div>

          {inputs ? inputs.map(inputField => {
            return (
              <div className="form-group">
                <input
                  className="form-control-file"
                  type="file" key={inputField}
                  name={inputField}
                  onChange={this.handleImgChange} />
              </div>
            )

              }) : ""}

          <button className="btn btn-danger" type="submit">Save</button> */}
        </form>

      </div>
    );
  }

}

export default UpdateCase;
