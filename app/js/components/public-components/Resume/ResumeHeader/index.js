import React, { Fragment } from 'react'
import ProfileImageSRC from '../../../../../img/profile-image.png'

import {
  ProfileImageWrapper,
  ProfileImage,
  Name,
  WorkTitle
} from './styles'

import {
  LeftColSectionHeading,
  LeftColLine,
  LeftColLineInner,
  ContentItem
} from '../styles'

const ResumeHeader = () => (
  <Fragment>
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
    <ContentItem>+46 739 13 48 51</ContentItem>
    <ContentItem>mail.carl.aberg@gmail.com{'\n'}dry-lowlands-15911.herokuapp.com</ContentItem>
    <ContentItem>github.com/carlaberg{'\n'}linkedin.com/in/carlåberg</ContentItem>
  </Fragment>
)

export default ResumeHeader