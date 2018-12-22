// External imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import Plot from 'react-plotly.js';

// Internal imports
import co2Data from '../../data/LineGraph/co2-ppm-0-2014.csv';
import xAxis from 'react-vis/dist/plot/axis/x-axis';

class LineGraph extends Component {
   state = {
    co2Data: [],
  };

  componentDidMount() {
    Promise.all([
      d3.csv(co2Data),
    ])
    .then((files) => {
      this.setState({
        co2Data: files[0],
      })
    })
  }

  render() {
    console.log(this.state.co2Data);
    let xData = [];
    let yData = [];
    this.state.co2Data.map((obj) => {
      xData.push(parseInt(obj.Year));
      yData.push(parseInt(obj['Global Mean']))
    });

    console.log(xData, yData);

    return (
      <Plot
        data={[
          {
            x: xData,
            y: yData,
            type: 'scatter',
            mode: 'lines',
            line: {
              color: 'rgb(55, 128, 191)',
              width: 3
            }
          }
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      />
    );
  }
}

export default LineGraph;
