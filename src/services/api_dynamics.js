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

/**
 * 发布评论
 * @param content
 * @param dynamicId
 * @param pComment
 * @returns {Object}
 */
export function postComment({ content, dynamicId, pComment = 0 }) {
  return request(`/comments/${dynamicId}`, {
    method: 'POST',
    body: {
      content,
      pComment,
    },
  });
}


export function getComment(dynamicId) {
  return request(`/comments/${dynamicId}`, {
    method: 'GET',
  });
}

export function getDynamicLikes(dynamicId) {
  return request(`/dynamicLikes/${dynamicId}`, {
    method: 'GET',
  });
}
/**
 * 获取单条动态
 * @param id
 * @returns {Object}
 */
export function getSingleDynamic(id) {
  return request(`/dynamics/${id}`, {
    method: 'GET',
  });
}
