import * as _ from 'lodash';

export function setStyle(selection, styles) {
  _.forEach(styles, (v, k) => selection.style(k, v));
}
