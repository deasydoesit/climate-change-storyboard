import React, { Component } from 'react';
import Slider from 'rc-slider';

import SliderHandle from '../SliderHandle';

import './HorizontalSlider.css';

class HorizontalSlider extends Component {
  
  render() {
    return (
      <div className='slider-container'>
        <Slider 
          min={2000} 
          max={2014} 
          defaultValue={2000} 
          handle={SliderHandle} 
          onChange={(v) => this.props.updateBubbleGraph(v)}
        />
        <span 
          className={`slider-hint ${this.props.hasSlid ? 'hide-slider-hint' : ''}`}
        >
          Slide to udpate graph
        </span>
      </div>
    )
  }
}

export default HorizontalSlider;
