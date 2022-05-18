// This is in the Search Results Page for both laptop and mobile windows

// Import InstantSearch Functionality
import { useHits } from 'react-instantsearch-hooks-web';

import { Hit } from './Hits';

function CustomHits(props) {
  const { hits } = useHits(props);
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
}

export default CustomHits;
