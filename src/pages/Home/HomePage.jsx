import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import * as postsAPI from "../../utilities/posts-service";
import PostCard from "../../components/PostCard/PostCard";
import { getUser } from "../../utilities/users-service";

export default function HomePage() {
  const [recentPosts, setRecentPosts] = useState([]);
  const user = getUser();

  useEffect(() => {
    if (!user) {
      async function fetchRecentPosts() {
        try {
          const carsPosts = await getRecentPostsByCategory("Cars & Trucks");
          const naturePosts = await getRecentPostsByCategory("Nature");
          const gamingPosts = await getRecentPostsByCategory("Gaming");

          const combinedPosts = [...carsPosts, ...naturePosts, ...gamingPosts];

          combinedPosts.sort(() => Math.random() - 0.5);

          setRecentPosts(combinedPosts.slice(0, 6));
        } catch (error) {
          console.error("Error fetching recent posts:", error);
        }
      }

      fetchRecentPosts();
    }
  }, [user]);

  async function getRecentPostsByCategory(category) {
    try {
      const posts = await postsAPI.getAll();
      const filteredPosts = posts.filter((post) => post.category === category);
      filteredPosts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      return filteredPosts.slice(0, 2);
    } catch (error) {
      console.error(`Error fetching ${category} posts:`, error);
      return [];
    }
  }

  if (user) {
    return <Navigate to="/posts" />;
  }

  return (
    <div className="posts-page">
      <h2>Welcome to Snap Shot!</h2>
      <h3>please login or sign up above</h3>
      <h1>Recent Posts</h1>
      {recentPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
