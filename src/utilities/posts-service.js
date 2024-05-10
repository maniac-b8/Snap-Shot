import { getToken } from './users-service';

const BASE_URL = '/api/posts';

async function fetchWithToken(url, options = {}) {
    const token = getToken();
    if (!token) throw new Error('Not authenticated');

    const headers = {
        'Authorization': `Bearer ${token}`
    };

    const requestOptions = {
        ...options,
        headers: {
            ...headers,
            ...options.headers // Merge provided headers with the authorization headers
        }
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(errorMessage || 'Request failed');
    }

    // Here, we need to handle cases when response body is empty
    const responseBody = await response.text();
    return responseBody ? JSON.parse(responseBody) : null;
}

export async function getPosts() {
  return fetchWithToken(BASE_URL);
}

export async function createPost(imageUrl, caption) {
  return fetchWithToken(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ imageUrl, caption })
  });
}

export async function deletePost(postId) {
  return fetchWithToken(`${BASE_URL}/${postId}`, {
    method: 'DELETE'
  });
}