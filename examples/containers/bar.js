import React, { Component } from 'react';
import moment from 'moment';
import * as _ from 'lodash';
import { Bar } from '../..';

export default class BarView extends Component {
  componentDidMount() {
    const refs = this.refs;

    const defaultBar = new Bar(refs.defaultBar);
    defaultBar.set('xAxis.categories', [
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
    ]).set('title.text', 'Browser List');

    defaultBar.render([
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
        data: [3.5, 4.8, 5.9, 7.2, 10.1, 11.5, 13.2, 16.3, 18.1, 20.3, 17.3, 12.4],
      },
    ]);

    const liveUpdateBar = new Bar(refs.liveUpdateLine);
    let date = moment().add(-365, 'day');
    const dateList = [date.format('MM-DD')];
    const dataList = [
      {
        name: 'GZ',
        data: [_.random(3, 5)],
      },
      {
        name: 'CH',
        data: [_.random(3, 5)],
      },
      {
        name: 'SZ',
        data: [_.random(3, 5)],
      },
    ];
    for (let i = 0; i < 10; i++) {
      date = date.add(1, 'day');
      dateList.push(date.format('MM-DD'));
      _.forEach(dataList, item => item.data.push(_.last(item.data) + _.random(0, 5)));
    }
    liveUpdateBar.set('title.text', '降雨量')
      .set('xAxis.categories', dateList);
    liveUpdateBar.render(dataList);
    this.updateTimer = setInterval(() => {
      date = date.add(1, 'day');
      dateList.push(date.format('MM-DD'));
      _.forEach(dataList, item => item.data.push(_.last(item.data) + _.random(0, 5)));
      liveUpdateBar.update(dateList, dataList);
    }, 5000);
  }
  componentWillUnmount() {
    clearInterval(this.updateTimer);
  }
  render() {
    return (
      <div className="stackCotainer pure-g">
      <h2 className="pure-u-1">Bar Examples</h2>
      <section className="pure-u-1-2 chartSection">
        <h3>Default</h3>
        <svg
          ref="defaultBar"
        >
        </svg>
      </section>
      <section className="pure-u-1-2 chartSection">
        <h3>Live Update</h3>
        <svg
          ref="liveUpdateLine"
        >
        </svg>
      </section>
      </div>
    );
  }
}
