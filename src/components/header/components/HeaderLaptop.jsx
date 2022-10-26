// React Router
import { Link } from 'react-router-dom'

// Recoil State
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'

import { navigationStateAtom } from '@/config/navigationConfig'

// Import SearchBox config
import {
  queryAtom,
  searchBoxAtom,
  searchBoxIsActive,
} from '@/config/searchboxConfig'

//Import config for federatedSearch
import { shouldHaveOpenFederatedSearch } from '@/config/federatedConfig'

// Import voiceSearch config
import { shouldHaveVoiceSearch } from '@/config/featuresConfig'

// Import applied rules config
import { rulesAtom } from '@/config/appliedRulesConfig'

// Custom Hooks
import useOutsideClick from '@/hooks/useOutsideClick'

import { AlgoliaLogo } from '@/assets/svg/SvgIndex'

// Import Components
import CustomSearchBox from '@/components/searchbox/SearchBox'
import CustomVoiceSearchComponent from '@/components/voicesearch/VoiceSearch'
import Navigation from './Navigation'

const HeaderLaptop = () => {
  const [searchboxRef, setSearchBoxRef] = useRecoilState(searchBoxAtom)
  const setQueryState = useSetRecoilState(queryAtom)
  const federated = useSetRecoilState(shouldHaveOpenFederatedSearch)
  const setSbIsActive = useSetRecoilState(searchBoxIsActive)
  const displayVoiceSearch = useRecoilValue(shouldHaveVoiceSearch)
  const rulesApplied = useSetRecoilState(rulesAtom)
  const setNavigationState = useSetRecoilState(navigationStateAtom)

  useOutsideClick(searchboxRef, () => setSbIsActive(false))

  return (
    <div className="container">
      <div className="container__header-top">
        <div className="container__header-top__logo">
          <Link
            to="/"
            aria-label="link to home"
            onClick={() => {
              setQueryState('')
              setNavigationState({})
              federated(false)
              rulesApplied([])
            }}
          >
            {/* Add possibility to change the Logo */}
            <AlgoliaLogo />
            {/* {isLogoLoaded === false && <CustomSkeleton type="logo" />} */}
          </Link>
        </div>
        {/* For a search box Simple center */}
        <div className="searchbox-container" ref={setSearchBoxRef}>
          <CustomSearchBox />
          {displayVoiceSearch && <CustomVoiceSearchComponent />}
        </div>
      </div>
      <div className="container__header-nav">
        <Navigation />
      </div>
    </div>
  )
}

export default HeaderLaptop
