import { useState, useRef, useEffect } from 'react';
import * as photosAPI from '../../utilities/posts-service';
import PhotoCard from '../../components/PhotoCard/PhotoCard';
import './PostsPage.css';

export default function PostsPage() {
  const [title, setTitle] = useState('');
  const [photos, setPhotos] = useState([]);

  const fileInputRef = useRef();

  useEffect(function() {
    photosAPI.getAll().then(photos => setPhotos(photos));
  }, []);

  async function handleUpload() {
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('photo', fileInputRef.current.files[0]);
    const newPhoto = await photosAPI.upload(formData);
    setPhotos([newPhoto, ...photos]);
    setTitle('');
    fileInputRef.current.value = '';
  }

  return (
    <main className="App flex-ctr-ctr">
      <section className="flex-ctr-ctr">
        <input type="file" ref={fileInputRef} />
        <input value={title} onChange={(evt) => setTitle(evt.target.value)} placeholder="Photo Title" />
        <button onClick={handleUpload}>Upload Photo</button>
      </section>
      <section>
        {photos.map(p => <PhotoCard photo={p} key={p._id} />)}
      </section>
    </main>
  );
}