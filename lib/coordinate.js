import * as d3 from 'd3';
import * as _ from 'lodash';
import Chart from './chart';
import Axis from './axis';
import Legend from './legend';
import {
  setStyle,
} from './util';

export default class Coordinate extends Chart {
  constructor(target, config) {
    super(target, config);
    this.view = {
      width: 0,
      height: 0,
    };
    this.values = {
      max: 0,
      min: 0,
      pointCount: 0,
    };
    this.disabledList = [];
    this.legend = null;
    this.xAxis = null;
    this.yAxis = null;
    const margin = this.get('margin');
    if (margin) {
      this.chart.attr('transform', `translate(${margin.left || 0}, ${margin.top || 0})`);
    }
  }
  get name() {
    return 'coordinate';
  }
  isDisabled(index) {
    return _.indexOf(this.disabledList, index) !== -1;
  }
  getYAxisData() {
    const {
      data,
      yAxis,
    } = this;
    const range = this.getRange(data);
    const lineView = this.getLineView();
    const count = _.ceil(lineView.height / yAxis.get('vertical.distance'));
    const offset = _.ceil((range[1] - range[0]) / count);
    const arr = [];
    let start = range[0];
    for (let i = 0; i <= count; i++) {
      arr.push(start);
      start += offset;
    }
    return arr;
  }
  updateXAxis(data) {
    this.set('xAxis.categories', data);
    this.xAxis.update(data);
    return this;
  }
  getLineView() {
    const {
      config,
      view,
    } = this;
    const margin = config.margin;
    const x = margin.left + config.yAxis.width;
    const y = margin.top + config.title.height;
    return {
      x,
      y,
      width: view.width - x - margin.right,
      height: view.height - y - margin.bottom - config.xAxis.height - config.legend.height,
    };
  }
  getRange(data) {
    const {
      yAxis,
    } = this.config;

    const getTimes = (str) => {
      // if is number, the value is to be set
      if (_.isNumber(str)) {
        return 0;
      }
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
      let max = yAxis.max;
      let min = yAxis.min;
      if (_.isString(max)) {
        max = _.ceil(d3.max(item.data) * maxTimes);
      }
      if (_.isString(min)) {
        min = _.floor(d3.min(item.data) * minTimes);
      }
      if (result[0] > min) {
        result[0] = min;
      }
      if (result[1] < max) {
        result[1] = max;
      }
    });
    return result;
  }
  initXAxis() {
    const {
      chart,
      view,
      config,
    } = this;
    const categories = this.get('xAxis.categories');
    const xAxis = new Axis(chart);
    const yAxisWidth = config.yAxis.width;
    const xAxisHeight = config.xAxis.height;
    const lineView = this.getLineView();
    const translateY = view.height - xAxisHeight - config.margin.bottom - config.legend.height;
    xAxis
      .set('horizontal', {
        align: this.get('xAxis.align', 'left'),
        height: xAxisHeight,
        width: lineView.width,
        distance: 30,
      });
    xAxis.chart.attr('transform', `translate(${yAxisWidth}, ${translateY})`);
    if (categories) {
      xAxis.render(categories);
    }
    this.xAxis = xAxis;
    return this;
  }
  initYAxis() {
    const {
      chart,
      config,
      values,
    } = this;
    const yAxis = new Axis(chart);
    const lineView = this.getLineView();
    yAxis.set('type', 'vertical')
      .set('pointCount', 'fixed')
      .set('vertical.width', config.yAxis.width)
      .set('vertical.height', lineView.height);
    yAxis.chart.attr('transform', `translate(0, ${lineView.y})`);
    this.yAxis = yAxis;
    const yAxisData = this.getYAxisData();
    values.max = _.last(yAxisData);
    values.min = _.first(yAxisData);
    yAxis.render(yAxisData);
    const yAxisTitle = this.get('yAxis.title.text');
    if (yAxisTitle) {
      const text = chart.append('text')
        .text(yAxisTitle);
      setStyle(text, config.style.yAxisTitle);
      const bBox = text.node().getBBox();
      const top = config.margin.top + lineView.y;
      const y = top + ((lineView.height - bBox.height) / 2) + (bBox.width / 2);
      text.attr('transform', `translate(10, ${y}) rotate(270)`);
    }
    return this;
  }
  updateYAxis() {
    const {
      yAxis,
      values,
    } = this;
    const yAxisData = this.getYAxisData();
    values.max = _.last(yAxisData);
    values.min = _.first(yAxisData);
    yAxis.update(yAxisData);
    return this;
  }
  initGrid() {
    const {
      yAxis,
      chart,
      config,
      view,
    } = this;
    const lineView = this.getLineView();
    const margin = config.margin;
    const count = _.ceil(lineView.height / yAxis.get('vertical.distance'));
    const grid = chart.append('g');
    const distance = lineView.height / count;
    let gridLineY = lineView.y;
    for (let i = 0; i < count; i++) {
      const line = grid.append('path')
        .attr('d', `M${config.yAxis.width},${gridLineY}H${view.width - margin.right}`);
      setStyle(line, config.style.grid);
      gridLineY += distance;
    }
    return this;
  }
  addTitle() {
    const {
      chart,
      config,
      view,
    } = this;
    const title = this.get('title');
    const text = chart.append('text')
      .attr('text-anchor', 'middle')
      .text(title.text);
    setStyle(text, config.style.title);
    const bBox = text.node().getBBox();
    const x = ((view.width - bBox.width) / 2) - bBox.x;
    const y = ((title.height - bBox.height) / 2) - bBox.y;
    text.attr('transform', `translate(${x}, ${y})`);
    return this;
  }
  addLegend() {
    const {
      view,
      config,
      data,
    } = this;
    const legend = new Legend(this.chart);
    legend.render(_.map(data, item => item.name));
    const legendView = legend.view;
    const translateX = (view.width - legendView.width) / 2;
    const translateY = view.height - config.legend.height - (legendView.height / 2);
    legend.chart.attr('transform', `translate(${translateX}, ${translateY})`);
    this.legend = legend;
    return this;
  }
  render(data) {
    this.data = data;
    this.init();
    return this;
  }
  init() {
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
    this.addTitle();
    this.initXAxis();
    this.initYAxis();
    this.initGrid();
    this.initialized = true;
    return this;
  }
}
