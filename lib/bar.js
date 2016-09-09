import * as d3 from 'd3';
import Coordinate from './coordinate';

export default class Bar extends Coordinate {
  constructor(target, config) {
    super(target, config);
  }
  get name() {
    return 'bar';
  }
  renderBars() {
    const {
      data,
      chart,
      config,
    } = this;

    const {
      colors,
    } = config;

    const barContainer = chart.append('g')
      .attr('transform', `translate(${config.yAxis.width}, 0)`);

    this.barContainer = barContainer;
    this.updateBars();
    return this;
  }
  updateBars() {
    const {
      config,
      barContainer,
      values,
    } = this;
    const {
      min,
      max,
    } = values;
    const lineView = this.getLineView();
    const seriesCount = this.data.length;
    const countList = _.map(this.data, item => item.data.length);
    const pointCount = d3.max(countList);
    const columnWidth = lineView.width / pointCount;
    let columnMargin = config.column.margin;
    if (_.isString(columnMargin)) {
      columnMargin = _.ceil((parseInt(columnMargin, 10) / 100) * columnWidth);
    }
    const barMargin = 3;
    const barWidth = (columnWidth - columnMargin * 2 - barMargin * 2) / seriesCount;
    const colors = config.colors;
    const height = lineView.height + lineView.y;
    const offset = max - min;
    _.forEach(this.data, (item, index) => {
      const color = colors[index % colors.length];
      const x = index * barWidth;
      _.forEach(item.data, (v, i) => {
        const barMarginCount = barMargin * (i * 2) + barMargin;
        const columnMarginCount = columnMargin * (i * 2) + columnMargin;
        const columnWidthCount = i * columnWidth;
        const y = (1 - ((v - min) / offset)) * height;
        barContainer.append('rect')
          .attr('x', x + columnWidthCount + barMarginCount + columnMarginCount)
          .attr('y', y)
          .attr('width', barWidth)
          .attr('height', height - y)
          .style('fill', color);
      });
    });
  }
  init(data) {
    if (this.initialized) {
      return this;
    }
    super.init(data);
    this.initialized = true;
    this.renderBars();
    return this;
  }
}
