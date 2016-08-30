import React, { Component } from 'react';
import Pie from '../../lib/pie';

export default class PieView extends Component {
  componentDidMount() {
    const refs = this.refs;
    const defaultPie = new Pie(refs.defaultPie);

    defaultPie.render([
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
  }
  render() {
    return (
      <div className="legendCotainer pure-g">
        <h2 className="pure-u-1">Pie Examples</h2>
        <section className="pure-u-1-4 chartSection">
          <h3>Default</h3>
          <svg
            ref="defaultPie"
          >
          </svg>
        </section>
      </div>
    )
  }
}
