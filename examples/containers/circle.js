import React, { Component } from 'react';
import { Circle } from 'dcharts';
import hljs from 'highlight.js';

export default class CircleView extends Component {
  componentDidMount() {
    const refs = this.refs;
    const circle = new Circle(refs.circle);
    circle.set('title.text', 'CPU Usage')
      .render(0.543);

    hljs.highlightBlock(refs.code);
  }
  render() {
    return (
      <div>
        <svg
          ref="circle"
        />
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
