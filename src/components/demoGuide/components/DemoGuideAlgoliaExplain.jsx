import { algoliaExplainToggle } from '@/config/algoliaExplainConfig'
import { useRecoilState } from 'recoil'

const DemoGuideAlgoliaExplain = () => {
  const [algoliaExplainSwitch, setAlgoliaExplainSwitch] =
    useRecoilState(algoliaExplainToggle)

  return (
    <div className="demoGuideHelpers">
      <h3>Algolia Explain</h3>
      <div className="appliedRules__toggle">
        <label className="switch">
          <input
            type="checkbox"
            checked={algoliaExplainSwitch}
            onChange={(e) => {
              setAlgoliaExplainSwitch(!algoliaExplainSwitch)
            }}
          />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  )
}

export default DemoGuideAlgoliaExplain
