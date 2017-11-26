/*eslint-disable*/
import dva from 'dva';
import './utils/common';
import './index.less';
import createLoading from 'dva-loading';
import vconsole from 'vconsole';

const a = new vconsole();
// 1. Initialize
const app = dva(createLoading());
// const overscroll = function (el) {
//   console.log(el);
//   el.addEventListener('touchstart', () => {
//     const top = el.scrollTop;
//     const totalScroll = el.scrollHeight;
//     const currentScroll = top + el.offsetHeight;
//     // If we're at the top or the bottom of the containers
//     // scroll, push up or down one pixel.
//     //
//     // this prevents the scroll from "passing through" to
//     // the body.
//     if (top === 0) {
//       el.scrollTop = 1;
//     } else if (currentScroll === totalScroll) {
//       el.scrollTop = top - 1;
//     }
//   });
//   el.addEventListener('touchmove', (evt) => {
//     // if the content is actually scrollable, i.e. the content is long enough
//     // that scrolling can occur
//     if (el.offsetHeight < el.scrollHeight) { evt._isScroller = true; }
//   });
// };
// document.body.addEventListener('touchmove', (evt) => {
//   // In this case, the default behavior is scrolling the body, which
//   // would result in an overflow.  Since we don't want that, we preventDefault.
//   if (!evt._isScroller) {
//     evt.preventDefault();
//   }
// });
setTimeout(() => {
  // overscroll(document.querySelector('.am-tab-bar-item'));

}, 0);
// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/user'));
app.model(require('./models/write'));
app.model(require('./models/comment'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
