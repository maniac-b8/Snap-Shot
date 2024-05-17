import React, { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/posts-service";
import PostCard from "../../components/PostCard/PostCard";
import BottomBar from "../../components/BottomBar/BottomBar"; 
import UploadPostModal from '../../components/UploadPostModal/UploadPostModal';
import './GamingPage.css';

export default function GamingPage() {
  const [gamingPosts, setGamingPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    postsAPI.getAll().then((posts) => {
      const filteredPosts = posts.filter(
        (post) => post.category === "Gaming"
      );
      setGamingPosts(filteredPosts);
    });
  }, []);

  const handleUpload = async (formData) => {
    try {
      const newPost = await postsAPI.upload(formData);
      const updatedPost = await postsAPI.getPost(newPost._id);
      
      setGamingPosts([updatedPost, ...gamingPosts]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  }

  function handleAddComment(updatedPost) {
    const updatedPosts = gamingPosts.map(p => p._id === updatedPost._id ? updatedPost : p);
    setGamingPosts(updatedPosts);
  }


  const handleDelete = (postId) => {
    setGamingPosts(gamingPosts.filter(post => post._id !== postId));
  }

  return (
    <div className="gaming-page">
      <h1>Gaming</h1>
      {gamingPosts.map((post) => (
        <PostCard key={post._id} post={post} onDelete={handleDelete} handleAddComment={handleAddComment} />
      ))}

      <BottomBar onUpload={setIsModalOpen} /> 
      {isModalOpen && (
        <UploadPostModal onUpload={handleUpload} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
