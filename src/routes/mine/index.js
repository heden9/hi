import React from 'react';
import { connect } from 'dva';
import { Carousel, List } from 'antd-mobile';
import Icon from '../../components/icon';
import { ScrollView } from '../../components/scrollView';
import './style.less';

const Item = List.Item;

const url = require('../../assets/img/background-1.png');

const url2 = 'https://tvax3.sinaimg.cn/crop.0.0.996.996.180/005OxMBKly8fg4vexj8lgj30ro0rot9u.jpg';

function Mine({ nickname = '可爱小弱鸡', headImgUrl = url2 }) {
  return (
    <ScrollView ID="mine">
      <Carousel
        autoplay={false}
        infinite
        selectedIndex={0}
      >
        <div className="mine-stage" style={{ backgroundImage: `url('${url}')` }}>
          <div className="avatar">
            <img src={headImgUrl} alt="" />
          </div>
          <p>{nickname && `@${nickname}`}</p>
        </div>
        <div className="mine-stage" style={{ backgroundImage: `url('${url}')` }}>
          <div className="avatar">
            <img src={headImgUrl} alt="" />
          </div>
        </div>
      </Carousel>
      <SelectBar />
      <List>
        <Item
          thumb={<Icon type={require('../../assets/icon/favor_fil.svg')} />}
          arrow="horizontal"
          onClick={() => {}}
        >我的收藏</Item>
        <Item
          thumb={<Icon style={{ color: '#88CE4D' }} type={require('../../assets/icon/pic_fill.svg')} />}
          arrow="horizontal"
          onClick={() => {}}
        >我的相册</Item>
      </List>
      <List>
        <Item
          thumb={<Icon type={require('../../assets/icon/settings.svg')} />}
          arrow="horizontal"
          onClick={() => {}}
        >设置</Item>
        <Item
          thumb={<Icon style={{ color: 'orange' }} type={require('../../assets/icon/theme.svg')} />}
          arrow="horizontal"
          onClick={() => {}}
        >主题</Item>
      </List>
      <Item
        onClick={() => {}}
      ><div className="sign-out-btn">退出登录</div></Item>
    </ScrollView>
  );
}


function SelectBar() {
  return (
    <ul className="select-bar">
      <li>
        <span>动态</span>
        <div>5.789</div>
      </li>
      <li>
        <span>关注</span>
        <div>209</div>
      </li>
      <li>
        <span>粉丝</span>
        <div>398</div>
      </li>
    </ul>
  );
}
function mapStateToProps({ user: { nickname, headImgUrl } }) {
  return {
    nickname,
    headImgUrl,
  };
}

export default connect(mapStateToProps)(Mine);
