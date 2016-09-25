import React, { Component } from 'react';
import { Circle } from 'dcharts';
import hljs from 'highlight.js';
import { Router, Route } from 'react-enroute';

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
    circle.set('title.text', 'CPU Usage')
      .render(0.543);
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
  circle.set('title.text', 'CPU Usage(Per 2s Update)')
    .render(0.543);
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

export default class CircleView extends Component {
  renderList() {
    const {
      goTo,
    } = this.props;
    return (
      <div className="chartExamples pure-g">
        <a
          className="pure-u-1-3 preview"
          href="javascript:;"
          onClick={() => {
            goTo('/circle/examples/basic')
          }}
        >
          <img src="" />
          <div className="name">Basic Circle</div>
        </a>
        <a
          className="pure-u-1-3 preview"
          href="javascript:;"
          onClick={() => {
            goTo('/circle/examples/timing-refresh')
          }}
        >
          <img src="" />
          <div className="name">Timing Refresh Circle</div>
        </a>
        <a
          className="pure-u-1-3 preview"
          href="javascript:;"
          onClick={() => {
            goTo('/circle/examples/half')
          }}
        >
          <img src="" />
          <div className="name">Half Circle</div>
        </a>
      </div>
    );
  }
  render() {
    const props = this.props;
    return (
      <div>
        <Router {...props}>
          <Route
            path="/circle/examples/basic"
            component={BasicCircle}
          />
          <Route
            path="/circle/examples/timing-refresh"
            component={TimingRefreshCircle}
          />
          <Route
            path="/circle/examples/half"
            component={HalfCircle}
          />
          <Route
            path="*"
            component={() => this.renderList()}
          />
        </Router>
      </div>
    );
  }
}
