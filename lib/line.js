import * as d3 from 'd3';
import * as _ from 'lodash';
import Chart from './chart';
import Axis from './axis';

export default class Line extends Chart {
  constructor(target, config) {
    super(target, config);
    this.xAxis = null;
    this.view = {
      width: 0,
      height: 0,
    };
  }
  get name() {
    return 'line';
  }
  initXAxis() {
    const {
      target,
      view,
    } = this;
    const xAxis = new Axis(target.append('g'));
    const leftOffset = 30;
    xAxis
      .set('horizontal.width', view.width - leftOffset)
      .set('horizontal.distance', 40);
    xAxis.target.attr('transform', `translate(${leftOffset}, ${view.height - 30})`);
    const categories = this.get('xAxis.categories');
    if (categories) {
      xAxis.render(categories);
    }
    this.xAxis = xAxis;
    return this;
  }
  updateXAxis(data) {
    this.set('xAxis.categories', data);
    this.xAxis.update(data);
  }
  getRange(data) {
    const {
      yAxis,
    } = this.config;

    const getTimes = (str) => {
      const v = parseFloat(str) / 100;
      if (str.charAt(0) === '-') {
        return 1 - v;
      }
      return 1 + v;
    };

    const maxTimes = getTimes(yAxis.max);
    const minTimes = getTimes(yAxis.min);
    const result = [0, 0];
    _.forEach(data, item => {
      const max = _.ceil(d3.max(item.data) * maxTimes);
      const min = _.floor(d3.min(item.data) * minTimes);
      if (result[0] > min) {
        result[0] = min;
      }
      if (result[1] < max) {
        result[1] = max;
      }
    });
    return result;
  }
  initYAxis(data) {
    const range = this.getRange(data);
    const {
      target,
      view,
    } = this;
    const yAxis = new Axis(target.append('g'));
    yAxis.set('type', 'vertical')
      .set('pointCount', 'fixed')
      .set('vertical.height', view.height - 30);
    const count = yAxis.getDivideCount();
    const offset = _.ceil((range[1] - range[0]) / count);
    const arr = [];
    let start = range[0];
    for (let i = 0; i < count; i++) {
      arr.push(start);
      start += offset;
    }
    yAxis.render(arr.reverse());
    return this;
  }
  init(data) {
    if (this.initialized) {
      return this;
    }

    const { target } = this;
    const {
      width,
      height,
    } = this.config;

    target.attr('width', width).attr('height', height);

    this.view.height = parseInt(target.style('height'), 10);
    this.view.width = parseInt(target.style('width'), 10);

    this.initXAxis();
    this.initYAxis(data);
    // const chart = target.append('g');

    // const fn = d3.line()
    //   .x(d => d.date)
    //   .y(d => d.value)
    //   .curve(d3.curveCatmullRom.alpha(0.5));

    // const line = chart.append('path')
    //   .datum(data)
    //   .attr('d', fn);
    // setStyle(line, {
    //   'stroke-width': 2,
    //   stroke: colors[0],
    //   fill: 'none',
    // });

    // this.chart = chart;
    this.initialized = true;
    return this;
  }
  render(data) {
    this.init(data);
    return this;
  }
}
