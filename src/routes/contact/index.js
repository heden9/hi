import React from 'react';
import { ListView, List } from 'antd-mobile';
import './style.less';
import { NavOpen } from '../../components/AnimateNavios';
import { ScrollView } from '../../components/scrollView';

const info = {
  A: [
    {
      id: 1,
      headImgUrl: 'https://avatars1.githubusercontent.com/u/27012143?s=460&v=4',
      nickname: '小禾登',
    },
    {
      id: 2,
      headImgUrl: 'https://tvax2.sinaimg.cn/crop.0.0.1242.1242.180/dbfd10fdly8fgqihfgx6yj20yi0yijv1.jpg',
      nickname: '超想赢小垃圾',
    },
    {
      id: 3,
      headImgUrl: 'https://tvax1.sinaimg.cn/crop.0.0.512.512.180/006r2HqOly8fjq5zms72oj30e80e80vi.jpg',
      nickname: '网易阴阳师',
    },
  ],
  B: [
    {
      id: 4,
      headImgUrl: 'https://tva3.sinaimg.cn/crop.0.0.996.996.180/006aysN4jw8f924ehkvtgj30ro0rp766.jpg',
      nickname: 'InkCherry',
    },
    {
      id: 5,
      headImgUrl: 'https://tvax3.sinaimg.cn/crop.0.0.1242.1242.180/63abcab6ly8fhfn962k4hj20yi0yi782.jpg',
      nickname: '萌萌哒狗贼叔叔',
    },
    {
      id: 6,
      headImgUrl: 'https://tva4.sinaimg.cn/crop.0.0.1242.1242.180/a920c789jw8fatzepmhzij20yi0yijtg.jpg',
      nickname: '衣锦夜行',
    },
    {
      id: 7,
      headImgUrl: 'https://tvax3.sinaimg.cn/crop.0.0.996.996.180/005OxMBKly8fg4vexj8lgj30ro0rot9u.jpg',
      nickname: '可爱小弱鸡',
    },
    {
      id: 8,
      headImgUrl: 'https://tva2.sinaimg.cn/crop.0.0.100.100.180/006imEXNjw8ey90nxwjp9j302s02s745.jpg',
      nickname: '没时间回头看一眼',
    },
    {
      id: 9,
      headImgUrl: 'https://avatars1.githubusercontent.com/u/27012143?s=460&v=4',
      nickname: '用户7',
    },
    {
      id: 10,
      headImgUrl: 'https://avatars1.githubusercontent.com/u/27012143?s=460&v=4',
      nickname: '用户7',
    },
  ],
};
const { Item } = List;
function genData(ds, data) {
  const dataBlob = {};
  const sectionIDs = [];
  const rowIDs = [];
  Object.keys(data).forEach((item, index) => {
    sectionIDs.push(item);
    dataBlob[item] = item;
    rowIDs[index] = [];

    data[item].forEach((jj) => {
      rowIDs[index].push(jj.id);
      dataBlob[jj.id] = jj;
    });
  });
  return ds.cloneWithRowsAndSections(dataBlob, sectionIDs, rowIDs);
}

class Demo extends React.Component {
  constructor(props) {
    super(props);
    const getSectionData = (dataBlob, sectionID) => dataBlob[sectionID];
    const getRowData = (dataBlob, sectionID, rowID) => dataBlob[rowID];

    const dataSource = new ListView.DataSource({
      getRowData,
      getSectionHeaderData: getSectionData,
      rowHasChanged: (row1, row2) => row1 !== row2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
    });

    this.state = {
      dataSource: genData(dataSource, info),
      refreshing: false,
    };
  }

  componentDidMount() {
    this.onRefresh();
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }
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
        renderRow={renderRow}
        // pullToRefresh={<PullToRefresh
        //   distanceToRefresh={100}
        //   refreshing={this.state.refreshing}
        //   onRefresh={this.onRefresh}
        // />}
      />
    );
  }
}

export default Demo;

function renderRow({ headImgUrl, nickname }) {
  function open() {
    NavOpen('chat', { title: nickname });
  }
  return (
    <Item
      className={'contact-item'}
      thumb={headImgUrl}
      arrow={'horizontal'}
      onClick={open}
    >{nickname}</Item>
  );
}
