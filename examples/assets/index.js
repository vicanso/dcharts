import * as d3 from 'd3';
import * as _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-enroute';
import hljs from 'highlight.js';

import CircleView from '../containers/circle';
import PieView from '../containers/pie';
import LineView from '../containers/line';
import BarView from '../containers/bar';
import HeatmapView from '../containers/heatmap';

class App extends Component {
  constructor(props) {
    super(props);
    const chartTypeList = ['Circle', 'Pie', 'Line', 'Bar', 'Heatmap'];
    const pathname = location.pathname;
    const active = _.findIndex(chartTypeList, name => pathname.indexOf(`/${name.toLowerCase()}`) === 0);
    this.state = {
      chartTypeList,
      active,
      location: pathname,
    };

    window.onpopstate = () => {
      this.goTo(location.pathname, true);
    };
    hljs.configure({
      languages: ['js'],
    });
  }
  goTo(url, isBack) {
    const chartTypeList = this.state.chartTypeList;
    const active = _.findIndex(chartTypeList, name => url.indexOf(`/${name.toLowerCase()}`) === 0);
    if (!isBack) {
      history.pushState({}, chartTypeList[active], url);
    }
    this.setState({
      location: url,
      active,
    });
  }
  renderNav() {
    const {
      active,
      chartTypeList,
    } = this.state;
    const arr = _.map(chartTypeList, (name, i) => {
      const cs = `chart ${active === i ? "active": ""}`;
      return (
        <li key={name}>
          <a
            className={cs.trim()}
            href="javascript:;"
            onClick={e => {
              e.preventDefault();
              this.goTo(`/${name.toLowerCase()}/examples`);
            }}
          >
            {name}
          </a>
        </li>
      );
    });
    return (
      <div className="navContainer">
        <div className="logo">dCharts</div>
        <ul>{arr}</ul>
      </div>
    );
  }
  renderCircleView() {
    return (
      <CircleView
        location={this.state.location}
        goTo={this.goTo.bind(this)}
        urlPrefix={'/circle/examples'}
      />
    );
  }
  renderPieView() {
    return (
      <PieView
        location={this.state.location}
        goTo={this.goTo.bind(this)}
        urlPrefix={'/pie/examples'}
      />
    );
  }
  renderLineView() {
    return (
      <LineView
        location={this.state.location}
        goTo={this.goTo.bind(this)}
        urlPrefix={'/line/examples'}
      />
    );
  }
  renderBarView() {
    return (
      <BarView
        location={this.state.location}
        goTo={this.goTo.bind(this)}
        urlPrefix={'/bar/examples'}
      />
    );
  }
  renderHeatmapView() {
    return (
      <HeatmapView
      location={this.state.location}
        goTo={this.goTo.bind(this)}
        urlPrefix={'/heatmap/examples'}
      />
    );
  }
  renderIndexView() {
    return (
      <div>
      </div>
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
              path="/circle/*"
              component={() => this.renderCircleView()}
            />
            <Route
              path="/pie/*"
              component={() => this.renderPieView()}
            />
            <Route
              path="/line/*"
              component={() => this.renderLineView()}
            />
            <Route
              path="/bar/*"
              component={() => this.renderBarView()}
            />
            <Route
              path="/heatmap/*"
              component={() => this.renderHeatmapView()}
            />
            <Route
              path="*"
              component={() => this.renderIndexView()}
            />
          </Router>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('#app'));
