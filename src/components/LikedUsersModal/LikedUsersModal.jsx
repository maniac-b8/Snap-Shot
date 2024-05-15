import React from 'react';
import './LikedUsersModal.css';

export default function LikedUsersModal({ likedUsers, onClose }) {
    return (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Liked Users</h2>
          <ul>
            {likedUsers.map(user => (
              <li key={user._id}>{user.name}</li> 
            ))}
          </ul>
        </div>
      </div>
    );
  }