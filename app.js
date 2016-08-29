const Koa = require('koa');
const path = require('path');
const app = new Koa();
const serve = require('koa-static-serve');
const staticPath = path.join(__dirname, './examples');
const fs = require('fs');
app.use(serve(staticPath, {
  maxAge: 0,
  '404': 'next',
}));
app.use(ctx => {
  if (ctx.status !== 404) {
    return ;
  }
  const promise = new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, './examples/index.html'), (err, buf) => {
      if (err) {
        return reject(err);
      }
      return resolve(buf.toString());
    });
  });
  promise.then(html => {
    ctx.body = html;
  });
  return promise;
});
const port = process.env.PORT || 10000;
app.listen(port);
console.info('http://0.0.0.0:' + port + '/examples');
