import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import Selectors from '@/components/selector/Selectors'

// Import configuration
import { searchBannersConfig } from '@/config/demoGuideConfig'
import { localSearchQueryAtom } from '@/config/searchboxConfig'

const SearchBanners = ({ triggerAlert, refine }) => {
  const [selectedValue, setSelectedValue] = useState(searchBannersConfig[0])
  const setLocalSearch = useSetRecoilState(localSearchQueryAtom)

  const handleSearchBanners = (banner) => {
    setLocalSearch(banner.value)
    refine(banner.value)
    setSelectedValue(banner)
    triggerAlert(banner.alertContent)
    navigate('/search ')
  }

  return (
    <div className="demoGuideHelpers">
      <h3>Banners Display</h3>
      <div className="demoGuideHelpers__infos">
        {searchBannersConfig.map((item, i) => {
          return (
            <div key={i} className="demoGuideHelpers__infos__titles">
              <span>{item.label}:</span>
              <p>{item.details}</p>
            </div>
          )
        })}
      </div>
      <Selectors
        selectedValue={selectedValue}
        setSelectedValue={handleSearchBanners}
        options={searchBannersConfig}
      />
    </div>
  )
}

export default SearchBanners
