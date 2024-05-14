import { useState, useRef, useEffect } from 'react';
import * as postsAPI from '../../utilities/posts-service';
import PhotoCard from '../../components/PostCard/PostCard';
import './PostsPage.css';

export default function PostsPage() {
  const [title, setTitle] = useState('');
  const [posts, setPosts] = useState([]);

  const fileInputRef = useRef();

  useEffect(function() {
    postsAPI.getAll().then(posts => {
      setPosts(posts);
    });
  }, []);

  function handleAddComment(updatedPost) {
    const updatedPosts = posts.map(p => p._id === updatedPost._id ? updatedPost : p);
    setPosts(updatedPosts); 
  }

  async function handleUpload() {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('post', fileInputRef.current.files[0]);
      
      const newPost = await postsAPI.upload(formData);
  
      const updatedPost = await postsAPI.getPost(newPost._id);
  
      setPosts([updatedPost, ...posts]);
      setTitle('');
      fileInputRef.current.value = '';
    } catch (error) {
      console.error('Error uploading post:', error);
    }
  }

  const handleDelete = (postId) => {
    setPosts(posts.filter(post => post._id !== postId));
  }

  return (
    <main className="App flex-ctr-ctr">
      <section className="flex-ctr-ctr">
        <input type="file" ref={fileInputRef} />
        <input value={title} onChange={(evt) => setTitle(evt.target.value)} placeholder="Post Title" />
        <button onClick={handleUpload}>Upload Post</button>
      </section>
      <section>
        {posts.map(post => (
          <PhotoCard
            key={post._id}
            post={post}
            onDelete={handleDelete}
            handleAddComment={handleAddComment} 
          />
        ))}
      </section>
    </main>
  );
}
