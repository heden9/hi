import React from 'react';
import { connect } from 'dva';
import { ListView, List, Toast, Modal, Badge } from 'antd-mobile';
import './style.less';
import Icon from '../../components/icon';
import { NavOpen } from '../../components/AnimateNavios';
import { ScrollView } from '../../components/scrollView';

// const info = {
//   A: [
//     {
//       id: 10,
//       headImgUrl: 'https://avatars1.githubusercontent.com/u/27012143?s=460&v=4',
//       nickname: '小禾登',
//     },
//     {
//       id: 2,
//       headImgUrl: 'https://tvax2.sinaimg.cn/crop.0.0.1242.1242.180/dbfd10fdly8fgqihfgx6yj20yi0yijv1.jpg',
//       nickname: '超想赢小垃圾',
//     },
//     {
//       id: 3,
//       headImgUrl: 'https://tvax1.sinaimg.cn/crop.0.0.512.512.180/006r2HqOly8fjq5zms72oj30e80e80vi.jpg',
//       nickname: '网易阴阳师',
//     },
//   ],
//   B: [
//     {
//       id: 13,
//       headImgUrl: 'https://tva3.sinaimg.cn/crop.0.0.996.996.180/006aysN4jw8f924ehkvtgj30ro0rp766.jpg',
//       nickname: 'InkCherry',
//     },
//     {
//       id: 5,
//       headImgUrl: 'https://tvax3.sinaimg.cn/crop.0.0.1242.1242.180/63abcab6ly8fhfn962k4hj20yi0yi782.jpg',
//       nickname: '萌萌哒狗贼叔叔',
//     },
//     {
//       id: 6,
//       headImgUrl: 'https://tva4.sinaimg.cn/crop.0.0.1242.1242.180/a920c789jw8fatzepmhzij20yi0yijtg.jpg',
//       nickname: '衣锦夜行',
//     },
//     {
//       id: 7,
//       headImgUrl: 'https://tvax3.sinaimg.cn/crop.0.0.996.996.180/005OxMBKly8fg4vexj8lgj30ro0rot9u.jpg',
//       nickname: '可爱小弱鸡',
//     },
//     {
//       id: 8,
//       headImgUrl: 'https://tva2.sinaimg.cn/crop.0.0.100.100.180/006imEXNjw8ey90nxwjp9j302s02s745.jpg',
//       nickname: '没时间回头看一眼',
//     },
//     {
//       id: 14,
//       headImgUrl: 'https://avatars1.githubusercontent.com/u/27012143?s=460&v=4',
//       nickname: '用户7',
//     },
//     {
//       id: 16,
//       headImgUrl: 'https://avatars1.githubusercontent.com/u/27012143?s=460&v=4',
//       nickname: '用户7',
//     },
//   ],
// };
const { Item } = List;
function genData(ds, data, unread) {
  const dataBlob = {};
  const sectionIDs = [];
  const rowIDs = [];
  Object.keys(data).forEach((item, index) => {
    sectionIDs.push(item);
    dataBlob[item] = item;
    rowIDs[index] = [];

    data[item].forEach((jj) => {
      const arr = unread[jj.id] || [];
      rowIDs[index].push(jj.id);
      dataBlob[jj.id] = { ...jj, badge: arr.length };
    });
  });
  return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
}

class _Contact extends React.PureComponent {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    this.dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource: genData(this.dataSource, props.follows, this.props.unreadMsgQ),
      refreshing: false,
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: 'chat/fetchFollows' });
  }
  componentWillReceiveProps(props) {
    this.setState({
      dataSource: genData(this.state.dataSource, props.follows, props.unreadMsgQ),
    });
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
  // onRefresh = () => {
  //   this.setState({ refreshing: true });
  //   // simulate initial Ajax
  //   this.timer = setTimeout(() => {
  //     this.setState({
  //       dataSource: genData(this.state.dataSource, info),
  //       refreshing: false,
  //     });
  //   }, 600);
  // };
  renderRow = ({ headImgUrl, nickname, id: rId, badge }) => {
    const { headImgUrl_me, id_me } = this.props;
    // eslint-disable-next-line camelcase
    const isMe = id_me === rId;
    function open() {
      NavOpen('chat', {
        title: nickname,
        sent: {
          headImgUrl: headImgUrl_me,
          id: id_me,
        },
        received: { headImgUrl, nickname, id: rId },
      });
    }
    return (
      <Item
        extra={<Badge text={badge} overflowCount={99} />}
        className={'contact-item'}
        thumb={headImgUrl}
        arrow={isMe ? 'none' : 'horizontal'}
        onClick={isMe ? undefined : open}
      >{nickname}</Item>
    );
  };

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        className="am-list sticky-list"
        useBodyScroll
        renderSectionHeader={sectionData => (
          <div className="section-header">{sectionData}</div>
        )}
        renderScrollComponent={() => (
          <ScrollView ID="contact" className="contact-container" />
        )}
        renderRow={this.renderRow}
        // pullToRefresh={<PullToRefresh
        //   distanceToRefresh={100}
        //   refreshing={this.state.refreshing}
        //   onRefresh={this.onRefresh}
        // />}
      />
    );
  }
}

function mapStateToProps({ user: { headImgUrl, id }, chat: { unreadMsgQ, follows } }) {
  return {
    headImgUrl_me: headImgUrl,
    id_me: id,
    unreadMsgQ,
    follows,
  };
}

const Contact = connect(mapStateToProps)(_Contact);
Contact.rightBtn = () => {
  return (
    <Icon
      type={require('../../assets/icon/search.svg')}
      onClick={() => Modal.prompt('添加好友', '',
        [
        { text: '取消' },
          {
            text: '确定',
            onPress: value => new Promise((resolve) => {
              Toast.info('onPress promise', 1);
              setTimeout(() => {
                resolve();
                console.log(`value:${value}`);
              }, 1000);
            }),
          },
        ], 'default', null, ['请输入他/她的昵称'])}
    />
  );
};
export default Contact;
