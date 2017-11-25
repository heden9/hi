import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Contact from './routes/contact';
import Chat from './routes/chat';
import App from './routes/bpp';
import AnimateNavios from './components/AnimateNavios';
import { MixinDialog, dialogOpen } from './components/dialog/test2';
import Icon from './components/icon';
import Login from './routes/login';
import SignUp from './routes/signUp';
import Event from './components/dialog/event';
import { Write, WriteBtn } from './routes/write';
import { Comment, CommentBtn } from './routes/comment';
import { Forward, ForwardBtn } from './routes/forward';

const dialogConfig = {
  signIn: {
    title: '登录',
    component(props) {
      return <Login {...props} />;
    },
  },
  signUp: {
    title: '注册',
    component(props) {
      return <SignUp {...props} />;
    },
  },
  write: {
    title: '发消息',
    component(props) {
      return <Write {...props} />;
    },
    rightBtn: <WriteBtn />,
  },
  comment: {
    title: '评论',
    component(props) {
      return <Comment {...props} />;
    },
    rightBtn: <CommentBtn />,
  },
  forward: {
    title: '转发',
    component(props) {
      return <Forward {...props} />;
    },
    rightBtn: <ForwardBtn />,
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
            <div>
              <App {...props} >
                <Switch>
                  <Route path="/contact" exact component={Contact} />
                  <Route path="/home" exact component={() => <div>home</div>} />
                  <Route path="/mine" exact component={() => <div>mine</div>} />
                  <Route path="/map" exact component={() => <div>map</div>} />
                </Switch>
              </App>
              <MixinDialog routes={dialogConfig} />
            </div>
          </AnimateNavios>
      )}
      />
    </Router>
  );
}


const routesConfig = {
  chat: {
    component: <Chat />,
  },
  settings: {
    component: <Chat />,
    title: '设置',
  },
  detail: {
    component: <Chat />,
    title: '文章详情',
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
    rightBtn: <Icon type={require('./assets/icon/post.svg')} onClick={() => dialogOpen('write')} />,
    leftBtn: <Icon type={require('./assets/icon/loading2.svg')} onClick={() => Event.fireEvent('_list_refresh')} />,
  },
  map: {
    title: '地图',
  },
};
export default RouterConfig;
