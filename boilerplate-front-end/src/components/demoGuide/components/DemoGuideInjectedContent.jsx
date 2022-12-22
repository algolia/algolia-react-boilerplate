import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import Selectors from '@/components/selector/Selectors'

import { localSearchQueryAtom } from '@/config/searchboxConfig'

// Import configuration
import { DemoGuideInjectedContentConfig } from '@/config/demoGuideConfig'

const DemoGuideInjectedContent = ({ triggerAlert, refine }) => {
  const [selectedValue, setSelectedValue] = useState(
    DemoGuideInjectedContentConfig[0]
  )
  const setLocalSearch = useSetRecoilState(localSearchQueryAtom)

  const handleInjectedContent = (injectedContent) => {
    setLocalSearch(injectedContent.value)
    refine(injectedContent.value)
    setSelectedValue(injectedContent)
    triggerAlert(injectedContent.alertContent)
  }

  return (
    <div className="demoGuideHelpers">
      <h3>Injected Content</h3>
      <div className="demoGuideHelpers__infos">
        {DemoGuideInjectedContentConfig.map((item, i) => {
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
        setSelectedValue={handleInjectedContent}
        refine={refine}
        options={DemoGuideInjectedContentConfig}
      />
    </div>
  )
}

export default DemoGuideInjectedContent
