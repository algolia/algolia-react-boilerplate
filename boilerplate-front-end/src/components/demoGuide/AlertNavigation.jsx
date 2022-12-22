import { isRulesSwitchToggle } from '@/config/appliedRulesConfig'
import { alertContent, isAlertOpen } from '@/config/demoGuideConfig'
import { useRecoilState, useRecoilValue } from 'recoil'

//Import scope SCSS
import './SCSS/alertNavigation.scss'

const AlertNavigation = () => {
  const [alertOpen, setAlertOpen] = useRecoilState(isAlertOpen)
  const alertContentToDisplay = useRecoilValue(alertContent)

  // Check if rules applied panel is switch on to adapt styling
  const isRulesAppliedToggle = useRecoilValue(isRulesSwitchToggle)

  return (
    <div className={`${isRulesAppliedToggle ? 'wrap-up ' : ''}wrap`}>
      {alertOpen && (
        <div className="demoGuide__alert">
          <div>{alertContentToDisplay}</div>
          <div
            className="demoGuide__alert-close"
            onClick={(e) => setAlertOpen(false)}
          >
            X
          </div>
        </div>
      )}
    </div>
  )
}

export default AlertNavigation
