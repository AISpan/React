import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { loginWithFacebook, fetchUserInfo } from '@/services/authService';
import UserProfile from './UserProfile';

const SocialLoginButtons = () => {
  const [user, setUser] = useState(null);

  const handleGoogleLogin = async (response) => {
    try {
      const userInfo = await fetchUserInfo('google', response.credential);
      setUser(userInfo);
    } catch (error) {
      
      console.error('Google login failed:', error);
    }
  };

  const handleFacebookLogin = async () => {
    try {
      const fbResponse = await loginWithFacebook();
      const userInfo = await fetchUserInfo('facebook', fbResponse.accessToken);
      setUser(userInfo);
    } catch (error) {
      console.error('Facebook login failed:', error);
    }
  };

  const handleLinkedInLogin = () => {
    const linkedInAuthUrl = providersConfig.linkedin.authUrl;
    window.location.href = linkedInAuthUrl;
  };

  const handleGitHubLogin = () => {
    const gitHubAuthUrl = providersConfig.github.authUrl;
    window.location.href = gitHubAuthUrl;
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <div className="container">
      {!user ? (
        <>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => console.error('Google login failed')}
            render={(renderProps) => (
              <button className="google-button login-button" onClick={renderProps.onClick}>
                <FontAwesomeIcon icon={faGoogle} className="icon" /> Login with Google
              </button>
            )}
          />
          <button className="facebook-button login-button" onClick={handleFacebookLogin}>
            <FontAwesomeIcon icon={faFacebook} className="icon" /> Login with Facebook
          </button>
          <button className="linkedin-button login-button" onClick={handleLinkedInLogin}>
            <FontAwesomeIcon icon={faLinkedin} className="icon" /> Login with LinkedIn
          </button>
          <button className="github-button login-button" onClick={handleGitHubLogin}>
            <FontAwesomeIcon icon={faGithub} className="icon" /> Login with GitHub
          </button>
        </>
      ) : (
        <UserProfile user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default SocialLoginButtons;
