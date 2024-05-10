import React, { useState, useEffect } from 'react';
import { getPosts, createPost } from '../../utilities/posts-service';
import NewPostForm from '../../components/NewPostForm/NewPostForm';

export default function PostsPage({ currentUser }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);



  const fetchPosts = async () => {
    try {
      const fetchedPosts = await getPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSubmit = async ({ imageUrl, caption }) => {
    try {
      await createPost(imageUrl, caption);
      // Refresh posts after creating a new one
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      {/* Render NewPostForm component */}
      <NewPostForm onSubmit={handleSubmit} />

      {/* Display posts */}
      {posts.map((post) => (
        <div key={post._id}>
          <img src={post.imageUrl} alt="Post" />
          <p>{post.caption}</p>
          <p>Posted on: {new Date(post.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}