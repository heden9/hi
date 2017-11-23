/* eslint-disable */
import React from 'react';
import { ListView, PullToRefresh, List } from 'antd-mobile';
import './style.less';

const Item = List.Item;
const Brief = Item.Brief;
const data = [
  {
    "id": 3,
    "headImgUrl": "https://avatars0.githubusercontent.com/u/24803320?s=100&v=4",
    "nickname": "CodeMonkeyJeffGT",
    "brief": ":coffee: :taurus: CEO In @PROINPUT-Sistemas And Developer PHP in @1ncrivelSistemas",
    "is_whole": true,
    "img": [
      "图片1url",
      "图片2url"
    ],
    "comment_num": 23,
    "is_like": false,
    "like_num": 541,
    "last_id": 23
  },
  {
    "id": 3,
    "headImgUrl": "https://avatars1.githubusercontent.com/u/20267214?s=100&v=4",
    "nickname": "Ericjeff",
    "brief": "Computational statistician, programmer and data scientist.",
    "is_whole": true,
    "img": [
      "图片1url",
      "图片2url"
    ],
    "comment_num": 23,
    "is_like": false,
    "like_num": 541,
    "last_id": 23
  },
  {
    "id": 3,
    "headImgUrl": "https://avatars2.githubusercontent.com/u/418638?s=100&v=4",
    "nickname": "Neal Fultz",
    "brief": "自己被自己菜哭了）：",
    "is_whole": true,
    "img": [
      "图片1url",
      "图片2url"
    ],
    "comment_num": 23,
    "is_like": false,
    "like_num": 541,
    "last_id": 23
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
    setTimeout(() => {
      this.rData = genData();
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.rData),
        isLoading: false,
      });
    }, 0);
  }

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
      const { headImgUrl, nickname, brief } = data[index--];
      return (
        <div key={rowID} className={'home-row'}>
          <Item
            thumb={headImgUrl}>
            {nickname}
          </Item>
          <p className={'row-brief'}>{brief}</p>
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
