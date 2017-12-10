/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { Headers } from '../../components/AnimateNavios';
import './style.less';

class Dialog extends React.Component {
  static defaultProps = {
    title: 'xie',
  };
  state = {
    title: '',
  };
  componentDidMount() {
  }
  render() {
    const { title, rightBtn, WrapComponent } = this.props;
    return (
      <div>
        <Headers
          rightBtn={rightBtn}
          leftBtn={<span onClick={removeDialog}>关闭</span>}
          title={title}
        />
        <div className="dialog-body">
          <WrapComponent />
        </div>
      </div>
    );
  }
}

Dialog.propTypes = {
  wrapComponent: PropTypes.element,
  title: PropTypes.string,
  rightBtn: PropTypes.element,
};

const stack = [];
export default {
  dialogInstance(props) {
    const dialogDiv = document.createElement('div');
    dialogDiv.setAttribute('class', 'dialog-container popUp');
    stack.push(dialogDiv);

    document.body.appendChild(dialogDiv);

    ReactDOM.render(<Dialog {...props} />, dialogDiv);
  },
  removeDialog,
};
function removeDialog() {
  const dialogDiv = stack.pop();
  if (dialogDiv) {
    dialogDiv.classList.add('popDown');
    dialogDiv.addEventListener('webkitAnimationEnd', () => {
      ReactDOM.unmountComponentAtNode(dialogDiv);
      document.body.removeChild(dialogDiv);
    });
    // setTimeout(() => {
    //   ReactDOM.unmountComponentAtNode(dialogDiv);
    //   document.body.removeChild(dialogDiv);
    // }, 400);
  }
}
