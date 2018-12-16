// External imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, 
    MarkSeries, Hint } from 'react-vis';

// Internal imports
import ShowcaseButton from './ShowcaseButton';
import landData from '../../data/BubbleGraph/land-area-by-country.csv';
import populationData from '../../data/BubbleGraph/population-by-country-2000-2014.csv';
import co2Data from '../../data/BubbleGraph/co2-by-country-2000-2014.csv';

import './BubbleGraph.css';

const colorRanges = {
  typeA: ['#59E4EC', '#0D676C'],
  typeB: ['#EFC1E3', '#B52F93']
};


class BubbleGraph extends Component {
  state = {
    data: null,
    totalPopData: null,
    totalCo2Data: null,
    totalLandData: null,
    value: false
  };

  componentDidMount() {
    Promise.all([
      d3.csv(landData),
      d3.csv(populationData),
      d3.csv(co2Data),
    ])
    .then((files) => {
      this.setState({
        totalLandData: files[0],
        totalPopData: files[1],
        totalCo2Data: files[2],
      }, () => {
        this.setState({
          data: this.setData(2000),
        })
      })
    })
  }

  setData = year => {
    const { totalCo2Data, totalLandData, totalPopData } = this.state;
    return new Array(32).fill(0).map((row, i) => ({
      x: parseInt(totalLandData[i].Area),
      y: parseInt(totalPopData[i][year]),
      size: parseInt(totalCo2Data[i][year]),
      color: Math.random() * 10,
      opacity: Math.random() * 0.5 + 0.5
    }));
  }

  render() {
    const { data, colorType } = this.state;

    const markSeriesProps = {
      animation: true,
      sizeRange: [5, 15],
      seriesId: 'my-example-scatterplot',
      colorRange: colorRanges[colorType],
      opacityType: 'literal',
      data,
      onNearestXY: value => this.setState({value})
    };

    return (
      <div className="plot-wrapper">
        <div className="canvas-example-controls">
          <ShowcaseButton
            // onClick={() => this.setState({data: getRandomData()})}
            buttonContent={'UPDATE DATA'}
          />
          <ShowcaseButton
            // onClick={() => this.setState({colorType: nextType[colorType]})}
            buttonContent={'UPDATE COLOR'}
          />
        </div>
        <XYPlot
          margin={{ top:75, left:75 }}
          onMouseLeave={() => this.setState({value: false})}
          width={960}
          height={600}
          yType='log'
          xType='log'
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis 
            tickLabelAngle={-45}
          />
          <YAxis />
          <MarkSeries {...markSeriesProps} />
          {this.state.value ? <Hint value={this.state.value} /> : null}
        </XYPlot>
      </div>
    );
  }
}

export default BubbleGraph;
