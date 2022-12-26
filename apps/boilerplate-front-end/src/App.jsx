import { useEffect } from 'react'

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

// Import fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
// Import the icons you need
import { fas } from '@fortawesome/free-solid-svg-icons'

const App = () => {

  // Index to make the main search queries
  const index = useRecoilValue(mainIndex)
  
  // Add the icons you need to the library
  library.add(fas)

  // Get userID from Predict
  const userId = useRecoilValue(predictUserIdAtom)

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
        <Main />
      </InstantSearch>
    </PredictUserProfileProvider>
  )
}

export default App
