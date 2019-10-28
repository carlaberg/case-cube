import reactPDFStyled from '@react-pdf/styled-components'
import { Page, Text, View, Document, Font, Image } from '@react-pdf/renderer'

export const ProfileImageWrapper = reactPDFStyled.View`
  position: relative;
  margin-bottom: 30px;
`

export const ProfileImage = reactPDFStyled.Image`
  margin: 0 auto;
  width: 100px;
  height: 100px;
`

export const Name = reactPDFStyled.Text`
  font-family: maaxbold;
  font-size: 30px;
  text-align: center;
`

export const WorkTitle = reactPDFStyled.Text`
  font-family: maaxregular;
  font-size: 10px;
  text-align: center;
  text-transform: uppercase;
  color: #808285;
  margin-top: 5px;
  margin-bottom: 30px;
`