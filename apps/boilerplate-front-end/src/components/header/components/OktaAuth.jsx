import { OktaLogo } from '@/assets/svg/SvgIndex'
import { MD5 } from '@/config/md5'
import { useOktaAuth } from '@okta/okta-react'
import { useEffect, useState } from 'react'

const OktaAuth = () => {
  const { authState, oktaAuth } = useOktaAuth()
  const handleLogin = () => oktaAuth.signInWithRedirect()
  // To use for a Logout function
  const handleLogout = () => oktaAuth.signOut()
  const [userEmail, setUserEmail] = useState(null)
  const [imgLink, setLinkImg] = useState(null)
  const [displayLogout, setDisplayLogout] = useState(false)

  // Get info from okta on user
  // Put in a useEffect to avoid too many calls
  useEffect(() => {
    if (authState?.isAuthenticated) {
      const user = oktaAuth?.token
        .getUserInfo()
        .then(function (user) {
          // user has details about the user
          setUserEmail(user.email)
        })
        .catch(function (err) {
          alert(`Error getting user info : ${err}`)
          // handle OAuthError or AuthSdkError (AuthSdkError will be thrown if app is in OAuthCallback state)
        })
    }
  }, [authState])

  // Hash function to use email on Gravatar API to have an img
  function get_gravatar(email, size) {
    // MD5 (Message-Digest Algorithm) by WebToolkit
    //

    var size = size || 80

    setLinkImg(
      'http://www.gravatar.com/avatar/' + MD5(email) + '.jpg?s=' + size
    )
  }

  // Set it do display in an img tag
  useEffect(() => {
    if (userEmail !== null) {
      get_gravatar(userEmail, 50)
    }
  }, [userEmail])

  return (
    <div>
      {!authState || !authState.isAuthenticated ? (
        <>
          <button
            type="button"
            onClick={handleLogin}
            className="okta-login-button"
          >
            <OktaLogo />
          </button>
        </>
      ) : (
        <div className="okta-logged">
          <img
            src={imgLink}
            onClick={() => {
              setDisplayLogout(!displayLogout)
            }}
          />
          {displayLogout && (
            <div className="okta-logged__logout">
              <p
                onClick={() => {
                  handleLogout()
                }}
              >
                Log out
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default OktaAuth
