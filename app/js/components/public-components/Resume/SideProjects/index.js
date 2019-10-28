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

const WorkExperience = () => (
  <Fragment>
    <ResumeSection>
      <SectionHeadingWrapper>
        <SectionHeading>Side projects</SectionHeading>
        <Line />
      </SectionHeadingWrapper>
      <ResumeEntry>
        <SectionSubHeading>Voice List</SectionSubHeading>
        <ResumeItemMeta>A voice command list app</ResumeItemMeta>
        <ResumeItemMetaLast>github.com/carlaberg/voice-list</ResumeItemMetaLast>
        <Description>
          Voice list started as an experiment with the web speech api.
          I was impressed how accurate it was and wanted to explore the possibilities of building voice powered app interface.
          A list app seemed like a fun use case. I could actually be quite handy to be able stand by the fridge and have the app pick up the items on the shoppinglist as you speak them out loud.
          I'm using Node, MongoDB and GraphQL Yoga to build a graphql api. For the frontend I use Next.js and Apollo Client.
        </Description> 
      </ResumeEntry>
      <ResumeEntry>
        <SectionSubHeading>Lunch crawler</SectionSubHeading>
        <ResumeItemMeta>A Tinder like mobile app for finding a nice lunch place</ResumeItemMeta>
        <ResumeItemMetaLast>github.com/carlaberg/lunchcrawler-app-expo</ResumeItemMetaLast>
        <Description>
          The original idea was to make a web crawler that could scrape today's lunch menu off of local restaurants' websites and turn them into a lunch api.
          I turned out most of the restaurants used some kind of wysiwyg to render the menu. The DOM structure of the generated code had to many irregularities
          which made it almost impossible to catch the right data with the crawling library. I found an existing where restaurants could sign up and publish their menus and luckily their api was open for external access.
          Since I was using React Native to build the app interface I was able to access the current position of the user. I would then post the coordinates and get back the menus of local restaurants.
          The tinder like interface is build with React Native primitives for handling gestures and I used Expo to bootstrap the dev environment.
        </Description> 
      </ResumeEntry>
    </ResumeSection>
    <ResumeSection>
      <SectionHeadingWrapper>
        <SectionHeading>References</SectionHeading>
        <Line />
      </SectionHeadingWrapper>
      <ResumeEntry>
        <SectionSubHeading>Pierre Skoldborg</SectionSubHeading>
        <ResumeItemMeta>Work title: Frontend developer at Creuna</ResumeItemMeta>
        <ResumeItemMeta>Phone: 073-2065802</ResumeItemMeta>
        <ResumeItemMeta>Email: pierre.skoldborg@creuna.se</ResumeItemMeta>
      </ResumeEntry>
      <ResumeEntry>
        <SectionSubHeading>Vincent Klaiber</SectionSubHeading>
        <ResumeItemMeta>Work title: Full stack developer and teacher</ResumeItemMeta>
        <ResumeItemMeta>Phone: 070-8868018</ResumeItemMeta>
        <ResumeItemMeta>Email: vincent.klaiber@educ.goteborg.se</ResumeItemMeta>
      </ResumeEntry>
    </ResumeSection>
  </Fragment>
)

export default WorkExperience