# Climate Change Storyboard
> A collection of climate change data visualizations in a loose storyboard format.

This repository is a React application which presents D3 and React-Vis data visualizations  related to climate change. The visualizations are woven into a loose storyboard format through implementation of React and various React UI modules. 

In preparing the storyboard, my focus was to demonstrate the capabilities of React, D3, and React-Vis in creating a user-driven data exploration experience. Each of the visualizations are dynamically generated and, as such, are immediately interactive through a variety of methods of user involvement such has hovering and UI element sliding/clicking. 

## Technologies

D3 - https://d3js.org/ - JavaScript library for performing data-driven DOM manipulations.

React-Vis - https://uber.github.io/react-vis/ - JavaScript library built on top of D3 to streamline common visualizations and interactions.

## Future Improvements

- Improve UI window dressings and subtleties.
- Enhance interactive visualization effects. For example, hover interactions could generate an addendum panel which comprises even further information about the data point associated with the user interaction.
- Add more conventional storyboard content such as scroll-based interactions. Namely, time interval data changes could be presented through scrolling, rather than the iterative timer/slider approach currently implemented. One way that such an interaction method can be implemented is to generate data-driven graphs a plurality of time instances, taking an image at each instance, creating a plurality of <img> tags which are hidden/revealed upon user scrolling. 

## Data Sources

1. World Bank - https://data.worldbank.org/indicator/SP.POP.TOTL2. 
2. ETH Zurich - http://www.c2sm.ethz.ch/services/data/data-retrieval.html
3. OECD - https://stats.oecd.org
4. CDC - https://wonder.cdc.gov/NASA-NLDAS.html