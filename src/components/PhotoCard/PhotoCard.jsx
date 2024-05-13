import './PhotoCard.css';
import * as photosAPI from '../../utilities/posts-service';
import { getUser } from '../../utilities/users-service';
import { useState } from 'react';
import * as commentsAPI from '../../utilities/comments-service';

export default function PhotoCard({ photo, onDelete, updatePhotoWithComment }) {
  const currentUser = getUser();
  const [commentContent, setCommentContent] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const newComment = await commentsAPI.addComment(photo._id, { content: commentContent });
      updatePhotoWithComment(newComment, photo._id);
   
      setCommentContent('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await photosAPI.deletePost(photo._id);
      onDelete(photo._id); 
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <article className="PhotoCard">
      <img src={photo.url} alt={photo.title} />
      <div>{photo.title}</div>
      <div>Created By: {photo.createdBy.name}</div>
    {currentUser && currentUser._id === photo.createdBy._id && (
        <button className='delete' onClick={handleDelete}>Delete</button>
      )}
    <div className="comments-section">
    {photo.comments.map((comment) => (
  <div key={comment._id} className="comment">
    {comment.createdBy.name}: {comment.content}
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