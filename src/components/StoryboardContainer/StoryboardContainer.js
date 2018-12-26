// External imports
import React, { Component } from 'react';

// Internal imports
import HeroBanner from '../HeroBanner';
import BubbleGraph from '../BubbleGraph';
import Choropleth from '../Choropleth';
import LineGraph from '../LineGraph';

import './StoryboardContainer.css';

class StoryboardContainer extends Component {
 
  render() { 

    return (
      <div>
        <HeroBanner />
        <LineGraph />
        <BubbleGraph />
        <Choropleth />
      </div>
    );
  }
}

export default StoryboardContainer;
