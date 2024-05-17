// uploadpostmodal.jsx

import { useState } from 'react';
import './UploadPostModal.css';

export default function UploadPostModal({ onUpload, onClose }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Cars & Trucks');
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('post', file);
    formData.append('category', category);
    onUpload(formData); 
  }

  return (
    <div className="upload-post-modal">
      <div className="upload-modal-content">
        <span className="upload-close" onClick={onClose}>&times;</span>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Cars & Trucks">Cars & Trucks</option>
          <option value="Nature">Nature</option>
          <option value="Gaming">Gaming</option>
        </select>
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}

