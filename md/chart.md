## Chart

图表的基类

```js
import { Chart } from 'dcharts';
```

### set

设置图表的属性

```js
chart.set('title.text', '测试');
chart.set({
  title: {
    text: '测试',
  },
});
```

### get

获取图表的属性

```js
chart.get('title.text');
```
