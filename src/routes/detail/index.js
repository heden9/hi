import React from 'react';
import PropTypes from 'prop-types';
import { Row } from '../home/test2';
import { getSingleDynamic } from '../../services/api_dynamics';

class Detail extends React.PureComponent {
  constructor(...arg) {
    super(...arg);
    this.fetchData = this.fetchData.bind(this);
  }
  state = {
    data: null,
    loading: false,
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
    const { data } = this.state;
    return (
      <div>
        {
          data && <Row {...data} brief={data.content} />
        }
      </div>
    );
  }
}
Detail.propTypes = {
  id: PropTypes.number.isRequired,
};
export default Detail;
