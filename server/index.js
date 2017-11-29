const Koa = require('koa');
const fs = require('fs');
const serve = require('koa-static');

const app = new Koa();

const server = require('http').Server(app.callback());

const io = require('socket.io')(server);

global.io = io;

app.use(serve('./dist', {
  gzip: true,
  maxage: 3600 * 31,
})); // 配置静态资源中间件

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logger

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});


app.use(async (ctx) => {
  ctx.response.type = 'html';
  ctx.response.body = fs.createReadStream('./dist/index.html');
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`listening... on port:${port}`);
});

server.on('error', (err) => {
  console.log('error --> ', err.message);
  process.exit(1);
});
