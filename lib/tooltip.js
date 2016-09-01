import Chart from './chart';
import {
  setStyle,
} from './util';

export default class Tooltip extends Chart {
  constructor(target, config) {
    super(target, config);
    this.chart = null;
    this.label = null;
    this.rect = null;
  }
  get name() {
    return 'tooltip';
  }
  offset(offset) {
    this.chart.attr('transform', `translate(${offset.x}, ${offset.y})`);
    return this;
  }
  hide() {
    this.chart.style('display', 'none');
    return this;
  }
  show() {
    this.chart.style('display', 'block');
    return this;
  }
  init(text) {
    if (this.initialized) {
      return this;
    }
    const { target } = this;

    const {
      style,
      offset,
    } = this.config;

    const chart = target.append('g');

    const rect = chart.append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('rx', 3)
      .attr('ry', 3);
    setStyle(rect, style.rect);
    this.rect = rect;

    const label = chart.append('text')
      .attr('x', offset.x)
      .attr('y', offset.y);
    this.label = label;

    setStyle(label, style.text);

    this.initialized = true;
    this.chart = chart;
    this.update(text);
    return this;
  }
  render(text) {
    this.init(text);
  }
  getRectBBox() {
    return this.rect.node().getBBox();
  }
  update(text) {
    const { label, rect } = this;
    const offset = this.config.offset;
    label.html(text);
    const bBox = label.node().getBBox();
    rect.attr('width', bBox.width + (offset.x * 2))
      .attr('height', bBox.height + offset.y);
    return this;
  }
}
