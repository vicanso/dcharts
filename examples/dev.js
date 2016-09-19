import * as d3 from 'd3';
import * as _ from 'lodash';
import React, { Component } from 'react';
import { Router, Route } from 'react-enroute';
import ReactDOM from 'react-dom';
import Circle from '../lib/circle';
import Pie from '../lib/pie';
import Tooltip from '../lib/tooltip';
import Line from '../lib/line';
import Axis from '../lib/axis';
import * as defaults from '../lib/defaults';
import LegendView from './containers/legend';
import AxisView from './containers/axis';
import CircleView from './containers/circle';
import PieView from './containers/pie';
import LineView from './containers/line';
import BarView from './containers/bar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: location.pathname,
    };
    window.addEventListener('popstate', () =>this.setState({
      location: location.pathname,
    }));
  }
  renderAxisView() {
    return (
      <AxisView
      />
    );
  }
  renderLineView() {
    return (
      <LineView
      />
    );
  }
  renderPieView() {
    return (
      <PieView
      />
    );
  }
  renderCircleView() {
    return (
      <CircleView
      />
    );
  }
  renderLegendView() {
    return (
      <LegendView
      />
    );
  }
  renderBarView() {
    return (
      <BarView
      />
    );
  }
  renderChartList() {
    const goTo = (e, name) => {
      e.preventDefault();
      const url = `/dev/${name.toLowerCase()}`;
      history.pushState({}, name, url);
      this.setState({
        location: url,
      });
    };
    const arr = _.map(['Axis', 'Legend', 'Circle', 'Pie', 'Line', 'Bar'], name => (
      <div
        className="pure-u-1-5"
        key={name}
      >
        <a
          className="chart"
          href="javascript:;"
          onClick={e => goTo(e, name)}
        >
          {name}
        </a>
      </div>
    ));
    return (
      <div
        className="chartsContainer"
      >
        <h2>d3 charts</h2>
        <div className="pure-g">
          {arr}
        </div>
      </div>
    );
  }
  render() {
    const { state } = this;
    return (
      <div>
        <Router {...state}>
          <Route
            path="/dev/legend"
            component={() => this.renderLegendView()}
          />
          <Route
            path="/dev/axis"
            component={() => this.renderAxisView()}
          />
          <Route
            path="/dev/circle"
            component={() => this.renderCircleView()}
          />
          <Route
            path="/dev/pie"
            component={() => this.renderPieView()}
          />
          <Route
            path="/dev/line"
            component={() => this.renderLineView()}
          />
          <Route
            path="/dev/bar"
            component={() => this.renderBarView()}
          />
          <Route
            path="/dev"
            component={() => this.renderChartList()}
          />
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
