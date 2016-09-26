import React, { Component } from 'react';
import { Pie } from 'dcharts';
import hljs from 'highlight.js';
import ChartView from './chart';

class BasicPie extends Component {
  componentDidMount() {
    const refs = this.refs;
    const pie = new Pie(refs.svg);
    pie.set('title.text', 'Browser Share')
      .render([
        {
          name: 'IE',
          value: 18,
        },
        {
          name: 'Firefox',
          value: 23,
        },
        {
          name: 'Chrome',
          value: 84,
        },
        {
          name: 'Edge',
          value: 30,
        },
        {
          name: 'Safari',
          value: 30,
        },
        {
          name: 'Opera',
          value: 10,
        },
      ]);
    hljs.highlightBlock(refs.code);
  }
  render() {
    return (
      <div>
        <div
          style={{
            margin: 'auto',
            maxWidth: '820px',
          }}
        >
          <svg
            ref="svg"
          />
        </div>
        <pre
          ref="code"
        >{`
  const pie = new Pie(svgDom);
  pie.set('title.text', 'Browser Share')
    .render([
      {
        name: 'IE',
        value: 18,
      },
      {
        name: 'Firefox',
        value: 23,
      },
      {
        name: 'Chrome',
        value: 84,
      },
      {
        name: 'Edge',
        value: 30,
      },
      {
        name: 'Safari',
        value: 30,
      },
      {
        name: 'Opera',
        value: 10,
      },
    ]);
        `}</pre>
      </div>
    );
  }
}

export default class PieView extends ChartView {
  constructor(props) {
    super(props);
    this.state = {
      previewList: [
        {
          url: '/basic',
          name: 'Basic Pie',
          pic: '/assets/pics/basic-pie.png',
          component: BasicPie,
        },
      ],
    };
  }
  render() {
    return this.renderRouter();
  }
}
