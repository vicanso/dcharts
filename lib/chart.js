import * as _ from 'lodash';
import EventEmitter from 'eventemitter3';
import * as defaults from './defaults';

export default class Chart extends EventEmitter {
  constructor(target, config) {
    super();
    if (!target) {
      throw new Error('target catn\'t be null');
    }
    // 判断target 是否 dom ，如果是 dom，d3.select
    this.target = target;
    const tmp = _.get(defaults, this.name);
    if (tmp) {
      this.config = _.assignIn({}, config, _.cloneDeep(tmp));
    }
  }
  set(k, v) {
    if (_.isObject(k)) {
      _.forEach(k, (v1, k1) => this.set(k1, v1));
    } else {
      _.set(this.config, k, v);
    }
    return this;
  }
  get(k) {
    return _.get(this.config, k);
  }
}
