import * as d3 from 'd3';
import * as _ from 'lodash';
import Chart from './chart';
import {
  setStyle,
  getFn,
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
  constructor(target, config) {
    super(target, config);
    this.arc = null;
    this.bg = null;
    this.fg = null;
    this.label = null;
  }
  get name() {
    return 'circle';
  }
  init() {
    if (this.initialized) {
      return this;
    }
    const {
      target,
      chart,
      config,
    } = this;
    const {
      radius,
      thickness,
      startAngle,
      endAngle,
      style,
      disabled,
    } = config;
    const doubleRadius = radius * 2;
    target.style('width', config.width);
    const width = parseInt(target.style('width'), 10);
    const height = config.height || doubleRadius + config.title.height;
    target.attr('height', height);
    const offset = (width - doubleRadius) / 2;
    const circleContainer = chart.append('g');
    circleContainer
      .attr('width', doubleRadius)
      .attr('height', doubleRadius)
      .attr('transform', `translate(${radius + offset}, ${radius + config.title.height})`);

    let thicknessWidth = thickness;
    if (_.endsWith(thickness, '%')) {
      thicknessWidth = (parseFloat(thickness) / 100) * radius;
    }

    this.arc = d3.arc()
      .innerRadius(radius - thicknessWidth)
      .outerRadius(radius)
      .startAngle(startAngle);

    if (!disabled.background) {
      this.bg = circleContainer.append('path')
        .datum({
          endAngle,
        })
        .attr('d', this.arc);
      setStyle(this.bg, style.background);
    }

    this.fg = circleContainer.append('path')
      .datum({
        endAngle: startAngle,
      })
      .attr('d', this.arc);
    setStyle(this.fg, style.foreground);

    if (!disabled.label) {
      this.label = circleContainer.append('text')
        .attr('x', 2)
        .attr('y', 2);
      setStyle(this.label, style.label);
    }
    this.initialized = true;
    return this;
  }
  addTitle() {
    const {
      target,
      chart,
      config,
    } = this;
    const title = this.get('title');
    if (!title) {
      return this;
    }
    const width = parseInt(target.style('width'), 10);
    const text = chart.append('text')
      .attr('dy', config.title.dy)
      .text(title.text);
    const bBox = text.node().getBBox();
    text.attr('x', (width - bBox.width) / 2);
    setStyle(text, config.style.title);
    return this;
  }
  render(value) {
    this.addTitle();
    this.init();
    this.update(value);
    return this;
  }
  update(value) {
    const {
      ease,
      duration,
      format,
      startAngle,
      endAngle,
      max,
    } = this.config;
    this.data = value;
    this.fg.transition()
      .duration(duration)
      .ease(ease)
      .call(tween(this.arc), ((endAngle - startAngle) * (value / max)) + startAngle);
    const formatFn = getFn(format);

    if (this.label) {
      this.label.text(formatFn(value));
    }
    return this;
  }
}
