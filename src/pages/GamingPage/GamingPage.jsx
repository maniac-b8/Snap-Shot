import React, { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/posts-service";
import PostCard from "../../components/PostCard/PostCard";

export default function Gaming() {
  const [gamingPosts, setGamingPosts] = useState([]);

  useEffect(() => {
    postsAPI.getAll().then((posts) => {
      const filteredPosts = posts.filter((post) => post.category === "Gaming");
      setGamingPosts(filteredPosts);
    });
  }, []);

  return (
    <div>
      <h1>Gaming</h1>
      {gamingPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
