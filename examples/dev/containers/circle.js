import React, { Component } from 'react';
import Circle from '../../../lib/circle';

export default class CircleView extends Component {
  componentDidMount() {
    const refs = this.refs;

    const defaultCircle = new Circle(refs.defaultCircle);
    defaultCircle.set('title.text', 'CPU Usage');
    defaultCircle.render(0.543);

    const noneBGCircle = new Circle(refs.noneBGCircle);
    noneBGCircle
      .set('disabled.background', true)
    noneBGCircle.render(0.6184);

    const liveUpdateCircle = new Circle(refs.liveUpdateCircle);
    liveUpdateCircle.render(Math.random());
    this.timer = setInterval(() => {
      liveUpdateCircle.update(Math.random());
    }, 1000);

    const changeFillColorCircle = new Circle(refs.changeFillColorCircle);
    const newColor = '#f1495b';
    changeFillColorCircle.set('style.foreground.fill', newColor)
      .set('style.label.fill', newColor)
      .render(0.3458);

    const thicknessFullFillCircle = new Circle(refs.thicknessFullFillCircle);
    thicknessFullFillCircle
      .set({
        'disabled.background': true,
        'thickness': '100%',
        'style.label.fill': '#3d4751',
      })
      .render(0.2458);

    const halfCircle = new Circle(refs.halfCircle);
    halfCircle.set({
      startAngle: -Math.PI / 2,
      endAngle: Math.PI / 2,
      thickness: 20,
    }).render(0.432);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <div className="legendCotainer pure-g">
        <h2 className="pure-u-1">Circle Examples</h2>
        <section className="pure-u-1-4 chartSection">
          <h3>Default</h3>
          <svg
            ref="defaultCircle"
          >
          </svg>
        </section>
        <section className="pure-u-1-4 chartSection">
          <h3>Without Background</h3>
          <svg
            ref="noneBGCircle"
          >
          </svg>
        </section>
        <section className="pure-u-1-4 chartSection">
          <h3>Live Update</h3>
          <svg
            ref="liveUpdateCircle"
          >
          </svg>
        </section>
        <section className="pure-u-1-4 chartSection">
          <h3>Change Fill Color</h3>
          <svg
            ref="changeFillColorCircle"
          >
          </svg>
        </section>
        <section className="pure-u-1-4 chartSection">
          <h3>Thickness Full Fill</h3>
          <svg
            ref="thicknessFullFillCircle"
          >
          </svg>
        </section>
        <section className="pure-u-1-4 chartSection">
          <h3>Half</h3>
          <svg
            ref="halfCircle"
          >
          </svg>
        </section>
      </div>
    )
  }
}
