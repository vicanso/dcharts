import * as d3 from 'd3';
import Chart from './chart';
import {
  setStyle,
} from './util';

export default class Line extends Chart {
  get name() {
    return 'line';
  }
  init(data) {
    if (this.initialized) {
      return this;
    }

    const { target } = this;
    const {
      width,
      height,
      colors,
    } = this.config;

    target.attr('width', width).attr('height', height);

    const chart = target.append('g');

    const fn = d3.line()
      .x(d => d.date)
      .y(d => d.value)
      .curve(d3.curveCatmullRom.alpha(0.5));

    const line = chart.append('path')
      .datum(data)
      .attr('d', fn);
    setStyle(line, {
      'stroke-width': 2,
      stroke: colors[0],
      fill: 'none',
    });

    this.chart = chart;
    this.initialized = true;
    return this;
  }
  render(data) {
    this.init(data);
    return this;
  }
}
