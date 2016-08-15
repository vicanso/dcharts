import * as d3 from 'd3';
import Chart from './chart';
import Legend from './legend';
import {
  setStyle,
} from './util';

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

const getArcs = (data, radius) => {
  const values = _.map(data, item => item.value);
  return d3.pie()
    .padAngle(2 / radius)(values);
};

export default class Pip extends Chart {
  get name() {
    return 'pie';
  }
  init(data) {
    if (this.initialized) {
      return this;
    }
    const {
      radius,
      backgroundColors,
      style,
      width,
      height,
    } = this.config;

    const arcs = getArcs(data, radius);

    const outerWidth = width || radius * 4;
    const outerHeight = height || radius * 4;
    const target = d3.select(this.target)
      .attr('width', outerWidth)
      .attr('height', outerHeight);

    const chart = target.append('g')
      .attr('transform', `translate(${outerWidth / 2}, ${outerHeight / 2})`);

    const labelContainer = target.append('g')
      .attr('transform', `translate(0, ${outerHeight / 2 + radius})`);
    const colorsCount = backgroundColors.length;
    const legend = new Legend(labelContainer);
    legend.render(_.map(data, (item, i) => {
      const color = backgroundColors[i % colorsCount];
      return {
        color,
        text: item.name,
      };
    }), outerWidth);



    this.arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    this.pieList = _.map(arcs, (arc, i) => {
      const item = data[i];
      const midAngle = d3.mean([arc.startAngle, arc.endAngle]);
      return chart.append('path')
        .datum(_.extend({}, arc, {
          startAngle: 0,
          endAngle: 0,
        }))
        .style('fill', backgroundColors[i % colorsCount])
        .attr('d', this.arc);
    });


    this.initialized = true;
    return this;
  }
  render(data) {
    const { ease, duration, radius } = this.config;
    const arr = _.sortBy(data, item => -item.value);
    const arcs = getArcs(arr, radius);
    this.init(arr);

    _.forEach(this.pieList, (pie, i) => {
      const arc = arcs[i];
      pie.transition()
        .delay(arc.index * duration)
        .duration(duration)
        .ease(ease)
        .call(tween(this.arc), arc);
    });
    return this;
  }
}
