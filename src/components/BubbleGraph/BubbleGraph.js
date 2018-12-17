// External imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import { XYPlot, XAxis, YAxis, MarkSeries, Hint } from 'react-vis';

// Internal imports
import landData from '../../data/BubbleGraph/land-area-by-country.csv';
import populationData from '../../data/BubbleGraph/population-by-country-2000-2014.csv';
import co2Data from '../../data/BubbleGraph/co2-by-country-2000-2014.csv';

import './BubbleGraph.css';
import { FaSlidersH } from 'react-icons/fa';

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
      console.log(files);
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

  componentDidUpdate() {
    //   setTimeout(() => {
    //     this.setState({
    //         data: this.setData(2014),
    //       })
    //   }, 1000)


    // d3.selectAll('circle').each(function() {
    //     const el = this;
    //     d3.select(el.parentNode)
    //       .insert("svg")
    //       .attr("class", "wrapped")
    //       .append(function() { return el; });
    // })
    //     .attr('fill', 'url(#locked2)')

    // d3.selectAll('.wrapped')
    //   .append("defs")
    //   .append('pattern')
    //     .attr('class', 'locked2')
    //     .attr('patternUnits', 'userSpaceOnUse')
    //     .attr('width', 400)
    //     .attr('height', 400)
    //   .append("image")
    //     .attr("x", "0")
    //     .attr("y", "0")
    //     .attr("xlink:href", "https://cdn.shopify.com/s/files/1/1332/9131/products/Round_Beach_Towel_-_Patriot_-_Mimosa_24f7f284-086b-413a-8140-456915d64740.png?v=1490132816")
    //     .attr('width', 400)
    //     .attr('height', 400);
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
      sizeRange: [10, 50],
      seriesId: 'BubbleGraph',
      colorRange: colorRanges[colorType],
      opacityType: 'literal',
      data,
      onValueMouseOver: value => this.setState({value}),
    };

    return (
      <div className="plot-wrapper">
        <XYPlot
          margin={{ top:75, bottom:100, left:75}}
          onMouseLeave={() => this.setState({value: false})}
          width={960}
          height={600}
          yType='log'
          xType='log'
          noHorizontalGridLines
          noVerticalGridLines
        >
          <XAxis 
            position="end"
            title="Land area (sq. km)"
            tickLabelAngle={-45}
            tickTotal={10}
            tickFormat={ (value, i, scale, tickTotal) => {
               return `${scale.tickFormat(tickTotal, '.0s')(value)}`
            }}
          />
          <YAxis 
            position="end"
            title="Population"
            tickTotal={7}
            tickFormat={ (value, i, scale, tickTotal ) => {
                return `${scale.tickFormat(10, '.0s')(value)}`
            }}
          />
          <MarkSeries {...markSeriesProps} />
          {this.state.value 
            ? <Hint 
                align={{horizontal: 'right', vertical: 'top'}}
                value={this.state.value} 
              /> 
            : null
          }
        </XYPlot>
      </div>
    );
  }
}

export default BubbleGraph;


// To Do:
// 1) Sizes of bubbles
// 2) Background images
// 3) Change via slider
