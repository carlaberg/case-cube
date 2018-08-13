import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { interpolate, config } from 'react-spring';
import { fetchFeaturedCases } from '../../../actions';
import './Case.scss';
import { formatDate, setAnimationState } from '../../../utils/helpers';
import { CaseNavigation, CaseWrapper, ExpandingCircle, CaseContent } from './styles';
import Section from '../base-layout/Section';
import CaseHero from '../CaseHero';
import CaseImage from '../CaseImage';
import FancyGallery from '../FancyGallery';
import InfoList from '../InfoList';
import Button from '../Button';
import Video from '../../generic-components/Video';

class Case extends React.Component {
  constructor(props) {
    super(props);
    
    this.expandingCircle = React.createRef();
  }
  componentDidMount() {
    this.props.fetchFeaturedCases();
  }
   
  getCaseIndex() {
    const { featuredCases, location: { pathname } } = this.props;
    const title = pathname.split('/').slice(-1)[0];
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
  
  handleTransition( e, direction ) {
    e.preventDefault();
    const url = direction === 'next' ? this.getCase('next').title : this.getCase('prev').title;
      
    this.expandingCircle.current.classList.add('expanded');
    
    setTimeout(() => {
      this.expandingCircle.current.classList.remove('expanded');
      this.props.history.push(`/cases/${ url }`);
    }, 500)
  }
  
  render() {
    if(!this.props.featuredCases) return '';
    
    const  { location: { pathname }, featuredCases } = this.props;
    const title = pathname.split('/').slice(-1)[0];
    const single = featuredCases.filter(item => item.title === title);
    const { created, caseHeroImg: { src }, title: caseTitle, description, caseVideo = null, caseInfo, casePics } = single[0];
    
    return (
      <CaseWrapper>
        <CaseContent>
          <CaseHero key={ this.props.match.params.slug } heroUrl={ src } title={ caseTitle }/>
          <Section id="01" created={ formatDate( created ) }>
            <CaseImage 
              url={ casePics[1].src }
              text={{ title, description }}
            />
          </Section>
          { caseVideo && (
            <Section id="01" created={ formatDate( created ) }>
              <Video src={ caseVideo.src } />
            </Section>
          )}
          <Section id="01" 
            theme="dark" 
            title="Project info" 
            height={ "50vh" }
            created={ formatDate( created ) }
            >
            <InfoList caseInfo={ caseInfo } />
          </Section>
          <Section id="01" created={ formatDate( created ) }>
            <FancyGallery images={ casePics } />
          </Section>
          <Section 
            theme='bare' 
            padding='0px 40px'
          >
            <CaseNavigation>
              <a onClick={ e => this.handleTransition(e, 'prev') }><Button text="Previous" /></a>
              <a onClick={ e => this.handleTransition(e, 'next') }><Button text="Next" /></a>
            </CaseNavigation>
          </Section>
        </CaseContent>
        <ExpandingCircle innerRef={ this.expandingCircle }/>
      </CaseWrapper>
    )
  }
}

const mapStateToProps = state => ({ featuredCases: state.cases.featuredCases });

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ fetchFeaturedCases }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Case);
