// External imports
import React, { Component } from 'react';
import * as topojson from 'topojson';
import * as d3 from 'd3';

// Internal imports
import tempData from '../../data/county-temp-1979-2011.csv';
import './Choropleth.css';

class Choropleth extends Component {
  state = {
    rawData: null,
    data: null,
    us: null,
    color: null,
    format: d3.format(''),
    shouldUpdate: true,
  }

  componentDidMount() {
    Promise.all([
      d3.json("https://unpkg.com/us-atlas@1/us/10m.json"),
      d3.csv(tempData),
    ]).then((files) => {
      const rawData = files[1];
      const data = new Map(files[1].map(d => [d['County Code'], d[1979]]));
      const color = d3.scaleQuantize().domain([36, 90]).range(d3.schemeReds[9]);

      this.setState({
        data,
        rawData,
        color,
        us: files[0],
      }, () => this.renderMap());
    })
  }

  componentDidUpdate() {
    const { color, format } = this.state;
    if (this.state.shouldUpdate) {
      setTimeout(() => {
        const data = new Map(this.state.rawData.map(d => [d['County Code'], d[1999]]));
        this.setState({
          data,
          shouldUpdate: false,
        }, () => {
          d3.selectAll('path.county')
          .attr("fill", d => color(data.get(d.id)))
          .append("title")
            .text(d => format(data.get(d.id)));
        });
      }, 1000)
    }
  }

  renderMap() {
    console.log(this.state)
    const { color, format, data, us } = this.state;

    const path = d3.geoPath();

    const x = d3.scaleLinear()
      .domain(d3.extent(color.domain()))
      .rangeRound([600, 860]);

    const svg = d3.select(this.refs.anchor)
      .style("width", "100%")
      .style("height", "auto");

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
      <svg ref='anchor' width={960} height={600} />
    );
  }
}

export default Choropleth;
