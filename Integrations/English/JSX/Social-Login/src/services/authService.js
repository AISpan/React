import axios from 'axios';
import providersConfig from '@/utils/providersConfig';

/**
 * Load Facebook SDK dynamically.
 */
export const loadFacebookSdk = () => {
  return new Promise((resolve, reject) => {
    if (document.getElementById('facebook-jssdk')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = providersConfig.facebook.sdkUrl;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      window.fbAsyncInit = function () {
        window.FB.init({
          appId: providersConfig.facebook.clientId,
          autoLogAppEvents: true,
          xfbml: true,
          version: providersConfig.facebook.version,
        });
        resolve();
      };
    };

    script.onerror = () => reject(new Error('Failed to load Facebook SDK.'));
    document.body.appendChild(script);
  });
};

/**
 * Handle Facebook Login.
 */
export const loginWithFacebook = async () => {
  await loadFacebookSdk();
  return new Promise((resolve, reject) => {
    window.FB.login(
      (response) => {
        if (response.authResponse) {
          resolve(response.authResponse);
        } else {
          reject(new Error('Facebook login canceled or not authorized.'));
        }
      },
      { scope: providersConfig.facebook.scope }
    );
  });
};

/**
 * Fetch user data from providers.
 */
export const fetchUserInfo = async (provider, token) => {
  const config = providersConfig[provider];
  if (!config) throw new Error(`Unsupported provider: ${provider}`);

  try {
    if (provider === 'google') {
      // Decode token if it's a JWT
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      if (decodedToken.name && decodedToken.email && decodedToken.picture) {
        return { name: decodedToken.name, email: decodedToken.email, picture: decodedToken.picture };
      }
      const response = await axios.get(config.userInfoUrl, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return { name: response.data.name, email: response.data.email, picture: response.data.picture };
    }

    if (provider === 'facebook') {
      const response = await axios.get(
        `https://graph.facebook.com/me?fields=name,email,picture&access_token=${token}`
      );
      return { name: response.data.name, email: response.data.email, picture: response.data.picture.data.url };
    }

    if (provider === 'linkedin') {
      const tokenResponse = await axios.post(config.tokenUrl, null, {
        params: {
          grant_type: 'authorization_code',
          code: token,
          redirect_uri: window.location.origin,
          client_id: config.clientId,
          client_secret: import.meta.env.VITE_LINKEDIN_CLIENT_SECRET,
        },
      });

      const accessToken = tokenResponse.data.access_token;

      const profileResponse = await axios.get(config.userInfoUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const emailResponse = await axios.get(config.emailUrl, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      return {
        name: `${profileResponse.data.localizedFirstName} ${profileResponse.data.localizedLastName}`,
        email: emailResponse.data.elements[0]['handle~'].emailAddress,
        picture: profileResponse.data.profilePicture?.['displayImage~']?.elements[0]?.identifiers[0]?.identifier || '',
      };
    }

    if (provider === 'github') {
      const tokenResponse = await axios.post(config.tokenUrl, null, {
        params: {
          client_id: config.clientId,
          client_secret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
          code: token,
        },
        headers: { Accept: 'application/json' },
      });

      const accessToken = tokenResponse.data.access_token;

      const userResponse = await axios.get(config.userInfoUrl, {
        headers: { Authorization: `token ${accessToken}` },
      });

      return {
        name: userResponse.data.name || 'GitHub User',
        email: userResponse.data.email || 'No public email',
        picture: userResponse.data.avatar_url,
      };
    }
  } catch (error) {
    console.error(`Error fetching user info from ${provider}:`, error.response?.data || error.message);
    throw error;
  }
};
