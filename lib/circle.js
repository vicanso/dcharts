import * as d3 from 'd3';

const defaults = {
  radius: 50,
  thickness: 3,
  endAngle: 2 * Math.PI,
  ease: d3.easeLinear,
  duration: 300,
};

const tween = arc => {
  return (path, angle) => {
    path.attrTween('d', d => {
      const i = d3.interpolate(d.endAngle, angle)
      return t => {
        d.endAngle = i(t);
        return arc(d);
      };
    });
  };
}

export default class Circle {
  constructor(target, config) {
    if (!target) {
      throw new Error('target catn\'t be null');
    }
    this.target = target;
    this.config = Object.assign({}, config, defaults);
    this.init();
  }
  init() {
    const { radius, thickness, endAngle } = this.config;
    const chart = d3.select(this.target)
      .attr('with', radius * 2)
      .attr('height', radius * 2)
      .append('g')
      .attr('transform', `translate(${radius}, ${radius})`);

    this.arc = d3.arc()
      .innerRadius(radius - thickness)
      .outerRadius(radius)
      .startAngle(0);

    this.bg = chart.append('path')
      .datum({
        endAngle,
      })
      .attr('class', 'circle background')
      .attr('d', this.arc);

    this.fg = chart.append('path')
      .datum({
        endAngle: 0,
      })
      .attr('class', 'circle foreground')
      .attr('d', this.arc);

    return this;
  }
  set(config) {
    Object.assign(this.config, config);
    return this;
  }
  render() {
    const { ease, duration } = this.config;
    this.fg.transition()
      .duration(duration)
      .ease(ease)
      .call(tween(this.arc), 2 * Math.PI * .5);
  }
}
