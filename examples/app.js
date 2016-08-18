import * as d3 from 'd3';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Circle from '../lib/circle';
import Pie from '../lib/pie';
import Legend from '../lib/legend';
import Tooltip from '../lib/tooltip';
import * as defaults from '../lib/defaults';

class App extends Component {
  componentDidMount() {
    this.renderLegendView();
    this.renderCircleView();
    this.renderPieView();
    this.renderTooltip();
  }
  renderTooltip() {
    const refs = this.refs;

    const defaultTooltip = new Tooltip(refs.defaultTooltip);
    defaultTooltip.render('Google Chrome');

  }
  renderPieView() {
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
  renderCircleView() {
    const refs = this.refs;

    const defaultCircle = new Circle(refs.defaultCircle);
    defaultCircle.render(0.543);

    const noneBGCircle = new Circle(refs.noneBGCircle);
    noneBGCircle.set('disabled.background', true);
    noneBGCircle.render(0.6184);

    const liveUpdateCircle = new Circle(refs.liveUpdateCircle);
    liveUpdateCircle.render(Math.random());
    setInterval(() => {
      liveUpdateCircle.update(Math.random());
    }, 1000);

    const changeFillColorCircle = new Circle(refs.changeFillColorCircle);
    const newColor = defaults.colors[1];
    changeFillColorCircle.set('style.foreground.fill', newColor)
      .set('style.label.fill', newColor)
      .render(0.3458);

    const thicknessFullFillCircle = new Circle(refs.thicknessFullFillCircle);
    thicknessFullFillCircle
      .set({
        'disabled.background': true,
        'thickness': '100%',
        'style.label.fill': defaults.colors[3],
      })
      .render(0.2458);

    const halfCircle = new Circle(refs.halfCircle);
    halfCircle.set({
      startAngle: -Math.PI / 2,
      endAngle: Math.PI / 2,
      thickness: 20,
    }).render(0.432);
  }
  renderLegendView() {
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
    setInterval(() => {
      orderDisableLegend.enable(disabledIndex);
      disabledIndex = (disabledIndex + 1) % mobileBrowserList.length;
      orderDisableLegend.disable(disabledIndex )
    }, 1000);
  }
  render() {
    return (
      <div style={{
        paddingBottom: '20px',
      }}>
        <h2>Tooltip Examples</h2>
        <div className="pure-g">
          <section className="pure-u-1-4 chartSection">
            <h3>Default</h3>
            <svg
              ref="defaultTooltip"
            >
            </svg>
          </section>
        </div>
        <h2>Legend Examples</h2>
        <div className="pure-g">
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
        <h2>Circle Examples</h2>
        <div className="pure-g">
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
        <h2>Pie Examples</h2>
        <div className="pure-g">
          <section className="pure-u-1-4 chartSection">
            <h3>Default</h3>
            <svg
              ref="defaultPie"
            >
            </svg>
          </section>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
