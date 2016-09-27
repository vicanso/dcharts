import * as d3 from 'd3';
import * as _ from 'lodash';
import Chart from './chart';

export default class Heatmap extends Chart {
  constructor(target, config) {
    super(target, config);
  }
  get name() {
    return 'heatmap';
  }
  init() {
    if (this.initialized) {
      return this;
    }
    this.initialized = true;
    return this;
  }
  render(data) {
    this.init();
    return this.update(data);
  }
  update(data) {
    const {
      chart,
    } = this;
    const {
      heat,
      row,
      column,
      colors,
    } = this.config;
    let x = 0;
    let y = 0;
    const heatWidth = heat.width;
    const heatHeight = heat.height;
    const heatSpacing = heat.spacing;
    const colorGen = d3.interpolateHcl(colors[0], colors[1]);
    _.forEach(data, (item, i) => {
      chart.append('rect')
        .attr('width', heatWidth)
        .attr('height', heatHeight)
        .attr('x', x)
        .attr('y', y)
        .style('fill', colorGen(i / data.length));
      if (i && (i + 1) % column === 0) {
        y += (heatHeight + heatSpacing);
        x = 0;
      } else {
        x += (heatWidth + heatSpacing);
      }
    });
    
    return this;
  }
}
