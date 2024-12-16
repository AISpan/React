/**
 * OAuth Providers Configuration
 * Contains client details, token endpoints, and user info URLs.
 */
const providersConfig = {
  google: {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    userInfoUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
  },
  facebook: {
    clientId: import.meta.env.VITE_FACEBOOK_APP_ID,
    sdkUrl: 'https://connect.facebook.net/en_US/sdk.js',
    version: 'v13.0',
    scope: 'email,public_profile',
  },
  linkedin: {
    clientId: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
    authUrl: `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${import.meta.env.VITE_LINKEDIN_CLIENT_ID}&redirect_uri=${window.location.origin}&scope=r_liteprofile%20r_emailaddress`,
    tokenUrl: 'https://www.linkedin.com/oauth/v2/accessToken',
    userInfoUrl: 'https://api.linkedin.com/v2/me',
    emailUrl: 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))',
  },
  github: {
    clientId: import.meta.env.VITE_GITHUB_CLIENT_ID,
    authUrl: `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}&redirect_uri=${window.location.origin}`,
    tokenUrl: 'https://github.com/login/oauth/access_token',
    userInfoUrl: 'https://api.github.com/user',
  },
};

export default providersConfig;
