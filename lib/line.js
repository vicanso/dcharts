import * as d3 from 'd3';
import Chart from './chart';
import {
  setStyle,
} from './util';

export default class Line extends Chart {
  get name() {
    return 'line';
  }
  getTimelinePath(maxWidth) {
    const count = _.floor(maxWidth / 50);
    const width = maxWidth / count;
    const paths = [];
    let offset = 0;
    const height = 10;
    paths.push(`M0,${height}C${maxWidth},${height}`);
    // for (let i = 0; i < count; i++) {
    //   paths.push(`M${offset},${height}`);
    //   paths.push(`L${offset},0`);
    //   offset += width;
    // }
    return paths.join('');
  }
  addTimeLine(chart, maxWidth) {
    const style = {
      'stroke-width': 1,
      stroke: '#999',
      fill: 'none',
      'shape-rendering': 'crispEdges',
    };
    const baseLine = chart.append('path')
      .attr('d', `M0,10V0H${maxWidth}V10`);
    setStyle(baseLine, style);

    const count = _.floor(maxWidth / 50);
    const width = maxWidth / count;
    let offset = 0;
    const height = 10;

    const arr = [];
    for(let i = 0; i < count; i++) {
      arr.push([
        [offset, height],
        [offset, 0],
      ]);
      offset += width;
    }

    const fn = d3.line()
      .x(d => d[0])
      .y(d => d[1]);

    _.forEach(arr, data => {
      const line = chart.append('path')
        .datum(data)
        .attr('d', fn);
      setStyle(line, style);
    });
    // M0,6V0H890V6
    // const fn = d3.line()
    //   .x(d => d[0])
    //   .y(d => d[1])
    //   .curve(d3.curveCatmullRom.alpha(0.5));
    // _.forEach(arr, data => {
    //   const line = g.append('path')
    //     .datum(data)
    //     .attr('d', fn);
    //   setStyle(line, {
    //     'stroke-width': 1,
    //     stroke: '#5cd5f3',
    //     'fill': 'none',
    //     'shape-rendering': 'crispEdges',
    //   });
    // });
  }
  init(data) {
    if (this.initialized) {
      return this;
    }

    const { target } = this;
    const {
      width,
      height,
      colors,
    } = this.config;

    target.attr('width', width).attr('height', height);

    const chart = target.append('g');

    const fn = d3.line()
      .x(d => d.date)
      .y(d => d.value)
      .curve(d3.curveCatmullRom.alpha(0.5));

    // chart.append('path')
    //   .attr('d', d3.symbol().type(d3.symbolDiamond))
    //   .attr('stroke','#000')
    //   .attr('stroke-width',1);
    const padding = 10;
    const timeLineContainer = chart.append('g')
      .attr('transform', `translate(${padding}, 0)`)
      .attr('width', width - 2 * padding);
    this.addTimeLine(timeLineContainer, width - 2 * padding);

    const line = chart.append('path')
      .datum(data)
      .attr('d', fn);
    setStyle(line, {
      'stroke-width': 2,
      stroke: colors[0],
      'fill': 'none',
    });

    this.chart = chart;
    this.initialized = true;
    return this;
  }
  render(data) {
    this.init(data);
    return this;
  }
}
