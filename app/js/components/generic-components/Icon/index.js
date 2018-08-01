import React from 'react';
import icons from '../../public-components/base-layout/images/icons';

const Icon = ({ name }) => {
  return icons[ name ]();
}

export default Icon;