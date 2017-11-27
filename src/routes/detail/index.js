import React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'antd-mobile';
import { Row } from '../home/index';
import { getSingleDynamic } from '../../services/api_dynamics';

import CommentList from './listGroup';

class Detail extends React.PureComponent {
  constructor(...arg) {
    super(...arg);
    this.fetchData = this.fetchData.bind(this);
  }
  state = {
    data: null,
    loading: true,
  };
  componentDidMount() {
    this.fetchData();
    console.log(this.props);
  }
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
    console.log(window.document.body.style.overflow);
    const { data, loading } = this.state;
    if (loading) {
      return <div className="center" key={1}><ActivityIndicator text="加载中" /></div>;
    } else {
      return (
        <div>
          <Row {...data} brief={data.content} />
          <CommentList />
        </div>
      );
    }
  }
}
Detail.propTypes = {
  id: PropTypes.number.isRequired,
};
export default Detail;
