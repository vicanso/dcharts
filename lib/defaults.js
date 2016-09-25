import * as d3 from 'd3';
import * as _ from 'lodash';

let colors = [
  '#1f77b4',
  '#f1495b',
  '#2ca02c',
  '#3d4751',
  '#d79a5d',
  '#2c1b44',
];

const circleOptions = {};
const pieOptions = {};
const legendOptions = {};
const tooltipOptions = {};
const lineOptions = {};
const barOptions = {};
const axisOptions = {};

function getCircleOptions() {
  return _.assign({
    width: '100%',
    radius: 70,
    thickness: 5,
    startAngle: 0,
    endAngle: 2 * Math.PI,
    ease: d3.easeLinear,
    duration: 300,
    format: d3.format(`.${d3.precisionFixed(0.01)}%`),
    title: {
      height: 32,
      text: '',
    },
    style: {
      background: {
        fill: '#e6edf4',
      },
      foreground: {
        fill: colors[0],
      },
      label: {
        fill: colors[0],
        font: '18px sans-serif',
        'text-anchor': 'middle',
        'alignment-baseline': 'middle',
      },
      title: {
        color: '#666',
        'font-size': '16px',
        fill: '#666',
      },
    },
    disabled: {
      background: false,
      label: false,
    },
  }, circleOptions);
}


function getPieOptions() {
  return _.assign({
    width: '100%',
    radius: 80,
    ease: d3.easeLinear,
    duration: 300,
    backgroundColors: colors.slice(0),
    title: {
      height: 32,
      text: '',
    },
    style: {
      pie: {
        stroke: '#fff',
        'stroke-width': 1,
        'stroke-linejoin': 'round',
      },
      title: {
        color: '#666',
        'font-size': '16px',
        fill: '#666',
      },
    },
  }, pieOptions);
}

function getLegendOptions() {
  return _.assign({
    width: 16,
    height: 12,
    space: 15,
    maxWidth: 300,
    colors: colors.slice(0),
    type: 'row',
    style: {
      label: {
        'font-size': '12px',
        'font-weight': 'bold',
        color: '#333',
        fill: '#333',
        cursor: 'pointer',
      },
      labelDisabled: {
        color: '#ccc',
        fill: '#ccc',
      },
    },
  }, legendOptions);
}

function getTooltipOptions() {
  return _.assign({
    offset: {
      x: 8,
      y: 20,
    },
    style: {
      text: {
        'font-size': '12px',
        color: '#333',
        fill: '#333',
      },
      rect: {
        fill: 'rgba(249, 249, 249, 0.8)',
        stroke: '#7cb5ec',
        'stroke-width': 1,
      },
    },
  }, tooltipOptions);
}

function getLineOptions() {
  return _.assign({
    width: '100%',
    height: 300,
    colors: colors.slice(0),
    curve: 'curveLinear',
    margin: {
      left: 5,
      right: 5,
      top: 5,
      bottom: 0,
    },
    title: {
      height: 32,
      text: '',
    },
    legend: {
      height: 20,
    },
    xAxis: {
      height: 30,
    },
    yAxis: {
      max: '+20%',
      min: '0%',
      width: 30,
      title: {
        text: '',
      },
    },
    style: {
      grid: {
        'stroke-width': 1,
        fill: 'none',
        stroke: 'rgba(153, 153, 153, 0.2)',
        'shape-rendering': 'crispEdges',
      },
      line: {
        'stroke-width': 2,
        fill: 'none',
      },
      auxiliaryLine: {
        'stroke-width': 1,
        fill: 'none',
        stroke: '#999',
        'shape-rendering': 'crispEdges',
      },
      title: {
        color: '#666',
        'font-size': '16px',
        fill: '#666',
      },
      yAxisTitle: {
        color: '#666',
        'font-size': '14px',
        fill: '#666',
      },
    },
  }, lineOptions);
}

function getBarOptions() {
  return _.assign({
    width: '100%',
    height: 300,
    colors: colors.slice(0),
    column: {
      margin: '10%',
    },
    margin: {
      left: 5,
      right: 5,
      top: 5,
      bottom: 0,
    },
    title: {
      height: 32,
      text: '',
    },
    legend: {
      height: 20,
    },
    xAxis: {
      height: 30,
      align: 'center',
    },
    yAxis: {
      max: '+20%',
      min: '0%',
      width: 30,
      title: {
        text: '',
      },
    },
    style: {
      grid: {
        'stroke-width': 1,
        fill: 'none',
        stroke: 'rgba(153, 153, 153, 0.2)',
        'shape-rendering': 'crispEdges',
      },
      title: {
        color: '#666',
        'font-size': '16px',
        fill: '#666',
      },
      yAxisTitle: {
        color: '#666',
        'font-size': '14px',
        fill: '#666',
      },
    },
  }, barOptions);
}

function getAxisOptions() {
  return _.assign({
    type: 'horizontal',
    pointCount: 'auto',
    horizontal: {
      width: 300,
      height: 30,
      distance: 60,
      align: 'left',
    },
    vertical: {
      width: 30,
      height: 300,
      distance: 40,
      align: 'left',
    },
    style: {
      line: {
        'stroke-width': 1,
        stroke: '#999',
        fill: 'none',
        'shape-rendering': 'crispEdges',
      },
      text: {
        color: '#606060',
        'font-size': '11px',
        fill: '#606060',
        'text-overflow': 'clip',
      },
    },
  }, axisOptions);
}

export function get(type) {
  switch (type) {
    case 'colors':
      return colors.slice(0);
    case 'circle':
      return getCircleOptions();
    case 'pie':
      return getPieOptions();
    case 'legend':
      return getLegendOptions();
    case 'tooltip':
      return getTooltipOptions();
    case 'line':
      return getLineOptions();
    case 'bar':
      return getBarOptions();
    case 'axis':
      return getAxisOptions();
    default:
      return null;
  }
}

export function set(type, options) {
  switch (type) {
    case 'colors':
      if (_.isArray(options)) {
        colors = options.slice(0);
      }
      return colors.slice(0);
    case 'circle':
      return _.assign(circleOptions, options);
    case 'pie':
      return _.assign(pieOptions, options);
    case 'legend':
      return _.assign(legendOptions, options);
    case 'tooltip':
      return _.assign(tooltipOptions, options);
    case 'line':
      return _.assign(lineOptions, options);
    case 'bar':
      return _.assign(barOptions, options);
    case 'axis':
      return _.assign(axisOptions, options);
    default:
      return null;
  }
}
