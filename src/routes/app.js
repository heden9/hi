import React from 'react';
import { connect } from 'dva';
import { TabBar } from 'antd-mobile';
import { routerRedux } from 'dva/router';

function App({ children, location: { pathname }, dispatch }) {
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
        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
        selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
      >{children}</TabBar.Item>
      <TabBar.Item
        key={'/contact'}
        title="联系人"
        onPress={() => { pressHandle('/contact'); }}
        selected={pathname === '/contact'}
        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
        selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
      >{children}</TabBar.Item>
      <TabBar.Item
        key={'/map'}
        title="地图"
        onPress={() => { pressHandle('/map'); }}
        selected={pathname === '/map'}
        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
        selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
      >{children}</TabBar.Item>
      <TabBar.Item
        key={'/mine'}
        title="我的"
        onPress={() => { pressHandle('/mine'); }}
        selected={pathname === '/mine'}
        icon={{ uri: 'https://zos.alipayobjects.com/rmsportal/asJMfBrNqpMMlVpeInPQ.svg' }}
        selectedIcon={{ uri: 'https://zos.alipayobjects.com/rmsportal/gjpzzcrPMkhfEqgbYvmN.svg' }}
      >{children}</TabBar.Item>
    </TabBar>
  );
}

function mapStateToProps() {
  return ({

  });
}


export default connect(mapStateToProps)(App);
