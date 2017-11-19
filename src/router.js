import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';


function App() {
  function aa(title = 'Jack') {
    IndexPage.openFunc({ title });
  }
  return (
    <IndexPage
      mainView={<div>
        <button onClick={aa.bind(null, 'Bengi')}>click me</button>
        <button onClick={aa.bind(null, 'Lane')}>click me</button>
      </div>}
    />
  );
}
function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={App} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;
