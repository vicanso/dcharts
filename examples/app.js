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
  renderChartList() {
    const goTo = (e, name) => {
      e.preventDefault();
      const url = `/${name.toLowerCase()}`;
      history.pushState({}, name, url);
      this.setState({
        location: url,
      });
    };
    const arr = _.map(['Axis', 'Legend', 'Circle', 'Pie', 'Line'], name => (
      <div
        className="pure-u-1-4"
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
      <Router {...state}>
        <Route
          path="/legend"
          component={() => this.renderLegendView()}
        />
        <Route
          path="/axis"
          component={() => this.renderAxisView()}
        />
        <Route
          path="/circle"
          component={() => this.renderCircleView()}
        />
        <Route
          path="/pie"
          component={() => this.renderPieView()}
        />
        <Route
          path="/line"
          component={() => this.renderLineView()}
        />
        <Route
          path="*"
          component={() => this.renderChartList()}
        />
      </Router>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
