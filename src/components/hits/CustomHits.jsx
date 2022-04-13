// This is in the Search Results Page for both laptop and mobile windows

// Import InstantSearch Functionality
import { connectHits } from 'react-instantsearch-dom';

import { Hit } from './Hits';

const CustomHits = ({ hits }) => {
  return (
    <div className="ais-InfiniteHits">
      <ul className="ais-InfiniteHits-list">
        {hits.map((hit, i) => {
          // Wrap the hit info in an animation, and click functionality to view the product
          return <Hit hit={hit} key={i} />;
        })}
      </ul>
    </div>
  );
};

const CustomHitsComponent = connectHits(CustomHits);

export default CustomHitsComponent;
