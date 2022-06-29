// This is in the Search Results Page for both laptop and mobile windows

// Import InstantSearch Functionality
import { connectHits } from 'react-instantsearch-dom';
import React, { useState, useEffect } from 'react';


import { Hit } from './Hits';
// TODO: Skeleton here
const CustomHits = ({ hits }) => {

  useEffect(() => {
    console.log(hits);
  }, [hits]);
  console.log("hi");

  return (
    <div className="ais-InfiniteHits">
      <ul className="ais-InfiniteHits-list">
        {hits.map((hit, i) => {
          return <Hit hit={hit} key={i} />;
        })}
      </ul>
    </div>
  );
};

const CustomHitsComponent = connectHits(CustomHits);

export default CustomHitsComponent;
