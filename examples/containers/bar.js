import React, { Component } from 'react';
import { Bar } from '../..';
import hljs from 'highlight.js';
import ChartView from './chart';

class BasicBar extends Component {
  componentDidMount() {
    const refs = this.refs;

    const bar = new Bar(refs.svg);
    bar.set({
      xAxis: {
        categories: [
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
        ],
      },
      title: {
        text: 'Monthly Average Temperature',
      },
      yAxis: {
        width: 40,
        title: {
          text: 'Temperature (°C)',
        },
      },
    })
    .render([{
      name: 'Tokyo',
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
    }, {
      name: 'New York',
      data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
    }, {
      name: 'Berlin',
      data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0],
    }, {
      name: 'London',
      data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
    }]);

    hljs.highlightBlock(refs.code);
  }
  render() {
    return (
      <div>
        <div
          style={{
            margin: 'auto',
            maxWidth: '1000px',
          }}
        >
          <svg
            ref="svg"
          />
        </div>
        <pre
          ref="code"
        >{`
  const bar = new Bar(svgDom);
  bar.set({
    xAxis: {
      categories: [
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
      ],
    },
    title: {
      text: 'Monthly Average Temperature',
    },
    yAxis: {
      width: 40,
      title: {
        text: 'Temperature (°C)',
      },
    },
  })
  .render([{
    name: 'Tokyo',
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
  }, {
    name: 'New York',
    data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
  }, {
    name: 'Berlin',
    data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0],
  }, {
    name: 'London',
    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
  }]);
          `}</pre>
      </div>
    );
  }
}

class TimingRefreshBar extends Component {
  componentDidMount() {
    const refs = this.refs;
    const cpus = 48;
    const categories = ['all'];
    _.forEach(_.range(0, cpus), i => categories.push(i));

    const getUsageList = () => {

      const data = [];
      const usage = {
        name: 'cpu-usage',
        data: data,
      };
      data.push(_.random(0, 50));
      _.forEach(_.range(0, cpus), i => data.push(_.random(0, 100)));
      return [usage];
    };

    const bar = new Bar(refs.svg);
    bar.set({
      xAxis: {
        categories: categories,
      },
      title: {
        text: 'CPU Usage',
      },
      yAxis: {
        max: 100,
        min: 0,
      },
    }).render(getUsageList());

    this.timer = setInterval(() => {
      bar.update(categories, getUsageList());
    }, 2000);

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
            maxWidth: '1000px',
          }}
        >
          <svg
            ref="svg"
          />
        </div>
        <pre
          ref="code"
        >{`
  const cpus = 48;
  const categories = ['all'];
  _.forEach(_.range(0, cpus), i => categories.push(i));
  const getUsageList = () => {

    const data = [];
    const usage = {
      name: 'cpu-usage',
      data: data,
    };
    data.push(_.random(0, 50));
    _.forEach(_.range(0, cpus), i => data.push(_.random(0, 100)));
    return [usage];
  };

  const bar = new Bar(svgDom);
  bar.set({
    xAxis: {
      categories: categories,
    },
    title: {
      text: 'CPU Usage',
    },
    yAxis: {
      max: 100,
      min: 0,
    },
  }).render(getUsageList());

  setInterval(() => {
    bar.update(categories, getUsageList());
  }, 2000);
          `}</pre>
      </div>
    );
  }
}

class DisableLegendBar extends Component {
  componentDidMount() {
    const refs = this.refs;

    const bar = new Bar(refs.svg);
    bar.set({
      xAxis: {
        categories: [
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
        ],
      },
      title: {
        text: 'Monthly Average Temperature',
      },
      yAxis: {
        width: 40,
        title: {
          text: 'Temperature (°C)',
        },
      },
      'disabled.legend': true,
    })
    .render([{
      name: 'Tokyo',
      data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
    }, {
      name: 'New York',
      data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
    }, {
      name: 'Berlin',
      data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0],
    }, {
      name: 'London',
      data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
    }]);

    hljs.highlightBlock(refs.code);
  }
  render() {
    return (
      <div>
        <div
          style={{
            margin: 'auto',
            maxWidth: '600px',
          }}
        >
          <svg
            ref="svg"
          />
        </div>
        <pre
          ref="code"
        >{`
  const bar = new Bar(svgDom);
  bar.set({
    xAxis: {
      categories: [
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
      ],
    },
    title: {
      text: 'Monthly Average Temperature',
    },
    yAxis: {
      width: 40,
      title: {
        text: 'Temperature (°C)',
      },
    },
    'disabled.legend': true,
  })
  .render([{
    name: 'Tokyo',
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
  }, {
    name: 'New York',
    data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5],
  }, {
    name: 'Berlin',
    data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0],
  }, {
    name: 'London',
    data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
  }]);
          `}</pre>
      </div>
    );
  }
}

export default class BarView extends ChartView {
  constructor(props) {
    super(props);
    this.state = {
      previewClass: 'pure-u-1-2',
      previewList: [
        {
          url: '/basic',
          name: 'Basic Bar',
          pic: '/assets/pics/basic-bar.png',
          component: BasicBar,
        },
        {
          url: '/timing-refresh',
          name: 'Timing Refresh Bar',
          pic: '/assets/pics/timing-refresh-bar.png',
          component: TimingRefreshBar,
        },
        {
          url: '/disabled-legend',
          name: 'Disable Legend Bar',
          pic: '/assets/pics/disabled-legend-bar.png',
          component: DisableLegendBar,
        },
      ],
    };
  }
  render() {
    return this.renderRouter();
  } 
}

