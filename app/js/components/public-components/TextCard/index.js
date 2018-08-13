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
      {(description && <Description>{ description }</Description>)}
    </Wrapper>
  )
}

export default TextCard;