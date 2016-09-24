## Circle

图形Circle的构造类

```js
import { Circle } from 'dcharts';
```


### render

渲染Circle

- value 从0-1，表示该圆环的百分比

```js
const circle = new Circle(document.getElementById('svg'));
circle.render(0.543);
```

### update

更新Circle的值

```js
const circle = new Circle(document.getElementById('svg'));
circle.render(0.543);
setTimeout(function() {
  circle.update(0.468);
}, 1000);
```

### set

设置Circle的属性

[相关属性设置](https://github.com/vicanso/dcharts/blob/master/md/defaults.md#circle-options)