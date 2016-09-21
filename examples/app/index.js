import * as d3 from 'd3';
import * as _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-enroute';

import CircleView from './containers/circle';
import PieView from './containers/pie';
import LineView from './containers/line';
import BarView from './containers/bar';

class App extends Component {
  constructor(props) {
    super(props);
    const chartTypeList = ['Circle', 'Pie', 'Line', 'Bar'];
    const pathname = location.pathname;
    const active = _.findIndex(chartTypeList, name => pathname === `/${name.toLowerCase()}`);
    this.state = {
      chartTypeList,
      active,
      location: pathname,
    };
  }
  goTo(name, i) {
    const url = `/${name.toLowerCase()}`;
    history.pushState({}, name, url);
    this.setState({
      location: url,
      active: i,
    });
  }
  renderNav() {
    const {
      active,
    } = this.state;
    const arr = _.map(['Circle', 'Pie', 'Line', 'Bar'], (name, i) => {
      const cs = `chart ${active === i ? "active": ""}`;
      return (
        <li key={name}>
          <a
            className={cs.trim()}
            href="javascript:;"
            onClick={e => {
              e.preventDefault();
              this.goTo(name, i);
            }}
          >
            {name}
          </a>
        </li>
      );
    });
    return (
      <div className="navContainer">
        <div className="logo">D-Charts</div>
        <div className="title">chart examples</div>
        <ul className="chartExamples">{arr}</ul>
      </div>
    );
  }
  renderCircleView() {
    return (
      <CircleView />
    );
  }
  renderPieView() {
    return (
      <PieView />
    );
  }
  renderLineView() {
    return (
      <LineView />
    );
  }
  renderBarView() {
    return (
      <BarView />
    );
  }
  render() {
    const { state } = this;
    return (
      <div>
        {this.renderNav()}
        <div className="chartContainer">
          <Router {...state}>
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
              path="/bar"
              component={() => this.renderBarView()}
            />
          </Router>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
