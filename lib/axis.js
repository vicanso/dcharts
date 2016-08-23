import * as d3 from 'd3';
import * as _ from 'lodash';
import Chart from './chart';
import {
  setStyle,
} from './util';

export default class Axis extends Chart {
  get name() {
    return 'axis';
  }
  getDivideCount(max) {
    const {
      width,
      distance,
    } = this.config;
    if (max % 2 !== 0) {
      max++;
    }
    const axisWidth = width - 2;
    let count = _.ceil(axisWidth / distance);
    if (count < max) {
      while(count < max) {
        max = max >> 1
      }
    }
    count = max;
    return count;
  }
  appendLineAxis(chart, max) {
    const {
      width,
      distance,
      style,
    } = this.config;
    const height = 10;
    const baseLine = chart.append('path')
      .attr('d', `M1,${height}V0H${width - 1}V${height}`);
    setStyle(baseLine, style.line);

    const axisWidth = width - 2;
    const count = this.getDivideCount(max);
    let offset = 1;
    const distanceWidth = axisWidth / count;
    const arr = [];
    for(let i = 0; i < count - 1; i++) {
      offset += distanceWidth;
      const x = _.floor(offset);
      const y = height;
      arr.push([
        [x, y],
        [x, 0],
      ]);
    }

    const fn = d3.line()
      .x(d => d[0])
      .y(d => d[1]);

    _.forEach(arr, data => {
      const line = chart.append('path')
        .datum(data)
        .attr('d', fn);
      setStyle(line, style.line);
    });
    return this;
  }
  appendTextAxis(chart, data) {
    const {
      style,
      height,
      width,
    } = this.config;
    const axisWidth = width - 2;
    const count = this.getDivideCount(data.length);
    const showIndex = parseInt(data.length / count, 10);
    const distance = axisWidth / count;
    let offset = 0;
    _.forEach(data, (text, i) => {
      if (i % showIndex !== 0) {
        return;
      }
      const label = chart.append('text')
        .attr('y', height * 0.6)
        .text(text);
      setStyle(label, style.text);
      const x = offset + (distance - label.node().getBBox().width) / 2;
      label.attr('x', x);
      offset += distance;
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
      distance,
      style,
    } = this.config;

    target.attr('width', width)
      .attr('height', height);

    this.appendLineAxis(target.append('g'), data.length);
    this.appendTextAxis(target.append('g'), data);
    this.initialized = true;
    return this;
  }
  render(data) {
    return this.init(data);
  }
}
