import React, { Component, Fragment } from 'react';
import { GalleryWrapper, GalleryItem, GalleryImage, FeaturedImage } from './styles';
import Modal from '../../generic-components/Modal';
import Toggle from '../../generic-components/Toggle';

class FancyGallery extends Component {
  state = {
    featuredImage: ''
  }
  
  getFeaturedImage(e, toggle) {
    const featuredImage = e.target.getAttribute('src');
    this.setState({ featuredImage });
    toggle();
    
  }
  
  renderItems(toggle) {
    const { images } = this.props;
    
    return images.map((image, index) => (
      <GalleryItem key={ index } imageCount={images.length} onClick={e => this.getFeaturedImage(e, toggle)}>
        <GalleryImage src={ image.src } />
      </GalleryItem>
    ))
  }
  
  render() {
    const { featuredImage } = this.state;
    return (
      <GalleryWrapper>
        <Toggle>
          {({ on, toggle }) => {
            return (
              <Fragment>
                { this.renderItems(toggle) }
                  <Modal toggle={ toggle } on={ on }>
                    {() => (
                      <FeaturedImage src={ featuredImage } />
                    )}
                  </Modal>
              </Fragment>
            )
          }}
        </Toggle>
      </GalleryWrapper>
    )
  }  
}

export default FancyGallery;