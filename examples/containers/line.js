import React, { Component } from 'react';
import Line from '../../lib/line';

export default class LineView extends Component {
  componentDidMount() {
    const refs = this.refs;

    const defaultLine = new Line(refs.defaultLine);

    defaultLine.set('xAxis.categories', [
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
      'Dec'
    ]);

    defaultLine.render([
      {
        name: 'Chrome',
        data: [8.2, 7.8, 9.3, 10.5, 12.1, 13.8, 16.7, 25.3, 20.2, 18.4, 17.1, 15.4],
      },
      {
        name: 'Safari',
        data: [-1.5, -0.6, 2, 3.5, 4.8, 5.2, 8.3, 10.9, 12.5, 15.8, 13.2, 10.1],
      },
      {
        name: 'Firefox',
        data: [3.5, 4.8, 5.9, 7.2, 10.1, 11.5, 13.2, 16.3, 18.1, 20.3, 17.3, 15.4],
      },
    ]);
  }
  render() {
    return (
      <div className="legendCotainer pure-g">
        <h2 className="pure-u-1">Line Examples</h2>
        <section className="pure-u-1-2 chartSection">
          <h3>Default</h3>
          <svg
            ref="defaultLine"
          >
          </svg>
        </section>
      </div>
    )
  }
}
