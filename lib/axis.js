import * as _ from 'lodash';
import Chart from './chart';
import {
  setStyle,
} from './util';

export default class Axis extends Chart {
  constructor(target, config) {
    super(target, config);
    // label container 保存文字的 g
    this.labelContainer = null;
    // line container 保存线条的 g
    this.lineContainer = null;
    this.divideCount = 0;
    this.labelList = [];
    this.divisor = 0;
    this.pointCount = 0;
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
    const length = type === 'vertical' ? height : width;
    return parseFloat(length);
  }
  getDivisor(count, refresh) {
    const {
      type,
    } = this.config;
    const {
      distance,
      align,
    } = this.config[type];
    const offset = align === 'left' ? 0 : 1;
    const max = count + offset;
    if (!this.divisor || refresh || this.pointCount !== count) {
      const axisLength = this.getAxisLength();
      const divisorCount = _.ceil(axisLength / distance) + offset;
      let divisor = 1;
      while ((divisorCount * divisor) + 1 < max) {
        divisor++;
      }
      this.divisor = divisor;
    }
    return this.divisor;
  }
  getLineAxisPath(chart, max) {
    const {
      type,
    } = this.config;
    const {
      width,
      align,
    } = this.config[type];
    const offset = align === 'left' ? 1 : 0;
    const axisLength = this.getAxisLength();
    const distanceOffset = axisLength / (max - offset);
    const offsetSize = type === 'vertical' ? width - 10 : 10;
    const divisor = this.getDivisor(max);
    const paths = [];
    for (let i = 0; i < max; i++) {
      const offset = i * distanceOffset;
      if (i % divisor === 0) {
        this.divideCount++;
      }
      if (type === 'vertical') {
        let horizontalPath = `H${width}`;
        let moveToPath = '';
        const y = axisLength - offset;
        const v = Math.max(y - distanceOffset, 0);
        if (i % divisor !== 0) {
          horizontalPath = '';
          moveToPath = '';
        } else {
          moveToPath = `M${width - 10},${y}`;
        }
        paths.push(`${moveToPath}${horizontalPath}V${v}`);
      } else {
        let y = offsetSize;
        let verticalPath = 'V0';
        let moveToPath = '';
        const h = Math.min(offset + distanceOffset, axisLength);
        if (i % divisor !== 0) {
          y = 0;
          verticalPath = '';
        } else {
          moveToPath = `M${offset},${y}`;
        }
        paths.push(`${moveToPath}${verticalPath}H${h}`);
      }
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
      width,
      height,
      align,
    } = this.config[type];
    const offset = align === 'left' ? 1 : 0;
    const max = data.length;
    const divisor = this.getDivisor(max);
    const axisLength = this.getAxisLength();
    const distance = axisLength / (max - offset);
    const halfDistance = distance / 2;
    if (this.pointCount !== max) {
      _.forEach(this.labelList, label => label.remove());
      this.labelList = [];
    }
    const labelList = this.labelList;
    let distanceOffset = 0;
    const key = 'y';
    const value = height * 0.6;
    let index = 0;
    _.forEach(data, (text, i) => {
      if (i % divisor !== 0) {
        return;
      }
      let label = labelList[index++];
      if (!label) {
        label = chart.append('text')
          .attr(key, value);
        labelList.push(label);
        setStyle(label, style.text);
      }
      label.text(text);
      distanceOffset = i * distance;
      const bBox = label.node().getBBox();
      if (type === 'vertical') {
        const y = (height - distanceOffset) + 4;
        label.attr('y', y);
        label.attr('x', (width - bBox.width) - 10);
      } else {
        const halfBBoxWidth = bBox.width / 2;
        if (align === 'left') {
          label.attr('x', distanceOffset - halfBBoxWidth);
        } else {
          label.attr('x', distanceOffset + halfDistance - halfBBoxWidth);
        }
      }
    });
    this.pointCount = max;
    return this;
  }
  init(data = []) {
    if (this.initialized) {
      return this;
    }
    const { chart } = this;
    this.lineContainer = chart.append('g');
    this.labelContainer = chart.append('g');
    this.appendLineAxis(this.lineContainer, data.length);
    this.appendTextAxis(this.labelContainer, data);
    this.initialized = true;
    this.pointCount = data.length;
    return this;
  }
  render(data) {
    return this.init(data || []);
  }
  update(data = []) {
    if (this.pointCount !== data.length) {
      this.lineContainer.html('');
      this.appendLineAxis(this.lineContainer, data.length);
    }
    this.updateTextAxis(this.labelContainer, data);
    return this;
  }
}
