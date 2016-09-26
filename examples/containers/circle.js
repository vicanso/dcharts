import * as _ from 'lodash';
import React, { Component } from 'react';
import { Circle } from 'dcharts';
import hljs from 'highlight.js';
import { Router, Route } from 'react-enroute';
import ChartView from './chart';

class BasicCircle extends Component {
  componentDidMount() {
    const refs = this.refs;
    const circle = new Circle(refs.svg);
    circle.set('title.text', 'CPU Usage')
      .render(0.543);
    hljs.highlightBlock(refs.code);
  }
  render() {
    return (
      <div>
        <div
          style={{
            margin: 'auto',
            maxWidth: '400px',
          }}
        >
          <svg
            ref="svg"
          />
        </div>
        <pre
          ref="code"
        >{`
  const circle = new Circle(svgDom);
  circle.set('title.text', 'CPU Usage')
    .render(0.543);
        `}</pre>
      </div>
    );
  }
}

class TimingRefreshCircle extends Component {
  componentDidMount() {
    const refs = this.refs;
    const circle = new Circle(refs.svg);
    circle.set({
      title: {
        text: 'CPU Usage',
      },
      style: {
        label: {
          fill: '#3d4751',
        },
        foreground: {
          fill: '#3d4751',
        },
      },
    }).render(0.543);
    this.timer = setInterval(function() {
      circle.update(Math.random());
    }, 2000)
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
            maxWidth: '400px',
          }}
        >
          <svg
            ref="svg"
          />
        </div>
        <pre
          ref="code"
        >{`
  const circle = new Circle(svgDom);
  circle.set({
    title: {
      text: 'CPU Usage',
    },
    style: {
      label: {
        fill: '#3d4751',
      },
      foreground: {
        fill: '#3d4751',
      },
    },
  }).render(0.543);
  setInterval(function() {
    circle.update(Math.random());
  }, 2000)
        `}</pre>
    </div>
    );
  }
}

class HalfCircle extends Component {
  componentDidMount() {
    const refs = this.refs;
    const circle = new Circle(refs.svg);
    circle.set({
      title: {
        text: 'CPU Usage',
      },
      startAngle: -Math.PI / 2,
      endAngle: Math.PI / 2,
    });
    circle.set('title.text', 'CPU Usage')
      .render(0.543);
    hljs.highlightBlock(refs.code);
  }
  render() {
    return (
      <div>
        <div
          style={{
            margin: 'auto',
            maxWidth: '400px',
          }}
        >
          <svg
            ref="svg"
          />
        </div>
        <pre
          ref="code"
        >{`
  const circle = new Circle(svgDom);
  circle.set({
    title: {
      text: 'CPU Usage',
    },
    startAngle: -Math.PI / 2,
    endAngle: Math.PI / 2,
  });
  circle.set('title.text', 'CPU Usage')
    .render(0.543);
        `}</pre>
    </div>
    );
  }
}

export default class CircleView extends ChartView {
  constructor(props) {
    super(props);
    this.state = {
      previewList: [
        {
          url: '/basic',
          name: 'Basic Circle',
          pic: '/assets/pics/basic-circle.png',
          component: BasicCircle,
        },
        {
          url: '/timing-refresh',
          name: 'Timing Refresh Circle',
          pic: '/assets/pics/timing-refresh-circle.png',
          component: TimingRefreshCircle,
        },
        {
          url: '/half',
          name: 'Half Circle',
          pic: '/assets/pics/half-circle.png',
          component: HalfCircle,
        },
      ],
    };
  }
  render() {
    return this.renderRouter();
  }
}
