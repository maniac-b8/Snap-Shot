import sendRequest from './send-request';

const BASE_URL = '/api/posts';

export function getAll() {
  return sendRequest(BASE_URL);
}

export function upload(formData) {
  return sendRequest(`${BASE_URL}/upload`, 'POST', formData, true);
}

export function deletePost(postId) {
  return sendRequest(`${BASE_URL}/${postId}`, 'DELETE');
}

export function getPhoto(photoId) {
  return sendRequest(`${BASE_URL}/${photoId}`);
}