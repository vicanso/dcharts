## defaults

各图表的默认配置

```js
import { defaults } from 'dcharts';
```

### get

获取默认的图表属性，可支持 `colors`， `circle`， `pie`， `line`， `bar`

### set

设置默认的图表属性，可支持 `colors`， `circle`， `pie`， `line`， `bar`

```js
defaults.set('colors', [
  '#111',
  '#222',
  '#333',
  '#444',
  '#555',
  '#666',
]);
```

```js
// change circle options, the new options will be merged witd default options
defaults.set('circle', {
  radius: 80,
});
```

### colors

`dCharts`的最基础的6种颜色

```js
let colors = [
  '#1f77b4',
  '#f1495b',
  '#2ca02c',
  '#3d4751',
  '#d79a5d',
  '#2c1b44',
];
```


### circle options

- `width` chart的宽度

- `radius` 圆环的半径

- `thickness` 圆环的厚度，如果是'50%'表示半径长度的百分比

- `startAngle` 圆环的开始角度

- `endAngle` 圆环的结束角度

- `max` max value

- `ease` ease函数

- `duration` 动画时间

- `format` 格式化`value`的函数，默认将小数格式化为百分比展示

- `title.height` 标题的高度

- `title.text` 标题的内容

- `title.dy` 标题的dy设置，默认为20

- `style.background` 圆环的背景style设置

- `style.foreground` 圆环的前景style设置

- `style.label` label的style设置

- `style.title` title的style设置


```js
{
  width: '100%',
  radius: 70,
  thickness: 5,
  startAngle: 0,
  endAngle: 2 * Math.PI,
  max: 1,
  ease: d3.easeLinear,
  duration: 300,
  format: d3.format(`.${d3.precisionFixed(0.01)}%`),
  title: {
    height: 32,
    text: '',
  },
  style: {
    background: {
      fill: '#e6edf4',
    },
    foreground: {
      fill: colors[0],
    },
    label: {
      fill: colors[0],
      font: '18px sans-serif',
      'text-anchor': 'middle',
      'alignment-baseline': 'middle',
    },
    title: {
      color: '#666',
      'font-size': '16px',
      fill: '#666',
    },
  },
  disabled: {
    background: false,
    label: false,
  },
}
```

### pie options

- `width` chart的宽度

- `radius` 饼图的半径

- `ease` ease函数

- `duration` 动画时间

- `backgroundColors` 饼图的颜色列表，默认值为`colors`

- `title.height` 标题的高度

- `title.text` 标题的内容

- `style.pie` pie的style设置

- `style.title` title的style设置

```js
{
  width: '100%',
  radius: 80,
  ease: d3.easeLinear,
  duration: 300,
  backgroundColors: colors.slice(0),
  title: {
    height: 32,
    text: '',
  },
  style: {
    pie: {
      stroke: '#fff',
      'stroke-width': 1,
      'stroke-linejoin': 'round',
    },
    title: {
      color: '#666',
      'font-size': '16px',
      fill: '#666',
    },
  },
}
```

### line options

- `width` chart的宽度

- `height` chart的高度

- `colors` 曲线的颜色配置，默认值为`colors`

- `curve` 曲线转折的变换函数，可以为 string, function, array

- `margin` chart的margin设置

- `title.height` 标题的高度

- `title.text` 标题的内容

- `legend.height` legend的高度

- `xAxis.height` xAxis的高度

- `yAxis.max` yAxis的最大值，如`+20%`表示在最大值的基础上增加20%，便于曲线展示的时候不会到顶部

- `yAxis.min` yAxis的最小值，如`-5%`表示在最小值的基础上减少5%

- `yAxis.width` yAxis的宽度

- `yAxis.title.text` yAxis的标题内容

- `style.grid` grid的style设置

- `style.line` line的style设置

- `style.auxiliaryLine` auxiliaryLine的style设置

- `style.title` title的style设置

- `style.yAxisTitle` yAxisTitle的style设置

```js
{
  width: '100%',
  height: 300,
  colors: colors.slice(0),
  curve: 'curveLinear',
  margin: {
    left: 5,
    right: 5,
    top: 5,
    bottom: 0,
  },
  title: {
    height: 32,
    text: '',
  },
  legend: {
    height: 20,
  },
  xAxis: {
    height: 30,
  },
  yAxis: {
    max: '+20%',
    min: '0%',
    width: 30,
    title: {
      text: '',
    },
  },
  style: {
    grid: {
      'stroke-width': 1,
      fill: 'none',
      stroke: 'rgba(153, 153, 153, 0.2)',
      'shape-rendering': 'crispEdges',
    },
    line: {
      'stroke-width': 2,
      fill: 'none',
    },
    auxiliaryLine: {
      'stroke-width': 1,
      fill: 'none',
      stroke: '#999',
      'shape-rendering': 'crispEdges',
    },
    title: {
      color: '#666',
      'font-size': '16px',
      fill: '#666',
    },
    yAxisTitle: {
      color: '#666',
      'font-size': '14px',
      fill: '#666',
    },
  },
}
```

### bar options

- `width` chart的宽度

- `height` chart的高度

- `colors` 曲线的颜色配置，默认值为`colors`

- `column.margin` column的margin

- `margin` chart的margin设置

- `title.height` 标题的高度

- `title.text` 标题的内容

- `legend.height` legend的高度

- `xAxis.height` xAxis的高度

- `xAxis.align` xAxis的文字

- `yAxis.max` yAxis的最大值，如`+20%`表示在最大值的基础上增加20%，便于曲线展示的时候不会到顶部

- `yAxis.min` yAxis的最小值，如`-5%`表示在最小值的基础上减少5%

- `yAxis.width` yAxis的宽度

- `yAxis.title.text` yAxis的标题内容

- `style.grid` grid的style设置

- `style.line` line的style设置

- `style.auxiliaryLine` auxiliaryLine的style设置

- `style.title` title的style设置

- `style.yAxisTitle` yAxisTitle的style设置

```js
{
  width: '100%',
  height: 300,
  colors: colors.slice(0),
  column: {
    margin: '10%',
  },
  margin: {
    left: 5,
    right: 5,
    top: 5,
    bottom: 0,
  },
  title: {
    height: 32,
    text: '',
  },
  legend: {
    height: 20,
  },
  xAxis: {
    height: 30,
    align: 'center',
  },
  yAxis: {
    max: '+20%',
    min: '0%',
    width: 30,
    title: {
      text: '',
    },
  },
  style: {
    grid: {
      'stroke-width': 1,
      fill: 'none',
      stroke: 'rgba(153, 153, 153, 0.2)',
      'shape-rendering': 'crispEdges',
    },
    title: {
      color: '#666',
      'font-size': '16px',
      fill: '#666',
    },
    yAxisTitle: {
      color: '#666',
      'font-size': '14px',
      fill: '#666',
    },
  },
}
```
