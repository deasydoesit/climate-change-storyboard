// External imports
import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import Plotly from 'plotly.js';

// Internal imports
import './Choropleth.css';

class Choropleth extends Component {

  createPlot = () => {
    Plotly.d3.csv('https://raw.githubusercontent.com/plotly/datasets/master/2014_world_gdp_with_codes.csv', function(err, rows){
      function unpack(rows, key) {
          return rows.map(function(row) { return row[key]; });
      }

       var data = [{
            type: 'choropleth',
            locations: unpack(rows, 'CODE'),
            z: unpack(rows, 'GDP (BILLIONS)'),
            text: unpack(rows, 'COUNTRY'),
            colorscale: [
                [0,'rgb(5, 10, 172)'],[0.35,'rgb(40, 60, 190)'],
                [0.5,'rgb(70, 100, 245)'], [0.6,'rgb(90, 120, 245)'],
                [0.7,'rgb(106, 137, 247)'],[1,'rgb(220, 220, 220)']],
            autocolorscale: false,
            reversescale: true,
            marker: {
                line: {
                    color: 'rgb(180,180,180)',
                    width: 0.5
                }
            },
            tick0: 0,
            zmin: 0,
            dtick: 1000,
            colorbar: {
                autotic: false,
                tickprefix: '$',
                title: 'GDPBillions US$'
            }
      }];

      var layout = {
          title: '2014 Global GDP,Source:  CIA World Factbook',
          geo: {
              showframe: false,
              showcoastlines: false,
              projection:{
                  type: 'mercator'
              },
          }
      };
      Plotly.plot('myDiv', data, layout, {showLink: false});
    });
  }

  render() {
    return (
      <div id='myDiv'>
          {this.createPlot()}
      </div>
    //   <Plot
    //     data={[
    //       {
    //         x: [1, 2, 3],
    //         y: [2, 6, 3],
    //         type: 'scatter',
    //         mode: 'lines+points',
    //         marker: {color: 'red'},
    //       },
    //       {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
    //     ]}
    //     layout={{width: 320, height: 240, title: 'A Fancy Plot'}}
    //   />
    );
  }
}

export default Choropleth;
