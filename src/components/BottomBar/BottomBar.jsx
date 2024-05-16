import React from 'react';
import { Link } from 'react-router-dom';

export default function BottomBar({ onUpload }) {
  const handleToggleModal = () => {
    onUpload(true);
  }

  return (
    <div className="bottom-bar">
      <Link to="/cars" className="navigation-button">Cars</Link>
      <Link to="/nature" className="navigation-button">Nature</Link>
      <button onClick={handleToggleModal} className="upload-button">Upload Post</button>
      <Link to="/gaming" className="navigation-button">Gaming</Link>
      <Link to="/profile" className="navigation-button">Profile</Link>
    </div>
  );
}
