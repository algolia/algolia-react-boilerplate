import { algoliaExplainToggle } from '@/config/algoliaExplainConfig'
import { useRecoilValue } from 'recoil'
import { useTranslation } from 'react-i18next'

import './SCSS/algoliaExplainBox.scss'

function AlgoliaExplainBox({ translationKey }) {
  const { t: explainTranslations } = useTranslation('translation', {
    keyPrefix: 'explain',
  })

  const isAlgoliaExplainActive = useRecoilValue(algoliaExplainToggle)

  if (isAlgoliaExplainActive) {
    return (
      <div className="algolia-explain-box-container">
        <p>{explainTranslations(translationKey)}</p>
      </div>
    )
  } else return null
}

export default AlgoliaExplainBox
