// This is in the Search Results Page for both laptop and mobile windows

// Import InstantSearch Functionality
import { useEffect, useState } from 'react';
import { useHits } from 'react-instantsearch-hooks-web';

import { Hit } from './Hits';

function CustomHits(props) {
  // If hits were not provided via props, we will use the ones from the IS hook (see footnote)
  const { hits: hookHits } = useHits(props);
  const [hits, setHits] = useState([]);

  // Decide whether to use hits from hook or props
  useEffect(() => {
    // Check the props for the hits
    if (props.hits != undefined) {
      setHits(props.hits);
      return;
    }

    // Use the hook
    else setHits(hookHits);
  }, [props]);

  return (
    <div className="ais-InfiniteHits">
      <ul className="ais-InfiniteHits-list">
        {hits.map((hit) => {
          // Wrap the hit info in an animation, and click functionality to view the product
          if (hit._component != undefined) {
            // If the hit has a component property, use it instead of the default component
            return <hit._component hit={hit} key={hit.objectID} />;
          }
          return <Hit hit={hit} key={hit.objectID} />;
          // Note: it's not good practice to use the item index as key, because that may cause the renderer
          // to think 2 different products are one and the same in case they change positions
        })}
      </ul>
    </div>
  );
}

export default CustomHits;

// OBS: hits may be provided through props, for example, so that we can provided hits with injected content!
