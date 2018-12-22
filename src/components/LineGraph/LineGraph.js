// External imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import { XYPlot, XAxis, YAxis, ChartLabel, HorizontalGridLines, VerticalGridLines, LineSeries } from 'react-vis';

// Internal imports
import co2Data from '../../data/LineGraph/co2-ppm-0-2014.csv';

import './LineGraph.css';

class LineGraph extends Component {
   state = {
    co2Data: [],
  };

  componentDidMount() {
    Promise.all([
      d3.csv(co2Data),
    ])
    .then((files) => {
      const data = files[0].map(d => {
        return { 
            x: parseInt(d.Year), 
            y: parseInt(d['Global Mean'])
        };
      });
      this.setState({
         co2Data: data,
      })
    })
  }

  render() {
    console.log(this.state.co2Data)
    return (
      <div>
        <XYPlot width={960} height={600}>
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries
            className="third-series"
            curve={'curveMonotoneX'}
            data={this.state.co2Data}
          />
        </XYPlot>
      </div>
    );
  }
}

export default LineGraph;
