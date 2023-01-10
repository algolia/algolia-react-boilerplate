import { activateDRR } from '@/config/rerankingConfig'
import { useRecoilState } from 'recoil'
import './reranking.scss'

function ReRankingToggle() {
  const [isDRRActivated, setIsDRRActivated] = useRecoilState(activateDRR)
  return (
    <div className="drr">
      <p className="drr__label">
        {isDRRActivated ? 'De-activate' : 'Activate'} AI re-ranking
      </p>

      <label className="drr__switch">
        <input
          type="checkbox"
          checked={isDRRActivated}
          onChange={() => setIsDRRActivated(!isDRRActivated)}
        />
        <span className="slider round"></span>
      </label>
    </div>
  )
}

export default ReRankingToggle
