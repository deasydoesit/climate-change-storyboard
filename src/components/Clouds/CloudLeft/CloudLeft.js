import React from 'react';
import { Parallax } from 'react-scroll-parallax';

import './CloudLeft.css';

const CloudLeft = () => {
  return (
    <Parallax
      className='image-container'
      offsetYMax={10}
      offsetYMin={-10}
      tag='figure'
    >
      <img 
        className='inline-image-left'
        alt='Cloud with a transparent background scrolling over main content header'
        src='https://gallery.yopriceville.com/var/resizes/Free-Clipart-Pictures/Cloud-PNG/Realistic_Cloud_PNG_Transparent_Clip_Art_Image.png?m=1507172105' 
      />
    </Parallax>
  );
}

export default CloudLeft;
