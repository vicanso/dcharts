import * as _ from 'lodash';
import * as defaults from './defaults';

export default class Chart {
  constructor(target, config) {
    if (!target) {
      throw new Error('target catn\'t be null');
    }
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
