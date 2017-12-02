import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import RouterTabBar from '../components/routerTabBar';
import Event from '../components/dialog/event';
import Home from './home/index';
import ULogin from '../routes/ulogin';

const Item = RouterTabBar.Item;
function App({ children, location: { pathname }, dispatch }) {
  const pressHandle = (selected) => {
    if (selected === pathname && selected === '/home') {
      Event.fireEvent('_list_refresh');
    }
    dispatch(routerRedux.push(selected));
  };
  return (
    <RouterTabBar
      unselectedTintColor="#949494"
      tintColor="#6bc456"
      barTintColor="#fff"
      keepAliveCom={{
        selected: pathname === '/home',
        component: Home,
      }}
      content={renderChildren(pathname, children)}
    >
      <Item
        onPress={() => pressHandle('/home')}
        selected={pathname === '/home'}
        keepAlive
        icon={require('../assets/icon/home.svg')}
        selectedIcon={require('../assets/icon/home_fill.svg')}
        title={'动态'}
      />
      <Item
        onPress={() => pressHandle('/map')}
        selected={pathname === '/map'}
        icon={require('../assets/icon/location.svg')}
        selectedIcon={require('../assets/icon/location_fill.svg')}
        title={'地图'}
      />
      <Item
        onPress={() => pressHandle('/contact')}
        selected={pathname === '/contact'}
        icon={require('../assets/icon/message.svg')}
        selectedIcon={require('../assets/icon/message_fill.svg')}
        title={'联系人'}
      />
      <Item
        onPress={() => pressHandle('/mine')}
        selected={pathname === '/mine'}
        icon={require('../assets/icon/my.svg')}
        selectedIcon={require('../assets/icon/my_fill.svg')}
        title={'我的'}
      />
    </RouterTabBar>
  );
}


function renderChildren(pathname, ele) {
  if (!window.common.readStorage('token')) {
    ele = ULogin; // eslint-disable-line
  }
  switch (pathname) {
    case '/mine':
    case '/contact':
    default: return ele;
  }
}
function mapStateToProps() {
  return ({
  });
}

export default connect(mapStateToProps)(App);
