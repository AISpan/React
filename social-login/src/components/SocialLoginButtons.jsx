import React, { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { handleSocialLogin } from '@/services/authService';

const SocialLoginButtons = () => {
  const [user, setUser] = useState(null); // Track user state

  // Mock function to fetch user data (can be replaced with real API calls)
  const fetchGoogleUserData = (response) => {
    const userData = {
      name: response.profileObj?.name || 'User',
      email: response.profileObj?.email || 'user@example.com',
      picture: response.profileObj?.imageUrl || '',
    };
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    googleLogout(); // Specific to Google; add logout logic for other providers
  };

  return (
    <div className="container">
      {!user ? (
        <>
          {/* Google Login */}
          <GoogleLogin
            onSuccess={(response) => fetchGoogleUserData(response)}
            onError={() => console.error('Google login failed')}
            render={(renderProps) => (
              <button className="google-button" onClick={renderProps.onClick}>
                <FontAwesomeIcon icon={faGoogle} className="icon" />
                Login with Google
              </button>
            )}
          />

          {/* Facebook Login */}
          <button className="facebook-button" onClick={() => handleSocialLogin('facebook')}>
            <FontAwesomeIcon icon={faFacebook} className="icon" />
            Login with Facebook
          </button>

          {/* GitHub Login */}
          <button className="github-button" onClick={() => handleSocialLogin('github')}>
            <FontAwesomeIcon icon={faGithub} className="icon" />
            Login with GitHub
          </button>

          {/* LinkedIn Login */}
          <button className="linkedin-button" onClick={() => handleSocialLogin('linkedin')}>
            <FontAwesomeIcon icon={faLinkedin} className="icon" />
            Login with LinkedIn
          </button>
        </>
      ) : (
        <div className="user-info">
          <img src={user.picture || 'https://via.placeholder.com/150'} alt="User Avatar" className="user-avatar" />
          <h2 className="user-name">{user.name}</h2>
          <p className="user-email">{user.email}</p>
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default SocialLoginButtons;
