// Description: Tooltip component

import './SCSS/tooltip.scss'

import Tooltip from '@mui/material/Tooltip'

import { algoliaExplainToggle } from '@/config/algoliaExplainConfig'
import { useRecoilValue } from 'recoil'
import { useTranslation } from 'react-i18next'

// Wraps child component to add a tooltip beside it, used with Algolia explain
function WithToolTip({ children, translationKey }) {
  // Import and use translation
  const { t: explainTranslations } = useTranslation('translation', {
    keyPrefix: 'explain',
  })

  // Check if Algolia explain is activated
  const isAlgoliaExplainActivated = useRecoilValue(algoliaExplainToggle)

  // If Algolia explain is activated, add tooltip
  if (isAlgoliaExplainActivated) {
    return (
      <Tooltip
        title={explainTranslations(translationKey)}
        placement="right-start"
      >
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
