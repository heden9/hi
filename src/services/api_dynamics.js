import request from '../utils/request';

export function getDynamics({ type = 'hot', offset = 0, limit = 20 }) {
  return request(`/dynamics?type=${type}&limit=${limit}&offset=${offset}`, {
    method: 'GET',
  });
}

/**
 * 点赞/取消点赞
 * @param method
 * @param dId
 * @returns {Object}
 */
export function dynamicLikes(method, dId) {
  return request(`/dynamicLikes/${dId}`, {
    method,
  });
}

/**
 * 发布动态
 * @param content
 * @param img
 * @returns {Object}
 */
export function postDynamics(content, img = []) {
  return request('/dynamics', {
    method: 'POST',
    body: {
      content,
      img,
    },
  });
}


export function postComment({ content, dynamicId, pComment = 0 }) {
  return request(`/comments/${dynamicId}`, {
    method: 'POST',
    body: {
      content,
      pComment,
    },
  });
}
