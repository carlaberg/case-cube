import React, { Fragment } from 'react'

import {
  ResumeSection,
  SectionHeadingWrapper,
  SectionHeading,
  SectionSubHeading,
  Line,
  ResumeEntry,
  Description,
  ResumeItemMeta,
  ResumeItemMetaLast
} from '../styles'

const Education = () => (
  <Fragment>
    <ResumeSection>
      <SectionHeadingWrapper>
        <SectionHeading>Education</SectionHeading>
        <Line />
      </SectionHeadingWrapper>
      <ResumeEntry>
        <SectionSubHeading>Web development @ Yrgo </SectionSubHeading>
        <ResumeItemMeta>Advanced Higher Vocational Education Diploma</ResumeItemMeta>
        <ResumeItemMetaLast>August 2016 - May 2018</ResumeItemMetaLast>
        <Description>
          The web development programme at Yrgo teaches modern full stack web development. 
          In addition to language skills the programme focuses on workflow best practices, 
          both in terms of tooling and the important aspects of being in a development team such as GIT management and agile development principles.

        </Description> 
      </ResumeEntry>
      <ResumeEntry>
        <SectionSubHeading>Growth management in small and medium size enterprises (MATIX) @ University of Gothenburg School of Business, economics and Law</SectionSubHeading>
        <ResumeItemMeta>One year master's degree</ResumeItemMeta>
        <ResumeItemMetaLast>October 2018 - Present</ResumeItemMetaLast>
        <Description>
          MATIX is conducted by the institute of innovation and entrepreneurship at the School of Business, Economics and Law. 
          The goal of the education is to give the students a deep understanding of growth factors in SME:s.
          The program includes courses in business strategy, operations management, marketing, financial control and organizational studies.
        </Description> 
      </ResumeEntry>
      <ResumeEntry>
        <SectionSubHeading>Business administration @ University of Gothenburg School of Business, economics and Law</SectionSubHeading>
        <ResumeItemMeta>Bachelor's degree</ResumeItemMeta>
        <ResumeItemMetaLast>August 2008 - May 2011</ResumeItemMetaLast>
        <Description>
          Major in Marketing and 15 hec thesis about the potential for social media as a marketing tool for professional service providers. 
        </Description> 
      </ResumeEntry>
    </ResumeSection>
  </Fragment>
)

export default Education