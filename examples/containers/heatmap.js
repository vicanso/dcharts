import React, { Component } from 'react';
import { Heatmap } from '../..';
import hljs from 'highlight.js';
import * as _ from 'lodash';
import ChartView from './chart';

class RandomHeatmap extends Component {
  componentDidMount() {
    const refs = this.refs;
    const max = 30;
    const heatmap = new Heatmap(refs.svg);
    const data = _.map(_.range(24), i => {
      const value = _.random(0, max);
      return {
        name: _.padStart(`${i}时`, 3, '0'),
        value,
      };
    });
    heatmap.set({
      title: {
        text: 'Random Heatmap',
      },
      row: 5,
      column: 5,
      heat: {
        width: 30,
        height: 30,
      },
      max: max,
    }).render(data);
    hljs.highlightBlock(refs.code);
  }
  render() {
    return (
      <div>
        <div
          style={{
            margin: 'auto',
            maxWidth: '600px',
          }}
        >
          <svg
            ref="svg"
          />
        </div>
        <pre
          ref="code"
        >{`
  const max = 30;
  const heatmap = new Heatmap(svgDom);
  const data = _.map(_.range(24), i => {
    const value = _.random(0, max);
    return {
      name: _.padStart(i + "时", 3, '0'),
      value,
    };
  });
  heatmap.set({
    title: {
      text: 'Random Heatmap',
    },
    row: 5,
    column: 5,
    heat: {
      width: 40,
      height: 40,
    },
    max: max,
  }).render(data);
          `}</pre>
      </div>
    );
  }
}


class BasicHeatmap extends Component {
  componentDidMount() {
    const refs = this.refs;
    const max = 36;
    const heatmap = new Heatmap(refs.svg);
    const data = _.map(_.range(max), i => {
      const value = i;
      return {
        name: i,
        value,
      };
    });
    heatmap.set({
      title: {
        text: 'Cumulative Heatmap',
      },
      max,
      opacityRange: [1, 1],
    }).render(data);
    hljs.highlightBlock(refs.code);
  }
  render() {
    return (
      <div>
        <div
          style={{
            margin: 'auto',
            maxWidth: '600px',
          }}
        >
          <svg
            ref="svg"
          />
        </div>
        <pre
          ref="code"
        >{`
  const max = 36;
  const heatmap = new Heatmap(svgDom);
  const data = _.map(_.range(max), i => {
    const value = i;
    return {
      name: i,
      value,
    };
  });
  heatmap.set({
    title: {
      text: 'Cumulative Heatmap',
    },
    max,
    opacityRange: [1, 1],
  }).render(data);
          `}</pre>
      </div>
    );
  }
}

class CircleHeatmap extends Component {
  componentDidMount() {
    const refs = this.refs;
    const max = 36;
    const heatmap = new Heatmap(refs.svg);
    const getItem = function(index) {
      return {
        name: index,
        value: _.random(0, max),
      };
    }
    const data = [getItem(0)];
    heatmap.set({
      title: {
        text: 'Circle Heatmap',
      },
      max,
      opacityRange: [1, 1],
    }).render(data);
    this.timer = setInterval(function() {
      if (data.length === max) {
        data.length = 0;
      }
      data.push(getItem(data.length));
      heatmap.update(data);
    }, 2000);

    hljs.highlightBlock(refs.code);
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render() {
    return (
      <div>
        <div
          style={{
            margin: 'auto',
            maxWidth: '600px',
          }}
        >
          <svg
            ref="svg"
          />
        </div>
        <pre
          ref="code"
        >{`
          `}</pre>
      </div>
    );
  }
}

export default class HeatmapView extends ChartView {
  constructor(props) {
    super(props);
    this.state = {
      previewList: [
        {
          url: '/basic',
          name: 'Basic Heatmap',
          pic: '/assets/pics/basic-heatmap.png',
          component: BasicHeatmap,
        },
        {
          url: '/random',
          name: 'Random Heatmap',
          pic: '/assets/pics/random-heatmap.png',
          component: RandomHeatmap,
        },
        {
          url: '/circle',
          name: 'Circle Heatmap',
          pic: '/assets/pics/circle-heatmap.png',
          component: CircleHeatmap,
        },
      ],
    };
  }
  render() {
    return this.renderRouter();
  }
}
