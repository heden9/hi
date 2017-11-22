import request from '../utils/request';

export function signIn({ username, password }) {
  return request('/login', {
    method: 'POST',
    mode: 'cors',
    body: { username, password },
  });
}
export function signUp({ username, password }) {
  return request('/signup', {
    method: 'POST',
    mode: 'cors',
    body: { username, password },
  });
}
