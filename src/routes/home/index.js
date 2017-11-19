import React from 'react';
import AnimateNavios from '../../components/AnimateNavios';

function aa(title = 'Jack') {
  AnimateNavios.openFunc({ title });
}
export default class Home extends React.PureComponent {
  render() {
    return (
      <AnimateNavios
        mainView={<div>
          <button onClick={aa.bind(null, 'Bengi')}>click me</button>
          <button onClick={aa.bind(null, 'Lane')}>click me</button>
        </div>}
      />
    );
  }
}
