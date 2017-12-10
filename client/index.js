/*eslint-disable*/
import React from 'react';
import dva from 'dva';
import { Router } from 'dva/router';
import './utils/common';
import './index.less';
import createLoading from 'dva-loading';
import createHashHistory from 'history/createHashHistory';
import vconsole from 'vconsole';

// const a = new vconsole();
// 1. Initialize
const app = dva({
  ...createLoading(),
});


// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/user'));
app.model(require('./models/write'));
app.model(require('./models/comment'));
app.model(require('./models/chat'));
// 4. Router
app.router(require('./router'));

// 5. Start
const Hah = app.start('#root');

export default Hah;
