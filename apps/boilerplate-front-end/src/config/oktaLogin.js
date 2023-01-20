// Okta react login config
//link to okta docs:
// https://github.com/okta/okta-react

const CLIENT_ID = import.meta.env.VITE_APP_OKTA_CLIENT_ID
const ISSUER = import.meta.env.VITE_APP_OKTA_BASE_URL
const OKTA_TESTING_DISABLEHTTPSCHECK = import.meta.env
  .VITE_APP_OKTA_TESTING_DISABLEHTTPSCHECK
const BASENAME = ''
const REDIRECT_URI = `${window.location.origin}${BASENAME}/login/callback`

export default {
  oidc: {
    clientId: CLIENT_ID,
    issuer: ISSUER,
    redirectUri: REDIRECT_URI,
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: OKTA_TESTING_DISABLEHTTPSCHECK,
  },
}
