import * as d3 from 'd3';
import * as _ from 'lodash';
import Chart from './chart';
import Axis from './axis';
import {
  setStyle,
} from './util';

export default class Line extends Chart {
  constructor(target, config) {
    super(target, config);
    this.view = {
      width: 0,
      height: 0,
    };
    this.values = {
      max: 0,
      min: 0,
    };
    this.lines = null;
  }
  get name() {
    return 'line';
  }
  initXAxis() {
    const {
      target,
      view,
      config,
    } = this;
    const xAxis = new Axis(target.append('g'));
    const yAxisWidth = config.yAxis.width;
    const xAxisHeight = config.xAxis.height;
    xAxis
      .set('horizontal.height', xAxisHeight)
      .set('horizontal.width', view.width - yAxisWidth)
      .set('horizontal.distance', 40);
    xAxis.target.attr('transform', `translate(${yAxisWidth}, ${view.height - xAxisHeight})`);
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
      config,
    } = this;
    const yAxis = new Axis(target.append('g'));
    const xAxisHeight = config.xAxis.height;
    yAxis.set('type', 'vertical')
      .set('pointCount', 'fixed')
      .set('vertical.width', config.yAxis.width)
      .set('vertical.height', view.height - xAxisHeight);
    const count = yAxis.getDivideCount();
    const offset = _.ceil((range[1] - range[0]) / count);
    const halfOffset = offset / 2;
    const arr = [];
    let start = range[0] + halfOffset;
    for (let i = 0; i < count; i++) {
      arr.push(start);
      start += offset;
    }

    this.values = {
      max: start - halfOffset,
      min: range[0],
    };
    yAxis.render(arr.reverse());
    return this;
  }
  renderLines(lineData) {
    const {
      view,
      config,
      target,
    } = this;
    const {
      xAxis,
      yAxis,
      style,
      colors,
    } = config;
    const {
      min,
      max,
    } = this.values;
    const width = view.width - yAxis.width;
    const height = view.height - xAxis.height;

    const offset = max - min;
    const arr = _.map(lineData, item => {
      const unitLength = width / item.data.length;
      return _.map(item.data, (v, i) => {
        const y = (1 - ((v - min) / offset)) * height;
        return {
          x: unitLength * i,
          y,
        };
      });
    });

    const chart = target.append('g')
      .attr('width', width)
      .attr('height', height)
      .attr('transform', `translate(${yAxis.width}, 0)`);
    const fn = d3.line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveCatmullRom.alpha(0.2));

    this.lines = _.map(arr, (data, i) => {
      const line = chart.append('path')
        .datum(data)
        .attr('d', fn);
      const color = colors[i % colors.length];
      setStyle(line, _.extend({
        stroke: color,
      }, style.line));
    });
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
    this.renderLines(data);
    this.initialized = true;
    return this;
  }
  render(data) {
    this.init(data);
    return this;
  }
}
