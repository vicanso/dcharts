import React, { Component } from 'react';
import { Heatmap } from 'dcharts';
import hljs from 'highlight.js';
import * as _ from 'lodash';
import ChartView from './chart';

class BasicHeatmap extends Component {
  componentDidMount() {
    const refs = this.refs;
    const heatmap = new Heatmap(refs.svg);
    const data = _.map(_.range(36), i => {
      const value = _.random(0, 30);
      return {
        value,
      };
    });
    heatmap.render(data);
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
      ],
    };
  }
  render() {
    return this.renderRouter();
  }
}
