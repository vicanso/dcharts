import * as _ from 'lodash';
import Chart from './chart';
import {
  setStyle,
} from './util';

export default class Axis extends Chart {
  get name() {
    return 'axis';
  }
  getAxisLength() {
    const type = this.config.type;
    const {
      width,
      height,
    } = this.config[type];
    return type === 'vertical' ? height - 2 : width - 2;
  }
  getDivideCount(length) {
    let max = length;
    const {
      distance,
    } = this.config[this.config.type];
    const axisLength = this.getAxisLength();
    if (max % 2 !== 0) {
      max++;
    }
    let count = _.ceil(axisLength / distance);
    if (count < max) {
      while (count < max) {
        max >>= 1;
      }
    }
    count = max;
    return count;
  }
  appendLineAxis(chart, max) {
    const {
      type,
      style,
    } = this.config;
    const {
      width,
    } = this.config[type];
    const axisLength = this.getAxisLength();
    const offsetSize = type === 'vertical' ? width - 10 : 10;
    const count = this.getDivideCount(max);
    const distanceOffset = axisLength / count;
    let offset = 1;
    const paths = [];
    for (let i = 0; i <= count; i++) {
      if (type === 'vertical') {
        paths.push(`M${width - 10},${offset}H${width - 1}V${distanceOffset}`);
      } else {
        paths.push(`M${offset},${offsetSize}V0H${distanceOffset}`);
      }
      offset += distanceOffset;
    }
    const baseLine = chart.append('path')
      .attr('d', paths.join(''));
    setStyle(baseLine, style.line);
    return this;
  }
  appendTextAxis(chart, data) {
    const {
      style,
      type,
    } = this.config;
    const {
      height,
    } = this.config[type];
    const count = this.getDivideCount(data.length);
    const showIndex = parseInt(data.length / count, 10);
    const distance = this.getAxisLength() / count;
    let offset = 0;
    let key = 'y';
    let value = height * 0.6;
    if (type === 'vertical') {
      key = 'x';
      value = 5;
    }
    _.forEach(data, (text, i) => {
      if (i % showIndex !== 0) {
        return;
      }
      const label = chart.append('text')
        .attr(key, value)
        .text(text);
      setStyle(label, style.text);
      if (type === 'vertical') {
        const y = offset + ((distance - label.node().getBBox().height) / 2);
        label.attr('y', y + 10);
      } else {
        const x = offset + ((distance - label.node().getBBox().width) / 2);
        label.attr('x', x);
      }
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
    } = this.config[this.config.type];

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
