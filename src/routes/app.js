import React from 'react';
import { connect } from 'dva';
import { TabBar } from 'antd-mobile';
import { routerRedux } from 'dva/router';
import Icon from '../components/icon';
import Home from '../routes/home';
import ULogin from '../routes/ulogin';

function App({ children, isLogin, location: { pathname }, dispatch }) {
  const pressHandle = (selected) => {
    dispatch(routerRedux.push(selected));
  };
  return (
    <TabBar
      unselectedTintColor="#949494"
      tintColor="#6bc456"
      barTintColor="#fff"
    >
      <TabBar.Item
        key={'/home'}
        title="动态"
        onPress={() => { pressHandle('/home'); }}
        selected={pathname === '/home'}
        icon={<Icon type={require('../assets/icon/home.svg')} />}
        selectedIcon={<Icon type={require('../assets/icon/home_fill.svg')} />}
      ><Home /></TabBar.Item>
      <TabBar.Item
        key={'/map'}
        title="地图"
        onPress={() => { pressHandle('/map'); }}
        selected={pathname === '/map'}
        icon={<Icon type={require('../assets/icon/location.svg')} />}
        selectedIcon={<Icon type={require('../assets/icon/location_fill.svg')} />}
      >{pathname === '/map' && children}</TabBar.Item>
      <TabBar.Item
        key={'/contact'}
        title="联系人"
        onPress={() => { pressHandle('/contact'); }}
        selected={pathname === '/contact'}
        icon={<Icon type={require('../assets/icon/message.svg')} />}
        selectedIcon={<Icon type={require('../assets/icon/message_fill.svg')} />}
      >{renderChildren(pathname, children, isLogin)}</TabBar.Item>
      <TabBar.Item
        key={'/mine'}
        title="我的"
        onPress={() => { pressHandle('/mine'); }}
        selected={pathname === '/mine'}
        icon={<Icon type={require('../assets/icon/my.svg')} />}
        selectedIcon={<Icon type={require('../assets/icon/my_fill.svg')} />}
      >{renderChildren(pathname, children, isLogin)}</TabBar.Item>
    </TabBar>
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