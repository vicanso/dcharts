import * as _ from 'lodash';
import React, { Component } from 'react';
import { Router, Route } from 'react-enroute';

export default class ChartView extends Component {
  constructor(props) {
    super(props);
  }
  renderList() {
    const {
      goTo,
      urlPrefix
    } = this.props;
    const previewClass = this.state.previewClass || 'pure-u-1-3';
    const previewListHtml = _.map(this.state.previewList, item => (
      <a
        className={previewClass + ' preview'}
        href="javascript:;"
        key={item.name}
        onClick={() => goTo(`${urlPrefix}${item.url}`)}
      >
        <img src={item.pic} />
        <div className="name">{item.name}</div>
      </a>
    ));
    return (
      <div className="chartExamples pure-g">
        {previewListHtml}
      </div>
    );
  }
  renderRouter() {
    const props = this.props;
    const urlPrefix = props.urlPrefix;
    const routeList = _.map(this.state.previewList, item => (
      <Route
        key={item.name}
        path={`${urlPrefix}${item.url}`}
        component={item.component}
      />
    ));
    return (
      <div>
        <Router {...props}>
          {routeList}
          <Route
            path="*"
            component={() => this.renderList()}
          />
        </Router>
      </div>
    );
  }
}
