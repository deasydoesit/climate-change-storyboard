import React from 'react';
import { Parallax } from 'react-scroll-parallax';

import './HeroBanner.css';

const HeroBanner = () => (
  <div className='parallax-hero-background'>
    <div className='parallax-hero-container'>
      <Parallax
        className="parallax-hero"
        offsetYMax={20}
        offsetYMin={-20}
        slowerScrollRate
        tag="figure"
      >
        <div className='parallax-hero-content'>
          A Climate, Changing.
        </div>
      </Parallax>
    </div>
  </div>
);

export default HeroBanner;