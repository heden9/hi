/* eslint-disable */
import React from 'react';
import Icon from '../../components/icon';
import { ListView, PullToRefresh, List, Button } from 'antd-mobile';
import './style.less';
import { getDynamics } from '../../services/api_user';
const Item = List.Item;
const data = [
  {
    "id": 3,
    "headImgUrl": "https://avatars0.githubusercontent.com/u/24803320?s=100&v=4",
    "nickname": "CodeMonkeyJeffGT",
    "brief": ":coffee: :taurus: CEO In @PROINPUT-Sistemas And Developer PHP in @1ncrivelSistemas",
    "isWhole": true,
    "img": [
      "图片1url",
      "图片2url"
    ],
    "pubTime": "2小时前",
    "commentNum": 23,
    "isLike": false,
    "likeNum": 541
  },
  {
    "id": 3,
    "headImgUrl": "https://avatars1.githubusercontent.com/u/20267214?s=100&v=4",
    "nickname": "Ericjeff",
    "brief": "Computational statistician, programmer and data scientist.",
    "isWhole": true,
    "img": [
      "图片1url",
      "图片2url"
    ],
    "pubTime": "2小时前",
    "comment_num": 23,
    "isLike": false,
    "likeNum": 541,
  },
  {
    "id": 3,
    "headImgUrl": "https://avatars2.githubusercontent.com/u/418638?s=100&v=4",
    "nickname": "Neal Fultz",
    "brief": "自己被自己菜哭了）：",
    "isWhole": true,
    "img": [
      "图片1url",
      "图片2url"
    ],
    "pubTime": "2小时前",
    "commentNum": 23,
    "isLike": false,
    "likeNum": 541,
  }
];
const NUM_ROWS = 20;
let pageIndex = 0;

function genData(pIndex = 0) {
  const dataBlob = {};
  for (let i = 0; i < NUM_ROWS; i++) {
    const ii = (pIndex * NUM_ROWS) + i;
    dataBlob[`${ii}`] = `row - ${ii}`;
  }
  return dataBlob;
}

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
    const dataSource = new ListView.DataSource({
      rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.fetchData = this.fetchData.bind(this);
    this.state = {
      dataSource,
      isLoading: true,
      refreshing: false,
    };
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax
    this.fetchData();
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 0);
  }

  async fetchData(offset) {
    const data = await getDynamics({offset});
    if(!data){
      return;
    }
    console.log(data);
  };
  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

  onEndReached = (event) => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading && !this.state.hasMore) {
      return;
    }
    console.log('reach end', event);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.rData = { ...this.rData, ...genData(++pageIndex) };
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 1000);
  };
  onRefresh = () => {
    this.setState({ refreshing: true });
    // simulate initial Ajax
    this.timer = setTimeout(() => {
      this.setState({
        dataSource: genData(this.state.dataSource, info),
        refreshing: false,
      });
    }, 600);
  };
  renderSeparator = (sectionID, rowID) => (
    <div
      key={`${sectionID}-${rowID}`}
      style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',
      }}
    />
  );
  render() {
    let index = data.length - 1;
    const row = (rowData, sectionID, rowID) => {
      if (index < 0) {
        index = data.length - 1;
      }
      const { headImgUrl, nickname, brief, pubTime, likeNum, commentNum } = data[index--];
      return (
        <div key={rowID} className={'home-row'}>
          <Item
            align="top"
            thumb={headImgUrl}>
            {nickname}
            <div className="time">{pubTime}</div>
          </Item>
          <div className={'row-brief'}>{brief}</div>
          <div className={'btn-group'}>
            <Button size={'small'} icon={<Icon type={require('../../assets/icon/forward.svg')}/>}>转发</Button>
            <Button size={'small'} icon={<Icon type={require('../../assets/icon/comment.svg')}/>}>{ commentNum|| '评论'}</Button>
            <Button size={'small'} icon={<Icon type={require('../../assets/icon/appreciate.svg')}/>}>{likeNum || '点赞'}</Button>
          </div>
        </div>
      );
    };
    return (
      <ListView
        ref={el => this.lv = el}
        dataSource={this.state.dataSource}
        renderHeader={() => <span>header</span>}
        renderFooter={() => (<div style={{ height: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        renderSeparator={this.renderSeparator}
        className="am-list"
        pageSize={4}
        // useBodyScroll
        style={{
          overflow: 'auto',
          height: '100%',
        }}
        onScroll={() => { console.log('scroll'); }}
        scrollRenderAheadDistance={500}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={10}
        pullToRefresh={<PullToRefresh
          distanceToRefresh={50}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
      />
    );
  }
}
