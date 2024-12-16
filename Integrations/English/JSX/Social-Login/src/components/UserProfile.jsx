import React from 'react';
import PropTypes from 'prop-types';
import './UserProfile.css'; // This path should point to the correct CSS file

const UserProfile = ({ user, onLogout }) => {
  return (
    <div className="user-profile">
      <img
        src={user.picture || 'https://via.placeholder.com/150'}
        alt="User Avatar"
        className="user-avatar"
      />
      <h2 className="user-name">{user.name || 'No Name Provided'}</h2>
      <p className="user-email">{user.email || 'No Email Provided'}</p>
      <button onClick={onLogout} className="logout-button">
        Logout
      </button>
    </div>
  );
};

UserProfile.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    picture: PropTypes.string,
  }).isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default UserProfile;
