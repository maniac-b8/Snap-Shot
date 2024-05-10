import React, { useState, useEffect } from "react";
import { getPosts, createPost, deletePost } from "../../utilities/posts-service";
import NewPostForm from "../../components/NewPostForm/NewPostForm";
import './PostsPage.css';

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
      console.error("Error fetching posts:", error);
    }
  };

  const handleSubmit = async ({ imageUrl, caption }) => {
    try {
      await createPost(imageUrl, caption);
      fetchPosts();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      fetchPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div>
      <h1>Posts</h1>
      <NewPostForm onSubmit={handleSubmit} />

      {posts.map((post) => (
        <div key={post._id}>
          <img src={post.imageUrl} alt="Post" />
          <p>{post.caption}</p>
          <p>Posted on: {new Date(post.createdAt).toLocaleString()}</p>
          {currentUser && currentUser._id === post.createdBy && (
            <button className="delete-button" onClick={() => handleDelete(post._id)}>
              Delete Post
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
