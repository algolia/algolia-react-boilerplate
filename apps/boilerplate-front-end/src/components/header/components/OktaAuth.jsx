import { OktaLogo, LittleAlgolia } from '@/assets/svg/SvgIndex'
import { useOktaAuth } from '@okta/okta-react'
import { useEffect, useState } from 'react'

const OktaAuth = () => {
  const { authState, oktaAuth } = useOktaAuth()
  const handleLogin = () => oktaAuth.signInWithRedirect()
  const handleLogout = () => oktaAuth.signOut()
  const [userInfo, setUserInfo] = useState(null)

  const displayNameByEmail = () =>
  {
    if (authState?.accessToken?.claims?.sub) {
      let email = authState.accessToken.claims.sub
      let name = email.split('@')[0]
      let fistName = name.split('.')[0]
      let lastName = name.split('.')[1]
      let nameDisplayed = fistName.charAt(0).toUpperCase() + fistName.slice(1) + ' ' + lastName.charAt(0).toUpperCase() + lastName.slice(1)
      return nameDisplayed
    } else {
      return null
    }
  }

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
          <button type="button" onClick={handleLogin} className='okta-login-button'>
            <OktaLogo />
          </button>
        </>
      ) : (
        <div className='okta-logged'>
          <p>Welcome {displayNameByEmail()}</p> <LittleAlgolia />
        </div>
      )}
    </div>
  )
}

export default OktaAuth
