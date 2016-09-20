import React, { Component } from 'react';
import Axis from '../../lib/axis';

export default class AxisView extends Component {
  componentDidMount() {
    const refs = this.refs;

    const defaultAxis = new Axis(refs.defaultAxis);
    defaultAxis.render([
      '2015-01-01',
      '2015-01-02',
      '2015-01-03',
      '2015-01-04',
      '2015-01-05',
      '2015-01-06',
      '2015-01-07',
      '2015-01-08',
      '2015-01-09',
      '2015-01-10',
      '2015-01-11',
      '2015-01-12',
      '2015-01-13',
    ]);

    const alignCenterAxis = new Axis(refs.alignCenterAxis);

    alignCenterAxis
      .set('horizontal.align', 'center')
      .render([
        10,
        20,
        30,
        40,
        50,
      ]);

    const customDistanceAxis = new Axis(refs.customDistanceAxis);
    customDistanceAxis.set('horizontal.distance', 30)
      .render([
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ]);

    const verticalAxis = new Axis(refs.verticalAxis);
    verticalAxis.set('type', 'vertical')
      .render([
        10 * 1000,
        20 * 1000,
        30 * 1000,
        40 * 1000,
        50 * 1000,
        60 * 1000,
        70 * 1000,
        80 * 1000,
        90 * 1000,
        100 * 1000,
      ]);

    let index = 0;
    const getArr = () => {
      const arr = [];
      for (let i = 0; i < 5; i++) {
        arr.push(++index);
      }
      return arr;
    }
    const liveUpdateAxis = new Axis(refs.liveUpdateAxis);
    liveUpdateAxis
      .set('horizontal.distance', 40)
      .render(getArr());
    this.updateTimer = setInterval(() => {
      liveUpdateAxis.update(getArr());
    }, 2000);


    const increasePointAxis = new Axis(refs.increasePoint);
    const arr = [
      1,
      2,
      3,
      4,
      5,
    ];
    increasePointAxis.render(arr);
    this.increaseTimer = setInterval(() => {
      arr.push(_.last(arr) + 1);
      increasePointAxis.update(arr);
    }, 2000);

  }
  componentWillUnmount() {
    clearInterval(this.updateTimer);
    clearInterval(this.increaseTimer);
  }
  render() {
    return (
      <div className="legendCotainer pure-g">
        <h2 className="pure-u-1">Axis Examples</h2>
        <section className="pure-u-1-4 chartSection">
          <h3>Default</h3>
          <svg
            ref="defaultAxis"
            style={{
              margin: '30px',
            }}
          >
          </svg>
        </section>
        <section className="pure-u-1-4 chartSection">
          <h3>Custom Distance</h3>
          <svg
            ref="customDistanceAxis"
            style={{
              margin: '30px',
            }}
          >
          </svg>
        </section>
        <section className="pure-u-1-4 chartSection">
          <h3>Align Center</h3>
          <svg
            ref="alignCenterAxis"
            style={{
              margin: '30px',
            }}
          >
          </svg>
        </section>
        <section className="pure-u-1-4 chartSection">
          <h3>Vertical</h3>
          <svg
            ref="verticalAxis"
            style={{
              margin: '30px',
              height: '350px',
            }}
          >
          </svg>
        </section>
        <section className="pure-u-1-4 chartSection">
          <h3>Live Update</h3>
          <svg
            style={{
              margin: '30px',
            }}
            ref="liveUpdateAxis"
          >
          </svg>
        </section>
        <section className="pure-u-1-4 chartSection">
          <h3>Increase Point</h3>
          <svg
            style={{
              margin: '30px',
            }}
            ref="increasePoint"
          >
          </svg>
        </section>
      </div>
    )
  }
}
