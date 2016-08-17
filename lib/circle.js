import * as d3 from 'd3';
import * as _ from 'lodash';
import Chart from './chart';
import {
  setStyle,
} from './util';

const tween = arc => (path, angle) => {
  path.attrTween('d', d => {
    const i = d3.interpolate(d.endAngle, angle);
    return t => {
      /* eslint no-param-reassign:0 */
      d.endAngle = i(t);
      return arc(d);
    };
  });
};

export default class Circle extends Chart {
  get name() {
    return 'circle';
  }
  init() {
    if (this.initialized) {
      return this;
    }
    const {
      radius,
      thickness,
      startAngle,
      endAngle,
      style,
      disabled,
    } = this.config;
    const { target } = this;
    const chart = target
      .attr('width', radius * 2)
      .attr('height', radius * 2)
      .append('g')
      .attr('transform', `translate(${radius}, ${radius})`);

    let thicknessWidth = thickness;
    if (_.endsWith(thickness, '%')) {
      thicknessWidth = (parseFloat(thickness) / 100) * radius;
    }

    this.arc = d3.arc()
      .innerRadius(radius - thicknessWidth)
      .outerRadius(radius)
      .startAngle(startAngle);

    if (!disabled.background) {
      this.bg = chart.append('path')
        .datum({
          endAngle,
        })
        .attr('d', this.arc);
      setStyle(this.bg, style.background);
    }

    this.fg = chart.append('path')
      .datum({
        endAngle: startAngle,
      })
      .attr('d', this.arc);
    setStyle(this.fg, style.foreground);

    if (!disabled.label) {
      this.label = chart.append('text')
        .attr('x', 2)
        .attr('y', 2);
      setStyle(this.label, style.label);
    }

    this.initialized = true;
    return this;
  }
  render(value) {
    const {
      ease,
      duration,
      format,
      startAngle,
      endAngle,
    } = this.config;
    this.init();

    this.fg.transition()
      .duration(duration)
      .ease(ease)
      .call(tween(this.arc), ((endAngle - startAngle) * value) + startAngle);

    if (this.label) {
      this.label.text(format(value));
    }
    return this;
  }
  update(value) {
    return this.render(value);
  }
}
