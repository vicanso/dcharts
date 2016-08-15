import * as d3 from 'd3';
import Chart from './chart';
import {
  setStyle,
} from './util';

export default class Legend extends Chart {
  get name() {
    return 'legend';
  }
  render(data, maxWidth) {
    const target = this.target;
    const { width, height, padding, style } = this.config;
    let offsetX = padding;
    let offsetY = padding;
    const fontSize = parseInt(style.label['font-size']);
    _.forEach(data, item => {
      const g = target.append('g');
      
      g.append('rect')
        .attr('x', 0)
        .attr('y', 4)
        .attr('width', width)
        .attr('height', height)
        .style('fill', item.color);

      const label = g.append('text')
        .attr('x', 21)
        .attr('y', 14)
        .text(item.text);

      setStyle(label, style.label);

      let newOffsetX = offsetX + item.text.length * fontSize / 2 + 30;

      if (newOffsetX > maxWidth) {
        newOffsetX = padding;
        offsetX = padding;
        offsetY += 20;
      }

      g.attr('transform', `translate(${offsetX}, ${offsetY})`);

      offsetX = newOffsetX;
    });
  }
}