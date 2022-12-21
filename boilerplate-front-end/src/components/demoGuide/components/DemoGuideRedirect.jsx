import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import Selectors from '@/components/selector/Selectors'

import { localSearchQueryAtom } from '@/config/searchboxConfig'

// Import configuration
import { DemoGuideRedirectConfig } from '@/config/demoGuideConfig'

const DemoGuideRedirect = ({ triggerAlert, refine }) => {
  const [selectedValue, setSelectedValue] = useState(DemoGuideRedirectConfig[0])
  const setLocalSearch = useSetRecoilState(localSearchQueryAtom)

  const handleRedirects = (banner) => {
    setLocalSearch(banner.value)
    refine(banner.value)
    setSelectedValue(banner)
    triggerAlert(banner.alertContent)
  }

  return (
    <div className="demoGuideHelpers">
      <h3>Redirect</h3>
      <div className="demoGuideHelpers__infos">
        {DemoGuideRedirectConfig.map((item, i) => {
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
        setSelectedValue={handleRedirects}
        refine={refine}
        options={DemoGuideRedirectConfig}
      />
    </div>
  )
}

export default DemoGuideRedirect
