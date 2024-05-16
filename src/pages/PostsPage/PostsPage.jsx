import { useState, useEffect } from 'react';
import * as postsAPI from '../../utilities/posts-service';
import { Link } from 'react-router-dom';
import PostCard from '../../components/PostCard/PostCard';
import UploadPostModal from '../../components/UploadPostModal/UploadPostModal'; 
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

  const handleToggleModal = () => {
    setIsModalOpen(prevState => !prevState); 
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
        {posts.map(post => (
          <PostCard
            key={post._id}
            post={post}
            onDelete={handleDelete}
            handleAddComment={handleAddComment} 
          />
        ))}
      </section>
      <section>
        <div className="bottom-bar">
        <Link to="/cars" className="navigation-button">Cars</Link>
        <Link to="/nature" className="navigation-button">Nature</Link>
        <div className="upload-button-container">
        <button onClick={handleToggleModal}>Upload Post</button> 
        </div>
        <Link to="/gaming" className="navigation-button">Gaming</Link>
        <Link to="/profile" className="navigation-button">Profile</Link>
        </div>
      </section>
      {isModalOpen && (
        <UploadPostModal onUpload={handleUpload} onClose={handleToggleModal} /> 
      )}
    </main>
  );
}
