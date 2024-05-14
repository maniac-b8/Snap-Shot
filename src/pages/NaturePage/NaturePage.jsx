import React, { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/posts-service";
import PostCard from "../../components/PostCard/PostCard";

export default function Nature() {
  const [naturePosts, setNaturePosts] = useState([]);

  useEffect(() => {
    postsAPI.getAll().then((posts) => {
      const filteredPosts = posts.filter((post) => post.category === "Nature");
      setNaturePosts(filteredPosts);
    });
  }, []);

  return (
    <div>
      <h1>Nature</h1>
      {naturePosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
