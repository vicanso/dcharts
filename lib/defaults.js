import * as d3 from 'd3';

const colors = [
  '#1f77b4',
  '#f1495b',
  '#2ca02c',
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
};

export const pie = {
  radius: 80,
  ease: d3.easeLinear,
  duration: 300,
  backgroundColors: colors,
  title: {
    height: 32,
    text: '',
  },
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
    title: {
      color: '#666',
      'font-size': '16px',
      fill: '#666',
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
};

export const bar = {
  width: '100%',
  height: 300,
  colors,
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
    line: {
      'stroke-width': 1.5,
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
};

export const axis = {
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
};
