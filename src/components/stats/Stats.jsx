// This is for building the stats info that is displayed above the items in the search results page
import connectStats from 'instantsearch.js/es/connectors/stats/connectStats'
import { useConnector } from 'react-instantsearch-hooks-web'

//Use Translation
import { useTranslation } from 'react-i18next'

export function useStats(props) {
  return useConnector(connectStats, props)
}

export function CustomStats(props) {
  const { processingTimeMS, nbHits, nbSortedHits, areHitsSorted } =
    useStats(props)

  // Import const translation
  // Use the translator
  const { t } = useTranslation('translation', {
    keyPrefix: 'srp',
  })

  return (
    <div className="stats-infos">
      {areHitsSorted && nbHits !== nbSortedHits ? (
        <div className="stats-infos__list">
          <span>{nbSortedHits.toLocaleString()}</span>
          <p>
            relevant results sorted out of {nbHits.toLocaleString()} found in
            <span>{processingTimeMS.toLocaleString()}</span>
          </p>
        </div>
      ) : (
        <div className="stats-infos__list">
          <span>{nbHits.toLocaleString()}</span>
          <p>
            {t('stats')} <span>{processingTimeMS.toLocaleString()} ms</span>
          </p>
        </div>
      )}
    </div>
  )
}
