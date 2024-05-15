import './PostCard.css';
import * as postsAPI from '../../utilities/posts-service';
import { getUser } from '../../utilities/users-service';
import { useState, useEffect } from 'react';
import * as commentsAPI from '../../utilities/comments-service';
import LikedUsersModal from '../LikedUsersModal/LikedUsersModal'; 
export default function PostCard({ post, onDelete, handleAddComment }) {
  const currentUser = getUser();
  const [commentContent, setCommentContent] = useState('');
  const [isLiked, setIsLiked] = useState(post.likes.includes(currentUser._id));
  const [likedUsers, setLikedUsers] = useState([]);
  const [likesCount, setLikesCount] = useState(post.likes.length);
  const [showModal, setShowModal] = useState(false);

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
      console.error('Error fetching liked users:', error);
    }
  };

  const handleLike = async () => {
    try {
      await postsAPI.likePost(post._id);
      setIsLiked(true);
      setLikesCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleUnlike = async () => {
    try {
      await postsAPI.unlikePost(post._id);
      setIsLiked(false);
      setLikesCount(prevCount => prevCount - 1);
    } catch (error) {
      console.error('Error unliking post:', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = await commentsAPI.addComment(post._id, { content: commentContent });
      handleAddComment(updatedPost);
      setCommentContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await postsAPI.deletePost(post._id);
      onDelete(post._id); 
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const handleShowLikedUsers = async () => {
    try {
      const likes = await postsAPI.getPostLikes(post._id);
      setLikedUsers(likes);
      setShowModal(true);
    } catch (error) {
      console.error('Error fetching liked users:', error);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false); // Close the modal when the close button is clicked
  };

  return (
    <article className="PostCard">
      <img src={post.url} alt={post.title} />
      <div>{post.title}</div>
      <div>Category: {post.category}</div>
      <div>Created By: {post.createdBy.name}</div>
      <div>Likes: {likesCount}</div>
      <button onClick={handleShowLikedUsers}>Show Liked Users</button>
      {isLiked ? (
        <button onClick={handleUnlike}>Unlike</button>
      ) : (
        <button onClick={handleLike}>Like</button>
      )}
      {showModal && (
        <LikedUsersModal likedUsers={likedUsers} onClose={handleCloseModal} />
      )}
      {currentUser && currentUser._id === post.createdBy._id && (
        <button className='delete' onClick={handleDelete}>Delete</button>
      )}
      <div className="comments-section">
        {post.comments.map((comment) => (
          <div key={comment._id} className="comment">
            {comment.username}: {comment.content}
          </div>
        ))}
      </div>
      {currentUser && (
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Add a comment..."
          />
          <button type="submit">Submit</button>
        </form>
      )}
      
    </article>
  );
}