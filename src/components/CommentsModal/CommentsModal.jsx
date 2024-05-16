import React, { useState } from 'react';
import * as commentsAPI from '../../utilities/comments-service';

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
    <div className="custom-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Comments</h2>
        <ul>
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
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
