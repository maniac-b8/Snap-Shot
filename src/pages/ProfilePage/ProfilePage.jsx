import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';
import * as postsAPI from '../../utilities/posts-service';
import PostCard from '../../components/PostCard/PostCard';
import BottomBar from '../../components/BottomBar/BottomBar'; 
import UploadPostModal from '../../components/UploadPostModal/UploadPostModal'; 
import './ProfilePage.css'

export default function ProfilePage() {
  const currentUser = getUser();
  const [userPosts, setUserPosts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const fetchUserPosts = async () => {
        try {
          const posts = await postsAPI.getUserPosts(currentUser._id);
          setUserPosts(posts);
        } catch (error) {
          console.error('Error fetching user posts:', error);
        }
      };
      fetchUserPosts(); 
    }
  }, []); 

  const handleUpload = async (formData) => {
    try {
      const newPost = await postsAPI.upload(formData);
      const updatedPost = await postsAPI.getPost(newPost._id);
      
      setUserPosts([updatedPost, ...userPosts]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  }

  function handleAddComment(updatedPost) {
    const updatedPosts = userPosts.map(p => p._id === updatedPost._id ? updatedPost : p);
    setUserPosts(updatedPosts);
  }

  const handleDelete = (postId) => {
    setUserPosts(userPosts.filter(post => post._id !== postId));
  }

  return (
    <main className="profile-page">
      <h1>Welcome, {currentUser.name}</h1>
      <section>
        <h2>Your Posts</h2>
        {userPosts.map((post) => (
          <PostCard key={post._id} post={post} onDelete={handleDelete} handleAddComment={handleAddComment}/>
        ))}
      </section>

      <BottomBar onUpload={setIsModalOpen} /> 
      {isModalOpen && (
        <UploadPostModal onUpload={handleUpload} onClose={() => setIsModalOpen(false)} />
      )}
    </main>
  );
}
