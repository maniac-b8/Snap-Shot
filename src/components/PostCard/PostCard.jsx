import "./PostCard.css";
import * as postsAPI from "../../utilities/posts-service";
import { getUser } from "../../utilities/users-service";
import { useState, useEffect } from "react";
import LikedUsersModal from "../LikedUsersModal/LikedUsersModal";
import CommentsModal from "../CommentsModal/CommentsModal";

// Import icon images
import likeIcon from "../../assets/notliked.png";
import unlikeIcon from "../../assets/liked.png";
import commentsIcon from "../../assets/comment.png";
import deleteIcon from "../../assets/trash.png";

export default function PostCard({ post, onDelete, handleAddComment }) {
  const currentUser = getUser();

  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser));
  const [likedUsers, setLikedUsers] = useState([]);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [showLikedUsersModal, setShowLikedUsersModal] = useState(false);
  const [showCommentsModal, setShowCommentsModal] = useState(false);

  useEffect(() => {
    fetchLikedUsers();
  }, []);

  useEffect(() => {
    setLikesCount(post.likes.length);
  }, [post.likes]);

  const fetchLikedUsers = async () => {
    try {
      const likes = await postsAPI.getPostLikes(post._id);
      setLikedUsers(likes);
    } catch (error) {
      console.error("Error fetching liked users:", error);
    }
  };

  const handleLike = async () => {
    try {
      await postsAPI.likePost(post._id);
      setIsLiked(true);
      setLikesCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleUnlike = async () => {
    try {
      await postsAPI.unlikePost(post._id);
      setIsLiked(false);
      setLikesCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error unliking post:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await postsAPI.deletePost(post._id);
      onDelete(post._id);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleShowLikedUsers = async () => {
    try {
      const likes = await postsAPI.getPostLikes(post._id);
      setLikedUsers(likes);
      document.body.classList.add("no-scroll");
      setShowLikedUsersModal(true);
    } catch (error) {
      console.error("Error fetching liked users:", error);
    }
  };

  const handleCloseLikedUsersModal = () => {
    setShowLikedUsersModal(false);
    document.body.classList.remove("no-scroll");
  };

  const handleShowComments = () => {
    document.body.classList.add("no-scroll");
    setShowCommentsModal(true);
  };

  const handleCloseCommentsModal = () => {
    setShowCommentsModal(false);
    document.body.classList.remove("no-scroll");
  };

  return (
    <article className="CustomPostCard">
       <img src={post.url} alt={post.title} className={`post-image`} />
      <div className="post-created-by">📸 By: {post.createdBy.name}</div>
      <div className="post-title">{post.title}</div>
      <div className="post-category">Category: {post.category}</div> 
      <div className="post-likes">
        <div className="like-container">
          {isLiked ? (
            <button className="like-unlike-button" onClick={handleUnlike}>
              <img src={unlikeIcon} alt="Unlike" />
            </button>
          ) : (
            <button className="like-unlike-button" onClick={handleLike}>
              <img src={likeIcon} alt="Like" />
            </button>
          )}
          <button className="likes-button" onClick={handleShowLikedUsers}>
            {likesCount}
          </button>
        </div>
        <button className="comments-button" onClick={handleShowComments}>
          <img src={commentsIcon} alt="Comments" />
        </button>
        {currentUser && currentUser._id === post.createdBy._id && (
          <button className="comments-button" onClick={handleDelete}>
            <img src={deleteIcon} alt="Delete" />
          </button>
        )}
      </div>
      {showLikedUsersModal && (
        <LikedUsersModal
          likedUsers={likedUsers}
          onClose={handleCloseLikedUsersModal}
        />
      )}
      {showCommentsModal && (
        <CommentsModal
          comments={post.comments}
          onClose={handleCloseCommentsModal}
          postId={post._id}
          handleAddComment={handleAddComment}
        />
      )}
    </article>
  );
}
