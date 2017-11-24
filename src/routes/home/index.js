import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { ListView, List, Button, Toast } from 'antd-mobile';
import Icon from '../../components/icon';
import './style.less';
import { getDynamics, dynamicLikes } from '../../services/api_dynamics';
import { NavOpen } from '../../components/AnimateNavios';

const Item = List.Item;


function genData2(data) {
  const dataBlob = {};
  for (let i = 0; i < data.length; i++) {
    dataBlob[data[i].id] = data[i];
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
    this.rData = {};
    this.state = {
      dataSource,
      isLoading: true,
      offset: 0,
      hasMore: 1,
      refreshing: false,
    };
  }

  componentDidMount() {
    // you can scroll to the specified position
    // setTimeout(() => this.lv.scrollTo(0, 120), 800);

    // simulate initial Ajax
    this.fetchData();
  }


  // If you use redux, the data maybe at props, you need use `componentWillReceiveProps`
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.dataSource !== this.props.dataSource) {
  //     this.setState({
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.dataSource),
  //     });
  //   }
  // }

  onEndReached = () => {
    // load new data
    // hasMore: from backend data, indicates whether it is the last page, here is false
    if (this.state.isLoading || !this.state.hasMore) {
      return;
    }
    this.setState({ isLoading: true });
    this.fetchData(this.state.offset);
  };
  onRefresh = () => {
    this.setState({ refreshing: true });
    // simulate initial Ajax
    this.fetchData();
  };
  async fetchData(now = 0) {
    const data = await getDynamics({ offset: now });
    if (!data) {
      return;
    }
    const { dynamics, hasMore, offset } = data;
    if (now === 0) {
      this.rData = {};
      Toast.success(`已拉取${dynamics.length}条动态：）`, undefined, undefined, false);
    }
    this.rData = { ...this.rData, ...genData2(dynamics) };
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(this.rData),
      offset,
      hasMore: !!hasMore,
      isLoading: false,
      refreshing: false,
    });
  }
  renderSeparator = (sectionID, rowID) => (
    <div
      key={`${sectionID}-${rowID}`}
      className="separator"
    />
  );
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        // renderHeader={() => <span>header</span>}
        renderFooter={() => (<div style={{ height: 30, textAlign: 'center' }}>
          {this.state.isLoading ? 'Loading...' : 'Loaded'}
        </div>)}
        renderRow={row}
        renderSeparator={this.renderSeparator}
        className="am-list"
        pageSize={20}
        style={{
          overflow: 'auto',
          height: '100%',
        }}
        scrollRenderAheadDistance={1000}
        onEndReached={this.onEndReached}
        onEndReachedThreshold={300}
        // pullToRefresh={<PullToRefresh
        //   distanceToRefresh={50}
        //   refreshing={this.state.refreshing}
        //   onRefresh={this.onRefresh}
        // />}
      />
    );
  }
}
const row = (rowData, sectionID, rowID) => {
  const { headImgUrl, nickname, brief, pubTime, likeNum, commentNum, id, img, isLike } = rowData;
  return (
    <div key={rowID} className={'home-row'} onClick={() => open(nickname)}>
      <Item
        align="top"
        thumb={headImgUrl}
      >
        {nickname}
        <div className="time">{pubTime}</div>
      </Item>
      <div className={'row-brief'}>{brief}</div>
      {
        img.map(item => (<img src={item} alt="" />))
      }
      <div className={'btn-group'}>
        <Button size={'small'} icon={<Icon type={require('../../assets/icon/forward.svg')} />}>转发</Button>
        <Button size={'small'} icon={<Icon type={require('../../assets/icon/comment.svg')} />}>{ commentNum || '评论'}</Button>
        <WrapButton size={'small'} id={id} isLike={!!isLike} likeNum={likeNum} />
      </div>
    </div>
  );
};


function open(title) {
  NavOpen('detail', { title });
}


class WrapButton extends React.PureComponent {
  constructor(...arg) {
    super(...arg);
    this.clickHandle = this.clickHandle.bind(this);
  }
  state = {
    isLike: this.props.isLike,
    num: this.props.likeNum,
  };
  async clickHandle(e) {
    e.stopPropagation();
    const data = await dynamicLikes(this.state.isLike ? 'DELETE' : 'POST', this.props.id);
    if (!data) {
      return;
    }
    const num = this.state.isLike ? this.state.num - 1 : this.state.num + 1;
    this.setState({
      isLike: !this.state.isLike,
      num,
    });
  }
  render() {
    return (
      <Button
        size={'small'}
        onClick={this.clickHandle}
        className={classnames({
          isLike: this.state.isLike,
        })}
        icon={<Icon
          type={
            this.state.isLike ?
              require('../../assets/icon/appreciate_fill.svg') :
              require('../../assets/icon/appreciate.svg')}
        />}
      >
        {this.state.num || '点赞'}
      </Button>
    );
  }
}
WrapButton.propTypes = {
  id: PropTypes.number.isRequired,
  likeNum: PropTypes.number.isRequired,
  isLike: PropTypes.bool.isRequired,
};
