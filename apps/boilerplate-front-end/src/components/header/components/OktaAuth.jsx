import { useOktaAuth } from '@okta/okta-react'
import { useEffect, useState } from 'react'

const OktaAuth = () => {
  const { authState, oktaAuth } = useOktaAuth()
  const handleLogin = () => oktaAuth.signInWithRedirect()
  const handleLogout = () => oktaAuth.signOut()
  const [userInfo, setUserInfo] = useState(null)

  useEffect(() => {
    console.log(authState)
  }, [authState])

  useEffect(() => {
    if (authState?.accessToken?.claims?.sub) {
      setUserInfo(authState.accessToken.claims.sub)
    } else {
      null
    }
  }, [authState])

  return (
    <div>
      {!authState || !authState.isAuthenticated ? (
        <>
          <button type="button" onClick={handleLogin}>
            Login With Okta
          </button>
        </>
      ) : (
        <>
          <p>You&apos;re logged in!{userInfo}</p>{' '}
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </>
      )}
    </div>
  )
}

export default OktaAuth
