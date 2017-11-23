import fetch from 'dva/fetch';
import { Toast } from 'antd-mobile';
import { MixinDialog } from '../components/dialog/test2';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  console.log(response.headers);
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
    Authorization: window.common.readStorage('Authorization'),
    ...newOptions.headers,
  };
  newOptions.body = JSON.stringify(newOptions.body);
  return fetch(`http://app.nefuer.net${url}`, newOptions)
    .then(checkStatus)
    .then(parseJSON)
    .then(checkCode)
    .catch((err) => { Toast.fail(err.message); });
}


function checkCode({ code, data, message, Authorization }) {
  switch (code) {
    case 0:
      window.common.writeStorage('Authorization', Authorization);
      return data;
    case 2:
      window.common.writeStorage('Authorization', '');
      MixinDialog.open('signIn');
    default: throw new Error(message);
  }
}

