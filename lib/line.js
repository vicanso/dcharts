import * as d3 from 'd3';
import * as _ from 'lodash';
import Chart from './chart';
import Axis from './axis';
import Tooltip from './tooltip';
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
      pointCount: 0,
    };
    this.currentIndex = -1;
    this.lines = null;
    this.auxiliaryItems = null;
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
      .set('horizontal', {
        align: 'left',
        height: xAxisHeight,
        width: view.width - yAxisWidth,
        distance: 40,
      });
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
      values,
    } = this;
    const yAxis = new Axis(target.append('g'));
    const xAxisHeight = config.xAxis.height;
    yAxis.set('type', 'vertical')
      .set('pointCount', 'fixed')
      .set('vertical.width', config.yAxis.width)
      .set('vertical.height', view.height - xAxisHeight);
    const count = _.ceil((view.height - xAxisHeight) / yAxis.get('vertical.distance'));
    const offset = _.ceil((range[1] - range[0]) / count);
    const arr = [];
    let start = range[0];
    for (let i = 0; i < count; i++) {
      arr.push(start);
      start += offset;
    }

    values.max = start;
    values.min = range[0];
    yAxis.render(arr);
    return this;
  }
  renderLabels(offset) {
    const {
      config,
      values,
      view,
      tooltip,
    } = this;
    const yAxisWidth = config.yAxis.width;
    const width = view.width - yAxisWidth;
    const height = view.height - config.xAxis.height;
    const currentX = offset[0] - yAxisWidth;
    const pointCount = values.pointCount;
    const index = _.round((currentX / width) * (pointCount - 1));
    if (index === this.currentIndex) {
      return this;
    }
    let str = '';
    let dy = 0;
    const colors = config.colors;
    const symbols = this.auxiliaryItems.symbols;
    const rangeSize = values.max - values.min;
    _.forEach(this.data, (item, i) => {
      const color = colors[i % colors.length];
      const v = item.data[index];
      const docHtml = `<tspan style="fill:${color}" x="4" dy="${dy}">●</tspan>`;
      const nameHtml = `<tspan dx="2">${item.name}:</tspan>`;
      const valueHtml = `<tspan style="font-weight:bold" dx="2">${v}</tspan>`;
      str += (docHtml + nameHtml + valueHtml);
      if (!dy) {
        dy = 15;
      }
      symbols[i].attr('transform', `translate(0, ${height * ((values.max - v) / rangeSize)})`);
    });

    tooltip.show().update(str);
    const margin = 20;
    const tooltipRectBox = tooltip.getRectBBox();
    let x = offset[0] + margin;
    let y = offset[1] + margin;
    if (tooltipRectBox.width + offset[0] > view.width) {
      x = offset[0] - tooltipRectBox.width - margin;
    }
    if (tooltipRectBox.height + offset[1] > view.height) {
      y = view.height - tooltipRectBox.height - margin;
    }
    tooltip.offset({
      x,
      y,
    });
    this.currentIndex = index;
    const translateX = (index * (width / (pointCount - 1))) + yAxisWidth;
    this.auxiliaryItems.container
      .attr('transform', `translate(${translateX}, 0)`);
    return this;
  }
  renderLines(lineData) {
    const {
      view,
      config,
      target,
      values,
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
    } = values;
    const width = view.width - yAxis.width;
    const height = view.height - xAxis.height;

    const offset = max - min;
    const arr = _.map(lineData, item => {
      const data = item.data;
      values.pointCount = Math.max(values.pointCount, data.length);
      const unitLength = width / (data.length - 1);
      return _.map(data, (v, i) => {
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
      .curve(d3.curveCatmullRom.alpha(0.5));

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
  initAuxiliaryLine() {
    const {
      target,
      view,
      config,
    } = this;
    const fn = d3.line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveCatmullRom.alpha(0.5));
    const auxiliaryContainer = target.append('g');
    const line = auxiliaryContainer.append('path')
      .datum([
        {
          x: 0,
          y: 0,
        },
        {
          x: 0,
          y: view.height - config.xAxis.height,
        },
      ])
      .attr('d', fn);
    const symbolTypes = [
      'symbolWye',
      'symbolTriangle',
      'symbolSquare',
      'symbolCircle',
      'symbolCross',
    ];
    const colors = config.colors;
    const symbols = _.map(this.data, (item, i) => {
      const color = colors[i % colors.length];
      const type = symbolTypes[i % symbolTypes.length];
      return auxiliaryContainer.append('path')
        .attr('d', d3.symbol().type(d3[type]))
        .attr('fill', color);
    });
    this.auxiliaryItems = {
      container: auxiliaryContainer,
      line,
      symbols,
    };
    setStyle(line, config.style.auxiliaryLine);
    auxiliaryContainer.style('display', 'none');

    return this;
  }
  init(data) {
    if (this.initialized) {
      return this;
    }
    this.data = data;
    const { target } = this;
    const {
      width,
      height,
    } = this.config;

    target.attr('width', width).attr('height', height);
    const throttleRenderLabels = _.throttle(offset => {
      this.renderLabels(offset);
    }, 30);
    target.on('mousemove', () => {
      const arr = d3.mouse(target.node());
      throttleRenderLabels(arr);
    });
    target.on('mouseleave', () => {
      this.auxiliaryItems.container.style('display', 'none');
      this.tooltip.hide();
    });
    target.on('mouseenter', () => {
      this.auxiliaryItems.container.style('display', 'block');
      this.tooltip.show();
    });

    this.view.height = parseInt(target.style('height'), 10);
    this.view.width = parseInt(target.style('width'), 10);

    this.initXAxis();
    this.initYAxis(data);
    this.renderLines(data);
    this.initAuxiliaryLine();

    const tooltip = new Tooltip(target);
    tooltip.render('');
    tooltip.hide();
    this.tooltip = tooltip;
    this.initialized = true;
    return this;
  }
  render(data) {
    this.init(data);
    return this;
  }
}
