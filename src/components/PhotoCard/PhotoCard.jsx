import './PhotoCard.css';
import * as photosAPI from '../../utilities/posts-service';
import { getUser } from '../../utilities/users-service';

export default function PhotoCard({ photo, onDelete }) {
  const currentUser = getUser();

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
    </article>
  );
}