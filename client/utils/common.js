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
  };
  // 读取cookie
  common.readCookie = function(key) {
    if (document.cookie.length > 0) {
      let start = document.cookie.indexOf(key + '=');
      if (start !== -1) {
        start = start + key.length + 1;
        let end = document.cookie.indexOf(';', start);
        if (end === -1) {
          end = document.cookie.length;
        }
        return unescape(document.cookie.substring(start, end));
      }
    }
    return '';
  };
  // 写cookie
  common.writeCookie = function(key, value, expiresDays) {
    const date = new Date();
    const days = isNaN(expiresDays) ? 365 : expiresDays;
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = date.toGMTString();
    const cookiestr = key + '=' + value + '; expires=' + expires + '; path=/';

    document.cookie = cookiestr;
  };
}(window, document));
