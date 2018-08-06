import React, { Component } from 'react';
import { Hero, HeroImage, HeroTitleBox, HeroTitle } from './styles';
import { Spring, config } from 'react-spring';
import imagePlaceholder from '../base-layout/images/image-placeholder.jpg';
import AspectRatioBox from '../../generic-components/AspectRatioBox';
import styled from 'styled-components';

const Image = styled(AspectRatioBox)`
  margin-bottom: var(--gutter-20); 
`

class CaseHero  extends Component {
  state = { mounted: null }
  componentDidMount() {
      this.setState({ mounted: true })
  }
  render() {
    const { heroUrl, title } = this.props;
    const { mounted } = this.state;
    return (
      <Spring
        native
        from={{ 
          opacity:  0,
          imageMove: -200,
          textBoxMove: 200,
          titleMove: 50
        }}
        to={{ 
          opacity:  mounted ? 1 : 0,
          imageMove: mounted ? 0 : -200, 
          textBoxMove: mounted ? 40 : 200, 
          titleMove: mounted ? 0 : 50 
        }}
        config={{ tension: 1, friction: 10 }}
      >
        { ({ opacity, imageMove, textBoxMove, titleMove }) => (
          <Hero style={{
            opacity: opacity.interpolate( opacity => opacity)
          }}>
            <div className="hero__inner">
              <div className="hero__content">
                <HeroImage style={{
                  transform: imageMove.interpolate( x => `translate3d(${x}px, 0px, 0px)` )
                }}>
                  <Image>
                    <img src={ heroUrl || imagePlaceholder } />
                  </Image>
                </HeroImage>
                <HeroTitleBox style={{
                  transform: textBoxMove.interpolate( x => `translate3d(${x}px, 0px, 0px)` )
                }}>
                  <HeroTitle style={{
                    transform: titleMove.interpolate( y => `translate3d(0px, ${y}px, 0px)` )
                  }}>{ title }</HeroTitle>
                </HeroTitleBox>
              </div>
            </div>
          </Hero>
        )}
      </Spring>
      
    )
  }
}

export default CaseHero;