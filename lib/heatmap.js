import * as _ from 'lodash';
import Chart from './chart';
import Tooltip from './tooltip';
import {
  getFn,
  setStyle,
} from './util';

export default class Heatmap extends Chart {
  constructor(target, config) {
    super(target, config);
    this.heatmapContainer = null;
    this.heatList = [];
    this.heatmapTransform = {
      x: 0,
      y: 0,
    };
  }
  static get name() {
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
      title,
    } = config;
    const [width, height] = this.getDimensions();
    const titleHeight = (title.text ? title.height : 0);
    this.addTitle();
    const heatmapWidth = (column * config.heat.width) + ((column - 1) * config.heat.gap);
    const heatmapHeight = (row * config.heat.height) + ((row - 1) * config.heat.gap);
    if (height < heatmapHeight + titleHeight) {
      target.style('height', heatmapHeight + titleHeight);
    }
    const transformX = Math.max(0, (width - heatmapWidth) / 2);
    const transformY = Math.max(0, (height - titleHeight - heatmapHeight) / 2) + titleHeight;
    this.heatmapContainer = chart.append('g')
      .attr('width', heatmapWidth)
      .attr('height', heatmapHeight)
      .attr('transform', `translate(${transformX}, ${transformY})`);
    this.heatmapTransform.x = transformX;
    this.heatmapTransform.y = transformY;
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
      heatmapTransform,
    } = this;
    const {
      column,
      row,
      heat,
    } = config;
    const item = data[index];
    const itemRow = Math.floor(index / column);
    const itemColumn = index % column;
    const label = `${item.name}:${item.value}`;
    let x = (itemColumn * (heat.width + heat.gap)) + heat.width + heatmapTransform.x;
    let y = (itemRow * (heat.height + heat.gap)) + heat.height + heatmapTransform.y;
    if (itemRow >= row - 2 || itemColumn >= column - 2) {
      tooltip.update(label);
      const bBox = tooltip.getRectBBox();
      if (itemColumn >= column - 2) {
        x -= (heat.width + bBox.width);
      }
      if (itemRow >= row - 2) {
        y -= (heat.height + bBox.height);
      }
      tooltip.offset({
        x,
        y,
      });
    } else {
      tooltip.offset({
        x,
        y,
      }).update(label);
    }
  }
  addTitle() {
    const {
      chart,
      config,
    } = this;
    const title = this.get('title');
    if (!title.text) {
      return this;
    }

    const [width] = this.getDimensions();
    const text = chart.append('text')
      .attr('text-anchor', 'middle')
      .text(title.text);
    setStyle(text, config.style.title);
    const bBox = text.node().getBBox();
    const x = ((width - bBox.width) / 2) - bBox.x;
    const y = ((title.height - bBox.height) / 2) - bBox.y;
    text.attr('transform', `translate(${x}, ${y})`);
    return this;
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
      heatList,
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
    _.forEach(data, (item, i) => {
      const value = item.value;
      const percent = max ? value / max : value;
      const color = colorGen(percent);
      const opacity = (opacityOffset * percent) + opacityRange[0];
      let heatItem = heatList[i];
      if (!heatItem) {
        heatItem = heatmapContainer.append('rect')
          .attr('width', heatWidth)
          .attr('height', heatHeight)
          .attr('x', x)
          .attr('y', y)
          .on('mouseenter', () => {
            this.showTips(i);
          });
        heatList[i] = heatItem;
      } else {
        heatItem.style('display', 'block');
      }
      heatItem.style('fill', color)
        .style('fill-opacity', opacity);
      if (i && (i + 1) % column === 0) {
        y += (heatHeight + heatGap);
        x = 0;
      } else {
        x += (heatWidth + heatGap);
      }
    });
    if (heatList.length > data.length) {
      _.forEach(heatList.slice(data.length), item => item.style('display', 'none'));
    }
    return this;
  }
}
