import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './Case.scss';
import Section from '../base-layout/Section';
import CaseHero from '../CaseHero';
import CaseImage from '../CaseImage';
import Video from '../Video';

class Case extends React.Component {
  render() {
    if(!this.props.featuredCases) return 'Loading';
    
    const { match, featuredCases, match: { params: { title } }} = this.props;
    const single = featuredCases[title];
    const { caseHeroImg: { src }, title: caseTitle, description, caseVideo: { src: videoSrc } } = single;

    return (
      <div className="case">
        <CaseHero heroUrl={ src } title={ caseTitle }/>
        <Section id="01">
          <CaseImage 
            url={ src }
            text={{ title, description }}
          />
        </Section>
        <Section id="01">
          <Video src={ videoSrc } />
        </Section>
        <Section id="01">
          <CaseImage 
            url={ src }
            text={{ title, description }}
          />
        </Section>
        <Section id="01">
          <CaseImage 
            url={ src }
            text={{ title, description }}
          />
        </Section>
      </div>
    );
  }
}

const mapStateToProps = state => ({ featuredCases: state.cases.featuredCases });

export default connect(mapStateToProps, null)(Case);
