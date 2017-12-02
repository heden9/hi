import fetch from 'dva/fetch';
import { Toast } from 'antd-mobile';
import { dialogOpen } from '../components/dialog/test2';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request(url, options) {
  const defaultOptions = {
    // credentials: 'include',
  };
  const newOptions = { ...defaultOptions, ...options };
  newOptions.headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    token: window.common.readCookie('token'),
    ...newOptions.headers,
  };
  newOptions.body = JSON.stringify(newOptions.body);
  if (newOptions.method !== 'GET') {
    newOptions.mode = 'cors';
  }
  return fetch(`http://app.nefuer.net${url}`, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkCode)
    .catch((err) => { Toast.fail(err.message, undefined, undefined, false); });
}


function checkCode({ code, data, message, token }) {
  switch (code) {
    case 0:
      window.common.writeCookie('token', token, 7);
      return data;
    case 2:
      window.common.writeCookie('token', '');
      dialogOpen('signIn');
    default: throw new Error(message);
  }
}

