import * as d3 from 'd3';
import * as _ from 'lodash';

export const circle = {
  radius: 50,
  thickness: 5,
  endAngle: 2 * Math.PI,
  startAngle: 0,
  ease: d3.easeLinear,
  duration: 300,
  format: d3.format(`.${d3.precisionFixed(0.01)}%`),
  style: {
    background: {
      fill: 'RGB(230, 237, 244)',
    },
    foreground: {
      fill: 'RGB(0, 181, 241)',
    },
    label: {
      fill: 'RGB(0, 181, 241)',
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
  radius: 50,
  ease: d3.easeLinear,
  duration: 300,
  backgroundColors: [
    'RGB(0, 181, 241)',
    'RGB(67, 67, 72)',
    'RGB(144, 237, 125)',
    'RGB(247, 163, 92)',
    'RGB(128, 133, 233)',
    'RGB(241, 92, 128)',
  ],
};
