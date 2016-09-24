## Pie

图形Pie的构造类

```js
import { Pie } from 'dcharts';
```

### render

渲染Pie

- data 要展示的数据，Array

```js
const pie = new Pie(document.getElementById('svg'));
pie.render([
  {
    name: 'IE',
    value: 18,
  },
  {
    name: 'Firefox',
    value: 23,
  },
  {
    name: 'Chrome',
    value: 84,
  },
  {
    name: 'Edge',
    value: 30,
  },
  {
    name: 'Safari',
    value: 30,
  },
  {
    name: 'Opera',
    value: 10,
  },
]);
```

### update

更新展示的数据

```js
const pie = new Pie(document.getElementById('svg'));
pie.update([
  {
    name: 'IE',
    value: 18,
  },
  {
    name: 'Firefox',
    value: 23,
  },
  {
    name: 'Chrome',
    value: 84,
  },
  {
    name: 'Edge',
    value: 30,
  },
  {
    name: 'Safari',
    value: 30,
  },
  {
    name: 'Opera',
    value: 10,
  },
]);
```

### set

设置Pie的属性

[相关属性设置](https://github.com/vicanso/dcharts/blob/master/md/defaults.md#pie-options)
