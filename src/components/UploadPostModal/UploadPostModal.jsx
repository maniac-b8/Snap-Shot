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
        <h2>Upload Post</h2>
        <form onSubmit={handleUpload}>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} style={{ marginBottom: '10px' }} />
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Post Title" style={{ marginBottom: '10px' }} />
          <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ marginBottom: '10px' }}>
            <option value="Cars & Trucks">Cars & Trucks</option>
            <option value="Nature">Nature</option>
            <option value="Gaming">Gaming</option>
          </select>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
}
