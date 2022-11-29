import { isRulesSwitchToggle } from '@/config/appliedRulesConfig'
import { appliedRulesInformations } from '@/config/demoGuideConfig'
import { useRecoilState } from 'recoil'

const DemoGuideRulesApplied = () => {
  const [isSwitchToggle, setIsSwitchToggle] =
    useRecoilState(isRulesSwitchToggle)
  return (
    <div className="demoGuideHelpers">
      <h3>Applied rules</h3>
      <div className="demoGuideHelpers__infos">
        {appliedRulesInformations.map((item, i) => {
          return (
            <div key={i} className="demoGuideHelpers__infos__titles">
              <span>{item.span}:</span>
              <p>{item.details}</p>
            </div>
          )
        })}
        <div className="appliedRules__toggle">
          <label className="switch">
            <input
              type="checkbox"
              checked={isSwitchToggle}
              onChange={(e) => {
                setIsSwitchToggle(!isSwitchToggle)
              }}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  )
}

export default DemoGuideRulesApplied
