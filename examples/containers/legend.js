import React, { Component } from 'react';
import Legend from '../../lib/legend';

export default class LegendView extends Component {
  componentDidMount() {
    const refs = this.refs;

    const defaultLegend = new Legend(refs.defaultLegend);
    defaultLegend.render([
      {
        text: 'Chrome',
      },
      {
        text: 'Firefox',
      },
      {
        text: 'Edge',
      },
      {
        text: 'Safari',
      },
      {
        text: 'IE',
      },
      {
        text: 'Opera',
      },
    ]);
    const mobileBrowserList = [
      'iOS Safari',
      'Opera Mini',
      'Android Browser',
      'Chrome for Android'
    ];
    const columnLegend = new Legend(refs.columnLegend);
    columnLegend.set('type', 'column')
      .render(mobileBrowserList);

    const toggleLegend = new Legend(refs.toggleLegend);
    toggleLegend.render(mobileBrowserList).on('click', index => {
      toggleLegend.toggle(index);
    });

    const orderDisableLegend = new Legend(refs.orderDisableLegend);
    let disabledIndex = -1;
    orderDisableLegend.set('type', 'column')
      .render(mobileBrowserList);
    this.timer = setInterval(() => {
      orderDisableLegend.enable(disabledIndex);
      disabledIndex = (disabledIndex + 1) % mobileBrowserList.length;
      orderDisableLegend.disable(disabledIndex )
    }, 1000);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <div className="legendCotainer pure-g">
        <h2 className="pure-u-1">Legend Examples</h2>
        <section className="pure-u-1-4 chartSection">
          <h3>Default</h3>
          <svg
            ref="defaultLegend"
          >
          </svg>
        </section>
        <section className="pure-u-1-4 chartSection">
          <h3>Column</h3>
          <svg
            ref="columnLegend"
          >
          </svg>
        </section>
        <section className="pure-u-1-4 chartSection">
          <h3>Toggle</h3>
          <svg
            ref="toggleLegend"
          >
          </svg>
        </section>
        <section className="pure-u-1-4 chartSection">
          <h3>Disable One By One</h3>
          <svg
            ref="orderDisableLegend"
          >
          </svg>
        </section>
      </div>
    )
  }
}
