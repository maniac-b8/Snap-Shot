import React, { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/posts-service";
import PostCard from "../../components/PostCard/PostCard";
import BottomBar from "../../components/BottomBar/BottomBar"; 
import UploadPostModal from '../../components/UploadPostModal/UploadPostModal'; 

export default function CarsPage() {
  const [carsPosts, setCarsPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    postsAPI.getAll().then((posts) => {
      const filteredPosts = posts.filter(
        (post) => post.category === "Cars & Trucks"
      );
      setCarsPosts(filteredPosts);
    });
  }, []);

  const handleUpload = async (formData) => {
    try {
      const newPost = await postsAPI.upload(formData);
      const updatedPost = await postsAPI.getPost(newPost._id);
      
      setCarsPosts([updatedPost, ...carsPosts]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  }
  const handleDelete = (postId) => {
    setCarsPosts(carsPosts.filter(post => post._id !== postId));
  }

  
  function handleAddComment(updatedPost) {
    const updatedPosts = carsPosts.map(p => p._id === updatedPost._id ? updatedPost : p);
    setCarsPosts(updatedPosts);
  }

  return (
    <div>
      <h1>Cars & Trucks</h1>
      {carsPosts.map((post) => (
        <PostCard key={post._id} post={post}  onDelete={handleDelete} handleAddComment={handleAddComment} />
      ))}

  <BottomBar onUpload={setIsModalOpen} /> 
      {isModalOpen && (
        <UploadPostModal onUpload={handleUpload} onClose={() => setIsModalOpen(false)}/>
      )}
    </div>
  );
}
