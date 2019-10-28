import reactPDFStyled from '@react-pdf/styled-components'
import { Page, Text, View, Document, Font, Image } from '@react-pdf/renderer'

export const SkillsSubHeading = reactPDFStyled.Text`
  display: block;
  font-family: maaxregular;
  font-size: 6px;
  color: black;
  margin-bottom: 7px;
  text-align: center;
  border: 1px solid black;
  padding-top: 4px;
`

export const Icon = reactPDFStyled.Image`
width: 13px;
height: 13px;
display: block;
`

export const IconGrid = reactPDFStyled.View`
display: flex;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
`

export const IconGridItem = reactPDFStyled.View`
display: flex;
flex-direction: column;
align-items: center;
width: 25%;
margin-bottom: 10px;
`

export const IconTitle = reactPDFStyled.Text`
font-family: maaxregular;
font-size: 6px;
color: #808285;
margin-top: 5px;
`