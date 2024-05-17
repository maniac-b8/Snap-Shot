import { useState, useEffect } from 'react';
import * as postsAPI from '../../utilities/posts-service';
import PostCard from '../../components/PostCard/PostCard';
import UploadPostModal from '../../components/UploadPostModal/UploadPostModal'; 
import BottomBar from '../../components/BottomBar/BottomBar';
import './PostsPage.css';

export default function PostsPage() {
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    postsAPI.getAll().then(posts => {
      setPosts(posts);
    });
  }, []);

  function handleAddComment(updatedPost) {
    const updatedPosts = posts.map(p => p._id === updatedPost._id ? updatedPost : p);
    setPosts(updatedPosts);
  }

  const handleDelete = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  }

  const handleUpload = async (formData) => {
    try {
      const newPost = await postsAPI.upload(formData);
      const updatedPost = await postsAPI.getPost(newPost._id);
      setPosts([updatedPost, ...posts]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  }

  return (
    <main>
      <section>
      <div className="posts-page">
        <h4>Welcome home</h4>
        <h1>All Posts</h1>
        {posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            onDelete={handleDelete}
            handleAddComment={handleAddComment}
          />
        ))}
        </div>
      </section>
      <BottomBar onUpload={setIsModalOpen} /> 
      {isModalOpen && (
        <UploadPostModal onUpload={handleUpload} onClose={() => setIsModalOpen(false)} />
      )}
    </main>
  );
}