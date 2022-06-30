// This is in the Search Results Page for both laptop and mobile windows

// Import InstantSearch Functionality
import { connectHits } from 'react-instantsearch-dom';
import React, { useState, useEffect } from 'react';


import { Hit } from './Hits';
import CustomSkeleton from '../skeletons/CustomSkeleton';
// TODO: Skeleton here
const CustomHits = ({ hits }) => {
  const [hitsLoaded, setHitsLoaded] = useState(false);

  useEffect(() => {
      setHitsLoaded(hits.length > 0)
  }, [hits]);
  
  return (
    <div className="ais-InfiniteHits">
      <ul className="ais-InfiniteHits-list">
        {hits.map((hit, i) => {
          return <div key={i}>{hitsLoaded ? <Hit hit={hit} key={i + "customhit" + Math.random} /> : <CustomSkeleton type="hit" />}</div>
        })}
      </ul>
    </div>
  );
};

const CustomHitsComponent = connectHits(CustomHits);

export default CustomHitsComponent;
