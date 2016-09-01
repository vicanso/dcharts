import * as d3 from 'd3';
import * as _ from 'lodash';
import Chart from './chart';
import Legend from './legend';
import Tooltip from './tooltip';
import {
  setStyle,
} from './util';

const tween = arc => (path, proportion) => {
  path.attrTween('d', d => {
    const start = d3.interpolate(d.startAngle, proportion.startAngle);
    const end = d3.interpolate(d.endAngle, proportion.endAngle);
    // d.startAngle = proportion.startAngle;
    return t => {
      /* eslint no-param-reassign:0 */
      d.startAngle = start(t);
      d.endAngle = end(t);
      return arc(d);
    };
  });
};

const getArcs = (data) => {
  const values = _.map(data, item => item.value);
  return d3.pie()(values);
};

export default class Pip extends Chart {
  constructor(target, config) {
    super(target, config);
    this.arc = null;
    this.pieList = null;
    this.chart = null;
    this.data = null;
  }
  get name() {
    return 'pie';
  }
  toggle(index) {
    const data = this.data;
    const item = data[index];
    if (_.isUndefined(item.originalValue)) {
      item.originalValue = item.value;
      item.value = 0;
    } else {
      item.value = item.originalValue;
      delete item.originalValue;
    }
    this.update(data);
    return this;
  }
  init(data) {
    if (this.initialized) {
      return this;
    }
    const { target } = this;
    const {
      radius,
      backgroundColors,
      style,
      width,
      height,
    } = this.config;

    const arcs = getArcs(data);

    const outerWidth = width || radius * 4;
    const outerHeight = height || radius * 4;
    target
      .attr('width', outerWidth)
      .attr('height', outerHeight);

    const chart = target.append('g')
      .attr('transform', `translate(${outerWidth / 2}, ${outerHeight / 2})`);

    const labelContainer = target.append('g')
      .attr('transform', `translate(0, ${(outerHeight / 2) + radius + 30})`);
    const colorsCount = backgroundColors.length;
    const legend = new Legend(labelContainer);
    const legendData = _.map(data, (item, i) => {
      const color = backgroundColors[i % colorsCount];
      return {
        color,
        text: item.name,
      };
    });

    legend.set('maxWidth', outerWidth)
      .render(legendData);
    legend.on('click', index => {
      legend.toggle(index);
      this.toggle(index);
    });

    this.arc = d3.arc()
      .innerRadius(0)
      .outerRadius(radius);

    let tooltipView = null;
    let tooltip = null;

    this.pieList = _.map(arcs, (arc, i) => {
      const bgColor = backgroundColors[i % colorsCount];
      const pie = chart.append('path')
        .datum(_.extend({}, arc, {
          startAngle: arc.startAngle,
          endAngle: arc.startAngle,
        }))
        .style('fill', bgColor)
        .attr('d', this.arc)
        .on('mouseenter', () => {
          const max = _.sumBy(this.data, item => item.value);
          const item = this.data[i];
          const percent = _.round((100 * item.value) / max, 2);
          tooltip.show();
          tooltip.update(`${item.name}:${percent}%`);
          tooltip.rect.style('stroke', bgColor);
          tooltipView = _.pick(tooltip.getRectBBox(), ['width', 'height']);
        });
      setStyle(pie, style.pie);
      return pie;
    });

    tooltip = new Tooltip(chart);
    tooltip.render('');
    tooltip.hide();

    chart.on('mousemove', () => {
      if (!tooltipView) {
        return;
      }
      const arr = d3.mouse(chart.node());
      tooltip.offset({
        x: arr[0] - (tooltipView.width / 2),
        y: arr[1] - tooltipView.height - 10,
      });
    }).on('mouseleave', () => {
      tooltip.hide();
    });
    this.chart = chart;
    this.initialized = true;
    return this;
  }
  render(data) {
    const arr = _.sortBy(data, item => -item.value);
    this.data = arr;
    this.init(arr);
    this.update(arr);
    return this;
  }
  update(arr) {
    const { ease, duration } = this.config;
    const arcs = getArcs(arr);
    _.forEach(this.pieList, (pie, i) => {
      const arc = arcs[i];
      pie.transition()
        .duration(duration)
        .ease(ease)
        .call(tween(this.arc), arc);
    });
    return this;
  }
}
