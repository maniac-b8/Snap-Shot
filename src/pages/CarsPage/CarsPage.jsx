import React, { useState, useEffect } from "react";
import * as postsAPI from "../../utilities/posts-service";
import PostCard from "../../components/PostCard/PostCard";

export default function Cars() {
  const [carsPosts, setCarsPosts] = useState([]);

  useEffect(() => {
    postsAPI.getAll().then((posts) => {
      const filteredPosts = posts.filter(
        (post) => post.category === "Cars & Trucks"
      );
      setCarsPosts(filteredPosts);
    });
  }, []);

  return (
    <div>
      <h1>Cars & Trucks</h1>
      {carsPosts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
