import React from 'react';
import { connect } from 'dva';
import ULogin from '../routes/ulogin';

function App({ children, isLogin, keepAlive = {}, ...arg }) {
  const { pathname } = arg.location;
  const { keyName } = keepAlive;
  const selected = pathname === keyName;
  return [
    <div key={1} style={{ height: '100%', display: selected ? 'block' : 'none' }}>
      <keepAlive.Component {...arg} />
    </div>,
    selected || renderChildren(pathname, children, isLogin),
  ];
}


function renderChildren(pathname, ele, isLogin) {
  if (!isLogin) {
    return <ULogin />;
  }
  switch (pathname) {
    case '/mine':
    case '/contact':
    default: return ele;
  }
}
function mapStateToProps({ user: { token } }) {
  return ({
    isLogin: !!token,
  });
}

export default connect(mapStateToProps)(App);
