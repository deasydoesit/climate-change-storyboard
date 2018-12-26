// External imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, Hint } from 'react-vis';

// Internal imports
import co2DataTotal from '../../data/LineGraph/co2-ppm-total.csv';

import './LineGraph.css';

class LineGraph extends Component {
   state = {
    data: [],
    ellipsis: " ...",
    segmentIndex: 0,
    lineGraphHeader: " global levels of carbon dioxide in the atmosphere remained steady",
    value: false,
  };

  componentDidMount() {
    Promise.all([
      d3.csv(co2DataTotal),
    ])
    .then((files) => {
      const co2DataTotal = files[0].map(d => ({ x: parseInt(d.year), y: parseInt(d.data_mean_global) }));
      this.setState({
        data: co2DataTotal,
      })
    })
  }

  render() {
    return (
      <div className='line-graph-backgound'>
        <div className='line-graph-container'>

          {/* Graph Header */}
          <h1 className='line-graph-header'>
            <span className='line-graph-lead'>For centuries</span>
            , global levels of carbon dioxide in the atmosphere remained steady. Dating back four hundred thousand years and into the common era, CO2 levels oscillated between 180 and 240 ppm. This pattern continued through the previous millennium up until the industrial revolution. At that point, the atmospheric CO2 concentration went parabolic, reaching levels not seen since the Earth's formation.
          </h1>

          {/* Line Graph */}
          <XYPlot 
            animate={true}
            className='line-graph-plot'
            onMouseLeave={() => this.setState({value: false})}
            width={700} 
            height={400}
            yDomain={ [270, 400] }
          >
            <HorizontalGridLines />
            <VerticalGridLines />
            <XAxis 
              position="end"
              title="Year"
            />
            <YAxis 
              position="end"
              title="Carbon dioxide level (ppm)"
            />
            <LineSeries
              className='line-graph-path'
              curve={'curveMonotoneX'}
              data={this.state.data}
              onNearestX={d => this.setState({value: d})}
            />
            {this.state.value && <Hint value={this.state.value} />}
          </XYPlot>
          <span className='line-graph-data-attribute'>
            Data from the Institute for Atmospheric and Climate Science (IAC) at Eidgenössische Technische Hochschule in Zürich, Switzerland
          </span>
        </div>
      </div>
    );
  }
}

export default LineGraph;
