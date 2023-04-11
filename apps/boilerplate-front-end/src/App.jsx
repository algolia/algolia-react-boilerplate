import { useEffect, useState } from 'react'

//Recoil states & values
import { useRecoilValue } from 'recoil'

import { mainIndex } from '@/config/algoliaEnvConfig'
import { predictUserIdAtom } from '@/config/predictConfig'
import { searchClient } from './config/algoliaEnvConfig'

// Algolia Instantsearch components
import { InstantSearch } from 'react-instantsearch-hooks-web'

//Import Predict to get user profil
import PredictUserProfileProvider from './components/predict/PredictUserProfileProvider'

// Import Components
import Main from './Main'

// Okta Import for authentication
import config from '@/config/oktaLogin'
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js'
import { Security } from '@okta/okta-react'

import { useNavigate } from 'react-router-dom'
import { shouldHaveOktaLogin } from './config/featuresConfig'

const App = () => {
  const [oktaAuth, setOktaAuth] = useState(null)

  // Index to make the main search queries
  const index = useRecoilValue(mainIndex)

  // Get userID from Predict
  const userId = useRecoilValue(predictUserIdAtom)

  const shouldHaveLoginWithOkta = useRecoilValue(shouldHaveOktaLogin)

  // Create a callback authentication with OKTA
  const navigate = useNavigate()
  const restoreOriginalUri = (_oktaAuth, originalUri) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin))
  }

  useEffect(() => {
    if (shouldHaveLoginWithOkta) {
      const oktaAuth = new OktaAuth(config.oidc)
      setOktaAuth(oktaAuth)
    }
  }, [])

  useEffect(() => {
    window.process = {
      ...window.process,
    }
  }, [])
  return (
    <PredictUserProfileProvider userID={userId}>
      <InstantSearch
        searchClient={searchClient}
        indexName={index}
        routing={true}
      >
        {shouldHaveLoginWithOkta ? (
          <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
            <Main />
          </Security>
        ) : (
          <Main />
        )}
      </InstantSearch>
    </PredictUserProfileProvider>
  )
}

export default App
