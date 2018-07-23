import React from 'react';
import { SectionTag, SectionInner, SectionHeader, SectionContent } from './styles';

const Section = props => {
  return (
    <SectionTag>
      <SectionHeader>
        <div className="left">{props.id}</div>
        <div className="center"></div>
        <div className="right"></div>
      </SectionHeader>
      <SectionInner>
        <SectionContent>
          {props.children}
        </SectionContent>
      </SectionInner>
    </SectionTag>
  )
}

export default Section;