import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'antd-mobile';
import { Row } from '../home/index';
import { getSingleDynamic, getComment, getDynamicLikes } from '../../services/api_dynamics';
import { ScrollView } from '../../components/scrollView';
import Tabs from '../../components/tabs';
import { MixinGetfunc } from '../comment/commentList';

const Item = Tabs.Item;

const CommentList = MixinGetfunc(getComment);

const LikeList = MixinGetfunc(getDynamicLikes, '点赞');

const ForwardList = MixinGetfunc(getComment, '转发');
class Detail extends React.PureComponent {
  constructor(...arg) {
    super(...arg);
    this.fetchData = this.fetchData.bind(this);
  }
  state = {
    data: {},
    loading: true,
    activeIndex: 0,
  };
  componentDidMount() {
    this.fetchData();
    console.log(this.props);
  }
  onSelect = (activeIndex) => {
    this.setState({
      activeIndex,
    });
  };
  async fetchData() {
    this.setState({
      loading: true,
    });
    const data = await getSingleDynamic(this.props.id);
    this.setState({
      loading: false,
      data,
    });
  }
  render() {
    const { data, loading, activeIndex } = this.state;
    const { id } = this.props;
    if (loading) {
      return <div className="center"><ActivityIndicator text="加载中" /></div>;
    } else {
      return (
        <ScrollView
          ID={'detail'}
        >
          <Row {...data} brief={data.content} />
          <Tabs
            onSelect={this.onSelect}
            activeIndex={activeIndex}
          >
            <Item
              title={'评论'}
            >
              <CommentList id={id} />
            </Item>
            <Item
              title={'转发'}
            >
              <ForwardList id={id} />
            </Item>
            <Item
              title={'赞'}
            >
              <LikeList id={id} />
            </Item>
          </Tabs>
        </ScrollView>
      );
    }
  }
}
Detail.propTypes = {
  id: PropTypes.number.isRequired,
};
export default Detail;
