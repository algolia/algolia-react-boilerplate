import React from 'react';
// Import other components
import GenericRefinementList from '../components/facets/Facets';
import HitsComponent from '../components/hits/Hits';

const SearchResultPage = () => {
  return (
    <div className="srp-container">
      <div className="srp-container__facets">
        <GenericRefinementList />
      </div>
      <div className="srp-container__hits">
        <HitsComponent />
      </div>
    </div>
  );
};

export default SearchResultPage;
