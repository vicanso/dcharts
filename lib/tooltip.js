import Chart from './chart';
import {
  setStyle,
} from './util';

export default class Tooltip extends Chart {
  get name() {
    return 'tooltip';
  }
  offset(offset) {
    this.chart.attr('transform', `translate(${offset.x}, ${offset.y})`);
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

    const label = chart.append('text')
      .attr('x', offset.x)
      .attr('y', offset.y)
      .text(text);

    setStyle(label, style.text);

    const bBox = label.node().getBBox();

    rect.attr('width', bBox.width + (offset.x * 2))
      .attr('height', bBox.height + offset.y);

    this.initialized = true;
    this.chart = chart;
    return this;
  }
  render(text) {
    this.init(text);
  }
}
