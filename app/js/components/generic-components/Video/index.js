import React, { Component } from 'react';
import { VideoElement } from './styles';

class Video extends Component {
  render() {
    const { src } = this.props;
    
    return (
      <VideoElement controls>
        <source src={ src } />
      </VideoElement>
    )
  }
}

export default Video;