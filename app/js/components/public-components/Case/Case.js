import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { fetchFeaturedCases } from '../../../actions';
import './Case.scss';
import { CaseNavigation } from './styles';
import Section from '../base-layout/Section';
import CaseHero from '../CaseHero';
import CaseImage from '../CaseImage';
import FancyGallery from '../FancyGallery';
import InfoList from '../InfoList';
import Button from '../Button';
import Video from '../../generic-components/Video';

class Case extends React.Component {
  componentDidMount() {
    this.props.fetchFeaturedCases();
  } 
   
  getCaseIndex() {
    const { featuredCases, match: { params: { title } }} = this.props;
    return featuredCases.findIndex( item => item.title === title );
  }
  
  getCase(direction) {
    let nextIndex;
    const { featuredCases } = this.props;
    const index = this.getCaseIndex();
    const lastIndex = featuredCases.length - 1;
    
    if(direction === 'next')  {
      nextIndex = index < lastIndex ? index + 1 : 0;
    } else {
      nextIndex = index > 0 ? index - 1 : lastIndex;
    }
    
    return featuredCases[nextIndex];
  }
  
  render() {
    if(!this.props.featuredCases) return 'Loading';
    const { match: { params: { title } }, featuredCases } = this.props;
    const single = featuredCases.filter(item => item.title === title);
    const { caseHeroImg: { src }, title: caseTitle, description, caseVideo: { src: videoSrc }, caseInfo, casePics } = single[0];
    
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
        <Section id="01" theme="dark" title="Project info" height={ "50vh" }>
          <InfoList caseInfo={ caseInfo } />
        </Section>
        <Section id="01">
          <FancyGallery images={ casePics } />
        </Section>
        <CaseNavigation>
          <Link to={`/cases/${ this.getCase('prev').title }`}><Button text="Previous" /></Link>
          <Link to={`/cases/${ this.getCase('next').title }`}><Button text="next" /></Link>
        </CaseNavigation>
      </div>
    );
  }
}

const mapStateToProps = state => ({ featuredCases: state.cases.featuredCases });

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchFeaturedCases }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Case);
