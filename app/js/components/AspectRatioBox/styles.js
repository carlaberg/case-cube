import styled from 'styled-components';

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  overflow: hidden;
  padding-top: 56.25%;
  
  & > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
