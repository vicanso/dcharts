import * as _ from 'lodash';

export function setStyle(selection, styles) {
  _.forEach(styles, (v, k) => selection.style(k, v));
}

export function verion() {
  return '0.0.1';
}

export function fortmatNumber(v, precision = 0) {
  if (!_.isNumber(v)) {
    return v;
  }
  const K = 1000;
  const M = 1000 * K;
  const B = 1000 * M;
  if (v > B) {
    return `${_.round(v / B, precision)}B`;
  }
  if (v > M) {
    return `${_.round(v / M, precision)}M`;
  }
  if (v > K) {
    return `${_.round(v / K, precision)}K`;
  }
  return v;
}
