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
    this.auxiliaryItems = null;
    this.lines = null;
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
    const colors = config.colors;
    const categories = this.get('xAxis.categories');
    const symbols = this.auxiliaryItems.symbols;
    const rangeSize = values.max - values.min;
    _.forEach(this.data, (item, i) => {
      if (this.isDisabled(i)) {
        return;
      }
      const v = item.data[index];
      const translateY = (lineView.height * ((values.max - v) / rangeSize)) + lineView.y;
      symbols[i].attr('transform', `translate(0, ${translateY})`);
      const color = colors[i % colors.length];
      if (!str) {
        str = `<tspan x="4" dy="0">${categories[index]}</tspan>`;
      }
      const docHtml = `<tspan style="fill:${color}" x="4" dy="15">●</tspan>`;
      const nameHtml = `<tspan dx="2">${item.name}:</tspan>`;
      const valueHtml = `<tspan style="font-weight:bold" dx="2">${v}</tspan>`;
      str += (docHtml + nameHtml + valueHtml);
    });

    tooltip.show().update(str);
    const margin = 20;
    const tooltipRectBox = tooltip.getRectBBox();
    const tooltipMargin = 30;
    let x = offset[0] + margin;
    let y = offset[1] + margin;
    if (tooltipRectBox.width + offset[0] > view.width - tooltipMargin) {
      x = offset[0] - tooltipRectBox.width - margin;
    }
    if (tooltipRectBox.height + offset[1] > view.height - tooltipMargin) {
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
  renderLines() {
    const {
      data,
      chart,
      config,
    } = this;
    const lineContainer = chart.append('g')
      .attr('transform', `translate(${config.yAxis.width}, 0)`);
    const lines = [];
    const count = data.length;
    const colors = config.colors;
    const style = config.style;
    for (let i = 0; i < count; i++) {
      const line = lineContainer.append('path');
      const color = colors[i % colors.length];
      setStyle(line, _.extend({
        stroke: color,
      }, style.line));
      lines.push(line);
    }
    this.lines = lines;
    this.updateLines();
    return this;
  }
  updateLines() {
    const {
      values,
      lines,
      config,
    } = this;
    const {
      min,
      max,
    } = values;
    const lineView = this.getLineView();

    const lineData = this.data;
    const offset = max - min;
    const countList = _.map(lineData, item => item.data.length);
    values.pointCount = d3.max(countList);
    const unitLength = lineView.width / (values.pointCount - 1);
    const arr = _.map(lineData, (item, index) => {
      if (this.isDisabled(index)) {
        return null;
      }
      const data = item.data;
      const height = lineView.height;
      return _.map(data, (v, i) => {
        const y = ((1 - ((v - min) / offset)) * height) + lineView.y;
        return {
          x: unitLength * i,
          y,
        };
      });
    });
    const curveDefine = config.curve;
    let curveFn = d3[curveDefine];
    if (_.isFunction(curveDefine)) {
      curveFn = curveDefine;
    } else if (_.isArray(curveDefine)) {
      curveFn = _.invoke(d3, curveDefine[0], curveDefine[1]);
    }

    const fn = d3.line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(curveFn);

    _.forEach(arr, (data, i) => {
      const line = lines[i];
      if (!data) {
        line.attr('d', '');
        return;
      }
      line.attr('d', fn(data));
    });
    return this;
  }
  initAuxiliaryLine() {
    const {
      chart,
      config,
    } = this;
    const fn = d3.line()
      .x(d => d.x)
      .y(d => d.y)
      .curve(d3.curveLinear);
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
    super.init(data);
    const { target, chart } = this;

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

    this.renderLines();
    this.initAuxiliaryLine();
    this.addLegend();
    this.legend.on('click', index => {
      this.legend.toggle(index);
      const symbol = this.auxiliaryItems.symbols[index];
      const findIndex = _.indexOf(this.disabledList, index);
      if (~findIndex) {
        this.disabledList.splice(findIndex, 1);
        symbol.style('display', 'block');
      } else {
        this.disabledList.push(index);
        symbol.style('display', 'none');
      }
      this.updateLines();
    });
    const tooltip = new Tooltip(chart);
    tooltip.render('');
    tooltip.hide();
    this.tooltip = tooltip;
    this.initialized = true;
    return this;
  }
  update(categories, data) {
    this.data = data;
    this.updateXAxis(categories);
    this.updateYAxis();
    this.updateLines();
    return this;
  }
}
