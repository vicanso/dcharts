## Heatmap

图形Heatmap的构造类

```js
import { Heatmap } from 'dCharts';
```

### reander

渲染Heatmap

- data 要展示的数据，Array

```js
const heatmap = new Heatmap(document.getElementById('svg'));
heatmap.render([
  {
    name: '00:00',
    value: 0.3,
  },
  {
    name: '01:00',
    value: 0.5,
  },
  {
    name: '03:00',
    value: 0.45,
  },
]);
```

### update

更新Heatmap

- data 要展示的数据，Array

```js
heatmap.update([
  {
    name: '00:00',
    value: 0.3,
  },
  {
    name: '01:00',
    value: 0.5,
  },
  {
    name: '03:00',
    value: 0.45,
  },
]);
```
```