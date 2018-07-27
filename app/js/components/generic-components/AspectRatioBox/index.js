import React from 'react';
import { ImageWrapper } from './styles';

const AspectRatioBox = ({ className, children }) => {
  return (
    <ImageWrapper className={ className }>
      { children }
    </ImageWrapper>
  )
}

export default AspectRatioBox;
