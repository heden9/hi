import React from 'react';
import PropTypes from 'prop-types';
import AnimateNavios from '../../components/AnimateNavios';

function aa(title = 'Jack') {
  AnimateNavios.openFunc({ title });
}
export default class Home extends React.PureComponent {
  static contextTypes = {
    router: PropTypes.object,
  };
  render() {
    console.log(this.context);
    return (
      <AnimateNavios
        headerTitle={'联系人'}
        mainView={<div>
          <button onClick={aa.bind(null, 'Bengi')}>click me</button>
          <button onClick={aa.bind(null, 'Lane')}>click me</button>
        </div>}
        subView={<div>
          <p>loremloremloremloremloremloremloremloremloremlorem</p>
        </div>}
      />
    );
  }
}
