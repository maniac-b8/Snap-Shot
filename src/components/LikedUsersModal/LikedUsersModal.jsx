import React from 'react';
import './LikedUsersModal.css';

export default function LikedUsersModal({ likedUsers, onClose }) {
    return (
      <div className="liked-users-modal custom-modal"> 
        <div className="liked-users-modal-content modal-content">
          <span className="liked-users-modal-close close" onClick={onClose}>&times;</span>
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
