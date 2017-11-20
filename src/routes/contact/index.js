import React from 'react';
import { Button } from 'antd-mobile';
import './style.less';
import AnimateNavios from '../../components/AnimateNavios';

function aa(url, config) {
  AnimateNavios.openFunc(url, config);
}
//  class Home extends React.PureComponent {
//   render() {
//     return (
//       <div className={'contact-container'}>
//         <AnimateNavios
//           headerTitle={'联系人'}
//           classname={'contact-nav'}
//           mainView={<div>
//             <Button onClick={aa.bind(null, 'Bengi')}>click me</Button>
//             <Button onClick={aa.bind(null, 'Lane')}>click me</Button>
//           </div>}
//           subView={<div>
//             <p>loremloremloremloremloremloremloremloremloremlorem</p>
//           </div>}
//         />
//       </div>
//     );
//   }
// }

export default function test() {
  return (
    <div>
      <Button onClick={aa.bind(null, 'chat', { title: 'Bengi' })}>click me</Button>
      <Button onClick={aa.bind(null, 'chat', { title: 'Lane' })}>click me</Button>
      <Button onClick={aa.bind(null, 'settings')}>click me</Button>
    </div>
  );
}
