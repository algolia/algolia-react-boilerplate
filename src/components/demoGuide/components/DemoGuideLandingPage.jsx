import { Selectors } from '@/components/selector/Selectors'

// Import configuration
import { landingPageConfig } from '@/config/demoGuideConfig'

const DemoGuideLandingPage = () => {
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
      <Selectors props={landingPageConfig} />
    </div>
  )
}

export default DemoGuideLandingPage
