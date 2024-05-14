import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';
import * as postsAPI from '../../utilities/posts-service';
import PostCard from '../../components/PostCard/PostCard';

export default function ProfilePage() {
  const currentUser = getUser();
  const [userPosts, setUserPosts] = useState([]);

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

  return (
    <main className="ProfilePage">
      <h1>Welcome, {currentUser.name}</h1>
      <section>
        <h2>Your Posts</h2>
        {userPosts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </section>
    </main>
  );
}
