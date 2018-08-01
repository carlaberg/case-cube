import React from 'react';
import { SectionTag, SectionInner, SectionHeader, SectionLeft, SectionContent, SectionTitle, CenterVerticallyContainer } from './styles';
import { ThemeProvider } from 'styled-components';
import themes from './themes';

const Section = ({ id, created, children, theme , title, height, padding }) => {
  return (
    <ThemeProvider theme={ themes[ theme ] }>
      <SectionTag height={ height } padding={ padding }>
        <CenterVerticallyContainer>
          { theme !== 'bare' && (
            <SectionHeader>
              <div className="left">{ id }</div>
              <div className="center"></div>
              <div className="right"></div>
            </SectionHeader>
          )}
          <SectionInner>
            <SectionLeft>{ created }</SectionLeft>
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