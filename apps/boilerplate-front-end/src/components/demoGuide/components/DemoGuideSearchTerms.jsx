import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import Selectors from '@/components/selector/Selectors'

import { localSearchQueryAtom } from '@/config/searchboxConfig'

// Import configuration
import { searchTermsConfig } from '@/config/demoGuideConfig'
import { useNavigate } from 'react-router-dom'

const SearchTerms = ({ triggerAlert, refine }) => {
  const [selectedValue, setSelectedValue] = useState(searchTermsConfig[0])
  const setLocalSearch = useSetRecoilState(localSearchQueryAtom)
  const navigate = useNavigate()

  const handleSearchTerms = (banner) => {
    setLocalSearch(banner.value)
    refine(banner.value)
    setSelectedValue(banner)
    triggerAlert(banner.alertContent)
    navigate('/search ')
  }

  return (
    <div className="demoGuideHelpers">
      <h3>Search Terms</h3>
      <div className="demoGuideHelpers__infos">
        {searchTermsConfig.map(
          (item, i) =>
            item.details && (
              <div key={i} className="demoGuideHelpers__infos__titles">
                <span>{item.label}:</span>
                <p>{item.details}</p>
              </div>
            )
        )}
      </div>
      <Selectors
        selectedValue={selectedValue}
        setSelectedValue={handleSearchTerms}
        refine={refine}
        options={searchTermsConfig}
      />
    </div>
  )
}

export default SearchTerms
