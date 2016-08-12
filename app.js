const Koa = require('koa');
const path = require('path');
const app = new Koa();
const serve = require('koa-static-serve');
const staticPath = path.join(__dirname, './examples');
app.use(serve(staticPath, {
  maxAge : 0
}));
const port = process.env.PORT || 10000;
app.listen(port);
console.dir('http://0.0.0.0:' + port + '/index.html');