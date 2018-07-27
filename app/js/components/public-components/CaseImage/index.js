import React from 'react';
import { Wrapper, TextContainer } from './styles';
import TextCard from '../TextCard';
import Collapser from '../../generic-components/Collapser';
import { tabletPortrait } from '../../../../styles/breakpoints';
import AspectRatioBox from '../../generic-components/AspectRatioBox';

const CaseImage = ({ url, text }) => {  
  return (
    <Wrapper>
      <AspectRatioBox>
        <img src={ url } />
      </AspectRatioBox>
      {(text && 
        <TextContainer>
          <Collapser 
            initialHeight={ 150 }
            collapsableAt={ tabletPortrait }
          >
            <TextCard title={ text.title } description={ text.description } />
          </Collapser>          
        </TextContainer>
      )}
    </Wrapper>
  )
}

export default CaseImage;
