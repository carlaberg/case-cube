import React, { Fragment } from 'react'

import {
  ResumeSection,
  SectionHeadingWrapper,
  SectionHeading,
  Line,
  Paragraph
} from '../styles'

const CoverLetter = () => (
  <Fragment>
    <ResumeSection>
      <SectionHeadingWrapper>
        <SectionHeading>Cover letter</SectionHeading>
        <Line />
      </SectionHeadingWrapper>
      <Paragraph>
        I’m a frontend developer with a passion for javascript. I attended the web development programme at Yrgo including a nine month internship at Creuna digital agency. I graduated from Yrgo in the summer of 2018 and have since been working as a web developer for Sould ad agency in Gothenburg. I have worked on a range of projects including modern javascript projects, Wordpress development and E-commerce. My personal focus at the moment is on technologies within the javascript ecosystem. React, Redux, Apollo, Node, Express and three,js are some of which I have worked with. I have also come to be comfortable with tooling like Webpack, babel and NPM.
      </Paragraph>
      <Paragraph>
        As one out of two developers at Sould the work included communicating technical possibilities and limitations internally and to customers, being part in developing Sould's digital offer and developing, pitching and selling digital solutions. My devops skills has improved during my time at Sould having dealt with things like setting up dev environments, server configuration and DNS.
      </Paragraph>
      <Paragraph>
        Before entering the web development path I studied at the University of Gothenburg School of Business, economics and Law and graduated with a one year master (4 years) in business administration. The insights from my business studies is helping me a lot in my role as web developer when interacting with clients.
      </Paragraph>
      <Paragraph>
        One of my most valuable characteristics is my wish to constantly try to improve. I feel strongly about what I do and I am determined to keep pushing myself as a developer.
      </Paragraph>
      <Paragraph>
        I look forward to learning more about the web developer position. If my skills match your requirements, please contact me at +46739134851 or mail.carl.aberg@gmail.com to schedule a meeting. Thank you.
      </Paragraph>
      <Paragraph>
        Sincerely,{'\n'}Carl Åberg
      </Paragraph>
    </ResumeSection>
  </Fragment>
)

export default CoverLetter