const Koa = require('koa');
const fs = require('fs');
const serve = require('koa-static');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();

const server = require('http').Server(app.callback());

const io = require('socket.io')(server);

const { getSocketIdById } = require('./util');

global.io = io;


const users = require('./io.js');

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

app.use(bodyParser({
  enableTypes: ['json', 'form', 'text'],
}));
// router
app.use(router.routes());
router.post('/dynamicLikes', async (ctx, next) => {
  const { userArr = [], entityType = '', data = {} } = ctx.request.body;
  userArr.forEach((userId) => {
    const socketIds = getSocketIdById(users, userId);
    console.log(socketIds);
    // 当后端post了一个消息时，通知client进行处理
    socketIds.forEach((socketId) => {
      global.io.sockets.to(socketId).emit('receive_message', {
        entityType,
        data,
      });
    });
    ctx.response.body = {
      code: 0,
      data: 'OK!',
    };
  });
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

