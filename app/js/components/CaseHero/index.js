import React from 'react';
import { Hero } from './styles';
import imagePlaceholder from '../base-layout/images/image-placeholder.jpg';
import { cube } from '../base-layout/images/icons';
import AspectRatioBox from '../AspectRatioBox';
import styled from 'styled-components';

const Image = styled(AspectRatioBox)`
  margin-bottom: var(--gutter-20); 
`

const CaseHero = ({ heroUrl, title }) => {
  return (
    <Hero>
      <div className="hero__inner">
        <div className="hero__content">
          <Image>
            <img src={ heroUrl || imagePlaceholder } />
          </Image>
          <h1>{ title }</h1>
          {/* <div className="hero__logo">{ cube }</div> */}
        </div>
      </div>
    </Hero>
  )
}

export default CaseHero;