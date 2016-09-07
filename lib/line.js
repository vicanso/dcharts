import * as d3 from 'd3';
import * as _ from 'lodash';
import Tooltip from './tooltip';
import Coordinate from './coordinate';
import {
  setStyle,
} from './util';

export default class Line extends Coordinate {
  constructor(target, config) {
    super(target, config);
    this.currentIndex = -1;
    this.lines = null;
    this.auxiliaryItems = null;
  }
  get name() {
    return 'line';
  }
  renderLabels(offset) {
    const {
      config,
      values,
      view,
      tooltip,
    } = this;
    const yAxisWidth = config.yAxis.width;
    const lineView = this.getLineView();
    const {
      width,
    } = lineView;
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
      const translateY = (lineView.height + lineView.y) * ((values.max - v) / rangeSize);
      symbols[i].attr('transform', `translate(0, ${translateY})`);
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
      config,
      chart,
      values,
    } = this;
    const {
      yAxis,
      style,
      colors,
    } = config;
    const {
      min,
      max,
    } = values;
    const lineView = this.getLineView();

    const offset = max - min;
    const arr = _.map(lineData, item => {
      const data = item.data;
      values.pointCount = Math.max(values.pointCount, data.length);
      const unitLength = lineView.width / (data.length - 1);
      const height = lineView.height + lineView.y;
      return _.map(data, (v, i) => {
        const y = (1 - ((v - min) / offset)) * height;
        return {
          x: unitLength * i,
          y,
        };
      });
    });

    const lineContainer = chart.append('g')
      .attr('transform', `translate(${yAxis.width}, 0)`);
    const fn = d3.line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveCatmullRom.alpha(0.5));

    this.lines = _.map(arr, (data, i) => {
      const line = lineContainer.append('path')
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
      chart,
      config,
    } = this;
    const fn = d3.line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveCatmullRom.alpha(0.5));
    const lineView = this.getLineView();
    const auxiliaryContainer = chart.append('g');
    const line = auxiliaryContainer.append('path')
      .datum([
        {
          x: 0,
          y: lineView.y,
        },
        {
          x: 0,
          y: lineView.height + lineView.y,
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
    const { target, chart } = this;
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
    this.addTitle();
    this.renderLines(data);
    this.initAuxiliaryLine();
    this.addLegend(data);
    this.legend.on('click', index => {
      this.legend.toggle(index);
    });
    const tooltip = new Tooltip(chart);
    tooltip.render('');
    tooltip.hide();
    this.tooltip = tooltip;
    this.initialized = true;
    return this;
  }
}
