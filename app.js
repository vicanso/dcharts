const Koa = require('koa');
const path = require('path');
const app = new Koa();
const serve = require('koa-static-serve');
const staticPath = path.join(__dirname, './examples');
const fs = require('fs');
function getDevHtml() {
  const promise = new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, './examples/dev.html'), (err, buf) => {
      if (err) {
        return reject(err);
      }
      return resolve(buf.toString());
    });
  });
  return promise;
}

app.use(serve(staticPath, {
  maxAge: 0,
  '404': 'next',
}));
app.use(ctx => {
  if (ctx.status !== 404) {
    return ;
  }
  if (ctx.url.indexOf('/dev') === 0) {
    return getDevHtml().then(html => ctx.body = html);
  }
});
const port = process.env.PORT || 10000;
app.listen(port);
console.info('http://0.0.0.0:' + port + '/dev');
