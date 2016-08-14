import * as d3 from 'd3';
import Chart from './chart';

const tween = arc => (path, proportion) => {
  path.attrTween('d', d => {
    const i = d3.interpolate(proportion.startAngle, proportion.endAngle);
    d.startAngle = proportion.startAngle;
    return t => {
      /* eslint no-param-reassign:0 */
      d.endAngle = i(t);
      return arc(d);
    };
  });
};

export default class Pip extends Chart{
  get name() {
    return 'pie';
  }
  init(arcs) {
    if (this.initialized) {
      return this;
    }
    const {
      radius,
      backgroundColors,
    } = this.config;

    const chart = d3.select(this.target)
      .attr('width', radius * 2)
      .attr('height', radius * 2)
      .append('g')
      .attr('transform', `translate(${radius}, ${radius})`);
    this.chart = chart;

    const colorsCount = backgroundColors.length;

    this.arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    this.fgList = _.map(arcs, (arc, i) => {
      return chart.append('path')
        .datum(arc)
        .style('fill', backgroundColors[i % colorsCount])
        .attr('d', this.arc);
    });
    this.initialized = true;
    return this;
  }
  render(values) {
    const arcs = d3.pie()(values);
    const { ease, duration } = this.config;

    this.init(arcs);

    _.forEach(this.fgList, (fg, i) => {
      fg.transition()
        .delay(i * duration)
        .duration(duration)
        .ease(ease)
        .call(tween(this.arc), arcs[i]);
    });
    return this;
  }
}
