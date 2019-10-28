import styled from 'styled-components'
import reactPDFStyled from '@react-pdf/styled-components'
import { Page, Text, View, Document, Font, Image } from '@react-pdf/renderer'
import Button from '../Button'


// Regular web styles
export const ResumeContent = styled.div`
  min-height: ${({ minHeight }) => minHeight + 'px'};
  position: relative;
  transition: opacity 0.5s ease-out;
  opacity: 0;
  ${({ loaded }) => loaded && `
    opacity: 1;
  `}
`
  
export const DownloadButton = styled(Button)``

export const Pagination = styled.div`
  padding-top: 40px;
  display: flex;
  align-items: center;
  border-top: 2px solid var(--ultra-light-grey); 
`

export const Download = styled.div`
  display: flex;
  align-items: center;
  width: 30%;
`

export const PaginationInner = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const Previous = styled(Button)`
  ${({ visible }) => !visible && `
    opacity: 0;
    pointer-events: none;
  `}
`

export const Next = styled(Button)`
  ${({ visible }) => !visible && `
    opacity: 0;
    pointer-events: none;
  `}
`

export const PageNumber = styled.span`
  font-family: 'maaxbold';
  font-size: var(--small);
  color: ${ props => props.theme.textColor };
  text-transform: uppercase;
  transform: translateY(1px);
  display: block;
`

// Styles for react-pdf primitives
Font.register({ family: 'maaxregular', src: '../../../../fonts/maax-regular-webfont.woff'})
Font.register({ family: 'maaxbold', src: '../../../../fonts/maax-bold-webfont.woff'})

export const StyledPage = reactPDFStyled.Page``

export const ResumeWrapper = reactPDFStyled.View`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`

export const ResumeLeftCol = reactPDFStyled.View`
  width: 30%;
  padding: 20px;
`

export const ResumeDividerCol = reactPDFStyled.View`
  width: 1px;
  min-height: 100%;
  background: #dadada;
  opacity: 0.5;
`

export const ResumeRightCol = reactPDFStyled.View`
  width: 70%;
  padding: 20px;
  border-left: 1px solid red;
`

export const LeftColSectionHeading = reactPDFStyled.Text`
  font-family: maaxbold;
  font-size: 14px;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 10px;
`

export const LeftColLine = reactPDFStyled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 15px;
`

export const LeftColLineInner = reactPDFStyled.View`
  height: 1px;
  width: 80%;
  background: black;
`

export const ContentItem = reactPDFStyled.Text`
  font-family: maaxregular;
  font-size: 8px;
  line-height: 2;
  color: #808285;
  margin-bottom: 15px;
  text-align: center;
`

export const ResumeSection = reactPDFStyled.View`
  margin-bottom: 15px;
`

export const ResumeEntry = reactPDFStyled.View`
  margin-bottom: 15px;
`

export const SectionHeadingWrapper = reactPDFStyled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
`

export const SectionHeading = reactPDFStyled.Text`
  font-family: maaxbold;
  font-size: 14px;
  text-transform: uppercase;
`

export const SectionSubHeading = reactPDFStyled.Text`
  font-family: maaxbold;
  font-size: 9px;
  text-transform: uppercase;
  margin-bottom: 2px;
`

export const Line = reactPDFStyled.View`
  height: 1px;
  margin-left: 10px;
  background: black;
  flex: auto;
`

export const ResumeItemMeta = reactPDFStyled.Text`
  font-family: maaxregular;
  font-size: 8px;
  color: #010101;
  line-height: 1.3;
`

export const ResumeItemMetaLast = reactPDFStyled(ResumeItemMeta)`
  margin-bottom: 10px;
`

export const Description = reactPDFStyled.Text`
  font-family: maaxregular;
  font-size: 8px;
  line-height: 2;
  color: #808285;
`

export const Paragraph = reactPDFStyled(Description)`
  margin-bottom: 15px;
`