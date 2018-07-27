import React from 'react';
import { SectionTag, SectionInner, SectionHeader, SectionContent, SectionTitle, CenterVerticallyContainer } from './styles';
import { ThemeProvider } from 'styled-components';
import themes from './themes';

const Section = ({ id, children, theme , title, height }) => {
  return (
    <ThemeProvider theme={ themes[ theme ] }>
      <SectionTag height={ height }>
        <CenterVerticallyContainer>
          <SectionHeader>
            <div className="left">{ id }</div>
            <div className="center"></div>
            <div className="right"></div>
          </SectionHeader>
          <SectionInner>
            <SectionContent>
              {( title &&
                <SectionTitle>
                  { (title && title )}
                </SectionTitle>
              )}
              { children }
            </SectionContent>
          </SectionInner>
        </CenterVerticallyContainer>
      </SectionTag>
    </ThemeProvider>
  )
}

Section.defaultProps = {
  theme: "light"
}

export default Section;