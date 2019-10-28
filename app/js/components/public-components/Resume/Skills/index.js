import React, { Fragment } from 'react'
import {
  SkillsSubHeading,
  Icon,
  IconGrid,
  IconGridItem,
  IconTitle
} from './styles'

import {
  LeftColSectionHeading,
  LeftColLine,
  LeftColLineInner
} from '../styles'

import BEMIcon from '../../../../../img/bem.png'
import StyledComponentsIcon from '../../../../../img/styled-components.png'
import AgileIcon from '../../../../../img/agile.png'
import ApolloIcon from '../../../../../img/apollo.png'
import BabelIcon from '../../../../../img/babel.png'
import DockerIcon from '../../../../../img/docker.png'
import EslintIcon from '../../../../../img/eslint.png'
import GitIcon from '../../../../../img/git.png'
import GraphQLIcon from '../../../../../img/graphql.png'
import NodeIcon from '../../../../../img/node.png'
import NPMIcon from '../../../../../img/npm.png'
import ReactIcon from '../../../../../img/react.png'
import ReduxIcon from '../../../../../img/redux.png'
import SassIcon from '../../../../../img/sass.png'
import VSCodeIcon from '../../../../../img/vscode.png'
import WebpackIcon from '../../../../../img/webpack.png'
import YarnIcon from '../../../../../img/yarn.png'
import NginxIcon from '../../../../../img/nginx.png'
import DigitalOceanIcon from '../../../../../img/digital-ocean.png'
import ExpressIcon from '../../../../../img/express.png'

const Skills = () => (
  <Fragment>
    <LeftColSectionHeading>Skills</LeftColSectionHeading>
    <LeftColLine>
      <LeftColLineInner />
    </LeftColLine>
    <SkillsSubHeading>HTML/CSS</SkillsSubHeading>
    <IconGrid>
      <IconGridItem>
        <Icon src={BEMIcon}/>
        <IconTitle>BEM</IconTitle>
      </IconGridItem>
      <IconGridItem>
        <Icon src={SassIcon}/>
        <IconTitle>Sass</IconTitle>
      </IconGridItem>
      <IconGridItem>
        <Icon src={StyledComponentsIcon}/>
        <IconTitle>Styled</IconTitle>
      </IconGridItem>
    </IconGrid>
    <SkillsSubHeading>JAVASCRIPT</SkillsSubHeading>
    <IconGrid>
      <IconGridItem>
        <Icon src={ReactIcon}/>
        <IconTitle>React</IconTitle>
      </IconGridItem>
      <IconGridItem>
        <Icon src={ApolloIcon}/>
        <IconTitle>Apollo</IconTitle>
      </IconGridItem>
      <IconGridItem>
        <Icon src={NodeIcon}/>
        <IconTitle>Node</IconTitle>
      </IconGridItem>
      <IconGridItem>
        <Icon src={ExpressIcon}/>
        <IconTitle>Express</IconTitle>
      </IconGridItem>
      <IconGridItem>
        <Icon src={ReduxIcon}/>
        <IconTitle>Redux</IconTitle>
      </IconGridItem>
    </IconGrid>
    <SkillsSubHeading>TOOLING</SkillsSubHeading>
    <IconGrid>
      <IconGridItem> 
        <Icon src={WebpackIcon}/>
        <IconTitle>Webpack</IconTitle>
      </IconGridItem>
      <IconGridItem>
        <Icon src={BabelIcon}/>
        <IconTitle>Babel</IconTitle>
      </IconGridItem>
      <IconGridItem>
        <Icon src={NPMIcon}/>
        <IconTitle>NPM</IconTitle>
      </IconGridItem>
      <IconGridItem>
        <Icon src={YarnIcon}/>
        <IconTitle>Yarn</IconTitle>
      </IconGridItem>
      <IconGridItem>
        <Icon src={EslintIcon}/>
        <IconTitle>Eslint</IconTitle>
      </IconGridItem>
      <IconGridItem>
        <Icon src={VSCodeIcon}/>
        <IconTitle>VS Code</IconTitle>
      </IconGridItem>
    </IconGrid>
    <SkillsSubHeading>DEVOPS</SkillsSubHeading>
    <IconGrid>
      <IconGridItem>
        <Icon src={DockerIcon}/>
        <IconTitle>Docker</IconTitle>
      </IconGridItem>
      <IconGridItem>
        <Icon src={NginxIcon}/>
        <IconTitle>Nginx</IconTitle>
      </IconGridItem>
      <IconGridItem>
        <Icon src={DigitalOceanIcon}/>
        <IconTitle>Digital Ocean</IconTitle>
      </IconGridItem>
    </IconGrid>
    <SkillsSubHeading>OTHER</SkillsSubHeading>
    <IconGrid>
      <IconGridItem>
        <Icon src={GitIcon}/>
        <IconTitle>Git</IconTitle>
      </IconGridItem>
      <IconGridItem>
        <Icon src={AgileIcon}/>
        <IconTitle>Agile</IconTitle>
      </IconGridItem>
      <IconGridItem>
        <Icon src={GraphQLIcon}/>
        <IconTitle>GraphQL</IconTitle>
      </IconGridItem>
    </IconGrid>
  </Fragment>
)

export default Skills