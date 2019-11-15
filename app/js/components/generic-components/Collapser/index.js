import React, { Component } from 'react';
import { Wrapper, InnerWrapper, ContentContainer, Toggler, Gradient } from './styles';

class Collapser extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      isOpen: false,
      initialHeight: null
    }
    
    this.contentContainerRef = React.createRef();
  }
  
  componentDidMount() {
    window.addEventListener('load', () => { this.contentHeight = this.getContentHeight(); });
    this.checkInitialHeight();
  }  
  
  getContentHeight() {
    const { children } = this.contentContainerRef.current;

    return Array.from(children)
      .map(item => item.offsetHeight)
      .reduce((acc, current) => acc + current);  
  }
  
  checkInitialHeight() {
    const initialHeight = this.props.initialHeight > this.getContentHeight() ? this.getContentHeight() : this.props.initialHeight;
    this.setState({ initialHeight }); 
  }
  
  render() {
    const { children, collapsableAt } = this.props;
    const { isOpen, initialHeight } = this.state;
    
    return (
      <Wrapper onClick={() => this.setState({ isOpen: !isOpen })}>
        <InnerWrapper
          isOpen={ isOpen }
          initialHeight={ initialHeight }
          contentHeight={ this.contentHeight }
          collapsableAt={ collapsableAt }
          >
            <ContentContainer ref={ this.contentContainerRef }>
              { children }
            </ContentContainer>
        </InnerWrapper>
            <Gradient 
              isOpen={ isOpen }
              collapsableAt={ collapsableAt }
            >
              <Toggler
                isOpen={ isOpen }
                >
                  <span>+</span>
                </Toggler>
            </Gradient>
      </Wrapper>
    )
  }
}

export default Collapser;