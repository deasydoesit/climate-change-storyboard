// External imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, Hint } from 'react-vis';

// Internal imports
import co2Data500 from '../../data/LineGraph/co2-ppm-0-500.csv';
import co2Data1000 from '../../data/LineGraph/co2-ppm-500-1000.csv';
import co2Data1500 from '../../data/LineGraph/co2-ppm-1000-1500.csv';
import co2Data2000 from '../../data/LineGraph/co2-ppm-1500-2014.csv';
import co2DataTotal from '../../data/LineGraph/co2-ppm-total.csv';

import './LineGraph.css';

class LineGraph extends Component {
   state = {
    co2Data500: [],
    co2Data1000: [],
    co2Data1500: [],
    co2Data2000: [],
    co2DataTotal: [],
    data: [],
    segmentIndex: 0,
    value: false,
  };

  componentDidMount() {
    Promise.all([
      d3.csv(co2Data500),
      d3.csv(co2Data1000),
      d3.csv(co2Data1500),
      d3.csv(co2Data2000),
      d3.csv(co2DataTotal),
    ])
    .then((files) => {
      const co2DataFirst = files[0].map(d => ({ x: parseInt(d.year), y: parseInt(d.data_mean_global) }));
      const co2DataSecond = files[1].map(d => ({ x: parseInt(d.year), y: parseInt(d.data_mean_global) }));
      const co2DataThird = files[2].map(d => ({ x: parseInt(d.year), y: parseInt(d.data_mean_global) }));
      const co2DataFourth = files[3].map(d => ({ x: parseInt(d.year), y: parseInt(d.data_mean_global) }));
      const co2DataTotal = files[4].map(d => ({ x: parseInt(d.year), y: parseInt(d.data_mean_global) }));
      this.setState({
        co2Data500: co2DataFirst,
        co2Data1000: co2DataSecond,
        co2Data1500: co2DataThird,
        co2Data2000: co2DataFourth,
        co2DataTotal: co2DataTotal,
        data: co2DataFirst,
      })
    })
  }

  handleClick = () => {
    const { segmentIndex } = this.state;
    const co2Segments = ['co2Data1000', 'co2Data1500', 'co2Data2000', 'co2DataTotal'];
    const segment = co2Segments[segmentIndex];
    console.log(segmentIndex);
    if (segmentIndex <= 2) {
      this.setState({ 
        data: this.state.data.concat(this.state[segment]),
        segmentIndex: this.state.segmentIndex + 1,
      });
    }
  }

  render() {
    const { segmentIndex } = this.state;
    return (
      <div className='graph-container'>
        <button onClick={() => this.handleClick()}>
          click me
        </button>
        <XYPlot 
          animate={true}
          className='line-graph-plot'
          onMouseLeave={() => this.setState({value: false})}
          width={700} 
          height={500}
          yDomain={ segmentIndex === 3 ? null : [250, 300]}
        >
          <HorizontalGridLines />
          <VerticalGridLines />
          <XAxis />
          <YAxis />
          <LineSeries
            className='line-graph-path'
            curve={'curveMonotoneX'}
            data={this.state.data}
            onNearestX={d => this.setState({value: d})}
          />
          {this.state.value && <Hint value={this.state.value} />}
        </XYPlot>
      </div>
    );
  }
}

export default LineGraph;
