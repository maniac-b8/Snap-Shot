import React, { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/posts-service";
import PostCard from "../../components/PostCard/PostCard";
import BottomBar from "../../components/BottomBar/BottomBar"; 
import UploadPostModal from '../../components/UploadPostModal/UploadPostModal'; 

export default function NaturePage() {
  const [naturePosts, setNaturePosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    postsAPI.getAll().then((posts) => {
      const filteredPosts = posts.filter(
        (post) => post.category === "Nature"
      );
      setNaturePosts(filteredPosts);
    });
  }, []);

  const handleUpload = async (formData) => {
    try {
      const newPost = await postsAPI.upload(formData);
      const updatedPost = await postsAPI.getPost(newPost._id);
      
      setNaturePosts([updatedPost, ...naturePosts]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  }

  function handleAddComment(updatedPost) {
    const updatedPosts = naturePosts.map(p => p._id === updatedPost._id ? updatedPost : p);
    setNaturePosts(updatedPosts);
  }

  const handleDelete = (postId) => {
    setNaturePosts(naturePosts.filter(post => post._id !== postId));
  }

  return (
    <div>
      <h1>Nature</h1>
      {naturePosts.map((post) => (
        <PostCard key={post._id} post={post} onDelete={handleDelete}  handleAddComment={handleAddComment}/>
      ))}

      <BottomBar onUpload={setIsModalOpen} /> 
      {isModalOpen && (
        <UploadPostModal onUpload={handleUpload} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}
