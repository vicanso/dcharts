import * as _ from 'lodash';
import Chart from './chart';
import Tooltip from './tooltip';
import {
  getFn,
} from './util';

export default class Heatmap extends Chart {
  constructor(target, config) {
    super(target, config);
    this.heatmapContainer = null;
  }
  get name() {
    return 'heatmap';
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
      column,
      row,
    } = config;
    const width = parseInt(target.style('width'), 10);
    const height = parseInt(target.style('height'), 10);

    const heatmapWidth = (column * config.heat.width) + ((column - 1) * config.heat.gap);
    const heatmapHeight = (row * config.heat.height) + ((row - 1) * config.heat.gap);
    const transformX = Math.max(0, (width - heatmapWidth) / 2);
    const transformY = Math.max(0, (height - heatmapHeight) / 2);
    chart.attr('width', heatmapWidth)
      .attr('height', heatmapHeight)
      .attr('transform', `translate(${transformX}, ${transformY})`);
    this.heatmapContainer = chart.append('g');
    const tooltip = new Tooltip(chart);
    tooltip.render('');
    tooltip.hide();
    this.tooltip = tooltip;
    chart.on('mouseenter', () => {
      tooltip.show();
    }).on('mouseleave', () => {
      tooltip.hide();
    });
    this.initialized = true;
    return this;
  }
  showTips(index) {
    const {
      data,
      tooltip,
      config,
    } = this;
    const {
      column,
      heat,
    } = config;
    const item = data[index];
    const itemRow = Math.floor(index / column);
    const itemColumn = index % column;
    tooltip
      .offset({
        x: (itemColumn * (heat.width + heat.gap)) + heat.width,
        y: (itemRow * (heat.height + heat.gap)) + heat.height,
      })
      .update(`${item.name}:${item.value}`);
  }
  render(data) {
    this.data = data;
    this.init();
    return this.update(data);
  }
  update(data) {
    this.data = data;
    const {
      heatmapContainer,
    } = this;
    const {
      heat,
      column,
      colors,
      colorInterpolate,
      max,
      opacityRange,
    } = this.config;
    let x = 0;
    let y = 0;
    const heatWidth = heat.width;
    const heatHeight = heat.height;
    const heatGap = heat.gap;
    const colorFn = getFn(colorInterpolate);
    const colorGen = colorFn(colors[0], colors[1]);
    const opacityOffset = opacityRange[1] - opacityRange[0];
    heatmapContainer.html('');
    _.forEach(data, (item, i) => {
      const value = item.value;
      const percent = max ? value / max : value;
      const color = colorGen(percent);
      const opacity = (opacityOffset * percent) + opacityRange[0];
      heatmapContainer.append('rect')
        .attr('width', heatWidth)
        .attr('height', heatHeight)
        .attr('x', x)
        .attr('y', y)
        .style('fill', color)
        .style('fill-opacity', opacity)
        .on('mouseenter', () => {
          this.showTips(i);
        });
      if (i && (i + 1) % column === 0) {
        y += (heatHeight + heatGap);
        x = 0;
      } else {
        x += (heatWidth + heatGap);
      }
    });
    return this;
  }
}
