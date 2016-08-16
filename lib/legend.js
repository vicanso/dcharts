import * as d3 from 'd3';
import Chart from './chart';
import {
  setStyle,
} from './util';

export default class Legend extends Chart {
  get name() {
    return 'legend';
  }
  init(data, maxWidth) {
    // TODO 竖排布局
    if (this.initialized) {
      return this;
    }
    const target = this.target;
    const { width, height, padding, style } = this.config;
    let offsetX = padding;
    let offsetY = padding;
    const fontSize = parseInt(style.label['font-size']);
    const itemOffset = 20;
    const rectViewSize = 21;
    const view = {
      width: 0,
      height: 0,
    };
    this.charts = _.map(data, (item, index) => {
      const g = target.append('g');
      
      const rect = g.append('rect')
        .attr('x', 0)
        .attr('y', 4)
        .attr('width', width)
        .attr('height', height)
        .style('fill', item.color);

      const label = g.append('text')
        .attr('x', rectViewSize)
        .attr('y', 14)
        .text(item.text)
        .on('click', () => this.emit('toggle', index));

      setStyle(label, item.disabled ? style.labelDisabled : style.label);
      const lebelViewSize = label.node().getComputedTextLength();

      let newOffsetX = offsetX + rectViewSize + lebelViewSize;

      if (newOffsetX > maxWidth) {
        newOffsetX = padding + rectViewSize + lebelViewSize;
        offsetX = padding;
        offsetY += itemOffset;
      }

      g.attr('transform', `translate(${offsetX}, ${offsetY})`);

      offsetX = newOffsetX + itemOffset;
      return {
        label,
        rect,
      };
    });
    this.view = view;
    this.initialized = true;
    return this;
  }
  render(data, maxWidth) {
    this.init(data, maxWidth);
  }
  update(data) {
    const { style } = this.config;
    _.forEach(this.charts, (chart, index) => {
      const label = chart.label;
      const item = data[index];
      setStyle(label, item.disabled ? style.labelDisabled : style.label);
      const color = item.disabled ? '#ccc' : item.color;
      chart.rect.style('fill', color);
    });
  }
}