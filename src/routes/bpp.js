/*eslint-disable*/
import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import RouterTabBar from '../components/routerTabBar';
import Icon from '../components/icon';
import Home from '../routes/home/test2';
import ULogin from '../routes/ulogin';

function App({ children, isLogin, location: { pathname }, dispatch }) {
  const pressHandle = (selected) => {
    dispatch(routerRedux.push(selected));
  };
  return (
    <RouterTabBar
      unselectedTintColor="#949494"
      tintColor="#6bc456"
      barTintColor="#fff"
    >
      <div>#</div>
      <div>#</div>
      <div>#</div>
      <div>#</div>
    </RouterTabBar>
  );
}


function renderChildren(pathname, ele, isLogin) {
  if (!isLogin) {
    return <ULogin />;
  }
  switch (pathname) {
    case '/mine':
    case '/contact': return ele;
    default: return null;
  }
}
function mapStateToProps({ user: { id } }) {
  return ({
    isLogin: !!id,
  });
}

export default connect(mapStateToProps)(App);
