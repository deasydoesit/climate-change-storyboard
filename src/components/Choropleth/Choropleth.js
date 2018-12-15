// External imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import { FaPause, FaPlay, FaRedo } from 'react-icons/fa';
import * as topojson from 'topojson';

// Internal imports
import tempData from '../../data/county-temp-1979-2011.csv';
import yearData from '../../data/county-temp-years-1979-2011.json';

import './Choropleth.css';

class Choropleth extends Component {
  state = {
    color: null,
    format: d3.format(''),
    index: 0,
    shouldMapUpdate: true,
    totalTempData: null,
    us: null,
    yearTempData: null,
    years: yearData.years,
  }

  componentDidMount() {
    Promise.all([
      d3.json("https://unpkg.com/us-atlas@1/us/10m.json"),
      d3.csv(tempData),
    ])
    .then((files) => {
      const totalTempData = files[1];
      const yearTempData = new Map(files[1].map(d => [d['County Code'], d[1979]]));
      const color = d3.scaleQuantize().domain([36, 90]).range(d3.schemeReds[9]);

      this.setState({
        yearTempData,
        totalTempData,
        color,
        us: files[0],
      }, 
        () => {
          this.renderMap();
          this.startMap();
        }
      );

    })
  }

  resetMap = () => {
    console.log('resetMap');
    this.setState({ 
      index: 0, 
      shouldMapUpdate: true 
    }, () => {
      clearInterval(this.timer);
      this.startMap();
    });
  }

  pauseMap = () => {
    console.log('pauseMap');
    this.setState({ 
      shouldMapUpdate: true 
    }, () => {
      clearInterval(this.timer);
    });
  }

  startMap = () => {
    console.log('startMap')
    this.timer = setInterval(() => {
      const { color, years, index, totalTempData } = this.state;
      console.log(index);
      const yearTempData = new Map(totalTempData.map(d => [d['County Code'], d[years[index]]]));
      this.setState({
        yearTempData,
        shouldMapUpdate: years[index] === 2011,
        index: index + 1,
      }, 
        () => d3.selectAll('path.county').attr("fill", d => color(yearTempData.get(d.id)))
      );
    }, 1000);
  }

  renderMap = () => {
    const { color, format, yearTempData, us } = this.state;

    const path = d3.geoPath();

    const x = d3.scaleLinear()
      .domain(d3.extent(color.domain()))
      .rangeRound([600, 860]);

    const svg = d3.select(this.refs.anchor);

    const g = svg.append("g")
      .attr("transform", "translate(0,40)");

    g.selectAll("rect")
      .data(color.range().map(d => color.invertExtent(d)))
      .enter().append("rect")
        .attr("height", 8)
        .attr("x", d => x(d[0]))
        .attr("width", d => x(d[1]) - x(d[0]))
        .attr("fill", d => color(d[0]));

    g.append("text")
      .attr("class", "caption")
      .attr("x", x.range()[0])
      .attr("y", -6)
      .attr("fill", "#000")
      .attr("text-anchor", "start")
      .attr("font-weight", "bold")
      .text(yearTempData.title);

    g.call(d3.axisBottom(x)
        .tickSize(13)
        .tickFormat(format)
        .tickValues(color.range().slice(1).map(d => color.invertExtent(d)[0]))
      )
      .select(".domain")
        .remove();

    svg.append("g")
      .attr("class", "districts")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .enter().append("path")
        .attr("class", "county")
        .attr("fill", d => color(yearTempData.get(d.id)))
        .attr("d", path)
      .append("title")
        .text(d => {
          const countyTemp = yearTempData.get(d.id);
          return isNaN(countyTemp) ? "Missing value" : `${format(countyTemp)}f`;
          }
        );

    svg.append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);
  }

  render() { 
    return (
      <div>
        <svg ref='anchor' width={960} height={600} />
        <div 
          onClick={() => this.pauseMap()}
        >
          <FaPause className={'btn-control'}/>
        </div>
        <div 
          onClick={() => this.startMap()}
        >
          <FaPlay className={'btn-control'}/>
        </div>
        <div 
          onClick={() => this.resetMap()}
        >
          <FaRedo className={'btn-control'}/>
        </div>
      </div>
    );
  }
}

export default Choropleth;
