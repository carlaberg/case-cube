import React, { Component, Fragment } from 'react'
import styled from '@react-pdf/styled-components'
import * as Renderer from 'react-pdf/dist/entry.webpack'
import { pdf, PDFDownloadLink, Page, Text, View, Document, Font, Image } from '@react-pdf/renderer'
import { DownloadButton } from './styles'
import Section from '../base-layout/Section'
import ProfileImageSRC from '../../../../img/profile-image.png'
import BEMIcon from '../../../../img/bem.png'
// import StyledComponentsIcon from '../../../../img/styled-components.png'
import AgileIcon from '../../../../img/agile.png'
import ApolloIcon from '../../../../img/apollo.png'
import BabelIcon from '../../../../img/babel.png'
import DockerIcon from '../../../../img/docker.png'
import EslintIcon from '../../../../img/eslint.png'
import GitIcon from '../../../../img/git.png'
import GraphQLIcon from '../../../../img/graphql.png'
import NodeIcon from '../../../../img/node.png'
import NPMIcon from '../../../../img/npm.png'
import ReactIcon from '../../../../img/react.png'
import ReduxIcon from '../../../../img/redux.png'
import SassIcon from '../../../../img/sass.png'
import VSCode from '../../../../img/vscode.png'
import WebpackIcon from '../../../../img/webpack.png'
import YarnIcon from '../../../../img/yarn.png'

Font.register({ family: 'maaxregular', src: '../../../../fonts/maax-regular-webfont.woff'})
Font.register({ family: 'maaxbold', src: '../../../../fonts/maax-bold-webfont.woff'})

const StyledPage = styled.Page``

const ResumeWrapper = styled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`

const ResumeLeftCol = styled.View`
  width: 30%;
  padding: 20px;
`

const ResumeDividerCol = styled.View`
  width: 1px;
  background: #dadada;
  opacity: 0.5;
`

const ResumeRightCol = styled.View`
  width: 70%;
  padding: 20px;
  border-left: 1px solid red;
`

const Name = styled.Text`
  font-family: maaxbold;
  font-size: 30px;
  text-align: center;
`

const WorkTitle = styled.Text`
  font-family: maaxregular;
  font-size: 10px;
  text-align: center;
  text-transform: uppercase;
  color: #808285;
  margin-top: 5px;
  margin-bottom: 30px;
`

const LeftColSectionHeading = styled.Text`
  font-family: maaxbold;
  font-size: 14px;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 10px;
`

const LeftColLine = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 15px;
`

const LeftColLineInner = styled.View`
  height: 1px;
  width: 80%;
  background: black;
`

const ContentItem = styled.Text`
  font-family: maaxregular;
  font-size: 8px;
  line-height: 2;
  color: #808285;
  margin-bottom: 20px;
  text-align: center;
`

const ResumeSection = styled.View`
  margin-bottom: 20px;
`

const ResumeEntry = styled.View`
  margin-bottom: 20px;
`

const SectionHeadingWrapper = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
`

const SectionHeading = styled.Text`
  font-family: maaxbold;
  font-size: 14px;
  text-transform: uppercase;
`

const SectionSubHeading = styled.Text`
  font-family: maaxbold;
  font-size: 10px;
  text-transform: uppercase;
  margin-bottom: 2px;
`

const Line = styled.View`
  height: 1px;
  margin-left: 10px;
  background: black;
  flex: auto;
`

const Duration = styled.Text`
  font-family: maaxregular;
  font-size: 8px;
  color: #010101;
  margin-bottom: 10px;
`

const Description = styled.Text`
  font-family: maaxregular;
  font-size: 8px;
  line-height: 2;
  color: #808285;
`

const ProfileImageWrapper = styled.View`
  position: relative;
  margin-bottom: 30px;
`

const ProfileImage = styled.Image``

const Icon = styled.Image`
  width: 20px;
  height: 20px;
`

const IconGrid = styled.View`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const IconGridItem = styled.View`
  width: 25%;
  margin-bottom: 10px;
`

class Resume extends Component {
  state = {
    url: null
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
      <Document>
        <StyledPage size="A4">
          <ResumeWrapper>
            <ResumeLeftCol>
              <ProfileImageWrapper>
                <ProfileImage src={ProfileImageSRC} />
              </ProfileImageWrapper>
              <Name>Carl</Name>
              <Name>Åberg</Name>
              <WorkTitle>Web developer</WorkTitle>
              <LeftColSectionHeading>Contact</LeftColSectionHeading>
              <LeftColLine>
                <LeftColLineInner />
              </LeftColLine>
              <ContentItem>mail.carl.aberg@gmail.com{'\n'}dry-lowlands-15911.herokuapp.com</ContentItem>
              <ContentItem>github.com/carlaberg{'\n'}linkedin.com/in/carl-åberg-8a65b644</ContentItem>
              <LeftColSectionHeading>Skills</LeftColSectionHeading>
              <LeftColLine>
                <LeftColLineInner />
              </LeftColLine>
              <ContentItem>HTML/CSS</ContentItem>
              <ContentItem>JAVASCRIPT</ContentItem>
              <IconGrid>
                <IconGridItem>
                  <Icon src={ReactIcon}/>
                </IconGridItem>
                <IconGridItem>
                  <Icon src={ApolloIcon}/>
                </IconGridItem>
                <IconGridItem>
                  <Icon src={NodeIcon}/>
                </IconGridItem>
                <IconGridItem>
                  <Icon src={NPMIcon}/>
                </IconGridItem>
                <IconGridItem>
                  <Icon src={ReactIcon}/>
                </IconGridItem>
              </IconGrid>
              <ContentItem>TOOLING</ContentItem>
              <ContentItem>DEVOPS</ContentItem>
              <ContentItem>OTHER</ContentItem>
              <Icon src={AgileIcon} />
            </ResumeLeftCol>
            <ResumeDividerCol />
            <ResumeRightCol>
              <ResumeSection>
                <SectionHeadingWrapper>
                  <SectionHeading>Work Experience</SectionHeading>
                  <Line />
                </SectionHeadingWrapper>
                <ResumeEntry>
                  <SectionSubHeading>Web developer @ Sould</SectionSubHeading>
                  <Duration>October 2018 - Present</Duration>
                  <Description>
                    Nulla facilisi. Suspendisse potenti. Sed non lacus quis enim ultrices molestie vitae eget tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus laoreet felis eget bibendum blandit. Duis porta tellus tellus, sed finibus est hendrerit eget. Vestibulum nec imperdiet sapien. Phasellus venenatis tempus ligula nec egestas. Nullam sagittis orci leo, in maximus nunc vestibulum sit amet. Suspendisse eget nisi sed risus maximus mollis aliquam vel ante. Nulla facilisi.    
                  </Description> 
                </ResumeEntry>
                <ResumeEntry>
                  <SectionSubHeading>Web developer @ Sould</SectionSubHeading>
                  <Duration>October 2018 - Present</Duration>
                  <Description>
                    Nulla facilisi. Suspendisse potenti. Sed non lacus quis enim ultrices molestie vitae eget tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus laoreet felis eget bibendum blandit. Duis porta tellus tellus, sed finibus est hendrerit eget. Vestibulum nec imperdiet sapien. Phasellus venenatis tempus ligula nec egestas. Nullam sagittis orci leo, in maximus nunc vestibulum sit amet. Suspendisse eget nisi sed risus maximus mollis aliquam vel ante. Nulla facilisi.    
                  </Description> 
                </ResumeEntry>
                <ResumeEntry>
                  <SectionSubHeading>Web developer @ Sould</SectionSubHeading>
                  <Duration>October 2018 - Present</Duration>
                  <Description>
                    Nulla facilisi. Suspendisse potenti. Sed non lacus quis enim ultrices molestie vitae eget tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus laoreet felis eget bibendum blandit. Duis porta tellus tellus, sed finibus est hendrerit eget. Vestibulum nec imperdiet sapien. Phasellus venenatis tempus ligula nec egestas. Nullam sagittis orci leo, in maximus nunc vestibulum sit amet. Suspendisse eget nisi sed risus maximus mollis aliquam vel ante. Nulla facilisi.    
                  </Description> 
                </ResumeEntry>
              </ResumeSection>  
              <ResumeSection>
                <SectionHeadingWrapper>
                  <SectionHeading>Education</SectionHeading>
                  <Line />
                </SectionHeadingWrapper>
                <ResumeEntry>
                  <SectionSubHeading>Web developer @ Sould</SectionSubHeading>
                  <Duration>October 2018 - Present</Duration>
                  <Description>
                    Nulla facilisi. Suspendisse potenti. Sed non lacus quis enim ultrices molestie vitae eget tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus laoreet felis eget bibendum blandit. Duis porta tellus tellus, sed finibus est hendrerit eget. Vestibulum nec imperdiet sapien. Phasellus venenatis tempus ligula nec egestas. Nullam sagittis orci leo, in maximus nunc vestibulum sit amet. Suspendisse eget nisi sed risus maximus mollis aliquam vel ante. Nulla facilisi.    
                  </Description> 
                </ResumeEntry>
                <ResumeEntry>
                  <SectionSubHeading>Web developer @ Sould</SectionSubHeading>
                  <Duration>October 2018 - Present</Duration>
                  <Description>
                    Nulla facilisi. Suspendisse potenti. Sed non lacus quis enim ultrices molestie vitae eget tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus laoreet felis eget bibendum blandit. Duis porta tellus tellus, sed finibus est hendrerit eget. Vestibulum nec imperdiet sapien. Phasellus venenatis tempus ligula nec egestas. Nullam sagittis orci leo, in maximus nunc vestibulum sit amet. Suspendisse eget nisi sed risus maximus mollis aliquam vel ante. Nulla facilisi.    
                  </Description> 
                </ResumeEntry>
                <ResumeEntry>
                  <SectionSubHeading>Web developer @ Sould</SectionSubHeading>
                  <Duration>October 2018 - Present</Duration>
                  <Description>
                    Nulla facilisi. Suspendisse potenti. Sed non lacus quis enim ultrices molestie vitae eget tellus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Phasellus laoreet felis eget bibendum blandit. Duis porta tellus tellus, sed finibus est hendrerit eget. Vestibulum nec imperdiet sapien. Phasellus venenatis tempus ligula nec egestas. Nullam sagittis orci leo, in maximus nunc vestibulum sit amet. Suspendisse eget nisi sed risus maximus mollis aliquam vel ante. Nulla facilisi.    
                  </Description> 
                </ResumeEntry>
              </ResumeSection>  
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

  render() {
    const { url } = this.state
    if (!url) return null

    return (
      <Section id="Resume">

        <Renderer.Document 
          file={url}
        >
          <Renderer.Page
            renderMode="svg"
            pageNumber={1}
            width={this.getPDFWidth()}
          />
        </Renderer.Document>
        <PDFDownloadLink document={this.renderResume()}>
          <DownloadButton
            text="Download"
            theme="light"
          />
        </PDFDownloadLink>
      </Section>    
    )
  }
};

export default Resume