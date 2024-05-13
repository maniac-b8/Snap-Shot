import sendRequest from './send-request';

const BASE_URL = '/api/comments';

export function addComment(postId, commentData) {
  return sendRequest(`${BASE_URL}/${postId}`, 'POST', commentData);
}

