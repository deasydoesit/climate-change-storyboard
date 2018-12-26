// External imports
import React, { Component } from 'react';

// Internal imports
import HeroBanner from '../HeroBanner';
import BubbleGraph from '../BubbleGraph';
import Choropleth from '../Choropleth';
import LineGraph from '../LineGraph';

import './StoryboardContainer.css';
import map from '../../images/hero-background.png';

class StoryboardContainer extends Component {
 
  render() { 

    return (
      <div>
        <HeroBanner />
        <LineGraph />
        <div className='bubble-graph-reveal'>
          <div className='bg'>
            <div>
              Emissions of greenhouse gases warm the planet, altering the carbon and water cycles. A warmer ocean stores more heat, providing more fuel for hurricanes. A warmer atmosphere holds more water, bringing dangerous deluges. Rising sea levels threaten coastal zones.
            </div>
            <BubbleGraph />
          </div>
        </div>
        <Choropleth />
      </div>
    );
  }
}

export default StoryboardContainer;
