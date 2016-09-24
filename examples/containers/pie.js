import React, { Component } from 'react';
import { Pie } from 'dcharts';
import hljs from 'highlight.js';

export default class PieView extends Component {
  componentDidMount() {
    const refs = this.refs;
    const pie = new Pie(refs.pie);
    pie.set('title.text', 'Browser Accounting')
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
            'maxWidth': '820px',
          }}
        >
          <svg
            ref="pie"
          />
        </div>
        <pre
          ref="code"
        >{`
  const pie = new Pie(svgDom);
  pie.set('title.text', 'Browser Accounting')
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
