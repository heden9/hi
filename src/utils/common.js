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
}(window, document));
