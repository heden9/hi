/* eslint-disable */
(function (window, document) {
  const common = {};
  window.common = common;
  common.writeStorage = function (key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e){
      console.warn(e);
    }
  };

  // 读取localStorage
  common.readStorage = function (key) {
    return localStorage.getItem(key);
  };
  common.scrollTo = function(x = 0, y = 0, flag = true) {
    if (!flag) {
      window.scrollTo(x, y);
      return;
    }
    const animation = () => {
      const scrollY = window.scrollY;
      if (scrollY <= y) { return; }
      window.scrollTo(x, scrollY - 200);
      requestAnimationFrame(animation);
    };
    requestAnimationFrame(animation);
  }
}(window, document));
