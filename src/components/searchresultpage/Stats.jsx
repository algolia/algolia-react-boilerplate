// This is for building the stats info that is displayed above the items in the search results page

import { connectStats } from 'react-instantsearch-dom';

const Stats = ({ processingTimeMS, nbHits, nbSortedHits, areHitsSorted }) => (
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
          results found in <span>{processingTimeMS.toLocaleString()} ms</span>
        </p>
      </div>
    )}
  </div>
);

export const CustomStats = connectStats(Stats);
