import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import AnimateNavios from './components/AnimateNavios';
import { MixinDialog } from './components/dialog/test2';

// page
import Contact from './routes/contact';
import Chat from './routes/chat';
import App from './routes/app';
import Login from './routes/login';
import SignUp from './routes/signUp';
import Detail from './routes/detail';
import Home from './routes/home/index';
import Write from './routes/write';
import Comment from './routes/comment';
import Forward from './routes/forward';


const dialogConfig = {
  signIn: {
    title: '登录',
    component: Login,
  },
  signUp: {
    title: '注册',
    component: SignUp,
  },
  write: {
    title: '发消息',
    component: Write,
    rightBtn: <Write.rightBtn />,
  },
  comment: {
    title: '评论',
    component: Comment,
    rightBtn: <Comment.rightBtn />,
  },
  forward: {
    title: '转发',
    component: Forward,
    rightBtn: <Forward.rightBtn />,
  },
};
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route
        path={'/'} component={props => (
          <AnimateNavios
            {...props}
            routes={routesConfig}
            main={mainConfig}
          >
            <App {...props} >
              <Switch>
                <Route path="/contact" exact component={Contact} />
                <Route path="/home" exact component={() => <div>home</div>} />
                <Route path="/mine" exact component={() => <div>mine</div>} />
                <Route path="/map" exact component={() => <div>map</div>} />
              </Switch>
            </App>
            <MixinDialog routes={dialogConfig} />
          </AnimateNavios>
      )}
      />
    </Router>
  );
}


const routesConfig = {
  chat: {
    component: Chat,
  },
  settings: {
    component: Chat,
    title: '设置',
  },
  detail: {
    component: Detail,
    title: '动态正文',
  },
};
const mainConfig = {
  contact: {
    title: '联系人',
  },
  mine: {
    title: '我的',
  },
  home: {
    title: '动态',
    rightBtn: <Home.rightBtn />,
    leftBtn: <Home.leftBtn />,
  },
  map: {
    title: '地图',
  },
};
export default RouterConfig;
