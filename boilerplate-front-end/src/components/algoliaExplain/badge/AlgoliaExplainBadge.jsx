import { useRecoilValue } from 'recoil'
import { algoliaExplainToggle } from '@/config/algoliaExplainConfig'
import './SCSS/badge.scss'

function AlgoliaExplainBadge({ children, translationKey }) {
  const { t: explainTranslations } = useTranslation('translation', {
    keyPrefix: 'explain',
  })

  const isAlgoliaExplainActivated = useRecoilValue(algoliaExplainToggle)

  if (isAlgoliaExplainActivated) {
    return (
      <div>
        <div className="badge">
          <p className="title">{explainTranslations(translationKey)}</p>
        </div>
        {children}
      </div>
    )
  } else {
    return chidren
  }
}

export default AlgoliaExplainBadge
