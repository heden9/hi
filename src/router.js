import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import Contact from './routes/contact';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Contact} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
