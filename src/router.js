import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Contact from './routes/contact';
import Chat from './routes/chat';
import App from './routes/app';
import AnimateNavios from './components/AnimateNavios';

export default function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route
        path={'/'} component={props => (
          <AnimateNavios
            {...props}
            routes={routesConfig}
            mainTitle={mainTitleConfig}
            classname={'global-nav'}
          >
            <App {...props} >
              <Switch>
                <Route path="/contact" exact component={Contact} />
                <Route path="/home" exact component={() => <div>home</div>} />
                <Route path="/mine" exact component={() => <div>mine</div>} />
                <Route path="/map" exact component={() => <div>map</div>} />
              </Switch>
            </App>
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
};
const mainTitleConfig = {
  contact: {
    title: '联系人',
  },
  mine: {
    title: '我的',
  },
  home: {
    title: '动态',
  },
};
