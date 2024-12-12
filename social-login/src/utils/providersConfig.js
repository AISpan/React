/**
 * Configuration for OAuth providers.
 */
const providersConfig = {
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    type: 'popup',
  },
  facebook: {
    clientId: import.meta.env.VITE_FACEBOOK_APP_ID,
    type: 'sdk',
    sdkUrl: 'https://connect.facebook.net/en_US/sdk.js',
    scope: 'email,public_profile',
  },
  github: {
    clientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
    type: 'redirect',
    authUrl: `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&redirect_uri=${window.location.origin}`,
  },
  linkedin: {
    clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
    type: 'redirect',
    authUrl: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${import.meta.env.VITE_LINKEDIN_CLIENT_ID}&redirect_uri=${window.location.origin}&scope=r_liteprofile%20r_emailaddress`,
  },
};

export default providersConfig;
