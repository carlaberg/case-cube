import React, { Fragment } from 'react'

import {
  ResumeSection,
  SectionHeadingWrapper,
  SectionHeading,
  SectionSubHeading,
  Line,
  ResumeEntry,
  Description,
  ResumeItemMetaLast
} from '../styles'

const WorkExperience = () => (
  <Fragment>
    <ResumeSection>
      <SectionHeadingWrapper>
        <SectionHeading>Work Experience</SectionHeading>
        <Line />
      </SectionHeadingWrapper>
      <ResumeEntry>
        <SectionSubHeading>Web developer @ Sould</SectionSubHeading>
        <ResumeItemMetaLast>October 2018 - Present</ResumeItemMetaLast>
        <Description>
          Worked as web developer on a range of projects including Wordpress development, modern javascript projects and E-commerce. As one out of two developers the work also included communicating technical possibilities and limitations internally and to customers, being part in developing Sould's digital offer and developing, pitching and selling digital solutions. My devops skills has improved during my time at Sould having dealt with things like setting up dev environments, server configuration, DNS and SSL.
        </Description> 
      </ResumeEntry>
      <ResumeEntry>
        <SectionSubHeading>Internship @ Creuna</SectionSubHeading>
        <ResumeItemMetaLast>November 2017 - August 2018</ResumeItemMetaLast>
        <Description>
          During my internship at Creuna I was a part of the frontend team. I started out carrying out small tasks within existing projects. As I got up to speed with the workflow I started to take on new projects on my own. Among the clients I worked with were Libero, Kapp-ahl, Liseberg and Santa-maria.
        </Description> 
      </ResumeEntry>
      <ResumeEntry>
        <SectionSubHeading>Web developer, selfemployed</SectionSubHeading>
        <ResumeItemMetaLast>May 2017 - June 2018</ResumeItemMetaLast>
        <Description>
          Together with a friend from Yrgo's web developer program I ran a web development business. Our biggest client was Almedals golv. We created a brand new web for them including design, backend and frontend.
        </Description>
      </ResumeEntry>
    </ResumeSection>
  </Fragment>
)

export default WorkExperience