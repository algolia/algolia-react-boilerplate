import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import Selectors from '@/components/selector/Selectors'

import { localSearchQueryAtom } from '@/config/searchboxConfig'

// Import configuration
import { DemoGuideDynamicFiltersConfig } from '@/config/demoGuideConfig'

const DemoGuideDynamicFilters = ({ triggerAlert, refine }) => {
  const [selectedValue, setSelectedValue] = useState(
    DemoGuideDynamicFiltersConfig[0]
  )
  const setLocalSearch = useSetRecoilState(localSearchQueryAtom)

  const handleDynamicFilters = (dynamicFilter) => {
    setLocalSearch(dynamicFilter.value)
    refine(dynamicFilter.value)
    setSelectedValue(dynamicFilter)
    triggerAlert(dynamicFilter.alertContent)
  }

  return (
    <div className="demoGuideHelpers">
      <h3>Dynamic Facet</h3>
      <div className="demoGuideHelpers__infos">
        {DemoGuideDynamicFiltersConfig.map((item, i) => {
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
        setSelectedValue={handleDynamicFilters}
        refine={refine}
        options={DemoGuideDynamicFiltersConfig}
      />
    </div>
  )
}

export default DemoGuideDynamicFilters
