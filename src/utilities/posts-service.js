import sendRequest from './send-request';

const BASE_URL = '/api/posts';

export function getAll() {
  return sendRequest(BASE_URL);
}

export function upload(formData) {
  return sendRequest(`${BASE_URL}/upload`, 'POST', formData, true);
}