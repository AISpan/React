import providersConfig from '@/utils/providersConfig';

/**
 * Handles social login dynamically based on the provider.
 *
 * @param {string} provider - The provider name (google, facebook, github, linkedin).
 * @param {Object} response - Optional response object for SDK-based providers (e.g., Google, Facebook).
 */
export const handleSocialLogin = async (provider, response = null) => {
  const config = providersConfig[provider];

  if (!config) {
    console.error(`Unsupported provider: ${provider}`);
    return;
  }

  try {
    if (provider === 'google') {
      console.log('Google login response:', response);
      // Process Google response here
    } else if (provider === 'facebook') {
      if (!window.FB) {
        console.error('Facebook SDK not initialized');
        return;
      }
      window.FB.login(
        (fbResponse) => {
          if (fbResponse.authResponse) {
            console.log('Facebook login successful:', fbResponse);
          } else {
            console.error('Facebook login failed');
          }
        },
        { scope: config.scope }
      );
    } else if (provider === 'github' || provider === 'linkedin') {
      window.location.href = config.authUrl;
    } else {
      throw new Error(`Unsupported provider: ${provider}`);
    }
  } catch (error) {
    console.error(`${provider} login failed:`, error);
  }
};

/**
 * Dynamically loads an external SDK script.
 *
 * @param {string} sdkUrl - The URL of the SDK script to load.
 */
export const loadSdkScript = (sdkUrl) => {
  return new Promise((resolve, reject) => {
    if (document.getElementById('facebook-jssdk')) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.id = 'facebook-jssdk';
    script.src = sdkUrl;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
};
