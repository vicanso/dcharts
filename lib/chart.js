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
    const tmp = _.get(defaults, this.name);
    if (tmp) {
      this.config = _.assignIn({}, config, _.cloneDeep(tmp));
    }
  }
  set(k, v) {
    if (_.isObject(k)) {
      _.forEach(k, (v1, k1) => this.set(k1, v1));
    } else if (_.isObject(v) && _.isObject(this.get(k))) {
      _.extend(this.get(k), v);
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
}
