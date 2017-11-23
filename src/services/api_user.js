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
export function getDynamics({ type = 'hot', offset = 0, limit = 20 }) {
  return request(`/dynamics?type=${type}&limit=${limit}&offset=${offset}`, {
    method: 'GET',
    mode: 'cors',
  });
}
