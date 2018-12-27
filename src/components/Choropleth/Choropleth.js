// External imports
import React, { Component } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson';

// Internal imports
import ControlButtons from './ControlButtons';
import tempData from '../../data/Choropleth/county-temp-1979-2011.csv';
import yearData from '../../data/Choropleth/county-temp-years-1979-2011.json';

import './Choropleth.css';

class Choropleth extends Component {
  state = {
    color: null,
    counties: null,
    format: d3.format(''),
    index: 0,
    isOn: false,
    showButtons: true,
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
      const counties = new Map(files[1].map(d => [d['County Code'], d['County']]));
      const color = d3.scaleQuantize().domain([36, 90]).range(d3.schemeReds[9]);

      this.setState({
        counties,
        yearTempData,
        totalTempData,
        color,
        us: files[0],
      }, 
        () => {
          this.renderMap();
        }
      );
    })
  }

  resetMap = () => {
    this.setState({ 
      index: 0, 
      isOn: true,
      showButtons: true,
    }, () => {
      clearInterval(this.timer);
      this.startMap();
    });
  }

  pauseMap = () => {
    this.setState({ 
      isOn: false 
    }, () => {
      clearInterval(this.timer);
    });
  }

  endMap = () => {
    clearInterval(this.timer);
    this.setState({ 
      isOn: false,
      showButtons: false,
      index: 32,
    });
  }

  startMap = () => {
    this.setState({isOn: this.state.years[this.state.index] !== 2011});

    this.timer = setInterval(() => {
      const { color, counties, years, index, totalTempData } = this.state;
      const isLastYear = years[index] === 2011;
      if (isLastYear) this.endMap()
      const yearTempData = new Map(totalTempData.map(d => [d['County Code'], d[years[index]]]));
      this.setState({
        yearTempData,
        index: isLastYear ? 32 : index + 1,
      }, 
        () => {
          d3.selectAll('path.county')
            .attr("fill", d => color(yearTempData.get(d.id)))
            .select("title")
              .text(d =>  {
                const county = counties.get(d.id);
                const countyTemp = yearTempData.get(d.id);
                return isNaN(countyTemp) ? "Missing value" : `${county} - ${countyTemp}F`; 
              });
        }  
      );
    }, 1000);
  }

  renderMap = () => {
    const { color, counties, format, yearTempData, us } = this.state;

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
          const county = counties.get(d.id);
          const countyTemp = yearTempData.get(d.id);
          return isNaN(countyTemp) ? "Missing value" : `${county} - ${countyTemp}F`; 
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
    const { isOn, showButtons, years, index } = this.state;

    return (
      <div className='choropleth-section-container'>

        {/* Choropleth header */}
        <div className='choropleth-header'>
          <div className='choropleth-title'>
            US County Average Yearly Temperatures in <span className='underline-year'>{years[index]}</span>
          </div>
          <ControlButtons 
            isOn={isOn}
            showButtons={showButtons}
            pauseMap={this.pauseMap}
            startMap={this.startMap}
            resetMap={this.resetMap}
          />
        </div>

        {/* Choropleth */}
        <div className='choropleth-container'>
          <svg className='choropleth-graph' ref='anchor' width={960} height={600} />
        </div>
        <div className='choropleth-data-attribute'>
          Data from the Centers for Disease Control (CDC) WONDER Program
        </div>
      </div>
    );
  }
}

export default Choropleth;
