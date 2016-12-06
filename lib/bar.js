import * as d3 from 'd3';
import * as _ from 'lodash';
import Tooltip from './tooltip';
import Coordinate from './coordinate';

export default class Bar extends Coordinate {
  constructor(target, config) {
    super(target, config);
    this.barContainer = null;
  }
  /* eslint class-methods-use-this:0 */
  get name() {
    return 'bar';
  }
  renderLabels(offset) {
    const {
      config,
      values,
      view,
      tooltip,
    } = this;
    const yAxisWidth = config.yAxis.width;
    const lineView = this.getLineView();
    const {
      width,
    } = lineView;
    const currentX = offset[0] - yAxisWidth;
    const pointCount = values.pointCount;
    const index = _.ceil((currentX / width) * pointCount) - 1;
    if (index === this.currentIndex || index >= pointCount || index < 0) {
      return this;
    }
    let str = '';
    const colors = config.colors;
    const categories = this.get('xAxis.categories');
    _.forEach(this.data, (item, i) => {
      const v = item.data[index];
      if (this.isDisabled(i)) {
        return;
      }
      const color = colors[i % colors.length];
      if (!str) {
        str = `<tspan x="4" dy="0">${categories[index]}</tspan>`;
      }
      const docHtml = `<tspan style="fill:${color}" x="4" dy="15">●</tspan>`;
      const nameHtml = `<tspan dx="2">${item.name}:</tspan>`;
      const valueHtml = `<tspan style="font-weight:bold" dx="2">${v}</tspan>`;
      str += (docHtml + nameHtml + valueHtml);
    });

    tooltip.show().update(str);
    const margin = 20;
    const tooltipMargin = 30;
    const tooltipRectBox = tooltip.getRectBBox();
    let x = offset[0] + margin;
    let y = offset[1] + margin;
    if (tooltipRectBox.width + offset[0] > view.width - tooltipMargin) {
      x = offset[0] - tooltipRectBox.width - margin;
    }
    if (tooltipRectBox.height + offset[1] > view.height - tooltipMargin) {
      y = view.height - tooltipRectBox.height - margin;
    }
    tooltip.offset({
      x,
      y,
    });
    const rectX = (((width / pointCount) * index) + lineView.x) - config.margin.left;
    this.auxiliaryRect.attr('x', rectX);
    this.currentIndex = index;
    return this;
  }

  renderBars() {
    const {
      chart,
      config,
    } = this;

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
    barContainer.html('');
    const lineView = this.getLineView();
    const seriesCount = this.data.length - this.disabledList.length;
    const countList = _.map(this.data, item => item.data.length);
    const pointCount = d3.max(countList);
    values.pointCount = pointCount;
    const columnWidth = lineView.width / pointCount;
    let columnMargin = config.column.margin;
    if (_.isString(columnMargin)) {
      columnMargin = _.ceil((parseInt(columnMargin, 10) / 100) * columnWidth);
    }
    const barMargin = 1;
    const barWidth = (columnWidth - (columnMargin * 2)) / seriesCount;
    const colors = config.colors;
    const offset = max - min;
    let appendIndex = 0;
    _.forEach(this.data, (item, index) => {
      if (this.isDisabled(index)) {
        return;
      }
      const color = colors[index % colors.length];
      const x = (appendIndex * barWidth) + barMargin;
      const height = lineView.height;
      _.forEach(item.data, (v, i) => {
        const columnWidthCount = i * columnWidth;
        const barHeight = ((v - min) / offset) * height;
        barContainer.append('rect')
          .attr('x', (columnWidthCount + columnMargin) + x)
          .attr('y', (height - barHeight) + lineView.y)
          .attr('width', barWidth - (2 * barMargin))
          .attr('height', barHeight)
          .style('fill', color);
      });
      appendIndex += 1;
    });
  }
  initAuxiliary() {
    const {
      chart,
    } = this;
    const auxiliaryRect = chart.append('rect')
      .attr('stroke', '#d0d0d0')
      .style('fill', 'rgba(255, 255, 255, 0.4)')
      .style('display', 'none');
    this.auxiliaryRect = auxiliaryRect;
    return this;
  }
  updateAuxiliaryRectView() {
    const {
      values,
    } = this;
    const pointCount = values.pointCount;
    const lineView = this.getLineView();
    this.auxiliaryRect
      .attr('y', lineView.y)
      .attr('width', lineView.width / pointCount)
      .attr('height', lineView.height);
    return this;
  }
  initTooltip() {
    const {
      chart,
    } = this;
    const tooltip = new Tooltip(chart);
    tooltip.render('');
    tooltip.hide();
    this.tooltip = tooltip;
    return this;
  }
  init(data) {
    if (this.initialized) {
      return this;
    }
    const { target } = this;
    super.init(data);
    this.initialized = true;
    this.initAuxiliary();
    this.renderBars();
    if (!this.config.disabled.legend) {
      this.addLegend();
      this.legend.on('click', (index) => {
        this.legend.toggle(index);
        const findIndex = _.indexOf(this.disabledList, index);
        if (findIndex !== -1) {
          this.disabledList.splice(findIndex, 1);
        } else {
          this.disabledList.push(index);
        }
        this.updateBars();
      });
    }
    this.updateAuxiliaryRectView();
    this.initTooltip();
    const throttleRenderLabels = _.throttle((offset) => {
      this.renderLabels(offset);
    }, 30);
    target.on('mousemove', () => {
      const arr = d3.mouse(target.node());
      throttleRenderLabels(arr);
    });
    target.on('mouseleave', () => {
      this.tooltip.hide();
      this.auxiliaryRect.style('display', 'none');
    });
    target.on('mouseenter', () => {
      this.tooltip.show();
      this.auxiliaryRect.style('display', 'block');
    });
    return this;
  }
  update(categories, data) {
    this.data = data;
    this.updateXAxis(categories);
    this.updateYAxis();
    this.updateBars();
    this.updateAuxiliaryRectView();
    return this;
  }
}
