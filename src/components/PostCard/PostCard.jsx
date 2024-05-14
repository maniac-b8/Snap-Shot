import './PostCard.css';
import * as postsAPI from '../../utilities/posts-service';
import { getUser } from '../../utilities/users-service';
import { useState } from 'react';
import * as commentsAPI from '../../utilities/comments-service';

export default function PostCard({ post, onDelete, handleAddComment }) {
  const currentUser = getUser();
  const [commentContent, setCommentContent] = useState('');

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

  return (
    <article className="PostCard">
      <img src={post.url} alt={post.title} />
      <div>{post.title}</div>
      <div>Category: {post.category}</div>
      <div>Created By: {post.createdBy.name}</div>
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
