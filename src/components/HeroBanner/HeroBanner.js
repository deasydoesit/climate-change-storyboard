import React from 'react';
import { Parallax } from 'react-scroll-parallax';

import { CloudLeft, CloudMiddle, CloudRight } from '../Clouds';

import './HeroBanner.css';

const HeroBanner = () => (
  <div className='parallax-hero-background'>
    <div className='parallax-hero-container'>
      <Parallax
        className="parallax-hero"
        offsetYMax={20}
        offsetYMin={-20}
        slowerScrollRate={true}
        tag="figure"
      >
        <div className='parallax-hero-content'>
          A Climate, <span className='text-rd'>Changing</span>
        </div>
      </Parallax>
      <CloudLeft />
      <CloudRight />
      <CloudMiddle />
    </div>
  </div>
);

export default HeroBanner;