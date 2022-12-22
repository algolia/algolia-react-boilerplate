import { useState } from 'react'
import Selectors from '@/components/selector/Selectors'

// Import configuration
import { landingPageConfig } from '@/config/demoGuideConfig'
import { useNavigate } from 'react-router-dom'

const DemoGuideLandingPage = ({ triggerAlert, refine }) => {
  const [selectedValue, setSelectedValue] = useState(landingPageConfig[0])
  const navigate = useNavigate()

  const handleLandingPage = (landingPage) => {
    // Create route to trigger the context and get the right landing page
    navigate(`/search?contextMarketingCampaign=${landingPage.value}`)
    // Refresh the page to trigger the context (faking coming from another page)
    // window.location.reload()
  }

  return (
    <div className="demoGuideHelpers">
      <h3>Search Landing Page</h3>
      <div className="demoGuideHelpers__infos">
        {landingPageConfig.map((item, i) => {
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
        setSelectedValue={handleLandingPage}
        refine={refine}
        options={landingPageConfig}
      />
    </div>
  )
}

export default DemoGuideLandingPage
