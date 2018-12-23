import React from 'react';
import { Parallax } from 'react-scroll-parallax';

import './CloudRight.css';

const CloudRight = () => {
  return (
    <Parallax
      className='image-container'
      offsetYMax={10}
      offsetYMin={-50}
      tag='figure'
    >
      <img 
        className='inline-image-right'
        src='https://gallery.yopriceville.com/var/resizes/Free-Clipart-Pictures/Cloud-PNG/Cloud_Clip_Art_PNG_Image.png?m=1507172105' 
      />
    </Parallax>
  );
}

export default CloudRight;
