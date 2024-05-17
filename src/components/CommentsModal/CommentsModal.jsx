import React, { useState } from 'react';
import * as commentsAPI from '../../utilities/comments-service';
import './CommentsModal.css'; 

export default function CommentsModal({ comments, onClose, postId, handleAddComment }) {
  const [commentContent, setCommentContent] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedPost = await commentsAPI.addComment(postId, { content: commentContent });
      handleAddComment(updatedPost);
      setCommentContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="custom-modal comments-modal">
      <div className="modal-content comments-modal-content">
        <span className="close comments-modal-close" onClick={onClose}>&times;</span>
        <h2>Comments</h2>
        <ul className="comments-list">
          {comments.map((comment, index) => (
            <li key={comment._id} className="comment-item">
              <strong>{comment.username}:</strong> {comment.content}
              {index !== comments.length - 1 && <hr />}
            </li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit} className="comment-form">
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Add a comment..."
            className="comment-textarea"
          />
          <button type="submit" className="comment-submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
}
