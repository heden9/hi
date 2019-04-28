import request from '../utils/request';

export function signIn({ username, password }) {
  return request('/login', {
    method: 'POST',
    body: { username, password },
  });
}
export function signUp({ username, password }) {
  return request('/signup', {
    method: 'POST',
    body: { username, password },
  });
}
export function checkLogin() {
  return request('/transToken', {
    method: 'POST',
  });
}

export function getFollows() {
  return request('/follows', {
    method: 'GET',
  });
}
