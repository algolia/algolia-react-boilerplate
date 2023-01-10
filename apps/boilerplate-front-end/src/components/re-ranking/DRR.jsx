import Switch from '@mui/material/Switch'
import { activateDRR } from '@/config/rerankingConfig'
import { useRecoilState } from 'recoil'
import './reranking.scss'

function ReRankingToggle() {
  const [isDRRActivated, setIsDRRActivated] = useRecoilState(activateDRR)
  return (
    <div className="drr-toggle-container">
      <p className="drr-text">
        {isDRRActivated ? 'De-activate' : 'Activate'} AI re-ranking
      </p>
      <Switch
        className="drr-switch"
        checked={isDRRActivated}
        onChange={() => setIsDRRActivated(!isDRRActivated)}
      />
    </div>
  )
}

export default ReRankingToggle
