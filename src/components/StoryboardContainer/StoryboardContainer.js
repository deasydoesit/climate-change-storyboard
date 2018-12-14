import React, { Component } from 'react';
import * as topojson from 'topojson';
import * as d3 from 'd3';


import Choropleth from '../Choropleth';
import './StoryboardContainer.css';
import stuff from './laucnty17.csv';

class StoryboardContainer extends Component {
  state = {
    data: null,
    us: null,
    color: null,
    format: d3.format(''),
  }

  componentWillMount() {
    Promise.all([
      d3.json("https://unpkg.com/us-atlas@1/us/10m.json"),
      d3.csv(stuff),
    ]).then((files) => {
      const color = d3.scaleQuantize().domain([1, 10]).range(d3.schemeBlues[9]);
      const data = new Map(files[1].map(d => [d.id, parseInt(d.rate.trim())]));
      this.setState({
        data,
        color,
        us: files[0],
      });
      console.log(this.state);
    })
  }

  componentDidUpdate() {
    const { color, format, data, us } = this.state;

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
        .text(data.title);

    g.call(d3.axisBottom(x)
        .tickSize(13)
        .tickFormat(format)
        .tickValues(color.range().slice(1).map(d => color.invertExtent(d)[0])))
      .select(".domain")
        .remove();

    svg.append("g")
      .selectAll("path")
      .data(topojson.feature(us, us.objects.counties).features)
      .enter().append("path")
        .attr("fill", d => color(data.get(d.id)))
        .attr("d", path)
      .append("title")
        .text(d => format(data.get(d.id)));

    svg.append("path")
        .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-linejoin", "round")
        .attr("d", path);
  }

  render() { 
    const { us } = this.state;

    if (!us) {
      return null;
    }

    return (
      <svg ref='anchor' width={900} height={600}/>
    );
  }
}

export default StoryboardContainer;
