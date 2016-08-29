import * as d3 from 'd3';

export const colors = [
  '#5cd5f3',
  '#f1495b',
  '#17e7af',
  '#3d4751',
  '#d79a5d',
  '#2c1b44',
];

export const circle = {
  radius: 70,
  thickness: 5,
  endAngle: 2 * Math.PI,
  startAngle: 0,
  ease: d3.easeLinear,
  duration: 300,
  format: d3.format(`.${d3.precisionFixed(0.01)}%`),
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
  },
  disabled: {
    background: false,
    label: false,
  },
};

export const pie = {
  radius: 80,
  ease: d3.easeLinear,
  duration: 300,
  backgroundColors: colors,
  style: {
    line: {
      stroke: 'RGB(70, 130, 180)',
      'stroke-width': 1,
      'stroke-opacity': 0.4,
      fill: 'none',
    },
    pie: {
      stroke: '#fff',
      'stroke-width': 1,
      'stroke-linejoin': 'round',
    },
  },
};

export const legend = {
  width: 16,
  height: 12,
  space: 15,
  maxWidth: 300,
  colors,
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
};

export const tooltip = {
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
};

export const line = {
  width: '100%',
  height: 300,
  colors,
  xAxis: {
  },
  yAxis: {
    max: '+20%',
    min: '0%',
  },
  style: {
    line: {
      'stroke-width': 2,
      fill: 'none',
    },
  },
};

export const axis = {
  type: 'horizontal',
  pointCount: 'auto',
  horizontal: {
    width: 300,
    height: 30,
    distance: 60,
  },
  vertical: {
    width: 30,
    height: 300,
    distance: 40,
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
};
