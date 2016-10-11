import * as _ from 'lodash';
import * as d3 from 'd3';
import EventEmitter from 'eventemitter3';
import * as defaults from './defaults';

export default class Chart extends EventEmitter {
  constructor(target, config) {
    super();
    if (!target) {
      throw new Error('target catn\'t be null');
    }
    this.initialized = false;
    // 判断target 是否 dom ，如果是 dom，d3.select
    this.target = _.isElement(target) ? d3.select(target) : target;
    this.chart = this.target.append('g');
    const tmp = defaults.get(this.name);
    if (tmp) {
      this.config = _.assign({}, config, tmp);
    }
  }
  set(k, v) {
    if (_.isPlainObject(k)) {
      _.forEach(k, (v1, k1) => this.set(k1, v1));
    } else if (_.isPlainObject(v) && _.isPlainObject(this.get(k))) {
      _.forEach(v, (v1, k1) => this.set(`${k}.${k1}`, v1));
    } else {
      _.set(this.config, k, v);
    }
    return this;
  }
  get(k) {
    return _.get(this.config, k);
  }
  getBBox() {
    return this.target.node().getBBox();
  }
  getDimensions() {
    const target = this.target;
    const width = parseInt(target.style('width'), 10);
    const height = parseInt(target.style('height'), 10);
    return [width, height];
  }
}
