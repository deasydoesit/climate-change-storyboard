// External imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import { XYPlot, XAxis, YAxis, HorizontalGridLines, VerticalGridLines, LineSeries, Hint } from 'react-vis';
import { Button } from 'reactstrap';

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
    ellipsis: " ...",
    segmentIndex: 0,
    lineGraphHeader: " atmospheric carbon dioxide emissions remained steady",
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
    const textSegments = [
      '. Dating back four hundred thousand years and into the common era, CO2 levels oscillated between 180 and 240 ppm',
      '. This pattern continued through the previous millennium up until the industrial revolution',
      '. At that point, the atmospheric CO2 concentration went parabolic, reaching levels not seen since the Earth\'s formation.'
    ]

    const segment = co2Segments[segmentIndex];

    if (segmentIndex <= 2) {
      this.setState({ 
        data: this.state.data.concat(this.state[segment]),
        lineGraphHeader: this.state.lineGraphHeader.concat(textSegments[segmentIndex]),
        segmentIndex: this.state.segmentIndex + 1,
      });
    }
  }

  render() {
    const { segmentIndex, lineGraphHeader, ellipsis } = this.state;
    return (
      <div className='graph-container'>
        {/* Graph Header */}
        <h1 className='line-graph-header'>
          <span className='line-graph-lead'>For centuries,</span>
          {lineGraphHeader}{segmentIndex === 3 ? null : ellipsis}
        </h1>
        <div className='line-graph-btn-container'>
          <Button outline color="danger" className='line-graph-btn' onClick={() => this.handleClick()} >
            <span className='icon-holder'>
              <img src="https://image.flaticon.com/icons/svg/56/56380.svg" alt="One finger tap gesture of outlined hand symbol" class="replaced-svg" /> 
            </span>
            click to continue
          </Button>
        </div>
        {/* Line Graph */}
        <XYPlot 
          animate={true}
          className='line-graph-plot'
          onMouseLeave={() => this.setState({value: false})}
          width={700} 
          height={400}
          yDomain={ segmentIndex === 3 ? null : [250, 300] }
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
      </div>
    );
  }
}

export default LineGraph;
