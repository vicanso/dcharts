import * as _ from 'lodash';
import Chart from './chart';
import {
  setStyle,
} from './util';

export default class Axis extends Chart {
  constructor(target, config) {
    super(target, config);
    this.divideCount = 0;
    this.labelList = [];
  }
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
    if (!this.divideCount) {
      let max = length;
      const {
        distance,
      } = this.config[this.config.type];
      const axisLength = this.getAxisLength();
      let count = _.ceil(axisLength / distance);
      if (count < max) {
        if (max % 2 !== 0) {
          max++;
        }
        while (count < max) {
          max >>= 1;
        }
      }
      count = max;
      this.divideCount = count;
    }
    return this.divideCount;
  }
  getLineAxisPath(chart, max) {
    const {
      type,
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
    return paths.join('');
  }
  appendLineAxis(chart, max) {
    const style = this.config.style;
    const path = this.getLineAxisPath(chart, max);
    const baseLine = chart.append('path');
    baseLine.attr('d', path);
    setStyle(baseLine, style.line);
    return this;
  }
  appendTextAxis(chart, data) {
    return this.updateTextAxis(chart, data);
  }
  updateTextAxis(chart, data) {
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
    const labelList = this.labelList;
    let index = 0;
    _.forEach(data, (text, i) => {
      if (i % showIndex !== 0) {
        return;
      }
      let label = labelList[index++];
      if (chart) {
        label = chart.append('text')
          .attr(key, value);
        labelList.push(label);
        setStyle(label, style.text);
      }
      label.text(text);
      if (type === 'vertical') {
        const y = offset + ((distance - label.node().getBBox().height) / 2);
        label.attr('y', y + 10);
      } else {
        const x = offset + ((distance - label.node().getBBox().width) / 2);
        label.attr('x', x);
      }
      offset += distance;
    });
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
  update(data) {
    this.updateTextAxis(null, data);
  }
}
