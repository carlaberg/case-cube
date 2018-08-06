import React from 'react';
import CaseCube from '../CaseCube';
import { HomeComponent } from './styles';

const Home = ({ style: { opacity, scale }}) => {
  return (
      <HomeComponent style={{
        opacity: opacity.interpolate( opacity => opacity ),
        transform: scale.interpolate( scale => `scale(${ scale })` )
      }} >
        <CaseCube />
      </HomeComponent>
  )
}

export default Home;
