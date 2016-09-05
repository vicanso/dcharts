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

    // const customDistanceAxis = new Axis(refs.customDistanceAxis);
    // customDistanceAxis.set('horizontal.distance', 30)
    //   .render([
    //     'Jan',
    //     'Feb',
    //     'Mar',
    //     'Apr',
    //     'Mar',
    //     'Jun',
    //     'Jul',
    //     'Aug',
    //     'Sep',
    //     'Oct',
    //     'Nov',
    //     'Dec',
    //   ]);

    // const verticalAxis = new Axis(refs.verticalAxis);
    // verticalAxis.set('type', 'vertical')
    //   .render([
    //     10,
    //     20,
    //     30,
    //     40,
    //     50,
    //     60,
    //   ]);
    // let index = 0;
    // const getArr = () => {
    //   const arr = [];
    //   for (let i = 0; i < 5; i++) {
    //     arr.push(++index);
    //   }
    //   return arr;
    // }
    // const liveUpdateAxis = new Axis(refs.liveUpdateAxis);
    // liveUpdateAxis
    //   .set('horizontal.distance', 40)
    //   .render(getArr());
    // this.timer = setInterval(() => {
    //   liveUpdateAxis.update(getArr());
    // }, 2000);

    // const alignLeftAxis = new Axis(refs.alignLeftAxis);
    // alignLeftAxis
    //   .set('horizontal.distance', 40)
    //   .set('horizontal.align', 'left')
    //   .render([
    //     '09-01',
    //     '09-02',
    //     '09-03',
    //     '09-04',
    //     '09-05',
    //     '09-06',
    //   ]);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <div className="legendCotainer pure-g">
        <h2 className="pure-u-1">Axis Examples</h2>
        <section className="pure-u-1-4 chartSection">
          <h3>Default</h3>
          <svg
            ref="defaultAxis"
          >
          </svg>
        </section>
        <section className="pure-u-1-4 chartSection">
          <h3>Custom Distance</h3>
          <svg
            ref="customDistanceAxis"
          >
          </svg>
        </section>
        <section className="pure-u-1-4 chartSection">
          <h3>Vertical</h3>
          <svg
            ref="verticalAxis"
          >
          </svg>
        </section>
        <section className="pure-u-1-4 chartSection">
          <h3>Live Update</h3>
          <svg
            ref="liveUpdateAxis"
          >
          </svg>
        </section>
        <section className="pure-u-1-4 chartSection">
          <h3>Align Left</h3>
          <svg
            ref="alignLeftAxis"
          >
          </svg>
        </section>
      </div>
    )
  }
}
