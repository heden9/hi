import React from 'react';
import { ListView, List, PullToRefresh } from 'antd-mobile';
import './style.less';
import AnimateNavios from '../../components/AnimateNavios';

const info = {
  A: [
    {
      id: 1,
      headImgUrl: 'https://avatars1.githubusercontent.com/u/27012143?s=460&v=4',
      nickname: '用户1',
    },
    {
      id: 2,
      headImgUrl: 'https://avatars1.githubusercontent.com/u/27012143?s=460&v=4',
      nickname: '用户2',
    },
    {
      id: 3,
      headImgUrl: 'https://avatars1.githubusercontent.com/u/27012143?s=460&v=4',
      nickname: '用户3',
    },
  ],
  B: [
    {
      id: 4,
      headImgUrl: 'https://avatars1.githubusercontent.com/u/27012143?s=460&v=4',
      nickname: '用户4',
    },
    {
      id: 5,
      headImgUrl: 'https://avatars1.githubusercontent.com/u/27012143?s=460&v=4',
      nickname: '用户5',
    },
    {
      id: 6,
      headImgUrl: 'https://avatars1.githubusercontent.com/u/27012143?s=460&v=4',
      nickname: '用户6',
    },
    {
      id: 7,
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
    return (<div className="contact-container">
      <ListView
        dataSource={this.state.dataSource}
        className="am-list sticky-list"
        useBodyScroll
        style={{
          height: '100%',
          overflow: 'auto',
        }}
        renderSectionHeader={sectionData => (
          <div>{sectionData}</div>
        )}
        renderRow={renderRow}
        pullToRefresh={<PullToRefresh
          distanceToRefresh={100}
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />}
      />
    </div>);
  }
}

export default Demo;

function renderRow({ headImgUrl, nickname }) {
  return (
    <Item
      className={'contact-item'}
      thumb={headImgUrl}
      arrow={'horizontal'}
      onClick={open}
    >{nickname}</Item>
  );
}
function open() {
  AnimateNavios.openFunc('settings');
}
