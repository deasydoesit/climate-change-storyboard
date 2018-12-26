import React from 'react';
import { Parallax } from 'react-scroll-parallax';

import './CloudMiddle.css';

const CloudMiddle = () => {
  return (
    <Parallax
      offsetYMin={-500}
      tag='figure'
    >
      <img 
        className='inline-image-middle'
        alt='Cloud with a transparent background scrolling over main content header'
        src='https://gallery.yopriceville.com/var/resizes/Free-Clipart-Pictures/Cloud-PNG/Realistic_Cloud_Transparent_PNG_Clip_Art_Image.png?m=1507172105' 
      />
    </Parallax>
  );
}

export default CloudMiddle;
