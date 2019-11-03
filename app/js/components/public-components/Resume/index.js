import React, { Component, Fragment } from 'react'
import * as Renderer from 'react-pdf/dist/entry.webpack'
import { pdf, PDFDownloadLink, Document } from '@react-pdf/renderer'
import {
  // Regular web styled
  ResumeContent,
  DownloadButton,
  Pagination,
  PaginationInner,
  Previous,
  Next,
  PageNumber,
  Download,
  // Styling for react-pdf primitives
  StyledPage,
  ResumeWrapper,
  ResumeLeftCol,
  ResumeDividerCol,
  ResumeRightCol
} from './styles'

import ResumeHeader from './ResumeHeader'
import Skills from './Skills'
import CoverLetter from './CoverLetter'
import WorkExperience from './WorkExperience'
import Education from './Education'
import SideProjects from './SideProjects'

import Section from '../base-layout/Section'

class Resume extends Component {
  state = {
    url: null,
    documentLoaded: false,
    documentWidth: 0,
    resumeVisible: false,
    pageNumber: 1,
    numberOfPages: 3,
    previousVisible: false,
    nextVisible: true
  }
  componentDidMount() {

    pdf(this.renderResume())
    .toBlob()
    .then(blob => {
      const url = URL.createObjectURL(blob)
      
      this.setState({ url })
    })
    .catch(error => console.error(error.message))

    window.addEventListener('resize', () => {
      this.forceUpdate()
    })
  }

  renderResume() {
    return (

      // PDF Document starts here
      <Document>

        {/* Page one: Cover Letter */}
        <StyledPage size="A4">
          <ResumeWrapper>
            <ResumeLeftCol>
              <ResumeHeader />
            </ResumeLeftCol>
            <ResumeDividerCol />
            <ResumeRightCol>
              <CoverLetter />
            </ResumeRightCol>
          </ResumeWrapper>
        </StyledPage>

        {/* Page two: Work experience, education and skills */}
        <StyledPage size="A4">
          <ResumeWrapper>
            <ResumeLeftCol>
              <ResumeHeader />
              <Skills />
            </ResumeLeftCol>
            <ResumeDividerCol />
            <ResumeRightCol>
              <WorkExperience />  
              <Education />
            </ResumeRightCol>
          </ResumeWrapper>
        </StyledPage>

        {/* Page three: Side projetcs and references */}
        <StyledPage size="A4">
          <ResumeWrapper>
            <ResumeLeftCol>
              <ResumeHeader />
            </ResumeLeftCol>
            <ResumeDividerCol />
            <ResumeRightCol>
              <SideProjects />
            </ResumeRightCol>
          </ResumeWrapper>
        </StyledPage>

      </Document>
    )
  }

  getPDFWidth() {
    const sectionContent = document.querySelector('[data-selector=section-content')
    if (!sectionContent) return 0

    return sectionContent.offsetWidth
  }

  onDocumentLoadSucess() {
    this.setState({
      documentLoaded: true,
      documentWidth: this.getPDFWidth()
    })
    setTimeout(() => this.setState({ resumeVisible: true }), 500)
  }

  handlePrevious() {
    const { pageNumber } = this.state

    if (pageNumber > 1) {
      this.setState((state) => {
        return { pageNumber: state.pageNumber - 1, nextVisible: true }
      })
    } else {
      this.setState({ previousVisible: false })
    }
  }

  handleNext() {
    const { pageNumber, numberOfPages } = this.state

    if (pageNumber < numberOfPages) {
      this.setState((state) => {
        return { pageNumber: state.pageNumber + 1, previousVisible: true }
      })
    } else {
      this.setState({ nextVisible: false })
    }
  }

  render() {
    const { 
      url,
      documentWidth,
      documentLoaded,
      resumeVisible,
      pageNumber,
      numberOfPages,
      previousVisible,
      nextVisible
    } = this.state

    if (!url) return null

    return (
      <Section id="Resume">
        <ResumeContent minHeight={documentWidth * 1.4143} loaded={resumeVisible}>
          <Renderer.Document
            file={url}
            onLoadSuccess={() => this.onDocumentLoadSucess()}
          >
            <Renderer.Page
              renderMode="svg"
              pageNumber={pageNumber}
              width={documentWidth}
            />
          </Renderer.Document>
          {documentLoaded && (
            <Pagination>
              <Download>
                <PDFDownloadLink document={this.renderResume()}>
                  <DownloadButton
                    text="Download"
                    theme="light"
                  />
                </PDFDownloadLink>
              </Download>
              <PaginationInner>
                <Previous
                  visible={previousVisible}
                  onClick={() => this.handlePrevious()}
                  text="Previous"
                  theme="light"
                />
                <PageNumber>Page {pageNumber}</PageNumber>
                <Next
                  visible={nextVisible}
                  onClick={() => this.handleNext()}
                  text="Next"
                  theme="light"
                />
              </PaginationInner>
            </Pagination>          
          )}
        </ResumeContent>
      </Section>    
    )
  }
};

export default Resume