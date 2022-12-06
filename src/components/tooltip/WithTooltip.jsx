// Description: Tooltip component

import './SCSS/tooltip.scss'

import Tooltip from '@mui/material/Tooltip'

import { algoliaExplainToggle } from '@/config/algoliaExplainConfig'
import { useRecoilValue } from 'recoil'

// Wraps child component to add a tooltip beside it, used with Algolia explain
function WithToolTip({ children, text }) {
  // Check if Algolia explain is activated
  const isAlgoliaExplainActivated = useRecoilValue(algoliaExplainToggle)

  // If Algolia explain is activated, add tooltip
  if (isAlgoliaExplainActivated) {
    return (
      <Tooltip title={text} placement="right-start">
        <div className="tooltip-outer-container">
          {children}
          <div className="tooltip-container">?</div>
        </div>
      </Tooltip>
    )
  } else {
    return children
  }
}

export default WithToolTip
