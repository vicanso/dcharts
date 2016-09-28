import * as _ from 'lodash';
import Chart from './chart';
import {
  setStyle,
} from './util';

export default class Legend extends Chart {
  constructor(target, config) {
    super(target, config);
    // the disable legend index list
    this.disabledLegends = [];
    this.rectBgColors = [];
    this.charts = null;
    this.view = {
      width: 0,
      height: 0,
    };
  }
  get name() {
    return 'legend';
  }
  disable(index) {
    const { disabledLegends, charts } = this;
    const { style } = this.config;
    if (!~_.indexOf(disabledLegends, index)) {
      disabledLegends.push(index);
      const chart = charts[index];
      setStyle(chart.label, style.labelDisabled);
      chart.rect.style('fill', '#ccc');
    }
    return this;
  }
  enable(index) {
    const { disabledLegends, charts } = this;
    const { style } = this.config;
    const i = _.indexOf(disabledLegends, index);
    if (~i) {
      disabledLegends.splice(i, 1);
      const chart = charts[index];
      setStyle(chart.label, style.label);
      chart.rect.style('fill', this.rectBgColors[index]);
    }
    return this;
  }
  toggle(index) {
    const { disabledLegends } = this;
    if (!~_.indexOf(disabledLegends, index)) {
      this.disable(index);
    } else {
      this.enable(index);
    }
    return this;
  }
  init(data) {
    if (this.initialized) {
      return this;
    }
    const { chart } = this;
    const {
      width,
      height,
      style,
      maxWidth,
      colors,
      gap,
      type,
    } = this.config;
    let offsetX = 0;
    let offsetY = 0;
    const view = {
      width: 0,
      height: 0,
    };
    this.charts = _.map(data, (item, index) => {
      const g = chart.append('g');
      const rectColor = item.color || colors[index % colors.length];
      this.rectBgColors.push(rectColor);
      const rect = g.append('rect')
        .attr('x', 0)
        .attr('y', 4)
        .attr('width', width)
        .attr('height', height)
        .style('fill', rectColor);
      const rectViewSize = width + 5;
      const label = g.append('text')
        .attr('x', rectViewSize)
        .attr('y', 14)
        .text(item.text || item)
        .on('click', () => this.emit('click', index));

      setStyle(label, style.label);
      const lebelViewSize = label.node().getComputedTextLength();
      let newOffsetX = offsetX + rectViewSize + lebelViewSize;
      if (type === 'column') {
        g.attr('transform', `translate(${offsetX}, ${offsetY})`);
        offsetY += (height + Math.ceil(gap / 2));
      } else {
        if (newOffsetX > maxWidth) {
          newOffsetX = rectViewSize + lebelViewSize;
          offsetX = 0;
          offsetY += (height + Math.ceil(gap / 2));
        }
        g.attr('transform', `translate(${offsetX}, ${offsetY})`);
        offsetX = newOffsetX + gap;
      }

      if (view.width < newOffsetX) {
        view.width = newOffsetX;
      }
      if (view.height < offsetY + height) {
        view.height = offsetY + height;
      }

      return {
        label,
        rect,
      };
    });
    this.view = view;
    this.initialized = true;
    return this;
  }
  render(data) {
    this.data = data;
    return this.init(data);
  }
}
