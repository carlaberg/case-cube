import React from 'react';
import { WrapperStyles, Title, Description } from './styles';
import styled from 'styled-components';

const Wrapper = styled.div`${WrapperStyles}`;

const TextCard = ({ title, description, width, height }) => {
  return (
    <Wrapper 
      width={ width } 
      height={ height }>
      {(title && <Title>{ title }</Title>)}
      {(description && <Description>
        Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet, när en okänd boksättare tog att antal bokstäver och blandade dem för att göra ett provexemplar av en bok. Lorem ipsum har inte bara överlevt fem århundraden, utan även övergången till elektronisk typografi utan större förändringar. Det blev allmänt känt på 1960-talet i samband med lanseringen av Letraset-ark med avsnitt av Lorem Ipsum, och senare med mjukvaror som Aldus PageMaker
      </Description>)}
    </Wrapper>
  )
}

export default TextCard;