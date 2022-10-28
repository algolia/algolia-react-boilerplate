import { useEffect } from 'react'

//Recoil states & values
import { useRecoilValue } from 'recoil'

// Import navigate function to route to results page on search submit

import { mainIndex } from '@/config/algoliaEnvConfig'
import { predictUserIdAtom } from '@/config/predictConfig'
import { searchClient } from './config/algoliaEnvConfig'

// Algolia Instantsearch components
import { InstantSearch } from 'react-instantsearch-hooks-web'

//Import Predict to get user profil
import PredictUserProfileProvider from './components/predict/PredictUserProfileProvider'

// Import Components
import { Main } from './Main'

const App = () => {
  // Get userID from Predict
  const userId = useRecoilValue(predictUserIdAtom)

  // Index to make the main search queries
  const index = useRecoilValue(mainIndex)
  useEffect(() => {
    window.process = {
      ...window.process,
    }
  }, [])

  return (
    <PredictUserProfileProvider userID={userId}>
      <InstantSearch searchClient={searchClient} indexName={index}>
        <Main />
      </InstantSearch>
    </PredictUserProfileProvider>
  )
}

export default App
