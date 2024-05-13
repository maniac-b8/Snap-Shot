import { useState, useRef, useEffect } from 'react';
import * as photosAPI from '../../utilities/posts-service';
import PhotoCard from '../../components/PhotoCard/PhotoCard';
import './PostsPage.css';

export default function PostsPage() {
  const [title, setTitle] = useState('');
  const [photos, setPhotos] = useState([]);

  const fileInputRef = useRef();

  useEffect(function() {
    photosAPI.getAll().then(photos => {
      setPhotos(photos);
    });
  }, []);

  async function handleUpload() {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('photo', fileInputRef.current.files[0]);
      
      const newPhoto = await photosAPI.upload(formData);
  
      const updatedPhoto = await photosAPI.getPhoto(newPhoto._id);
  
      setPhotos([updatedPhoto, ...photos]);
      setTitle('');
      fileInputRef.current.value = '';
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  }

  const handleDelete = (postId) => {
    setPhotos(photos.filter(photo => photo._id !== postId));
  }
  return (
    <main className="App flex-ctr-ctr">
      <section className="flex-ctr-ctr">
        <input type="file" ref={fileInputRef} />
        <input value={title} onChange={(evt) => setTitle(evt.target.value)} placeholder="Photo Title" />
        <button onClick={handleUpload}>Upload Photo</button>
      </section>
      <section>
      {photos.map(photo => (
          <PhotoCard
          key={photo._id}
          photo={photo}
          onDelete={handleDelete}
        />
        ))}
      </section>
    </main>
  );
}