import * as d3 from 'd3';
import * as _ from 'lodash';
import {
  setStyle,
} from './util';

const defaults = {
  radius: 50,
  thickness: 5,
  endAngle: 2 * Math.PI,
  startAngle: 0,
  ease: d3.easeLinear,
  duration: 300,
  format: d3.format(`.${d3.precisionFixed(0.01)}%`),
  style: {
    background: {
      fill: 'RGB(230, 237, 244)',
    },
    foreground: {
      fill: 'RGB(0, 181, 241)',
    },
    label: {
      fill: 'RGB(0, 181, 241)',
      font: '18px sans-serif',
      'text-anchor': 'middle',
      'alignment-baseline': 'middle',
    },
  },
};

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

export default class Circle {
  constructor(target, config) {
    if (!target) {
      throw new Error('target catn\'t be null');
    }
    this.target = target;
    this.config = Object.assign({}, config, defaults);
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
    } = this.config;

    const chart = d3.select(this.target)
      .attr('with', radius * 2)
      .attr('height', radius * 2)
      .append('g')
      .attr('transform', `translate(${radius}, ${radius})`);

    this.arc = d3.arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius)
      .startAngle(startAngle);

    this.bg = chart.append('path')
      .datum({
        endAngle,
      })
      .attr('d', this.arc);
    setStyle(this.bg, style.background);

    this.fg = chart.append('path')
      .datum({
        endAngle: 0,
      })
      .attr('d', this.arc);
    setStyle(this.fg, style.foreground);

    this.label = chart.append('text')
      .attr('x', 2)
      .attr('y', 2);
    setStyle(this.label, style.label);

    this.initialized = true;
    return this;
  }
  set(k, v) {
    if (_.isObject(k)) {
      Object.assign(this.config, k);
    } else {
      _.set(this.config, k, v);
    }
    return this;
  }
  render(value) {
    const { ease, duration, format } = this.config;
    this.init();
    this.fg.transition()
      .duration(duration)
      .ease(ease)
      .call(tween(this.arc), 2 * Math.PI * value);
    this.label.text(format(value));
    return this;
  }
}
